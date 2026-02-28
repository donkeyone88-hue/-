import { env } from '../config/env.js';
import { HttpError } from '../utils/httpError.js';

const OEMBED_ENDPOINT = 'https://www.pinterest.com/oembed.json';

export async function fetchPinterestMetadata(targetUrl) {
  const requestUrl = new URL(OEMBED_ENDPOINT);
  requestUrl.searchParams.set('url', targetUrl);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.pinterestApiTimeoutMs);

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'pinterest-downloader-saas/1.0'
      },
      signal: controller.signal
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new HttpError(404, 'Pinterest resource not found or unavailable via oEmbed.');
      }
      throw new HttpError(502, `Pinterest API returned status ${response.status}.`);
    }

    const payload = await response.json();

    return {
      type: payload.type ?? null,
      title: payload.title ?? null,
      authorName: payload.author_name ?? null,
      authorUrl: payload.author_url ?? null,
      providerName: payload.provider_name ?? null,
      providerUrl: payload.provider_url ?? null,
      width: payload.width ?? null,
      height: payload.height ?? null,
      thumbnailUrl: payload.thumbnail_url ?? null,
      html: payload.html ?? null,
      originalUrl: targetUrl
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new HttpError(504, 'Pinterest API request timed out.');
    }

    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError(502, 'Failed to fetch metadata from Pinterest API.');
  } finally {
    clearTimeout(timeout);
  }
}
