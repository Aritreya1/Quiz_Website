import React, { useState, useEffect } from 'react';
// Import the Firebase auth object from your firebase.js file.
import { auth, onAuthStateChanged } from '../firebase';

const ProfilePage = ({ onEditProfile }) => {
  // State to hold the current user's object and a loading state.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Placeholder for user statistics. We will implement fetching this data from
  // Firestore in a later step.
  const userStats = {
    gamesPlayed: 0,
    quizzesCompleted: 0,
    highScore: 0,
  };

  // useEffect hook to listen for authentication state changes and get user data.
  useEffect(() => {
    // onAuthStateChanged is the recommended way to get the current user.
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null);
      }
      setLoading(false);
    });

    // Clean up the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  // Display a loading message while we wait for Firebase to check the auth state.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading profile...</p>
      </div>
    );
  }

  // If there's no user, show a simple message. This shouldn't happen
  // because of the authentication check in App.jsx, but it's a good practice.
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-500 font-semibold">User not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl mx-auto p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Picture Section */}
          <div className="flex-shrink-0">
            <img
              src={`https://placehold.co/150x150/cbd5e1/4a5568?text=${user.email.slice(0, 1).toUpperCase()}`}
              alt="User Profile"
              className="w-32 h-32 rounded-full border-4 border-indigo-200 shadow-lg"
            />
          </div>

          {/* User Info Section */}
          <div className="text-center md:text-left flex-grow">
            {/* The user's email is a good stand-in for a display name for now */}
            <h1 className="text-4xl font-extrabold text-gray-900">
              {user.email}
            </h1>
            <p className="text-lg text-gray-600 mt-2 break-words">
              User ID: <span className="font-mono">{user.uid}</span>
            </p>
          </div>

          {/* Edit Profile Button */}
          <div className="md:self-start">
            <button
              onClick={onEditProfile}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Edit Profile
            </button>
          </div>
        </div>
        
        <hr className="my-8 border-gray-200" />
        
        {/* Stats Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-indigo-50 rounded-xl p-4 shadow-sm">
              <p className="text-4xl font-extrabold text-indigo-600">
                {userStats.gamesPlayed}
              </p>
              <p className="text-lg text-gray-700 mt-1">Games Played</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 shadow-sm">
              <p className="text-4xl font-extrabold text-indigo-600">
                {userStats.quizzesCompleted}
              </p>
              <p className="text-lg text-gray-700 mt-1">Quizzes Completed</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 shadow-sm">
              <p className="text-4xl font-extrabold text-indigo-600">
                {userStats.highScore}
              </p>
              <p className="text-lg text-gray-700 mt-1">Highest Score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
