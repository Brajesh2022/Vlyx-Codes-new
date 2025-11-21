export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Strict Same-Origin Policy:
    // Cloudflare Pages Functions are served from the same domain as the static assets.
    // By default, browsers enforce Same-Origin Policy.
    // We DO NOT add Access-Control-Allow-Origin: * headers here, preventing other sites from calling this API.

    // If you need to allow specific external domains (e.g. for mobile apps), you can check request.headers.get("Origin")
    // and set the header conditionally. For now, we strictly allow only same-origin.

    const body = await request.json();
    const selections = body.selections;

    if (!selections || !Array.isArray(selections)) {
       return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const prompt = `
        You are the estimation engine for Vlyx Codes, a web agency in India.
        Client Requirements:
        - Business Type: ${selections[0]}
        - Functionality: ${selections[1]}
        - Domain Plan: ${selections[2]}

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
            'x-goog-api-key': env.GEMINI_API_KEY
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
