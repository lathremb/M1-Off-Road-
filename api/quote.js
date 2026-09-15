/* =========================================================
   POST /api/quote

   Receives the quote-form JSON, validates it, and sends it on by email via
   Resend. Same arrangement as the Lathrem Homebuilders contact form: the
   destination address lives only in Vercel's environment variables, so it
   never reaches the browser and there is nothing in the page source for a
   scraper to harvest.

   This file sits in the root `api/` directory rather than inside src/pages,
   which is how Vercel picks it up as a serverless function without an Astro
   adapter. The site itself stays a pure static build.

   Required environment variables (Vercel > Project > Settings > Environment Variables):
     RESEND_API_KEY   re_xxxxxxxx        from resend.com/api-keys
                      [needs-input: resend-key]
     CONTACT_EMAIL    where quote requests should land
                      [needs-input: contact-email]
   Optional:
     CONTACT_FROM     defaults to "M1 Off-Road Website <onboarding@resend.dev>".
                      Resend's shared sender only delivers to the address that
                      owns the Resend account. Once a domain is verified, set
                      this to something like "Website <quotes@m1offroad.com>".

   Note: the form has no email field on purpose — the reply channel is the
   phone — so these messages carry no reply_to. The phone number is in the
   subject line so it is visible from the inbox list without opening anything.
   ========================================================= */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/* Cap every field so an oversized POST cannot be used to stuff the inbox. */
const LIMITS = {
  name: 120,
  phone: 40,
  machine: 160,
  work: 5000,
};

const LABELS = {
  name: 'Name',
  phone: 'Phone',
  machine: 'Machine',
  work: 'What they want done',
};

/* Roughly 2.4 MB of base64 ≈ 1.8 MB of image. The browser downscales before
   sending, so anything past this is a client that skipped that step. Vercel
   rejects request bodies over 4.5 MB outright. */
const MAX_PHOTO_BASE64 = 2_600_000;

function clean(value, max, allowNewlines) {
  if (typeof value !== 'string') return '';
  // Collapse control characters to spaces (header-injection safety). Only the
  // free-text field keeps its line breaks; every single-line field — the ones
  // that become the subject especially — is flattened.
  let out = value
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, ' ')
    .replace(/\r\n?/g, '\n');
  out = allowNewlines
    ? out.replace(/\n{3,}/g, '\n\n')
    : out.replace(/\n+/g, ' ').replace(/ {2,}/g, ' ');
  return out.trim().slice(0, max);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Digits only, so "(520) 403-3366" and "520.403.3366" both count as valid. */
function countDigits(s) {
  return (s.match(/\d/g) || []).length;
}

