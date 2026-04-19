import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import '../styles/Auth.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSuccess = () => {
    window.location.href = '/home';
  };

  return (
    <div className="auth-page">
      <div className="auth-toggle">
        <button
          className={`toggle-btn ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`toggle-btn ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <Login onLoginSuccess={handleAuthSuccess} />
      ) : (
        <Register onRegisterSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}
