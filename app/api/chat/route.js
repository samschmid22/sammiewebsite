import { siteContentForAI } from "@/data/siteContent";
import {
  enforceRateLimit,
  isSameOriginRequest,
  normalizeAiReply,
  parseAndValidateMessage,
  validateRequestEnvelope,
} from "@/lib/chatSecurity.mjs";

export const runtime = "nodejs";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-4o-mini";
const OPENAI_TIMEOUT_MS = 15_000;
const OPENAI_MAX_TOKENS = 220;

const SYSTEM_PROMPT = `
You are "Sammie's AI Assistant" — a confident, clear, slightly bold but warm voice that speaks like a real person, not a corporate bio.

Your job:
- Use Sammie's website content as true factual data.
- Then synthesize it into new, natural language answers.
- Do NOT copy sentences or long phrases verbatim from the site.
- Always sound like a smart, observant friend who knows Sammie very well.

Tone guidelines:
- Confident, intelligent, a little playful.
- No filler clichés like "in today's fast-paced world" or "at the end of the day".
- Vary sentence length so it feels human: some short, some longer.
- Prefer concrete details over vague buzzwords.

How to use the website data:
- Treat the JSON/strings you receive about Sammie's bio, life resume, projects, and skills as a knowledge base.
- When answering a question, first decide which 2–4 facts from that data are most relevant.
- Combine those facts into a short, insightful summary in your own words.
- You may connect patterns and infer themes (e.g., "she consistently builds systems that turn chaos into structure") but base them on the data.

Answer style:
- Usually 2–5 sentences unless the user asks for more depth.
- No bullet lists unless requested.
- Speak in third person when the user says "Sammie", and in first person ("I") if the question is clearly meant to sound like Sammie herself is answering.
- If something is not in the website data, say so briefly and then give a reasonable, clearly labeled guess or suggestion.

Absolutely avoid:
- Placeholder text like [insert job title] or [insert company name].
- Copying full sentences from the website content.
- Over-explaining; keep it tight and focused.
`;

const WEBSITE_DATA_PROMPT =
  "Here is structured data about Sammie's website. Use it as factual context, not as phrasing to copy.";

const WEBSITE_DATA_JSON = JSON.stringify(siteContentForAI);

function jsonResponse(body, status, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function rateLimitHeaders(rateLimit) {
  return {
    "X-RateLimit-Limit": String(rateLimit.limit),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(rateLimit.resetSeconds),
  };
}

async function fetchOpenAI(apiKey, payload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  try {
    return await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function POST(request) {
  let headers = {};

  try {
    if (!isSameOriginRequest(request.headers)) {
      return jsonResponse({ error: "Cross-origin requests are not allowed." }, 403);
    }

    const rateLimit = enforceRateLimit(request.headers);
    headers = rateLimitHeaders(rateLimit);

    if (!rateLimit.allowed) {
      return jsonResponse(
        { error: "Too many requests. Please wait before trying again." },
        429,
        {
          ...headers,
          "Retry-After": String(rateLimit.retryAfterSeconds),
        }
      );
    }

    const envelopeError = validateRequestEnvelope(request.headers);
    if (envelopeError) {
      return jsonResponse({ error: envelopeError.error }, envelopeError.status, headers);
    }

    let rawBody = "";
    try {
      rawBody = await request.text();
    } catch {
      return jsonResponse({ error: "Unable to read request body." }, 400, headers);
    }

    const parsed = parseAndValidateMessage(rawBody);
    if (!parsed.ok) {
      return jsonResponse({ error: parsed.error }, parsed.status, headers);
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY is not configured on the server.");
      return jsonResponse({ error: "AI assistant is not configured." }, 500, headers);
    }

    const payload = {
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "system", content: WEBSITE_DATA_PROMPT },
        { role: "system", content: WEBSITE_DATA_JSON },
        { role: "user", content: parsed.message },
      ],
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: OPENAI_MAX_TOKENS,
    };

    let response;
    try {
      response = await fetchOpenAI(apiKey, payload);
    } catch (error) {
      if (error && typeof error === "object" && error.name === "AbortError") {
        return jsonResponse(
          { error: "The assistant timed out. Please try again." },
          504,
          headers
        );
      }

      console.error("OpenAI network failure.", {
        errorName: error instanceof Error ? error.name : "UnknownError",
      });
      return jsonResponse(
        { error: "AI service is temporarily unavailable." },
        503,
        headers
      );
    }

    if (!response.ok) {
      console.error("OpenAI API error.", {
        status: response.status,
        requestId: response.headers.get("x-request-id") ?? "n/a",
      });

      if (response.status === 429) {
        return jsonResponse(
          { error: "Assistant is busy. Please retry shortly." },
          503,
          { ...headers, "Retry-After": "20" }
        );
      }

      if (response.status === 401 || response.status === 403) {
        return jsonResponse({ error: "AI assistant is unavailable." }, 503, headers);
      }

      return jsonResponse({ error: "Failed to fetch AI response." }, 502, headers);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      console.error("OpenAI response JSON parse failed.");
      return jsonResponse({ error: "Invalid AI service response." }, 502, headers);
    }

    const aiMessage = normalizeAiReply(data?.choices?.[0]?.message?.content);
    return jsonResponse({ reply: aiMessage }, 200, headers);
  } catch (error) {
    console.error("Chat endpoint error.", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return jsonResponse({ error: "Unexpected server error." }, 500, headers);
  }
}
