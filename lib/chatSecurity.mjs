import { createHash } from "node:crypto";

export const MAX_BODY_BYTES = 8_192;
export const MAX_MESSAGE_CHARS = 600;
export const MAX_REPLY_CHARS = 1_200;

export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 8;
export const RATE_LIMIT_BLOCK_MS = 10 * 60_000;

const RATE_LIMIT_STORE_TTL_MS = RATE_LIMIT_WINDOW_MS + RATE_LIMIT_BLOCK_MS;

function getRateLimitStore() {
  if (!globalThis.__chatRateLimitStore) {
    globalThis.__chatRateLimitStore = new Map();
  }
  return globalThis.__chatRateLimitStore;
}

function sanitizeKeyPart(value, fallback = "unknown") {
  if (!value || typeof value !== "string") return fallback;
  return value.slice(0, 200);
}

export function getClientIp(headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp.slice(0, 64);
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.slice(0, 64);

  const cloudflareIp = headers.get("cf-connecting-ip");
  if (cloudflareIp) return cloudflareIp.slice(0, 64);

  return "unknown";
}

export function makeClientKey(headers) {
  const ip = sanitizeKeyPart(getClientIp(headers), "unknown");
  const userAgent = sanitizeKeyPart(headers.get("user-agent"), "unknown");
  return createHash("sha256").update(`${ip}|${userAgent}`).digest("hex");
}

export function validateRequestEnvelope(headers) {
  const contentType = headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return {
      status: 415,
      error: "Content-Type must be application/json.",
    };
  }

  const contentLength = headers.get("content-length");
  if (contentLength) {
    const bytes = Number(contentLength);
    if (Number.isFinite(bytes) && bytes > MAX_BODY_BYTES) {
      return {
        status: 413,
        error: "Request body is too large.",
      };
    }
  }

  return null;
}

export function parseAndValidateMessage(rawBody) {
  if (typeof rawBody !== "string") {
    return { ok: false, status: 400, error: "Invalid request body." };
  }

  if (rawBody.length === 0) {
    return { ok: false, status: 400, error: "Request body is required." };
  }

  const bodyBytes = new TextEncoder().encode(rawBody).length;
  if (bodyBytes > MAX_BODY_BYTES) {
    return { ok: false, status: 413, error: "Request body is too large." };
  }

  let parsed;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return { ok: false, status: 400, error: "Malformed JSON body." };
  }

  if (!parsed || typeof parsed !== "object") {
    return { ok: false, status: 400, error: "Invalid JSON payload." };
  }

  if (typeof parsed.message !== "string") {
    return { ok: false, status: 400, error: "Message must be a string." };
  }

  const message = parsed.message.trim();
  if (message.length === 0) {
    return { ok: false, status: 400, error: "Message is required." };
  }

  if (message.length > MAX_MESSAGE_CHARS) {
    return {
      ok: false,
      status: 413,
      error: `Message is too long. Max ${MAX_MESSAGE_CHARS} characters.`,
    };
  }

  return { ok: true, message };
}

export function isSameOriginRequest(headers) {
  const origin = headers.get("origin");
  if (!origin) return true;

  const secFetchSite = (headers.get("sec-fetch-site") ?? "").toLowerCase();
  if (secFetchSite && !["same-origin", "same-site", "none"].includes(secFetchSite)) {
    return false;
  }

  const hostHeader = headers.get("x-forwarded-host") ?? headers.get("host");
  if (!hostHeader) return false;

  const expectedHost = hostHeader.split(",")[0]?.trim();
  if (!expectedHost) return false;

  try {
    return new URL(origin).host === expectedHost;
  } catch {
    return false;
  }
}

export function enforceRateLimit(headers, now = Date.now()) {
  const store = getRateLimitStore();
  const key = makeClientKey(headers);
  const existing = store.get(key);
  const entry =
    existing ??
    ({
      requestCount: 0,
      windowStartMs: now,
      blockedUntilMs: 0,
      updatedAtMs: now,
    });

  if (entry.blockedUntilMs > now) {
    return {
      allowed: false,
      limit: RATE_LIMIT_MAX_REQUESTS,
      remaining: 0,
      retryAfterSeconds: Math.ceil((entry.blockedUntilMs - now) / 1_000),
      resetSeconds: Math.ceil((entry.blockedUntilMs - now) / 1_000),
    };
  }

  if (now - entry.windowStartMs >= RATE_LIMIT_WINDOW_MS) {
    entry.windowStartMs = now;
    entry.requestCount = 0;
    entry.blockedUntilMs = 0;
  }

  entry.requestCount += 1;
  entry.updatedAtMs = now;

  if (entry.requestCount > RATE_LIMIT_MAX_REQUESTS) {
    entry.blockedUntilMs = now + RATE_LIMIT_BLOCK_MS;
    store.set(key, entry);
    cleanupRateLimitStore(now);
    return {
      allowed: false,
      limit: RATE_LIMIT_MAX_REQUESTS,
      remaining: 0,
      retryAfterSeconds: Math.ceil(RATE_LIMIT_BLOCK_MS / 1_000),
      resetSeconds: Math.ceil(RATE_LIMIT_BLOCK_MS / 1_000),
    };
  }

  store.set(key, entry);
  cleanupRateLimitStore(now);

  const resetInSeconds = Math.max(
    0,
    Math.ceil((entry.windowStartMs + RATE_LIMIT_WINDOW_MS - now) / 1_000)
  );

  return {
    allowed: true,
    limit: RATE_LIMIT_MAX_REQUESTS,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - entry.requestCount),
    resetSeconds: resetInSeconds,
  };
}

export function cleanupRateLimitStore(now = Date.now()) {
  const store = getRateLimitStore();
  for (const [key, entry] of store.entries()) {
    if (now - entry.updatedAtMs > RATE_LIMIT_STORE_TTL_MS) {
      store.delete(key);
    }
  }
}

export function resetRateLimitStore() {
  const store = getRateLimitStore();
  store.clear();
}

export function normalizeAiReply(value) {
  if (typeof value !== "string") {
    return "I'm sorry, I couldn't generate a response.";
  }

  const sanitized = value.replaceAll("\u0000", "").trim();
  if (!sanitized) {
    return "I'm sorry, I couldn't generate a response.";
  }

  if (sanitized.length <= MAX_REPLY_CHARS) {
    return sanitized;
  }

  return `${sanitized.slice(0, MAX_REPLY_CHARS)}…`;
}
