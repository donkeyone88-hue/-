import { Router } from 'express';
import metadataRoutes from './metadataRoutes.js';
import downloadRoutes from './download.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Service is healthy'
  });
});

router.use('/metadata', metadataRoutes);
router.use('/download', downloadRoutes);

export default router;
