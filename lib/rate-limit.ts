type Bucket = {
  count: number;
  resetAt: number;
};

type LimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
};

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  scope: string,
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now()
): LimitResult {
  const bucketKey = `${scope}:${key}`;
  const current = buckets.get(bucketKey);

  if (!current || current.resetAt <= now) {
    buckets.set(bucketKey, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      retryAfterSec: Math.ceil(windowMs / 1000),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  buckets.set(bucketKey, current);

  return {
    allowed: true,
    remaining: Math.max(0, limit - current.count),
    retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

export function resetRateLimitBuckets() {
  buckets.clear();
}
