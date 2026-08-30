import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Fallback in-memory map for dev if Redis is not configured
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 60000): Promise<boolean> {
  if (redis) {
    try {
      const key = `rate-limit:${ip}`;
      // Basic rate limiting via Redis
      const [response] = await redis.pipeline()
        .incr(key)
        .pexpire(key, windowMs)
        .exec();
        
      return (response as number) > limit;
    } catch (e) {
      console.warn("Redis rate limiting failed, falling back to in-memory", e);
    }
  }

  // Fallback to in-memory
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}
