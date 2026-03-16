import test from "node:test";
import assert from "node:assert/strict";
import {
  MAX_MESSAGE_CHARS,
  RATE_LIMIT_MAX_REQUESTS,
  enforceRateLimit,
  isSameOriginRequest,
  parseAndValidateMessage,
  resetRateLimitStore,
  validateRequestEnvelope,
} from "../lib/chatSecurity.mjs";

test("validateRequestEnvelope rejects non-json requests", () => {
  const headers = new Headers({ "content-type": "text/plain" });
  const result = validateRequestEnvelope(headers);
  assert.equal(result?.status, 415);
});

test("parseAndValidateMessage validates and trims message", () => {
  const result = parseAndValidateMessage('{"message":"   hello there   "}');
  assert.equal(result.ok, true);
  assert.equal(result.message, "hello there");
});

test("parseAndValidateMessage rejects oversized message", () => {
  const message = "x".repeat(MAX_MESSAGE_CHARS + 1);
  const result = parseAndValidateMessage(JSON.stringify({ message }));
  assert.equal(result.ok, false);
  assert.equal(result.status, 413);
});

test("isSameOriginRequest blocks cross-origin browser requests", () => {
  const headers = new Headers({
    origin: "https://evil.example",
    host: "portfolio.example",
    "sec-fetch-site": "cross-site",
  });
  assert.equal(isSameOriginRequest(headers), false);
});

test("enforceRateLimit blocks after configured request burst", () => {
  resetRateLimitStore();
  const headers = new Headers({
    "x-forwarded-for": "203.0.113.9",
    "user-agent": "test-agent",
  });

  let result;
  for (let i = 0; i < RATE_LIMIT_MAX_REQUESTS; i += 1) {
    result = enforceRateLimit(headers, 1_000);
    assert.equal(result.allowed, true);
  }

  result = enforceRateLimit(headers, 1_000);
  assert.equal(result.allowed, false);
  assert.ok(result.retryAfterSeconds > 0);
});
