// Waitlist sign-up. Runs on the server (a Vercel Function), never in the browser.
// It adds the person to a Brevo contact list.
//
// Needs two settings on the host, under Environment Variables:
//   BREVO_API_KEY   a Brevo API key. Never put this in a file in the repo.
//   BREVO_LIST_ID   the number of the Brevo list to add people to.
//
// If either is missing the function answers 503 and the page tells the visitor
// the sign-up did not go through. It never pretends a sign-up was saved.

const BREVO_URL = 'https://api.brevo.com/v3/contacts';

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

// Returns { email } or { sms } or { error }.
export function parseContact(raw) {
  const t = String(raw || '').trim();
  if (!t || t.length > 160) return { error: 'contact' };
  if (t.includes('@')) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t) ? { email: t.toLowerCase() } : { error: 'contact' };
  }
  if (/[a-zA-Z]/.test(t)) return { error: 'contact' };
  const digits = t.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return { error: 'contact' };
  // A 10-digit number with no country code is treated as US or Canada (+1).
  if (!t.startsWith('+') && digits.length === 10) return { sms: '+1' + digits };
  return { sms: '+' + digits };
}

export async function handle(request, env = process.env, fetchImpl = fetch) {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method' });

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'body' });
  }

  // Hidden field that people never see. Bots fill it in; drop those quietly.
  if (body && body.company) return json(200, { ok: true });

  const name = String((body && body.name) || '').trim().slice(0, 120);
  if (!name) return json(400, { ok: false, error: 'name' });

  const contact = parseContact(body.contact);
  if (contact.error) return json(400, { ok: false, error: 'contact' });

  const listId = Number(env.BREVO_LIST_ID);
  if (!env.BREVO_API_KEY || !Number.isInteger(listId) || listId <= 0) {
    console.error('Waitlist is not configured: set BREVO_API_KEY and BREVO_LIST_ID.');
    return json(503, { ok: false, error: 'not_configured' });
  }

  const [first, ...rest] = name.split(/\s+/);
  const attributes = { FIRSTNAME: first };
  if (rest.length) attributes.LASTNAME = rest.join(' ');
  const payload = { attributes, listIds: [listId], updateEnabled: true };
  if (contact.email) payload.email = contact.email;
  if (contact.sms) attributes.SMS = contact.sms;

  let res;
  try {
    res = await fetchImpl(BREVO_URL, {
      method: 'POST',
      headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Waitlist: could not reach Brevo.', err);
    return json(502, { ok: false, error: 'upstream' });
  }

  if (res.ok) return json(200, { ok: true });

  let detail = {};
  try {
    detail = await res.json();
  } catch {
    // Brevo sent no JSON body; the status code is enough.
  }
  // Someone who is already on the list has still signed up successfully.
  if (res.status === 400 && detail.code === 'duplicate_parameter') return json(200, { ok: true });

  console.error('Waitlist: Brevo refused the sign-up.', res.status, detail.code, detail.message);
  return json(502, { ok: false, error: 'upstream' });
}

export default {
  fetch(request) {
    return handle(request);
  },
};
