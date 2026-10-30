/**
 * Simple logger wrapper. Replace with a structured logger (e.g., pino, winston) in production.
 */
export const logger = {
  info: (...args: unknown[]) => console.info('[INFO]', ...args),
  warn: (...args: unknown[]) => console.warn('[WARN]', ...args),
  error: (...args: unknown[]) => console.error('[ERROR]', ...args),
};
