import assert from "node:assert/strict";
import { createDecipheriv, randomBytes } from "node:crypto";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { createAppServer } from "./server.mjs";
import { LocalContentStore } from "./content-store.mjs";
import { EncryptedSubmissionStore, encryptionKeyFromBase64 } from "./storage.mjs";

async function withServer(t, options = {}) {
  const server = createAppServer(options);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

async function withContentServer(t) {
  const directory = await mkdtemp(join(tmpdir(), "chinsali-content-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return withServer(t, {
    contentStore: new LocalContentStore(join(directory, "content.json")),
    adminUsername: "staff",
    adminPassword: "correct-horse-battery",
  });
}

test("health reports configuration without exposing private data", async (t) => {
  const baseUrl = await withServer(t);
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: "ok",
    submissions: false,
    voting: false,
    ussd: false,
  });
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("submissions are validated, encrypted by the store, and never publicly readable", async (t) => {
  const saved = [];
  const baseUrl = await withServer(t, {
    submissionsStore: { save: async (record) => saved.push(record) },
  });
  const payload = {
    kind: "issue",
    details: "The road needs repair near the clinic.",
    ward: "Mwika",
    category: "Roads and potholes",
    phone: "+260 971 234 567",
  };
  const response = await fetch(`${baseUrl}/api/submissions`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  assert.equal(response.status, 201);
  const receipt = await response.json();
  assert.match(receipt.reference, /^MC-[A-F0-9]{20}$/);
  assert.equal(receipt.status, "received");
  assert.equal(saved.length, 1);
  assert.deepEqual(saved[0].submission, { ...payload, title: "", contact: "", anonymous: false });

  const readResponse = await fetch(`${baseUrl}/api/submissions/${receipt.reference}`);
  assert.equal(readResponse.status, 404);
  assert.doesNotMatch(await readResponse.text(), /clinic|971 234/);
});

test("anonymous submissions discard contact phone numbers before storage", async (t) => {
  let saved;
  const baseUrl = await withServer(t, {
    submissionsStore: { save: async (record) => { saved = record; } },
  });
  const response = await fetch(`${baseUrl}/api/submissions`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      kind: "feedback",
      details: "Please add an accessible service desk.",
      anonymous: true,
      phone: "+260 971 234 567",
    }),
  });
  assert.equal(response.status, 201);
  assert.equal(saved.submission.phone, "");
  assert.equal(saved.submission.anonymous, true);
});

test("invalid submissions and unconfigured storage fail explicitly", async (t) => {
  const baseUrl = await withServer(t, {
    submissionsStore: { save: async () => assert.fail("Invalid submission was stored.") },
  });
  const invalid = await fetch(`${baseUrl}/api/submissions`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind: "whistleblowing", details: "Sensitive report text." }),
  });
  assert.equal(invalid.status, 400);

  const noStorageUrl = await withServer(t);
  const unavailable = await fetch(`${noStorageUrl}/api/submissions`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind: "issue", details: "The road needs repair." }),
  });
  assert.equal(unavailable.status, 503);
});

test("public submission reads and backend source files are not served", async (t) => {
  const baseUrl = await withServer(t);
  const requests = await Promise.all([
    fetch(`${baseUrl}/api/submissions`),
    fetch(`${baseUrl}/backend/server.mjs`),
    fetch(`${baseUrl}/README.md`),
    fetch(`${baseUrl}/`),
    fetch(`${baseUrl}/admin`),
    fetch(`${baseUrl}/login`),
  ]);
  assert.deepEqual(requests.map((response) => response.status), [405, 404, 404, 200, 200, 200]);
});

