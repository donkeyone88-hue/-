import { asyncHandler } from '../utils/asyncHandler.js';
import { fetchPinterestMetadata } from '../services/pinterestService.js';

export const getMetadata = asyncHandler(async (req, res) => {
  const metadata = await fetchPinterestMetadata(req.validatedPinterestUrl);

  return res.status(200).json({
    success: true,
    data: metadata
  });
});
