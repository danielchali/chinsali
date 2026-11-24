import { randomBytes } from "node:crypto";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer as createHttpServer } from "node:http";
import { extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const MAX_BODY_BYTES = 16 * 1024;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 12;
const USSD_SESSION_TTL_MS = 5 * 60 * 1000;
const MAX_USSD_SESSIONS = 5000;
const USSD_CATEGORIES = ["Water problems", "Roads and potholes", "Waste management", "Streetlights", "Other concern"];
const USSD_WARDS = ["Chinsali Central", "Mwika", "Lubwa", "Mulilansolo", "Kabanda", "Other"];

const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
]);

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(value));
}

async function readBody(request) {
  const contentType = request.headers["content-type"]?.split(";", 1)[0].trim().toLowerCase();
  const chunks = [];
  let bytes = 0;
  for await (const chunk of request) {
    bytes += chunk.length;
    if (bytes > MAX_BODY_BYTES) {
      throw new HttpError(413, "The request is too large.");
    }
    chunks.push(chunk);
  }
  return { contentType, body: Buffer.concat(chunks).toString("utf8") };
}

function parseJsonObject(body) {
  try {
    const value = JSON.parse(body);
    if (!value || Array.isArray(value) || typeof value !== "object") {
      throw new Error("Expected an object.");
    }
    return value;
  } catch {
    throw new HttpError(400, "The request body must be a JSON object.");
  }
}

async function readJson(request) {
  const { contentType, body } = await readBody(request);
  if (contentType !== "application/json") {
    throw new HttpError(415, "Send the request as JSON.");
  }
  return parseJsonObject(body);
}

async function readUssdPayload(request) {
  const { contentType, body } = await readBody(request);
  if (contentType === "application/json") return parseJsonObject(body);
  if (contentType === "application/x-www-form-urlencoded") {
    return Object.fromEntries(new URLSearchParams(body));
  }
  throw new HttpError(415, "Send USSD requests as form data or JSON.");
}

function boundedText(value, field, maxLength, { required = false, minLength = 1 } = {}) {
  if (value == null && !required) return "";
  if (typeof value !== "string") {
    throw new HttpError(400, `${field} must be text.`);
  }
  const text = value.trim();
  if ((!text && required) || (text && text.length < minLength) || text.length > maxLength) {
    throw new HttpError(400, `${field} must be ${minLength}-${maxLength} characters.`);
  }
  return text;
}

function validateSubmission(input) {
  const kinds = new Set(["issue", "feedback", "service", "proposal", "community-feedback"]);
  const kind = boundedText(input.kind, "kind", 32, { required: true });
  if (!kinds.has(kind)) {
    throw new HttpError(400, "This submission type is not supported.");
  }

  const title = boundedText(input.title, "title", 200, { minLength: 3 });
  const details = boundedText(input.details, "details", 4000, { required: true, minLength: 10 });
  const ward = boundedText(input.ward, "ward", 100);
  const category = boundedText(input.category, "category", 100);
  const anonymous = input.anonymous === true;
  const phone = anonymous ? "" : boundedText(input.phone, "phone", 40);
  const contact = boundedText(input.contact, "contact", 200);

  if (phone && !/^[+()\d\s-]{7,40}$/.test(phone)) {
    throw new HttpError(400, "phone must be a valid phone number.");
  }
  if (kind === "proposal" && title.length < 5) {
    throw new HttpError(400, "A proposal title must be at least 5 characters.");
  }
  return { kind, title, details, ward, category, phone, contact, anonymous };
}

function createRateLimiter({ limit = RATE_LIMIT, windowMs = RATE_WINDOW_MS, now = Date.now } = {}) {
  const requests = new Map();
  return (key) => {
    const currentTime = now();
    for (const [requestKey, timestamps] of requests) {
      const active = timestamps.filter((timestamp) => currentTime - timestamp < windowMs);
      if (active.length) requests.set(requestKey, active);
      else requests.delete(requestKey);
    }
    const recent = (requests.get(key) ?? []).filter((timestamp) => currentTime - timestamp < windowMs);
    if (recent.length >= limit) {
      requests.set(key, recent);
      return false;
    }
    recent.push(currentTime);
    requests.set(key, recent);
    return true;
  };
}

