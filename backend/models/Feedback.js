const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Please provide a feedback subject'],
    trim: true
  },
  feedbackType: {
    type: String,
    enum: ['academic', 'behavioral', 'performance', 'general'],
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please provide feedback description'],
    minlength: 10
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: false
  },
  teacher: {
    type: String,
    required: false
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      },
      name: String,
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'in-review', 'resolved', 'closed'],
    default: 'pending'
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  tags: [String],
  attachments: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for faster queries
feedbackSchema.index({ student: 1, createdAt: -1 });
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ feedbackType: 1 });

module.exports = mongoose.model('Feedback', feedbackSchema);