test("staff can review encrypted submissions without exposing them publicly", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "chinsali-submissions-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const submissionsStore = new EncryptedSubmissionStore(join(directory, "submissions.jsonl"), randomBytes(32));
  await submissionsStore.save({
    reference: "MC-ISSUE",
    receivedAt: "2026-11-25T10:00:00.000Z",
    submission: { kind: "issue", details: "Broken water point near the clinic.", ward: "Mwika", category: "Water", phone: "+260971234567", anonymous: false },
  });
  await submissionsStore.save({
    reference: "PROP-IDEA",
    receivedAt: "2026-11-25T11:00:00.000Z",
    submission: { kind: "proposal", details: "Build a community learning centre.", ward: "Lubwa", category: "Education", phone: "", anonymous: true },
  });
  const baseUrl = await withServer(t, {
    submissionsStore,
    adminUsername: "staff",
    adminPassword: "correct-horse-battery",
  });

  const unauthorized = await fetch(`${baseUrl}/api/admin/submissions?kind=reports`);
  assert.equal(unauthorized.status, 401);
  const login = await fetch(`${baseUrl}/api/admin/session`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: baseUrl },
    body: JSON.stringify({ username: "staff", password: "correct-horse-battery" }),
  });
  const cookie = login.headers.get("set-cookie").split(";", 1)[0];
  const headers = { cookie };
  const reports = await fetch(`${baseUrl}/api/admin/submissions?kind=reports`, { headers });
  assert.equal(reports.status, 200);
  assert.equal(reports.headers.get("cache-control"), "no-store");
  assert.deepEqual(await reports.json(), {
    items: [{
      reference: "MC-ISSUE",
      receivedAt: "2026-11-25T10:00:00.000Z",
      submission: { kind: "issue", details: "Broken water point near the clinic.", ward: "Mwika", category: "Water", phone: "+260971234567", anonymous: false },
    }],
    total: 1,
  });
  const other = await fetch(`${baseUrl}/api/admin/submissions?kind=submissions`, { headers });
  assert.equal((await other.json()).items[0].reference, "PROP-IDEA");
  const publicRead = await fetch(`${baseUrl}/api/submissions`);
  assert.equal(publicRead.status, 405);
  assert.doesNotMatch(await publicRead.text(), /clinic|971234567/);
});

test("staff can close portal voting and reopen it", async (t) => {
  const baseUrl = await withContentServer(t);
  const login = await fetch(`${baseUrl}/api/admin/session`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: baseUrl },
    body: JSON.stringify({ username: "staff", password: "correct-horse-battery" }),
  });
  const cookie = login.headers.get("set-cookie").split(";", 1)[0];
  const headers = { cookie, origin: baseUrl, "content-type": "application/json" };

  const invalid = await fetch(`${baseUrl}/api/admin/settings`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ pollsOpen: "false" }),
  });
  assert.equal(invalid.status, 400);
  const closed = await fetch(`${baseUrl}/api/admin/settings`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ pollsOpen: false }),
  });
  assert.deepEqual(await closed.json(), { pollsOpen: false });
  assert.equal((await (await fetch(`${baseUrl}/api/content/public`)).json()).pollsOpen, false);
  const blockedVote = await fetch(`${baseUrl}/api/votes`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ pollId: "priority-2027", optionId: "p1" }),
  });
  assert.equal(blockedVote.status, 403);

  const reopened = await fetch(`${baseUrl}/api/admin/settings`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ pollsOpen: true }),
  });
  assert.deepEqual(await reopened.json(), { pollsOpen: true });
  assert.equal((await (await fetch(`${baseUrl}/api/content/public`)).json()).pollsOpen, true);
});

test("votes are sent to the cast_vote database function", async (t) => {
  const calls = [];
  const baseUrl = await withServer(t, {
    voteConfig: {
      url: "https://example.supabase.co",
      anonKey: "test-anon-key",
      pollParam: "p_poll_id",
      optionParam: "p_option_id",
    },
    fetchImpl: async (url, options) => {
      calls.push({ url: String(url), options });
      return new Response("null", { status: 200 });
    },
  });
  const response = await fetch(`${baseUrl}/api/votes`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ pollId: "priority-2027", optionId: "p1" }),
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { accepted: true });
  assert.equal(calls[0].url, "https://example.supabase.co/rest/v1/rpc/cast_vote");
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    p_poll_id: "priority-2027",
    p_option_id: "p1",
  });
  assert.equal(calls[0].options.headers.Authorization, "Bearer test-anon-key");
});

