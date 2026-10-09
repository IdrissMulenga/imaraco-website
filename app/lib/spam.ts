import "server-only";
import { headers } from "next/headers";

const WINDOW_SECONDS = 10 * 60;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 3000;

/*
 * Rate limits ("at most N tries per 10 minutes").
 *
 * With a Redis database from Upstash (free tier; on Vercel: Storage →
 * Upstash for Redis, which fills in the variables for you), the counts are
 * shared by every server, so the limits hold for the whole site:
 *   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 *   (or KV_REST_API_URL / KV_REST_API_TOKEN, the names Vercel uses)
 * Without them, each server counts on its own, in memory (fine for
 * development, best-effort in production).
 */
const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

/** Counts one try in Redis and returns the count for this 10-minute window. */
async function redisCount(key: string): Promise<number> {
  const res = await fetch(`${redisUrl}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
    // INCR the counter; set it to expire with the window (only when new).
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(WINDOW_SECONDS), "NX"],
    ]),
    signal: AbortSignal.timeout(3000),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis responded ${res.status}`);
  const [incr] = (await res.json()) as { result?: number; error?: string }[];
  if (typeof incr?.result !== "number") throw new Error(`Redis error: ${incr?.error ?? "no result"}`);
  return incr.result;
}

// In-memory fallback: timestamps of recent tries per key.
const hits = new Map<string, number[]>();

function memoryCount(key: string): number {
  const now = Date.now();
  const windowMs = WINDOW_SECONDS * 1000;
  // Forget old entries now and then, so memory doesn't keep growing.
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (now - times[times.length - 1] >= windowMs) hits.delete(k);
  }
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length;
}

/** Counts one try for `key` and says if it went over `max` in 10 minutes. */
export async function isRateLimited(key: string, max = MAX_PER_WINDOW) {
  const fullKey = `imara:rl:${key}`;
  if (redisUrl && redisToken) {
    try {
      return (await redisCount(fullKey)) > max;
    } catch (err) {
      // Redis unreachable: don't block real visitors, count in memory instead.
      console.error("[rate-limit] Redis unavailable, using memory", err);
    }
  }
  return memoryCount(fullKey) > max;
}

export async function clientIp() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Confirmation emails go to whatever address was typed in, so limit how many
 * one address can receive (2 per 10 minutes), whoever sends the form.
 */
export async function canSendConfirmation(email: string) {
  return !(await isRateLimited(`confirm:${email.trim().toLowerCase()}`, 2));
}

/** True when the submission looks automated (honeypot filled or too fast). */
export function looksLikeBot(honeypot: string, startedAt: number) {
  return honeypot.length > 0 || Date.now() - startedAt < MIN_FILL_MS;
}
