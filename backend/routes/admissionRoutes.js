const express = require('express');
const router = express.Router();
const { getAdmissions, checkAdmissionStatus, submitAdmission, updateAdmissionStatus } = require('../controllers/admissionController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', protect, authorize('admin'), getAdmissions);
router.get('/status/:query', checkAdmissionStatus);
router.post('/apply', upload.single('document'), submitAdmission);
router.put('/:id/status', protect, authorize('admin'), updateAdmissionStatus);

module.exports = router;
