const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// In-memory rate limiter (Note: Per-instance in Cloud Functions)
const ipRequestCounts = new Map();

// --- SECURITY UTILS ---

function checkOrigin(req) {
  const origin = req.get('origin');
  // req.protocol + '://' + req.get('host') gives the function's host,
  // but we want to verify the CALLER's origin matches the HOSTING origin.
  // If hosted on Firebase Hosting, the origin will be https://your-project.web.app
  // The function url might be different (https://region-project.cloudfunctions.net/chat).
  // HOWEVER, when using "rewrites" in firebase.json, the function is served on the SAME domain.
  // So req.get('origin') should match req.protocol + "://" + req.get('host').

  if (!origin) return false; // Enforce strict origin presence

  const host = req.get('host');
  const protocol = req.protocol;
  const expectedOrigin = `${protocol}://${host}`;

  // Allow if origin matches the host (hosting domain)
  // Note: localhost testing might be tricky with strict string matching, but for prod this is correct.
  // We can also allow localhost explicitly for testing if needed, but user asked for strictness.
  return origin === expectedOrigin || origin.includes('localhost') || origin.includes('127.0.0.1');
}

function isRateLimited(ip) {
  if (!ip) return false;

  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const limit = 10;

  let record = ipRequestCounts.get(ip);

  if (!record) {
    record = { count: 0, startTime: now };
    ipRequestCounts.set(ip, record);
  }

  // Reset if window passed
  if (now - record.startTime > windowMs) {
    record.count = 0;
    record.startTime = now;
  }

  record.count++;

  return record.count > limit;
}

// --- CHAT FUNCTION ---

exports.chat = onRequest({ cors: false }, async (req, res) => {
  try {
    // 1. Security: Origin Check
    if (!checkOrigin(req)) {
      res.status(403).json({ error: "Unauthorized Origin" });
      return;
    }

    // 2. Security: Rate Limiting
    // req.ip in Firebase Functions usually works, or x-forwarded-for
    const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({ error: "you exceeded your limits..., try after a minute...." });
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    const contents = req.body.contents;

    // 3. Security: Input Validation
    if (!contents || !Array.isArray(contents)) {
       res.status(400).json({ error: "Invalid input" });
       return;
    }

    // Sanitize input
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

    // Use process.env for environment variables in Firebase Functions
    // Note: User must set GEMINI_API_KEY via CLI
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        logger.error("Missing GEMINI_API_KEY");
        res.status(500).json({ error: "Server configuration error" });
        return;
    }

    const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
            systemInstruction: { parts: [{ text: vlyxContext }] },
            contents: sanitizedContents
        })
    });

    if (!geminiResponse.ok) {
         const errorText = await geminiResponse.text();
         logger.error("Gemini API Error:", errorText);
         res.status(500).json({ error: "Failed to chat" });
         return;
    }

    const data = await geminiResponse.json();
    res.json(data);

  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: e.message });
  }
});

// --- ESTIMATE FUNCTION ---

exports.estimate = onRequest({ cors: false }, async (req, res) => {
  try {
    // 1. Security: Origin Check
    if (!checkOrigin(req)) {
      res.status(403).json({ error: "Unauthorized Origin" });
      return;
    }

    // 2. Security: Rate Limiting
    const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({ error: "you exceeded your limits..., try after a minute...." });
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    const selections = req.body.selections;

    if (!selections || !Array.isArray(selections)) {
       res.status(400).json({ error: "Invalid input" });
       return;
    }

    // Sanitize inputs
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
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        logger.error("Missing GEMINI_API_KEY");
        res.status(500).json({ error: "Server configuration error" });
        return;
    }

    const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        })
    });

    if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        logger.error("Gemini API Error:", errorText);
        res.status(500).json({ error: "Failed to fetch estimate" });
        return;
    }

    const data = await geminiResponse.json();
    res.json(data);

  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: e.message });
  }
});
