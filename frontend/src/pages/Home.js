import React, { useState } from 'react';
import { useAuth } from '../services/authContext';
import Dashboard from '../components/Dashboard';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import '../styles/Home.css';

export default function Home() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('submit');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFeedbackSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveTab('list');
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Welcome, {user?.name}!</h2>
        <p>Manage and review student feedback</p>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === 'submit' ? 'active' : ''}`}
          onClick={() => setActiveTab('submit')}
        >
          ✍️ Submit Feedback
        </button>
        <button
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          📋 View Feedback
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'submit' && <FeedbackForm onSubmitSuccess={handleFeedbackSubmitted} />}
        {activeTab === 'list' && <FeedbackList refreshTrigger={refreshTrigger} />}
      </div>
    </div>
  );
}
