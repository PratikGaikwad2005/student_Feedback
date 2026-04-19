import React from 'react';
import { useAuth } from '../services/authContext';
import '../styles/Navbar.css';

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>📚 Student Feedback System</h1>
        </div>
        
        <div className="navbar-menu">
          {user ? (
            <>
              <span className="user-info">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <span className="user-info">Not logged in</span>
          )}
        </div>
      </div>
    </nav>
  );
}
