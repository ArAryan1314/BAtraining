export interface RateLimitOptions {
  /** Failures allowed inside the window before the key is blocked. */
  limit: number;
  windowMs: number;
}

/**
 * Sliding-window failure counter.
 * State is per server instance, so on a multi-instance deployment swap the Map for a shared store (Redis/Upstash) behind this same interface.
 */
export class FailureLimiter {
  private readonly failures = new Map<string, number[]>();

  constructor(private readonly options: RateLimitOptions, private readonly now: () => number = Date.now) {}

  private recent(key: string): number[] {
    const cutoff = this.now() - this.options.windowMs;
    const recent = (this.failures.get(key) ?? []).filter((time) => time > cutoff);
    if (recent.length) this.failures.set(key, recent);
    else this.failures.delete(key);
    return recent;
  }

  isBlocked(key: string): boolean {
    return this.recent(key).length >= this.options.limit;
  }

  recordFailure(key: string): void {
    this.failures.set(key, [...this.recent(key), this.now()]);
  }

  reset(key: string): void {
    this.failures.delete(key);
  }
}
