import React, { useState } from 'react';
import { feedbackService } from '../services/api';
import '../styles/Feedback.css';

export default function FeedbackForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    subject: '',
    feedbackType: 'general',
    description: '',
    rating: 5,
    teacher: '',
    isAnonymous: false,
    tags: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      await feedbackService.createFeedback(submitData);
      
      setFormData({
        subject: '',
        feedbackType: 'general',
        description: '',
        rating: 5,
        teacher: '',
        isAnonymous: false,
        tags: ''
      });
      
      onSubmitSuccess && onSubmitSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-form-container">
      <h3>Submit Your Feedback</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Brief subject of your feedback"
          />
        </div>

        <div className="form-group">
          <label htmlFor="feedbackType">Feedback Type</label>
          <select
            id="feedbackType"
            name="feedbackType"
            value={formData.feedbackType}
            onChange={handleChange}
          >
            <option value="academic">Academic</option>
            <option value="behavioral">Behavioral</option>
            <option value="performance">Performance</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Detailed feedback description (minimum 10 characters)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (1-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="teacher">Teacher/Faculty (Optional)</label>
          <input
            type="text"
            id="teacher"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            placeholder="Name of teacher (if applicable)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated, optional)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., urgent, important, suggestion"
          />
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="isAnonymous"
            name="isAnonymous"
            checked={formData.isAnonymous}
            onChange={handleChange}
          />
          <label htmlFor="isAnonymous">Submit as Anonymous</label>
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}
