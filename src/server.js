import app from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Pinterest metadata API listening on port ${env.port}`);
});

function shutdown(signal) {
  // eslint-disable-next-line no-console
  console.log(`${signal} received. Starting graceful shutdown...`);

  server.close((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Error during shutdown:', err);
      process.exit(1);
    }

    // eslint-disable-next-line no-console
    console.log('Server stopped cleanly.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
