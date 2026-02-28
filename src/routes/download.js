import { Router } from 'express';
import { getMetadata } from '../controllers/metadataController.js';
import { validatePinterestUrl } from '../middlewares/validatePinterestUrl.js';

const router = Router();

/**
 * GET /api/v1/download?url=<pinterest-url>
 * Returns Pinterest metadata payload for a valid Pinterest URL.
 */
router.get('/', validatePinterestUrl, getMetadata);

export default router;
