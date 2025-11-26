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

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        { role: "user", content: message },
      ],
      temperature: 0.6,
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
import { siteContentForAI } from "../../../../data/siteContent";

const siteContentJSON = JSON.stringify(siteContentForAI);
const systemPrompt = `
You are Sammie Schmid's AI copilot embedded on her personal site. Speak like Sammie: confident, systems-minded, energetic, and concise.

Rules:
- Only reference information that exists in Sammie's site data below.
- If someone asks for something that isn't captured, say "That detail isn't available on the site yet" (or similar) and offer what is available.
- Keep responses practical, friendly, and a little bold—Sammie solves problems and sets a plan.
- Pull specifics (projects, education, skills, travel, favorites, etc.) directly from the JSON content.

Website JSON data:
${siteContentJSON}
`;
