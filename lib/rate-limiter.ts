// Simple in-memory rate limiter
type RateLimitStore = {
  [key: string]: {
    count: number
    resetAt: number
  }
}

const store: RateLimitStore = {}

// Cleanup old entries every 10 minutes
setInterval(
  () => {
    const now = Date.now()
    Object.keys(store).forEach((key) => {
      if (store[key].resetAt < now) {
        delete store[key]
      }
    })
  },
  10 * 60 * 1000,
)

export type RateLimitConfig = {
  maxRequests: number // Maximum requests allowed
  windowMs: number // Time window in milliseconds
}

export function rateLimit(identifier: string, config: RateLimitConfig): boolean {
  const now = Date.now()
  const key = identifier

  // Initialize or reset if window expired
  if (!store[key] || store[key].resetAt < now) {
    store[key] = {
      count: 1,
      resetAt: now + config.windowMs,
    }
    return true
  }

  // Check if limit exceeded
  if (store[key].count >= config.maxRequests) {
    return false
  }

  // Increment count
  store[key].count++
  return true
}

export function getRateLimitInfo(identifier: string) {
  const entry = store[identifier]
  if (!entry) {
    return { remaining: 0, resetAt: Date.now() }
  }
  return {
    remaining: entry.count,
    resetAt: entry.resetAt,
  }
}
