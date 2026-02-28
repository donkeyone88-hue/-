import { HttpError } from '../utils/httpError.js';

const ALLOWED_HOSTS = new Set(['pinterest.com', 'www.pinterest.com', 'pin.it']);

export function validatePinterestUrl(req, res, next) {
  const urlValue = req.method === 'GET' ? req.query.url : req.body?.url;

  if (!urlValue || typeof urlValue !== 'string') {
    return next(new HttpError(400, 'A valid Pinterest URL is required in the `url` field.'));
  }

  let parsed;
  try {
    parsed = new URL(urlValue);
  } catch {
    return next(new HttpError(400, 'Malformed URL.'));
  }

  if (!['https:', 'http:'].includes(parsed.protocol)) {
    return next(new HttpError(400, 'Only HTTP(S) URLs are supported.'));
  }

  const hostname = parsed.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.has(hostname)) {
    return next(new HttpError(400, 'Only Pinterest URLs are allowed.'));
  }

  req.validatedPinterestUrl = parsed.toString();
  return next();
}
