/**
 * Logique du formulaire de contact, indépendante de l'hébergeur (testée dans tests/).
 * Envoi par l'API Resend : https://resend.com/docs/api-reference/emails/send-email
 */

const MIN_FILL_MS = 3000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/[\r\n]+/g, ' ');

export function validate(input) {
  const data = {
    name: oneLine(input.name, 100),
    email: oneLine(input.email, 160),
    phone: oneLine(input.phone, 30),
    subject: oneLine(input.subject, 60) || 'Question',
    message: clean(input.message, 3000),
    consent: input.consent === 'yes' || input.consent === true || input.consent === 'on',
  };
  const fields = {};
  if (data.name.length < 2) fields.name = 'Indiquez votre nom.';
  if (!EMAIL_RE.test(data.email)) fields.email = 'Indiquez une adresse e-mail valide.';
  if (data.message.length < 10) fields.message = 'Votre message doit contenir au moins 10 caractères.';
  if (!data.consent) fields.consent = 'Votre accord est nécessaire pour que nous puissions vous répondre.';
  return { data, fields, ok: Object.keys(fields).length === 0 };
}

export function isSpam(input, now = Date.now()) {
  if (clean(input.website, 200)) return true;
  const t = Number(input.t);
  if (input.t && Number.isFinite(t) && now - t < MIN_FILL_MS) return true;
  const links = (String(input.message ?? '').match(/https?:\/\//g) || []).length;
  return links > 3;
}

export function rateLimited(ip, now = Date.now()) {
  const list = (hits.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT.windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > RATE_LIMIT.max;
}

export function resetRateLimit() {
  hits.clear();
}

async function readBody(request) {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) return await request.json();
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/**
 * @param {Request} request
 * @param {{ env?: Record<string, string|undefined>, send?: (msg: object, env: object) => Promise<void> }} [opts]
 */
export async function handleContact(request, opts = {}) {
  const env = opts.env ?? process.env;
  const send = opts.send ?? sendWithResend;
  const wantsHtml = !(request.headers.get('accept') || '').includes('application/json');
  const reply = (status, body, query) =>
    wantsHtml
      ? new Response(null, { status: 303, headers: { location: `/contact/?${query}` } })
      : json(status, body);

  if (request.method !== 'POST') return json(405, { error: 'Méthode non autorisée.' });

  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (origin && host && new URL(origin).host !== host) return json(403, { error: 'Origine refusée.' });

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return reply(429, { error: 'Trop de messages envoyés. Réessayez plus tard.' }, 'erreur=limite');

  let input;
  try {
    input = await readBody(request);
  } catch {
    return reply(400, { error: 'Requête invalide.' }, 'erreur=requete');
  }

  // Les robots reçoivent une réponse de succès, sans envoi.
  if (isSpam(input)) return reply(200, { ok: true }, 'envoye=1');

  const { data, fields, ok } = validate(input);
  if (!ok) return reply(422, { error: 'Champs invalides.', fields }, 'erreur=champs');

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return reply(503, { error: 'not_configured' }, 'erreur=configuration');
  }

  try {
    await send(
      {
        from: env.CONTACT_FROM,
        to: [env.CONTACT_TO],
        reply_to: data.email,
        subject: `[Site] ${data.subject} — ${data.name}`,
        text: [
          `Nom : ${data.name}`,
          `E-mail : ${data.email}`,
          `Téléphone : ${data.phone || '—'}`,
          `Sujet : ${data.subject}`,
          '',
          data.message,
          '',
          '— Message envoyé depuis le formulaire de contact du site.',
        ].join('\n'),
      },
      env,
    );
  } catch (err) {
    console.error('contact: envoi échoué', err instanceof Error ? err.message : err);
    return reply(502, { error: "L'envoi a échoué. Réessayez ou appelez-nous." }, 'erreur=envoi');
  }

  return reply(200, { ok: true }, 'envoye=1');
}

async function sendWithResend(message, env) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify(message),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
