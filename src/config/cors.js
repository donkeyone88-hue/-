import cors from 'cors';
import { env } from './env.js';

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (env.corsAllowedOrigins.length === 0 || env.corsAllowedOrigins.includes('*')) {
      return callback(null, true);
    }

    if (env.corsAllowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false,
  optionsSuccessStatus: 204
});
