import React, { useState, useEffect } from 'react';
import { feedbackService } from '../services/api';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await feedbackService.getFeedbackStats();
      setStats(response.data.stats);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard-container"><p>Loading statistics...</p></div>;
  if (error) return <div className="dashboard-container error-message">{error}</div>;
  if (!stats) return <div className="dashboard-container"><p>No statistics available</p></div>;

  return (
    <div className="dashboard-container">
      <h2>Feedback Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Feedback</h3>
          <p className="stat-value">{stats.totalFeedback}</p>
        </div>

        <div className="stat-card">
          <h3>Average Rating</h3>
          <p className="stat-value">{stats.avgRating.toFixed(2)}/5</p>
        </div>

        <div className="stat-card">
          <h3>By Status</h3>
          <ul className="stat-list">
            {stats.byStatus.map(item => (
              <li key={item._id}>{item._id}: {item.count}</li>
            ))}
          </ul>
        </div>

        <div className="stat-card">
          <h3>By Type</h3>
          <ul className="stat-list">
            {stats.byType.map(item => (
              <li key={item._id}>{item._id}: {item.count}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
