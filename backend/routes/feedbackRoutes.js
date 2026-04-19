const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  getUserFeedback,
  updateFeedback,
  deleteFeedback,
  addComment,
  getFeedbackStats
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createFeedback);
router.get('/', getAllFeedback);
router.get('/stats', getFeedbackStats);
router.get('/user/my-feedback', protect, getUserFeedback);
router.get('/:id', getFeedbackById);
router.put('/:id', protect, updateFeedback);
router.delete('/:id', protect, deleteFeedback);
router.post('/:id/comment', protect, addComment);

module.exports = router;