async function serveStatic(request, response, pathname, webRoot) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    sendJson(response, 400, { error: "Invalid path." });
    return;
  }
  const isAsset = decodedPath.startsWith("/assets/");
  const allowedFile = new Set(["/", "/index.html", "/main.js", "/styles.css", "/ASSET-CREDITS.md"]);
  if (!isAsset && !allowedFile.has(decodedPath)) {
    sendJson(response, 404, { error: "Not found." });
    return;
  }
  const target = resolve(webRoot, `.${decodedPath === "/" ? "/index.html" : decodedPath}`);
  const pathFromRoot = relative(webRoot, target);
  const assetsRoot = resolve(webRoot, "assets");
  const pathFromAssets = relative(assetsRoot, target);
  if (
    pathFromRoot === ".."
    || pathFromRoot.startsWith(`..${sep}`)
    || pathFromRoot.startsWith(sep)
    || (isAsset && (pathFromAssets === ".." || pathFromAssets.startsWith(`..${sep}`) || pathFromAssets.startsWith(sep)))
  ) {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  try {
    if (!(await stat(target)).isFile()) {
      sendJson(response, 404, { error: "Not found." });
      return;
    }
  } catch {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  response.writeHead(200, {
    "Cache-Control": "no-cache",
    "Content-Type": MIME_TYPES.get(extname(target).toLowerCase()) ?? "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
  });
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  createReadStream(target).pipe(response);
}

function makeCastVote(voteConfig, fetchImpl) {
  return async (pollId, optionId) => {
    const { url, anonKey, pollParam = "poll_id", optionParam = "option_id" } = voteConfig;
    if (!url || !anonKey) {
      throw new HttpError(503, "Online voting is not configured.");
    }
    let projectUrl;
    try {
      projectUrl = new URL(url);
    } catch {
      throw new HttpError(503, "Online voting is not configured correctly.");
    }
    const isLoopback = ["localhost", "127.0.0.1", "::1"].includes(projectUrl.hostname);
    if (projectUrl.protocol !== "https:" && !(projectUrl.protocol === "http:" && isLoopback)) {
      throw new HttpError(503, "The voting service must use HTTPS.");
    }
    let result;
    try {
      const endpoint = new URL("/rest/v1/rpc/cast_vote", projectUrl);
      result = await fetchImpl(endpoint, {
        method: "POST",
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [pollParam]: pollId, [optionParam]: optionId }),
      });
    } catch {
      throw new HttpError(502, "The vote service is unavailable. Please try again later.");
    }
    if (!result.ok) {
      throw new HttpError(502, "The vote could not be recorded. Please try again later.");
    }
    return { accepted: true };
  };
}

function ussdReply(response, message) {
  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(message);
}

function ussdCategoryMenu(message = "") {
  return `CON ${message ? `${message}\n` : ""}Choose an issue:\n${USSD_CATEGORIES.map((item, index) => `${index + 1}. ${item}`).join("\n")}`;
}

function ussdWardMenu(message = "") {
  return `CON ${message ? `${message}\n` : ""}Choose your ward:\n${USSD_WARDS.map((item, index) => `${index + 1}. ${item}`).join("\n")}`;
}

