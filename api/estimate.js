import { checkOrigin, isRateLimited } from './_utils.js';

export const config = {
  runtime: 'edge',
};

export default async function POST(request) {
  try {
    // 1. Security: Origin Check
    if (!checkOrigin(request)) {
      return new Response(JSON.stringify({ error: "Unauthorized Origin" }), { status: 403, headers: { "Content-Type": "application/json" } });
    }

    // 2. Security: Rate Limiting
    const clientIp = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(clientIp)) {
      return new Response(JSON.stringify({ error: "you exceeded your limits..., try after a minute...." }), { status: 429, headers: { "Content-Type": "application/json" } });
    }

    const body = await request.json();
    const selections = body.selections;

    if (!selections || !Array.isArray(selections)) {
       return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Sanitize inputs (ensure they are strings and limited in length to prevent huge prompt injection)
    const s0 = String(selections[0] || "").slice(0, 100);
    const s1 = String(selections[1] || "").slice(0, 100);
    const s2 = String(selections[2] || "").slice(0, 100);

    const prompt = `
        You are the estimation engine for Vlyx Codes, a web agency in India.
        Client Requirements:
        - Business Type: ${s0}
        - Functionality: ${s1}
        - Domain Plan: ${s2}

        Generate a JSON object with the following structure (no markdown, just raw JSON):
        {
            "min_price": number (in INR, roughly 4000-25000 based on complexity),
            "max_price": number (in INR),
            "timeline": string (e.g. "1 week"),
            "explanation": string (max 20 words),
            "recommended_stack": string (e.g. "Next.js + Cloudflare")
        }
    `;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent`;

    const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        })
    });

    if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error("Gemini API Error:", errorText);
        return new Response(JSON.stringify({ error: "Failed to fetch estimate" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const data = await geminiResponse.json();
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
