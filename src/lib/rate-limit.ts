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
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.pexpire(key, windowMs);
      }
        
      return count > limit;
    } catch (e) {
      console.warn("Redis rate limiting failed, falling back to in-memory", e);
    }
  }

  // Fallback to in-memory with automatic cleanup of expired entries
  const now = Date.now();
  if (rateLimitMap.size > 100) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}
