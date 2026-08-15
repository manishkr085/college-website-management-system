const express = require('express');
const router = express.Router();
const { getGallery, createGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getGallery);
router.post('/', protect, authorize('admin', 'faculty'), upload.single('mediaFile'), createGalleryItem);
router.delete('/:id', protect, authorize('admin', 'faculty'), deleteGalleryItem);

module.exports = router;
