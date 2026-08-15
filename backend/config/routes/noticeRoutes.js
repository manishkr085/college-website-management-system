const express = require('express');
const router = express.Router();
const { getNotices, createNotice, updateNotice, deleteNotice } = require('../controllers/noticeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getNotices);
router.post('/', protect, authorize('admin', 'faculty'), createNotice);
router.put('/:id', protect, authorize('admin', 'faculty'), updateNotice);
router.delete('/:id', protect, authorize('admin', 'faculty'), deleteNotice);

module.exports = router;
