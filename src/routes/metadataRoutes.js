import { Router } from 'express';
import { getMetadata } from '../controllers/metadataController.js';
import { validatePinterestUrl } from '../middlewares/validatePinterestUrl.js';

const router = Router();

router.get('/', validatePinterestUrl, getMetadata);

export default router;