function parseBody(req) {
  const body = req.body;
  if (body && typeof body === 'object') return body;
  if (typeof body === 'string' && body.length) {
    try {
      return JSON.parse(body);
    } catch {
      return Object.fromEntries(new URLSearchParams(body));
    }
  }
  return {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from =
    process.env.CONTACT_FROM || 'M1 Off-Road Website <onboarding@resend.dev>';

  if (!apiKey || !to) {
    // Logged so it is obvious in the Vercel function logs which of the two is
    // missing, without ever echoing the values themselves.
    console.error(
      'quote: missing ' +
        [!apiKey && 'RESEND_API_KEY', !to && 'CONTACT_EMAIL']
          .filter(Boolean)
          .join(' and ')
    );
    return res.status(503).json({
      error: "The form isn't hooked up yet.",
    });
  }

  const body = parseBody(req);

  /* --- bot traps -------------------------------------------------
     Both answered with a 200 so a bot gets no signal that it was caught and
     does not come back to probe for the real path. */
  if (clean(body._gotcha, 200)) {
    return res.status(200).json({ ok: true });
  }
  const elapsed = Date.now() - Number(body._t || 0);
  if (Number(body._t) && elapsed < 3000) {
    return res.status(200).json({ ok: true });
  }

  /* --- validation ------------------------------------------------ */
  const data = {};
  for (const k of Object.keys(LIMITS)) {
    data[k] = clean(body[k], LIMITS[k], k === 'work');
  }

  const errors = [];
  if (!data.name) errors.push('Please give your name.');
  if (!data.phone) errors.push('Please give a phone number.');
  else if (countDigits(data.phone) < 10) {
    errors.push("That phone number doesn't look complete.");
  }
  if (!data.machine) errors.push('Please give the year, make and model.');
  if (!data.work) errors.push('Please say what you want done.');

  if (errors.length) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  /* --- optional photo -------------------------------------------- */
  const attachments = [];
  const photoData = typeof body.photoData === 'string' ? body.photoData : '';
  if (photoData) {
    if (photoData.length > MAX_PHOTO_BASE64) {
      return res.status(413).json({
        error: 'That photo is too large. Try a smaller one, or send it by text.',
      });
    }
    if (!/^[A-Za-z0-9+/=\s]+$/.test(photoData)) {
      return res.status(400).json({ error: "That photo didn't come through." });
    }
    // Sanitised here rather than trusted from the client: the browser does the
    // same substitution, but nothing stops a request arriving without it, and
    // this string ends up as a filename in Mike's mail client.
    const filename =
      clean(body.photoName, 80)
        .replace(/[^\w.\-]+/g, '_')
        .replace(/^[._]+/, '') || 'photo.jpg';
    attachments.push({
      filename: /\.(jpe?g|png|webp)$/i.test(filename)
        ? filename
        : `${filename}.jpg`,
      content: photoData.replace(/\s/g, ''),
    });
  }

  /* --- compose --------------------------------------------------- */
  const order = ['name', 'phone', 'machine'];
  const rows = order
    .map(
      (k) =>
        '<tr>' +
        '<td style="padding:6px 18px 6px 0;color:#5c5e61;font:600 11px/1.5 Arial,sans-serif;' +
        'letter-spacing:.1em;text-transform:uppercase;vertical-align:top;white-space:nowrap">' +
        escapeHtml(LABELS[k]) +
        '</td>' +
        '<td style="padding:6px 0;color:#111113;font:400 15px/1.6 Arial,sans-serif">' +
        (k === 'phone'
          ? '<a href="tel:' +
            escapeHtml(data.phone.replace(/[^\d+]/g, '')) +
            '" style="color:#b4441c;font-weight:700;text-decoration:none">' +
            escapeHtml(data.phone) +
            '</a>'
          : escapeHtml(data[k])) +
        '</td></tr>'
    )
    .join('');

  const html =
    '<div style="background:#f2efe9;padding:28px">' +
    '<div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #d6d0c4;padding:30px 32px">' +
    '<p style="margin:0 0 4px;color:#b4441c;font:700 11px/1.5 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase">' +
    'New quote request</p>' +
    '<h1 style="margin:0 0 24px;color:#111113;font:700 26px/1.25 Arial,sans-serif">' +
    escapeHtml(data.name) +
    '</h1>' +
    '<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">' +
    rows +
    '</table>' +
    '<div style="margin-top:24px;padding-top:20px;border-top:1px solid #d6d0c4">' +
    '<p style="margin:0 0 8px;color:#5c5e61;font:600 11px/1.5 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase">' +
    escapeHtml(LABELS.work) +
    '</p>' +
    '<div style="color:#111113;font:400 15px/1.7 Arial,sans-serif;white-space:pre-wrap">' +
    escapeHtml(data.work) +
    '</div></div>' +
    (attachments.length
      ? '<p style="margin:20px 0 0;color:#5c5e61;font:400 13px/1.6 Arial,sans-serif">' +
        '📎 A photo is attached to this email.</p>'
      : '') +
    '<p style="margin:26px 0 0;padding-top:18px;border-top:1px solid #d6d0c4;color:#5c5e61;' +
    'font:400 12px/1.6 Arial,sans-serif">Sent from the quote form at m1offroad.com. ' +
    'There is no email address to reply to — call or text ' +
    escapeHtml(data.phone) +
    '.</p>' +
    '</div></div>';

  const text = order
    .map((k) => `${LABELS[k]}: ${data[k]}`)
    .concat(['', LABELS.work, '-----------------', data.work])
    .concat(attachments.length ? ['', '(Photo attached.)'] : [])
    .join('\n');

  /* --- send ------------------------------------------------------ */
  try {
    const resend = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Quote request — ${data.name} — ${data.phone}`,
        html,
        text,
        ...(attachments.length ? { attachments } : {}),
      }),
    });

    if (!resend.ok) {
      const detail = await resend.text();
      console.error(`quote: resend returned ${resend.status} ${detail}`);
      return res.status(502).json({ error: "That didn't send." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(`quote: ${err && err.message}`);
    return res.status(502).json({ error: "That didn't send." });
  }
}
