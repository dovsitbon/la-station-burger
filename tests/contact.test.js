import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { handleContact, validate, isSpam, resetRateLimit } from '../lib/contact-handler.js';

const env = { RESEND_API_KEY: 'test-key', CONTACT_TO: 'resto@example.test', CONTACT_FROM: 'Site <site@example.test>' };
const valid = {
  name: 'Camille',
  email: 'camille@example.test',
  subject: 'Question',
  message: 'Bonjour, êtes-vous ouverts le 1er mai ?',
  consent: 'yes',
  t: String(Date.now() - 10_000),
};

function req(body, { json = true, ip = '1.1.1.1', headers = {} } = {}) {
  const form = new FormData();
  for (const [k, v] of Object.entries(body)) form.append(k, v);
  return new Request('https://site.test/api/contact/', {
    method: 'POST',
    headers: { accept: json ? 'application/json' : 'text/html', 'x-forwarded-for': ip, host: 'site.test', ...headers },
    body: form,
  });
}

beforeEach(() => resetRateLimit());

test('valide un message correct', () => {
  assert.equal(validate(valid).ok, true);
});

test('refuse les champs manquants avec un message par champ', () => {
  const r = validate({ name: '', email: 'pas-un-email', message: 'court' });
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.fields).sort(), ['consent', 'email', 'message', 'name']);
});

test("neutralise l'injection d'en-têtes dans le nom et le sujet", () => {
  const r = validate({ ...valid, name: 'Eve\r\nBcc: x@y.z', subject: 'A\nB' });
  assert.ok(!/[\r\n]/.test(r.data.name));
  assert.ok(!/[\r\n]/.test(r.data.subject));
});

test('détecte le spam : honeypot, envoi trop rapide, trop de liens', () => {
  assert.equal(isSpam({ ...valid, website: 'http://spam' }), true);
  assert.equal(isSpam({ ...valid, t: String(Date.now()) }), true);
  assert.equal(isSpam({ ...valid, message: 'http:// http:// http:// http://' }), true);
  assert.equal(isSpam(valid), false);
});

test('envoie le message et répond 200', async () => {
  let sent;
  const res = await handleContact(req(valid), { env, send: async (m) => (sent = m) });
  assert.equal(res.status, 200);
  assert.equal(sent.reply_to, valid.email);
  assert.match(sent.subject, /Camille/);
});

test("répond 503 si l'envoi n'est pas configuré", async () => {
  const res = await handleContact(req(valid), { env: {}, send: async () => assert.fail('ne doit pas envoyer') });
  assert.equal(res.status, 503);
});

test('répond 422 avec le détail des champs invalides', async () => {
  const res = await handleContact(req({ ...valid, email: 'x' }), { env, send: async () => {} });
  assert.equal(res.status, 422);
  assert.ok((await res.json()).fields.email);
});

test('ne transmet pas le spam mais répond succès', async () => {
  const res = await handleContact(req({ ...valid, website: 'x' }), { env, send: async () => assert.fail('spam envoyé') });
  assert.equal(res.status, 200);
});

test("renvoie 502 si le fournisseur d'e-mail échoue", async () => {
  const res = await handleContact(req(valid), {
    env,
    send: async () => {
      throw new Error('boom');
    },
  });
  assert.equal(res.status, 502);
});

test('limite le nombre de messages par IP', async () => {
  let last;
  for (let i = 0; i < 6; i++) last = await handleContact(req(valid, { ip: '9.9.9.9' }), { env, send: async () => {} });
  assert.equal(last.status, 429);
});

test('refuse une origine étrangère', async () => {
  const res = await handleContact(req(valid, { headers: { origin: 'https://evil.test' } }), { env, send: async () => {} });
  assert.equal(res.status, 403);
});

test('redirige (303) les envois sans JavaScript', async () => {
  const res = await handleContact(req(valid, { json: false }), { env, send: async () => {} });
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('location'), '/contact/?envoye=1');
});
