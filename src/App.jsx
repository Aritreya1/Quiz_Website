import React, { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import GamesPage from './pages/GamesPage';
import QuizPage from './pages/QuizPage';
import ProfilePage from './pages/ProfilePage';

// Import the Firebase modules you created
import { auth, signOut, initializeFirebase } from './firebase';

// A simple navigation component that we'll render on every page after login.
const Navbar = ({ onNavigate, currentPage, onSignOut }) => {
  const pages = [
    { name: 'Dashboard', component: 'dashboard' },
    { name: 'Games', component: 'games' },
    { name: 'Quizzes', component: 'quizzes' },
    { name: 'Profile', component: 'profile' },
  ];

  return (
    <nav className="bg-indigo-600 p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <span className="text-white text-2xl font-bold">Awesome App</span>

        {/* Navigation links */}
        <div className="flex items-center space-x-6">
          {pages.map((page) => (
            <button
              key={page.name}
              onClick={() => onNavigate(page.component)}
              className={`text-white font-medium text-lg px-3 py-2 rounded-xl transition-colors duration-200
                ${currentPage === page.component ? 'bg-indigo-700' : 'hover:bg-indigo-500'}`}
            >
              {page.name}
            </button>
          ))}
          {/* The sign out button is now in the navbar */}
          <button
            onClick={onSignOut}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
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

  // This useEffect hook initializes Firebase and sets up an auth state listener.
  // This listener is the core of your authentication system.
  useEffect(() => {
    // We only want to run this once when the component mounts.
    const initializeAppAndAuth = async () => {
      await initializeFirebase();
      setLoading(false);
    };

    initializeAppAndAuth();

    // Set up the listener to track auth state changes.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // A user is signed in.
        setIsAuthenticated(true);
      } else {
        // No user is signed in.
        setIsAuthenticated(false);
      }
      setLoading(false); // Authentication state is now known.
    });

    // Clean up the listener when the component unmounts to prevent memory leaks.
    return () => unsubscribe();
  }, []);

  // Function to handle navigation between pages.
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Function to handle a successful login.
  // This is called from the AuthPage component.
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  // Function to handle sign-out.
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will automatically update isAuthenticated to false.
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Render a loading spinner while we check the auth status.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  // If not authenticated, show the authentication page.
  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  // If authenticated, render the main application layout with the navbar.
  return (
    <div className="font-sans antialiased text-gray-800">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} onSignOut={handleSignOut} />
      <main className="container mx-auto p-4">
        {/* Conditional rendering based on the currentPage state */}
        {currentPage === 'dashboard' && <DashboardPage onSignOut={handleSignOut} />}
        {currentPage === 'games' && <GamesPage />}
        {currentPage === 'quizzes' && <QuizPage />}
        {currentPage === 'profile' && <ProfilePage onEditProfile={() => alert('Edit profile functionality coming soon!')} />}
      </main>
    </div>
  );
};

export default App;
