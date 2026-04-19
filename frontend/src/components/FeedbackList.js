import React, { useState, useEffect, useCallback } from 'react';
import { feedbackService } from '../services/api';
import '../styles/Feedback.css';

export default function FeedbackList({ refreshTrigger }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    feedbackType: ''
  });
  const [expandedId, setExpandedId] = useState(null);

  const fetchFeedbacks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await feedbackService.getAllFeedback({
        status: filters.status || undefined,
        feedbackType: filters.feedbackType || undefined
      });
      setFeedbacks(response.data.feedback);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch feedbacks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks, refreshTrigger]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#FFA500',
      'in-review': '#4169E1',
      'resolved': '#228B22',
      'closed': '#808080'
    };
    return colors[status] || '#000';
  };

  return (
    <div className="feedback-list-container">
      <h3>All Feedback</h3>
      
      <div className="filters">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-review">In Review</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        
        <select
          name="feedbackType"
          value={filters.feedbackType}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="academic">Academic</option>
          <option value="behavioral">Behavioral</option>
          <option value="performance">Performance</option>
          <option value="general">General</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <p>Loading feedbacks...</p>
      ) : feedbacks.length === 0 ? (
        <p>No feedbacks found</p>
      ) : (
        <div className="feedback-items">
          {feedbacks.map(feedback => (
            <div key={feedback._id} className="feedback-card">
              <div className="feedback-header">
                <div>
                  <h4>{feedback.subject}</h4>
                  <p className="feedback-type">{feedback.feedbackType}</p>
                </div>
                <div className="feedback-status" style={{ backgroundColor: getStatusColor(feedback.status) }}>
                  {feedback.status}
                </div>
              </div>
              
              <div className="feedback-meta">
                <span>📝 {feedback.student?.name || 'Anonymous'}</span>
                <span>⭐ {feedback.rating}/5</span>
                <span>📅 {new Date(feedback.createdAt).toLocaleDateString()}</span>
              </div>

              <button 
                className="expand-btn"
                onClick={() => setExpandedId(expandedId === feedback._id ? null : feedback._id)}
              >
                {expandedId === feedback._id ? 'Hide Details' : 'Show Details'}
              </button>

              {expandedId === feedback._id && (
                <div className="feedback-details">
                  <p><strong>Description:</strong> {feedback.description}</p>
                  {feedback.teacher && <p><strong>Teacher:</strong> {feedback.teacher}</p>}
                  {feedback.tags.length > 0 && (
                    <div className="tags">
                      {feedback.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  {feedback.comments.length > 0 && (
                    <div className="comments-section">
                      <h5>Comments ({feedback.comments.length})</h5>
                      {feedback.comments.map((comment, idx) => (
                        <div key={idx} className="comment">
                          <strong>{comment.name}:</strong> {comment.comment}
                          <small>{new Date(comment.createdAt).toLocaleString()}</small>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
