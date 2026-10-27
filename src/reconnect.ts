/**
 * Calculate a capped exponential reconnect delay.
 * This is a pure helper; it does not itself reconnect a WhatsApp socket.
 */
export function reconnectDelay(
  attempt: number,
  baseMs = 1_000,
  maxMs = 30_000
): number {
  if (!Number.isFinite(attempt) || attempt < 0) {
    throw new RangeError("attempt must be a non-negative finite number");
  }
  if (!Number.isFinite(baseMs) || baseMs < 0) {
    throw new RangeError("baseMs must be a non-negative finite number");
  }
  if (!Number.isFinite(maxMs) || maxMs < 0) {
    throw new RangeError("maxMs must be a non-negative finite number");
  }
  return Math.min(maxMs, baseMs * (2 ** Math.floor(attempt)));
}
