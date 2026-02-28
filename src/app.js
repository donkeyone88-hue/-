import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { corsMiddleware } from './config/cors.js';
import { apiRateLimiter } from './middlewares/rateLimiter.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(helmet());
app.use(corsMiddleware);
app.use(apiRateLimiter);
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
