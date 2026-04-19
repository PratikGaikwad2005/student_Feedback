const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentsByDepartment
} = require('../controllers/studentController');
const { protect } = require('../middleware/auth');

router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', protect, updateStudent);
router.delete('/:id', protect, deleteStudent);
router.get('/department/:department', getStudentsByDepartment);

module.exports = router;
