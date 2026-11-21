// Run with: npm run test:landing
import test from 'node:test';
import assert from 'node:assert/strict';
import { handle, parseContact } from '../api/waitlist.js';

const env = { BREVO_API_KEY: 'test-key', BREVO_LIST_ID: '7' };
const post = (body) =>
  new Request('https://remii.ai/api/waitlist', { method: 'POST', body: JSON.stringify(body) });
const brevo = (status, body = {}) => {
  const calls = [];
  const fn = async (url, init) => {
    calls.push({ url, key: init.headers['api-key'], body: JSON.parse(init.body) });
    return new Response(JSON.stringify(body), { status });
  };
  fn.calls = calls;
  return fn;
};

test('parseContact reads emails and phone numbers', () => {
  assert.deepEqual(parseContact(' Ada@Example.com '), { email: 'ada@example.com' });
  assert.deepEqual(parseContact('(415) 555-0134'), { sms: '+14155550134' });
  assert.deepEqual(parseContact('+44 20 7946 0958'), { sms: '+442079460958' });
  assert.deepEqual(parseContact('ada@'), { error: 'contact' });
  assert.deepEqual(parseContact('12345'), { error: 'contact' });
  assert.deepEqual(parseContact('call me'), { error: 'contact' });
});

test('an email sign-up is added to the Brevo list', async () => {
  const f = brevo(201, { id: 1 });
  const res = await handle(post({ name: 'Ada Lovelace', contact: 'ada@example.com' }), env, f);
  assert.equal(res.status, 200);
  assert.equal(f.calls[0].key, 'test-key');
  assert.deepEqual(f.calls[0].body, {
    attributes: { FIRSTNAME: 'Ada', LASTNAME: 'Lovelace' },
    listIds: [7],
    updateEnabled: true,
    email: 'ada@example.com',
  });
});

test('a phone sign-up is sent as an SMS attribute', async () => {
  const f = brevo(201);
  await handle(post({ name: 'Bo', contact: '415 555 0134' }), env, f);
  assert.deepEqual(f.calls[0].body.attributes, { FIRSTNAME: 'Bo', SMS: '+14155550134' });
  assert.equal('email' in f.calls[0].body, false);
});

test('someone already on the list still gets a success', async () => {
  const res = await handle(post({ name: 'Bo', contact: '415 555 0134' }), env, brevo(400, { code: 'duplicate_parameter' }));
  assert.equal(res.status, 200);
});

test('bad input is refused before Brevo is called', async () => {
  const f = brevo(201);
  assert.equal((await handle(post({ name: '', contact: 'a@b.co' }), env, f)).status, 400);
  assert.equal((await handle(post({ name: 'A', contact: 'nope' }), env, f)).status, 400);
  assert.equal((await handle(new Request('https://remii.ai/api/waitlist'), env, f)).status, 405);
  assert.equal(f.calls.length, 0);
});

test('the hidden bot field is dropped without calling Brevo', async () => {
  const f = brevo(201);
  const res = await handle(post({ name: 'Bot', contact: 'a@b.co', company: 'x' }), env, f);
  assert.equal(res.status, 200);
  assert.equal(f.calls.length, 0);
});

test('missing settings or a Brevo failure never report success', async () => {
  assert.equal((await handle(post({ name: 'A', contact: 'a@b.co' }), {}, brevo(201))).status, 503);
  assert.equal((await handle(post({ name: 'A', contact: 'a@b.co' }), env, brevo(401, { code: 'unauthorized' }))).status, 502);
});
