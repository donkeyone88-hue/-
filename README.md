# pinterest-downloader-saas (Backend)

Production-ready Node.js + Express API for fetching Pinterest metadata via the official/public oEmbed endpoint (no login scraping, no protection bypass).

## Features

- Layered architecture: routes -> controllers -> services
- Helmet security headers
- Configurable CORS
- API rate limiting
- Pinterest URL validation middleware
- Environment-based configuration with `.env`
- Graceful shutdown and centralized error handling

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Run in development:
   ```bash
   npm run dev
   ```

## API

### Health
- `GET /api/v1/health`

### Fetch metadata
- `GET /api/v1/metadata?url=<pinterest-url>`
- `GET /api/v1/download?url=<pinterest-url>`

Example:
```bash
curl "http://localhost:4000/api/v1/download?url=https://www.pinterest.com/pin/99360735500167749/"
```

## Production notes

- Set `NODE_ENV=production`
- Restrict `CORS_ALLOWED_ORIGINS` to trusted domains
- Tune rate limits based on traffic profile
- Run behind reverse proxy/load balancer
