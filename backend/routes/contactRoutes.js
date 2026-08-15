const express = require('express');
const router = express.Router();
const { getContacts, submitContact, updateContactStatus } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin'), getContacts);
router.post('/', submitContact);
router.put('/:id/status', protect, authorize('admin'), updateContactStatus);

module.exports = router;
