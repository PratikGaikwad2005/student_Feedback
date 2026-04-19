const Feedback = require('../models/Feedback');
const Student = require('../models/Student');

// Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const { subject, feedbackType, description, rating, teacher, isAnonymous, tags } = req.body;

    const feedback = await Feedback.create({
      student: req.userId,
      subject,
      feedbackType,
      description,
      rating,
      teacher,
      isAnonymous,
      tags: tags || []
    });

    await feedback.populate('student', 'name email rollNumber');

    res.status(201).json({
      success: true,
      message: 'Feedback created successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const { status, feedbackType, page = 1, limit = 10 } = req.query;
    let query = {};

    if (status) query.status = status;
    if (feedbackType) query.feedbackType = feedbackType;

    const feedback = await Feedback.find(query)
      .populate('student', 'name email rollNumber')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Feedback.countDocuments(query);

    res.status(200).json({
      success: true,
      count: feedback.length,
      total,
      pages: Math.ceil(total / limit),
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('student', 'name email rollNumber')
      .populate('comments.userId', 'name email');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get feedback for current user
exports.getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ student: req.userId })
      .populate('student', 'name email rollNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const { subject, description, rating, status, teacher } = req.body;

    let feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    // Update fields
    if (subject) feedback.subject = subject;
    if (description) feedback.description = description;
    if (rating) feedback.rating = rating;
    if (status) feedback.status = status;
    if (teacher) feedback.teacher = teacher;

    await feedback.save();

    res.status(200).json({
      success: true,
      message: 'Feedback updated successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add comment to feedback
exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const student = await Student.findById(req.userId);

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    feedback.comments.push({
      userId: req.userId,
      name: student.name,
      comment
    });

    await feedback.save();
    await feedback.populate('comments.userId', 'name email');

    res.status(200).json({
      success: true,
      message: 'Comment added successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get feedback statistics
exports.getFeedbackStats = async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const byStatus = await Feedback.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const byType = await Feedback.aggregate([
      { $group: { _id: '$feedbackType', count: { $sum: 1 } } }
    ]);
    const avgRating = await Feedback.aggregate([
      { $group: { _id: null, average: { $avg: '$rating' } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalFeedback,
        byStatus,
        byType,
        avgRating: avgRating[0]?.average || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
