// Simple in-memory rate limiter (Note: Per-isolate in Serverless)
const ipRequestCounts = new Map();

export function checkOrigin(request) {
  const origin = request.headers.get("Origin");
  const url = new URL(request.url);

  // Allow requests with no origin (e.g. server-side) or matching origin
  // BUT user wanted "only by our page". Browsers send Origin on POST.
  // If Origin is missing on POST, it might be a script or direct curl.
  // We will enforce Origin presence and match for strict security.

  if (!origin) {
    // Some legitimate scenarios might lack Origin (e.g. same-site navigation),
    // but for an API called via fetch() from the page, Origin should be present.
    return false;
  }

  return origin === url.origin;
}

export function isRateLimited(ip) {
  if (!ip) return false; // Fallback if no IP found

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