test("staff content management is authenticated and published content is the only public content", async (t) => {
  const baseUrl = await withContentServer(t);
  const unauthenticated = await fetch(`${baseUrl}/api/admin/overview`);
  assert.equal(unauthenticated.status, 401);
  const emptyPublicContent = await fetch(`${baseUrl}/api/content/public`);
  assert.deepEqual(await emptyPublicContent.json(), { news: [], gallery: [], pollsOpen: true });

  const wrongUsername = await fetch(`${baseUrl}/api/admin/session`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: baseUrl },
    body: JSON.stringify({ username: "someone-else", password: "correct-horse-battery" }),
  });
  assert.equal(wrongUsername.status, 401);

  const login = await fetch(`${baseUrl}/api/admin/session`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: baseUrl },
    body: JSON.stringify({ username: "staff", password: "correct-horse-battery" }),
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie").split(";", 1)[0];
  assert.match(login.headers.get("set-cookie"), /HttpOnly; SameSite=Strict/);
  const headers = { cookie, origin: baseUrl, "content-type": "application/json" };

  const draftNews = await fetch(`${baseUrl}/api/admin/content/news`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      title: "Mwika project update",
      excerpt: "The public works team confirmed the latest project milestone.",
      date: "2027-01-02",
      tag: "Development update",
      type: "update",
      status: "draft",
    }),
  });
  assert.equal(draftNews.status, 201);
  const newsId = (await draftNews.json()).item.id;
  assert.deepEqual((await (await fetch(`${baseUrl}/api/content/public`)).json()).news, []);

  const publishedNews = await fetch(`${baseUrl}/api/admin/content/news/${newsId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      title: "Mwika project update",
      excerpt: "The public works team confirmed the latest project milestone.",
      date: "2027-01-02",
      tag: "Development update",
      type: "update",
      status: "published",
    }),
  });
  assert.equal(publishedNews.status, 200);
  assert.equal((await (await fetch(`${baseUrl}/api/content/public`)).json()).news[0].title, "Mwika project update");

  const poll = await fetch(`${baseUrl}/api/admin/content/polls`, {
    method: "POST",
    headers,
    body: JSON.stringify({ question: "Which community priority should be discussed next?", closes: "2027-02-01", options: ["Water access", "Road maintenance"] }),
  });
  assert.equal(poll.status, 201);
  assert.equal((await poll.json()).item.status, "draft");
  assert.equal((await (await fetch(`${baseUrl}/api/content/public`)).json()).polls, undefined);

  const upload = await fetch(`${baseUrl}/api/admin/uploads`, {
    method: "POST",
    headers,
    body: JSON.stringify({ contentType: "image/png", data: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).toString("base64") }),
  });
  assert.equal(upload.status, 201);
  const { image } = await upload.json();
  const privateImage = await fetch(`${baseUrl}${image}`);
  assert.equal(privateImage.status, 404);
  assert.equal((await fetch(`${baseUrl}${image}`, { headers: { cookie } })).status, 200);

  const gallery = await fetch(`${baseUrl}/api/admin/content/gallery`, {
    method: "POST",
    headers,
    body: JSON.stringify({ title: "Mwika water point", description: "A new community water point in Mwika.", category: "Community life", alt: "Recently drilled water point in Mwika", source: "District project team", status: "published", image }),
  });
  assert.equal(gallery.status, 201);
  assert.equal((await fetch(`${baseUrl}${image}`)).status, 200);

  const logout = await fetch(`${baseUrl}/api/admin/session`, { method: "DELETE", headers: { cookie, origin: baseUrl } });
  assert.equal(logout.status, 204);
  assert.equal((await fetch(`${baseUrl}/api/admin/overview`, { headers: { cookie } })).status, 401);
  assert.equal((await fetch(`${baseUrl}/api/submissions`)).status, 405);
});

test("staff content writes require a same-origin request and image uploads reject mismatched types", async (t) => {
  const baseUrl = await withContentServer(t);
  const login = await fetch(`${baseUrl}/api/admin/session`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: baseUrl },
    body: JSON.stringify({ username: "staff", password: "correct-horse-battery" }),
  });
  const cookie = login.headers.get("set-cookie").split(";", 1)[0];
  const crossOrigin = await fetch(`${baseUrl}/api/admin/content/news`, {
    method: "POST",
    headers: { cookie, origin: "https://attacker.example", "content-type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.equal(crossOrigin.status, 403);
  const mismatchedImage = await fetch(`${baseUrl}/api/admin/uploads`, {
    method: "POST",
    headers: { cookie, origin: baseUrl, "content-type": "application/json" },
    body: JSON.stringify({ contentType: "image/png", data: Buffer.from("not a png").toString("base64") }),
  });
  assert.equal(mismatchedImage.status, 400);
});

test("staff sign-in stays disabled without an explicit server password", async (t) => {
  const baseUrl = await withServer(t);
  const session = await fetch(`${baseUrl}/api/admin/session`);
  assert.deepEqual(await session.json(), { authenticated: false });
  const login = await fetch(`${baseUrl}/api/admin/session`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: baseUrl },
    body: JSON.stringify({ username: "staff", password: "a-strong-password-for-testing" }),
  });
  assert.equal(login.status, 503);
  assert.equal((await login.json()).error.includes("ADMIN_PASSWORD"), true);
});

test("rate limits write requests", async (t) => {
  const baseUrl = await withServer(t, { rateLimit: 1 });
  const post = () => fetch(`${baseUrl}/api/votes`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ pollId: "poll", optionId: "option" }),
  });
  assert.equal((await post()).status, 503);
  const limited = await post();
  assert.equal(limited.status, 429);
});

test("USSD callback accepts a report flow and never stores the caller's phone number", async (t) => {
  const saved = [];
  const baseUrl = await withServer(t, {
    submissionsStore: { save: async (record) => saved.push(record) },
  });
  const callback = async (text) => fetch(`${baseUrl}/api/ussd`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      sessionId: "AT-session-unique-001",
      serviceCode: "*388*133#",
      phoneNumber: "+260971234567",
      text,
    }),
  });

  const steps = [
    ["", /^CON Welcome to My Chinsali/],
    ["1", /^CON Choose an issue:/],
    ["1*2", /^CON Choose your ward:/],
    ["1*2*2", /^CON Enter a nearby landmark/],
    ["1*2*2*Mwika market", /^CON Briefly describe the issue/],
  ];
  for (const [text, pattern] of steps) {
    const response = await callback(text);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /text\/plain/);
    assert.match(await response.text(), pattern);
  }

  const finalResponse = await callback("1*2*2*Mwika market*Road damaged near the clinic");
  const finalText = await finalResponse.text();
  assert.match(finalText, /^END Report received\. Reference: MC-[A-F0-9]{20}\.$/);
  assert.equal(saved.length, 1);
  assert.deepEqual(saved[0].submission, {
    kind: "issue",
    title: "",
    details: "Location: Mwika market. Road damaged near the clinic",
    ward: "Mwika",
    category: "Roads and potholes",
    phone: "",
    contact: "",
    anonymous: true,
    channel: "ussd",
  });
  assert.doesNotMatch(JSON.stringify(saved[0]), /AT-session-unique-001|260971234567/);
});

test("USSD endpoint rejects the wrong service code and limits repeated sessions", async (t) => {
  const baseUrl = await withServer(t, { rateLimit: 1 });
  const callback = (sessionId, serviceCode) => fetch(`${baseUrl}/api/ussd`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sessionId, serviceCode, text: "" }),
  });

  const invalidCode = await callback("AT-session-code-001", "*999#");
  assert.equal(await invalidCode.text(), "END This service code is not recognized.");
  assert.equal((await callback("AT-session-throttle-01", "*388*133#")).status, 200);
  const throttled = await callback("AT-session-throttle-01", "*388*133#");
  assert.equal(await throttled.text(), "END Too many requests. Please try again later.");
});

test("encrypted records contain no plaintext resident information", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "chinsali-backend-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const path = join(directory, "submissions.jsonl");
  const key = randomBytes(32);
  const store = new EncryptedSubmissionStore(path, key);
  const record = { reference: "MC-PRIVATE", submission: { details: "private details" } };
  await Promise.all([store.save(record), store.save({ ...record, reference: "MC-SECOND" })]);

  const lines = (await readFile(path, "utf8")).trim().split("\n");
  assert.equal(lines.length, 2);
  assert.doesNotMatch(lines.join(""), /private details|MC-PRIVATE/);
  const envelope = JSON.parse(lines[0]);
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(envelope.iv, "base64"));
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(envelope.ciphertext, "base64")),
    decipher.final(),
  ]).toString("utf8");
  assert.deepEqual(JSON.parse(plaintext), record);
});

test("encryption keys must be canonical base64 for exactly 32 bytes", () => {
  const encoded = randomBytes(32).toString("base64");
  assert.equal(encryptionKeyFromBase64(encoded).length, 32);
  assert.throws(() => encryptionKeyFromBase64("not-a-key"), /32-byte key/);
  assert.equal(encryptionKeyFromBase64(undefined), null);
});
