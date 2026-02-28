import dotenv from 'dotenv';

dotenv.config();

function parseNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

const rawOrigins = process.env.CORS_ALLOWED_ORIGINS ?? '';
const allowedOrigins = rawOrigins
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseNumber(process.env.PORT, 4000),
  corsAllowedOrigins: allowedOrigins,
  rateLimitWindowMs: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMaxRequests: parseNumber(process.env.RATE_LIMIT_MAX_REQUESTS, 100),
  pinterestApiTimeoutMs: parseNumber(process.env.PINTEREST_API_TIMEOUT_MS, 7000)
};
