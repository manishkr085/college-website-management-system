const express = require('express');
const router = express.Router();
const { getFaculty, getFacultyById, createFaculty, updateFaculty, deleteFaculty } = require('../controllers/facultyController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getFaculty);
router.get('/:id', getFacultyById);
router.post('/', protect, authorize('admin'), createFaculty);
router.put('/:id', protect, authorize('admin'), updateFaculty);
router.delete('/:id', protect, authorize('admin'), deleteFaculty);

module.exports = router;