function normalizeServiceCode(value) {
  return value.trim().replace(/#$/, "");
}

async function handleUssd(payload, {
  sessions,
  submissionsStore,
  serviceCode,
  now,
}) {
  const sessionId = boundedText(payload.sessionId, "sessionId", 160, { required: true });
  const suppliedCode = boundedText(payload.serviceCode, "serviceCode", 80, { required: true });
  if (normalizeServiceCode(suppliedCode) !== normalizeServiceCode(serviceCode)) {
    return "END This service code is not recognized.";
  }

  const text = boundedText(payload.text ?? "", "text", 2000);
  const input = text.split("*").at(-1)?.trim() ?? "";
  const currentTime = now();
  for (const [id, session] of sessions) {
    if (session.expiresAt <= currentTime) sessions.delete(id);
  }

  let session = sessions.get(sessionId);
  if (!session) {
    if (sessions.size >= MAX_USSD_SESSIONS) return "END The service is busy. Please try again later.";
    session = { step: "menu", expiresAt: currentTime + USSD_SESSION_TTL_MS };
  }
  session.expiresAt = currentTime + USSD_SESSION_TTL_MS;

  if (input === "0") {
    sessions.delete(sessionId);
    return "END Thank you for using My Chinsali.";
  }

  if (session.step === "menu") {
    if (!input) {
      sessions.set(sessionId, session);
      return "CON Welcome to My Chinsali\n1. Report an issue\n2. Find a public service\n3. Project updates\n0. Exit";
    }
    if (input === "1") {
      session.step = "category";
      sessions.set(sessionId, session);
      return ussdCategoryMenu();
    }
    sessions.delete(sessionId);
    if (input === "2") return "END Visit the My Chinsali service directory or ask at the Civic Centre for current service contacts.";
    if (input === "3") return "END Project updates are available in the My Chinsali development tracker. Reference lookup is not available by USSD yet.";
    return "END Invalid option. Please dial the service code again.";
  }

  if (session.step === "category") {
    const category = USSD_CATEGORIES[Number(input) - 1];
    if (!category) {
      sessions.set(sessionId, session);
      return ussdCategoryMenu("Invalid option.");
    }
    session.category = category;
    session.step = "ward";
    sessions.set(sessionId, session);
    return ussdWardMenu();
  }

  if (session.step === "ward") {
    const ward = USSD_WARDS[Number(input) - 1];
    if (!ward) {
      sessions.set(sessionId, session);
      return ussdWardMenu("Invalid option.");
    }
    session.ward = ward;
    session.step = "location";
    sessions.set(sessionId, session);
    return "CON Enter a nearby landmark or location (2-100 characters):";
  }

  if (session.step === "location") {
    if (input.length < 2 || input.length > 100) {
      sessions.set(sessionId, session);
      return "CON Location must be 2-100 characters. Enter a nearby landmark or location:";
    }
    session.location = input;
    session.step = "details";
    sessions.set(sessionId, session);
    return "CON Briefly describe the issue (10-400 characters):";
  }

  if (session.step === "details") {
    if (input.length < 10 || input.length > 400) {
      sessions.set(sessionId, session);
      return "CON Description must be 10-400 characters. Briefly describe the issue:";
    }
    if (!submissionsStore) {
      sessions.delete(sessionId);
      return "END Issue reporting is temporarily unavailable. Please try again later.";
    }

    const reference = `MC-${randomBytes(10).toString("hex").toUpperCase()}`;
    await submissionsStore.save({
      reference,
      receivedAt: new Date(currentTime).toISOString(),
      submission: {
        kind: "issue",
        title: "",
        details: `Location: ${session.location}. ${input}`,
        ward: session.ward,
        category: session.category,
        phone: "",
        contact: "",
        anonymous: true,
        channel: "ussd",
      },
    });
    sessions.delete(sessionId);
    return `END Report received. Reference: ${reference}.`;
  }

  sessions.delete(sessionId);
  return "END This session has expired. Please dial the service code again.";
}

export function createAppServer({
  submissionsStore = null,
  voteConfig = {},
  ussdServiceCode = "*388*133#",
  fetchImpl = globalThis.fetch,
  webRoot = ROOT,
  rateLimit = RATE_LIMIT,
  rateWindowMs = RATE_WINDOW_MS,
  now,
} = {}) {
  const allowWrite = createRateLimiter({ limit: rateLimit, windowMs: rateWindowMs, now });
  const castVote = makeCastVote(voteConfig, fetchImpl);
  const ussdSessions = new Map();
  const clock = now ?? Date.now;

  return createHttpServer(async (request, response) => {
    const url = new URL(request.url ?? "/", "http://localhost");
    try {
      if (url.pathname === "/api/health") {
        if (request.method !== "GET") {
          sendJson(response, 405, { error: "Method not allowed." });
          return;
        }
        sendJson(response, 200, { status: "ok", submissions: Boolean(submissionsStore), voting: Boolean(voteConfig.url && voteConfig.anonKey), ussd: Boolean(submissionsStore) });
        return;
      }

      if (url.pathname === "/api/ussd") {
        if (request.method !== "POST") {
          ussdReply(response, "END This endpoint accepts POST requests only.");
          return;
        }
        try {
          const input = await readUssdPayload(request);
          const sessionId = boundedText(input.sessionId, "sessionId", 160, { required: true });
          if (!allowWrite(`ussd:${sessionId}`)) {
            ussdReply(response, "END Too many requests. Please try again later.");
            return;
          }
          const result = await handleUssd(input, {
            sessions: ussdSessions,
            submissionsStore,
            serviceCode: ussdServiceCode,
            now: clock,
          });
          ussdReply(response, result);
        } catch (error) {
          if (error instanceof HttpError) {
            ussdReply(response, `END ${error.message}`);
            return;
          }
          console.error("USSD request failed.");
          ussdReply(response, "END The service is temporarily unavailable. Please try again later.");
        }
        return;
      }

      if (url.pathname === "/api/submissions") {
        if (request.method !== "POST") {
          sendJson(response, 405, { error: "Submissions are accepted by POST only." });
          return;
        }
        if (!allowWrite(`submission:${request.socket.remoteAddress}`)) {
          sendJson(response, 429, { error: "Too many submissions. Please try again later." });
          return;
        }
        if (!submissionsStore) {
          throw new HttpError(503, "Encrypted submission storage is not configured.");
        }
        const submission = validateSubmission(await readJson(request));
        const reference = `${submission.kind === "proposal" ? "PROP" : "MC"}-${randomBytes(10).toString("hex").toUpperCase()}`;
        await submissionsStore.save({ reference, receivedAt: new Date().toISOString(), submission });
        sendJson(response, 201, { reference, status: "received" });
        return;
      }

      if (url.pathname === "/api/votes") {
        if (request.method !== "POST") {
          sendJson(response, 405, { error: "Votes are accepted by POST only." });
          return;
        }
        if (!allowWrite(`vote:${request.socket.remoteAddress}`)) {
          sendJson(response, 429, { error: "Too many votes. Please try again later." });
          return;
        }
        const input = await readJson(request);
        const pollId = boundedText(input.pollId, "pollId", 100, { required: true });
        const optionId = boundedText(input.optionId, "optionId", 100, { required: true });
        sendJson(response, 200, await castVote(pollId, optionId));
        return;
      }

      if (url.pathname.startsWith("/api/")) {
        sendJson(response, 404, { error: "Not found." });
        return;
      }
      await serveStatic(request, response, url.pathname, webRoot);
    } catch (error) {
      if (error instanceof HttpError) {
        sendJson(response, error.status, { error: error.message });
        return;
      }
      console.error("Backend request failed:", error instanceof Error ? error.message : "Unknown error");
      sendJson(response, 500, { error: "The request could not be completed." });
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { EncryptedSubmissionStore, encryptionKeyFromBase64 } = await import("./storage.mjs");
  const port = Number(process.env.PORT ?? 3000);
  const key = encryptionKeyFromBase64(process.env.SUBMISSION_ENCRYPTION_KEY);
  const submissionsStore = key
    ? new EncryptedSubmissionStore(resolve(ROOT, "backend/data/submissions.jsonl"), key)
    : null;
  const server = createAppServer({
    submissionsStore,
    voteConfig: {
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY,
      pollParam: process.env.CAST_VOTE_POLL_PARAM,
      optionParam: process.env.CAST_VOTE_OPTION_PARAM,
    },
    ussdServiceCode: process.env.USSD_SERVICE_CODE ?? "*388*133#",
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`My Chinsali backend listening at http://127.0.0.1:${port}`);
    if (!submissionsStore) console.warn("Resident submissions disabled: set SUBMISSION_ENCRYPTION_KEY.");
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.warn("Online voting disabled: configure SUPABASE_URL and SUPABASE_ANON_KEY.");
    }
  });
}
