import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/authContext';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import './styles/App.css';

function PrivateRoute({ children }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!token || !user) {
    return <Navigate to="/" />;
  }
  
  return children;
}

function AppContent() {
  const { token, loading } = useAuth();

  return (
    <BrowserRouter>
      <div className="app">
        {token && !loading && <Navbar />}
        <Routes>
          <Route path="/" element={token ? <Navigate to="/home" /> : <AuthPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
