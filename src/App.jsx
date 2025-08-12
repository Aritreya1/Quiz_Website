import React, { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import GamesPage from './pages/GamesPage';
import QuizPage from './pages/QuizPage';
import ProfilePage from './pages/ProfilePage';
import { auth, onAuthStateChanged, signOut, signInAnonymously } from './firebase';
import './index.css'; // Make sure this is here!

const Navbar = ({ onNavigate, currentPage, onSignOut }) => {
  const pages = [
    { name: 'Dashboard', component: 'dashboard' },
    { name: 'Games', component: 'games' },
    { name: 'Quizzes', component: 'quizzes' },
    { name: 'Profile', 'component': 'profile' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-title">Awesome App</span>
        <div className="navbar-links">
          {pages.map((page) => (
            <button
              key={page.name}
              onClick={() => onNavigate(page.component)}
              className={`navbar-button ${currentPage === page.component ? 'active' : ''}`}
            >
              {page.name}
            </button>
          ))}
          <button
            onClick={onSignOut}
            className="sign-out-button"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        signInAnonymously(auth).catch((error) => console.error("Anonymous sign-in failed:", error));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="app-container">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} onSignOut={handleSignOut} />
      <main className="main-content">
        {currentPage === 'dashboard' && <DashboardPage onSignOut={handleSignOut} />}
        {currentPage === 'games' && <GamesPage />}
        {currentPage === 'quizzes' && <QuizPage />}
        {currentPage === 'profile' && <ProfilePage onEditProfile={() => console.log('Edit profile coming soon!')} />}
      </main>
    </div>
  );
};

export default App;
