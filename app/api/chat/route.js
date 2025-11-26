import { siteContentForAI } from "@/data/siteContent";

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || message.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Message is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key is not configured." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const websiteData = siteContentForAI;

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
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
`,
        },
        {
          role: "system",
          content:
            "Here is structured data about Sammie's website. Use it as factual context, not as phrasing to copy.",
        },
        {
          role: "system",
          content: JSON.stringify(websiteData),
        },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      top_p: 0.9,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenAI API error:", response.status, errorBody);
      return new Response(
        JSON.stringify({ error: "Failed to fetch AI response." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const aiMessage =
      data?.choices?.[0]?.message?.content?.trim() ??
      "I'm sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply: aiMessage }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat endpoint error:", error);
    return new Response(JSON.stringify({ error: "Unexpected server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
