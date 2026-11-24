import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer as createHttpServer } from "node:http";
import { extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { LocalContentStore } from "./content-store.mjs";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const MAX_BODY_BYTES = 16 * 1024;
const MAX_UPLOAD_BYTES = 7 * 1024 * 1024;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 12;
const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const CONTENT_COLLECTIONS = new Set(["news", "gallery", "polls"]);
const NEWS_TYPES = new Set(["notice", "update", "event", "opportunity"]);
const GALLERY_CATEGORIES = new Set(["Heritage", "Nature", "Town life", "Food and markets", "Community life"]);
const IMAGE_TYPES = new Map([
  ["image/jpeg", { extension: "jpg", contentType: "image/jpeg" }],
  ["image/png", { extension: "png", contentType: "image/png" }],
  ["image/webp", { extension: "webp", contentType: "image/webp" }],
]);
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

async function readBody(request, maxBytes = MAX_BODY_BYTES) {
  const contentType = request.headers["content-type"]?.split(";", 1)[0].trim().toLowerCase();
  const chunks = [];
  let bytes = 0;
  for await (const chunk of request) {
    bytes += chunk.length;
    if (bytes > maxBytes) {
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

async function readJson(request, maxBytes = MAX_BODY_BYTES) {
  const { contentType, body } = await readBody(request, maxBytes);
  if (contentType !== "application/json") {
    throw new HttpError(415, "Send the request as JSON.");
  }
  return parseJsonObject(body);
}

function validateImagePath(value, existing = "") {
  if (value == null || value === "") return existing;
  const imagePath = boundedText(value, "image", 80, { required: true });
  if (!/^\/api\/media\/[\da-f-]{36}\.(?:jpg|png|webp)$/.test(imagePath)) {
    throw new HttpError(400, "Choose an image uploaded through the staff portal.");
  }
  return imagePath;
}

function validateContentRecord(collection, input, existing = null) {
  const id = existing?.id ?? randomUUID();
  const createdAt = existing?.createdAt ?? new Date().toISOString();
  if (collection === "news") {
    const type = boundedText(input.type, "type", 20, { required: true });
    if (!NEWS_TYPES.has(type)) throw new HttpError(400, "Choose a supported news type.");
    const status = boundedText(input.status, "status", 16, { required: true });
    if (!["draft", "published"].includes(status)) throw new HttpError(400, "Choose draft or published status.");
    const image = validateImagePath(input.image, existing?.image ?? "");
    const imageAlt = boundedText(input.imageAlt, "imageAlt", 240);
    if (image && imageAlt.length < 5) throw new HttpError(400, "Add image description text for the attached news photo.");
    return {
      id,
      createdAt,
      title: boundedText(input.title, "title", 140, { required: true, minLength: 3 }),
      excerpt: boundedText(input.excerpt, "excerpt", 800, { required: true, minLength: 10 }),
      date: boundedText(input.date, "date", 40, { required: true }),
      tag: boundedText(input.tag, "tag", 40, { required: true }),
      type,
      status,
      image,
      imageAlt,
    };
  }
  if (collection === "gallery") {
    const category = boundedText(input.category, "category", 40, { required: true });
    if (!GALLERY_CATEGORIES.has(category)) throw new HttpError(400, "Choose a supported gallery category.");
    const status = boundedText(input.status, "status", 16, { required: true });
    if (!["draft", "published"].includes(status)) throw new HttpError(400, "Choose draft or published status.");
    return {
      id,
      createdAt,
      title: boundedText(input.title, "title", 140, { required: true, minLength: 3 }),
      description: boundedText(input.description, "description", 800, { required: true, minLength: 10 }),
      category,
      alt: boundedText(input.alt, "alt", 240, { required: true, minLength: 5 }),
      source: boundedText(input.source, "source", 200, { required: true, minLength: 2 }),
      status,
      image: validateImagePath(input.image, existing?.image ?? ""),
    };
  }
  if (collection === "polls") {
    const question = boundedText(input.question, "question", 240, { required: true, minLength: 10 });
    const closes = boundedText(input.closes, "closes", 10, { required: true });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(closes) || Number.isNaN(Date.parse(`${closes}T00:00:00Z`))) {
      throw new HttpError(400, "Choose a valid poll closing date.");
    }
    if (!Array.isArray(input.options) || input.options.length < 2 || input.options.length > 6) {
      throw new HttpError(400, "A poll needs between 2 and 6 options.");
    }
    const labels = input.options.map((option) => boundedText(option, "option", 120, { required: true, minLength: 2 }));
    if (new Set(labels.map((label) => label.toLowerCase())).size !== labels.length) {
      throw new HttpError(400, "Poll options must be unique.");
    }
    return { id, createdAt, question, closes, options: labels, status: "draft" };
  }
  throw new HttpError(404, "Content collection not found.");
}

function cookieValue(request, name) {
  const cookies = request.headers.cookie?.split(";") ?? [];
  for (const cookie of cookies) {
    const separator = cookie.indexOf("=");
    if (separator >= 0 && cookie.slice(0, separator).trim() === name) return cookie.slice(separator + 1).trim();
  }
  return "";
}

function sameOriginRequest(request) {
  const origin = request.headers.origin;
  const host = request.headers.host;
  if (typeof origin !== "string" || typeof host !== "string") return false;
  try {
    const parsed = new URL(origin);
    return ["http:", "https:"].includes(parsed.protocol) && parsed.host === host;
  } catch {
    return false;
  }
}

function passwordMatches(supplied, expected) {
  const suppliedHash = createHash("sha256").update(supplied).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(suppliedHash, expectedHash);
}

function matchesImageSignature(buffer, contentType) {
  if (contentType === "image/jpeg") return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (contentType === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (contentType === "image/webp") return buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
  return false;
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
  const allowedFile = new Set(["/", "/admin", "/login", "/index.html", "/main.js", "/styles.css", "/ASSET-CREDITS.md"]);
  if (!isAsset && !allowedFile.has(decodedPath)) {
    sendJson(response, 404, { error: "Not found." });
    return;
  }
  const target = resolve(webRoot, `.${["/", "/admin", "/login"].includes(decodedPath) ? "/index.html" : decodedPath}`);
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
  contentStore = null,
  adminUsername = "admin",
  adminPassword = "",
  secureAdminCookie = false,
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
  const adminSessions = new Map();
  const clock = now ?? Date.now;
  const adminCookie = (token, maxAge) => `my_chinsali_admin=${token}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=${maxAge}${secureAdminCookie ? "; Secure" : ""}`;
  const authenticatedAdmin = (request) => {
    const token = cookieValue(request, "my_chinsali_admin");
    const expiresAt = adminSessions.get(token);
    if (!token || !expiresAt) return false;
    if (expiresAt <= clock()) {
      adminSessions.delete(token);
      return false;
    }
    return true;
  };
  const requireAdmin = (request) => {
    if (!authenticatedAdmin(request)) throw new HttpError(401, "Sign in to use the staff portal.");
  };
  const requireAdminWrite = (request) => {
    requireAdmin(request);
    if (!sameOriginRequest(request)) throw new HttpError(403, "The request origin could not be verified.");
  };

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

      if (url.pathname === "/api/content/public") {
        if (request.method !== "GET") {
          sendJson(response, 405, { error: "Public content is read by GET only." });
          return;
        }
        if (!contentStore) throw new HttpError(503, "The content service is not configured.");
        sendJson(response, 200, await contentStore.publicContent());
        return;
      }

      if (url.pathname === "/api/admin/session") {
        if (request.method === "GET") {
          sendJson(response, 200, { authenticated: authenticatedAdmin(request) });
          return;
        }
        if (request.method === "POST") {
          if (!sameOriginRequest(request)) throw new HttpError(403, "The request origin could not be verified.");
          if (!allowWrite(`admin-login:${request.socket.remoteAddress}`)) {
            throw new HttpError(429, "Too many sign-in attempts. Please try again later.");
          }
          if (adminPassword.length < 12) {
            throw new HttpError(503, "Staff sign-in is not configured. Set ADMIN_PASSWORD to a strong password of at least 12 characters.");
          }
          const input = await readJson(request);
          const username = boundedText(input.username, "username", 64, { required: true });
          if (typeof input.password !== "string" || input.password.length < 12 || input.password.length > 256) {
            throw new HttpError(400, "password must be 12-256 characters.");
          }
          const password = input.password;
          if (!passwordMatches(username, adminUsername) || !passwordMatches(password, adminPassword)) {
            throw new HttpError(401, "The username or password was not accepted.");
          }
          const token = randomBytes(32).toString("base64url");
          adminSessions.set(token, clock() + ADMIN_SESSION_TTL_MS);
          response.setHeader("Set-Cookie", adminCookie(token, ADMIN_SESSION_TTL_MS / 1000));
          sendJson(response, 200, { authenticated: true });
          return;
        }
        if (request.method === "DELETE") {
          if (!sameOriginRequest(request)) throw new HttpError(403, "The request origin could not be verified.");
          adminSessions.delete(cookieValue(request, "my_chinsali_admin"));
          response.writeHead(204, {
            "Cache-Control": "no-store",
            "Set-Cookie": adminCookie("", 0),
            "X-Content-Type-Options": "nosniff",
          });
          response.end();
          return;
        }
        sendJson(response, 405, { error: "Method not allowed." });
        return;
      }

      if (url.pathname.startsWith("/api/admin/")) {
        requireAdmin(request);
        if (url.pathname === "/api/admin/overview" && request.method === "GET") {
          if (!contentStore) throw new HttpError(503, "The content service is not configured.");
          sendJson(response, 200, await contentStore.overview());
          return;
        }

        const contentMatch = url.pathname.match(/^\/api\/admin\/content\/(news|gallery|polls)(?:\/([\da-f-]{36}))?$/);
        if (contentMatch) {
          const [, collection, id] = contentMatch;
          if (!contentStore) throw new HttpError(503, "The content service is not configured.");
          if (request.method === "GET" && !id) {
            sendJson(response, 200, { items: await contentStore.list(collection) });
            return;
          }
          if (request.method === "POST" && !id) {
            requireAdminWrite(request);
            if (!allowWrite(`admin-content:${request.socket.remoteAddress}`)) throw new HttpError(429, "Too many changes. Please try again later.");
            const record = validateContentRecord(collection, await readJson(request));
            sendJson(response, 201, { item: await contentStore.create(collection, record) });
            return;
          }
          if (request.method === "PUT" && id) {
            requireAdminWrite(request);
            if (!allowWrite(`admin-content:${request.socket.remoteAddress}`)) throw new HttpError(429, "Too many changes. Please try again later.");
            const existing = (await contentStore.list(collection)).find((item) => item.id === id);
            if (!existing) throw new HttpError(404, "Content item not found.");
            const record = validateContentRecord(collection, await readJson(request), existing);
            sendJson(response, 200, { item: await contentStore.update(collection, id, record) });
            return;
          }
          if (request.method === "DELETE" && id) {
            requireAdminWrite(request);
            if (!allowWrite(`admin-content:${request.socket.remoteAddress}`)) throw new HttpError(429, "Too many changes. Please try again later.");
            if (!(await contentStore.remove(collection, id))) throw new HttpError(404, "Content item not found.");
            response.writeHead(204, { "Cache-Control": "no-store" });
            response.end();
            return;
          }
          sendJson(response, 405, { error: "Method not allowed." });
          return;
        }

        if (url.pathname === "/api/admin/uploads" && request.method === "POST") {
          requireAdminWrite(request);
          if (!contentStore) throw new HttpError(503, "The content service is not configured.");
          if (!allowWrite(`admin-upload:${request.socket.remoteAddress}`)) throw new HttpError(429, "Too many uploads. Please try again later.");
          const input = await readJson(request, MAX_UPLOAD_BYTES);
          const contentType = boundedText(input.contentType, "contentType", 40, { required: true });
          const imageType = IMAGE_TYPES.get(contentType);
          if (!imageType) throw new HttpError(415, "Upload a JPEG, PNG or WebP image.");
          const encoded = boundedText(input.data, "data", MAX_UPLOAD_BYTES, { required: true });
          if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded)) {
            throw new HttpError(400, "The image data is not valid base64.");
          }
          const image = Buffer.from(encoded, "base64");
          if (image.length > MAX_IMAGE_BYTES || image.toString("base64") !== encoded) {
            throw new HttpError(413, "Images must be 5 MB or smaller.");
          }
          if (!matchesImageSignature(image, contentType)) throw new HttpError(400, "The image contents do not match the selected file type.");
          const filename = `${randomUUID()}.${imageType.extension}`;
          await contentStore.saveUpload(filename, image);
          sendJson(response, 201, { image: `/api/media/${filename}` });
          return;
        }

        const uploadMatch = url.pathname.match(/^\/api\/admin\/uploads\/([\da-f-]{36}\.(?:jpg|png|webp))$/);
        if (uploadMatch && request.method === "DELETE") {
          requireAdminWrite(request);
          if (!contentStore) throw new HttpError(503, "The content service is not configured.");
          await contentStore.deleteUnusedUpload(uploadMatch[1]);
          response.writeHead(204, { "Cache-Control": "no-store" });
          response.end();
          return;
        }
        sendJson(response, 404, { error: "Not found." });
        return;
      }

      const mediaMatch = url.pathname.match(/^\/api\/media\/([\da-f-]{36}\.(?:jpg|png|webp))$/);
      if (mediaMatch) {
        if (request.method !== "GET" && request.method !== "HEAD") {
          sendJson(response, 405, { error: "Media is read by GET only." });
          return;
        }
        if (!contentStore) throw new HttpError(404, "Not found.");
        const isAdmin = authenticatedAdmin(request);
        const imagePath = url.pathname;
        if (!isAdmin && !(await contentStore.isPublishedImage(imagePath))) throw new HttpError(404, "Not found.");
        const image = await contentStore.readUpload(mediaMatch[1]);
        if (!image) throw new HttpError(404, "Not found.");
        const imageType = IMAGE_TYPES.get(`image/${mediaMatch[1].endsWith(".jpg") ? "jpeg" : mediaMatch[1].endsWith(".png") ? "png" : "webp"}`);
        response.writeHead(200, {
          "Cache-Control": isAdmin ? "private, no-store" : "public, max-age=300",
          "Content-Length": image.length,
          "Content-Type": imageType.contentType,
          "X-Content-Type-Options": "nosniff",
        });
        response.end(request.method === "HEAD" ? undefined : image);
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
    contentStore: new LocalContentStore(resolve(ROOT, "backend/data/content.json")),
    adminUsername: process.env.ADMIN_USERNAME ?? "admin",
    adminPassword: process.env.ADMIN_PASSWORD ?? "",
    secureAdminCookie: process.env.ADMIN_COOKIE_SECURE === "1",
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
    if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 12) {
      console.warn("Staff portal disabled: set ADMIN_PASSWORD to a strong password of at least 12 characters.");
    }
  });
}
