const express = require('express');
const router = express.Router();
const { getMaterials, createMaterial, deleteMaterial } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/materials', getMaterials);
router.post('/materials', protect, authorize('admin', 'faculty'), upload.single('materialFile'), createMaterial);
router.delete('/materials/:id', protect, authorize('admin', 'faculty'), deleteMaterial);

module.exports = router;
