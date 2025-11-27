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
    const contents = body.contents;

    // 3. Security: Input Validation
    if (!contents || !Array.isArray(contents)) {
       return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Sanitize input: ensure only text parts are sent
    const sanitizedContents = contents.map(msg => ({
        role: msg.role === 'user' || msg.role === 'model' ? msg.role : 'user',
        parts: Array.isArray(msg.parts) ? msg.parts.map(p => ({ text: String(p.text || "").slice(0, 1000) })) : []
    }));

    const vlyxContext = `
        SYSTEM: You are Luna, the AI assistant for Vlyx Codes.
        IDENTITY: Vlyx Codes is a web development agency run by a team of 3 skilled developers (Brajesh, Aadish, etc). We engineer high-performance sites. We are NOT generic Wordpress devs.
        CORE PHILOSOPHY: "Stop paying for slow websites." We use Next.js + Cloudflare/Firebase. Zero monthly hosting fees. Static/Edge rendering.
        SERVICES:
        1. School Sites (Admissions, Results, Gallery).
        2. Business Portfolios (SEO optimized).
        3. Custom Web Apps (Dashboards, Tools).
        PRICING: Typically ₹4000 - ₹7000. One-time fee. Free subdomains available.
        PROJECTS:
        - NetVlyx (Movie streaming, No ads).
        - Book.vlyx (Free ebooks library).
        - FireVlyx (Firebase deployment tool).
        - Vlyx.mod (Mod APK store).
        - Vlyx.ide (AI code generator).
        - AniVlyx (Anime streaming).
        - DPS Keoti (School site + Dashboard).
        - Ekagra Academy (Coaching site).
        FAQ ANSWERS:
        - Hosting is free via Cloudflare Pages/Firebase tier.
        - Static sites are like brochures (fast, safe). Dynamic sites are like apps (login, data).
        - Domains cost ₹1000-3000/yr custom, or free subdomains forever.
        CONTACT: contact@vlyx.site, +91 82710 81338.

        INSTRUCTION: Be friendly, casual, and helpful. You are a skilled developer friend, not a corporate bot. Keep answers concise.
    `;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent`;

    const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
            systemInstruction: { parts: [{ text: vlyxContext }] },
            contents: sanitizedContents
        })
    });

    if (!geminiResponse.ok) {
         const errorText = await geminiResponse.text();
         console.error("Gemini API Error:", errorText);
         return new Response(JSON.stringify({ error: "Failed to chat" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const data = await geminiResponse.json();
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
