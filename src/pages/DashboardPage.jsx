import React, { useState, useEffect } from 'react';
import { db, collection, query, onSnapshot, getDocs, addDoc, serverTimestamp } from '../firebase';

const DashboardPage = ({ onSignOut }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch leaderboard data from Firestore in real-time.
  useEffect(() => {
    const leaderboardRef = collection(db, 'leaderboard');
    // For now, we'll get a simple query. Firestore rules are set to
    // allow read access for authenticated users.
    const q = query(leaderboardRef);

    // Set up a real-time listener for the leaderboard data.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const leaderboardData = [];
      querySnapshot.forEach((doc) => {
        leaderboardData.push({ id: doc.id, ...doc.data() });
      });

      // Sort the data by score in descending order.
      leaderboardData.sort((a, b) => b.score - a.score);

      setLeaderboard(leaderboardData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching leaderboard: ", error);
      setLoading(false);
    });

    // Clean up the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  // You can also add a placeholder function to add a score for testing purposes.
  // This would not be in a production app, but is useful for initial testing.
  const addSampleScore = async () => {
    try {
      const docRef = await addDoc(collection(db, 'leaderboard'), {
        username: `Player${Math.floor(Math.random() * 1000)}`,
        score: Math.floor(Math.random() * 5000),
        timestamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header section with a welcome message and a sign-out button */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Welcome to the Dashboard!
        </h1>
        {/* The sign-out button is passed as a prop from the main App component */}
        <button
          onClick={onSignOut}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Sign Out
        </button>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Leaderboard section */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h2>
          
          {/* Display loading state or the leaderboard content */}
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              <p className="ml-4 text-gray-500">Loading leaderboard...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Rank</th>
                    <th className="py-3 px-6 text-left">User</th>
                    <th className="py-3 px-6 text-left">Score</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry, index) => (
                      <tr key={entry.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <span className="font-bold">{index + 1}</span>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <span className="font-medium">{entry.username}</span>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <span className="font-bold text-indigo-600">{entry.score}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-6 text-center italic text-gray-500">
                        No leaderboard data yet. Add some scores!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* This button is for demonstration only, to add test data to Firestore */}
          <div className="mt-6 text-center">
             <button
              onClick={addSampleScore}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300"
            >
              Add Sample Score
            </button>
          </div>
        </div>

        {/* User Stats and other information */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Stats</h2>
          {/* Placeholder for user-specific stats */}
          <ul className="space-y-4 text-gray-700">
            <li className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <span className="font-semibold">Games Played:</span>
              <span className="font-bold text-indigo-600">--</span>
            </li>
            <li className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <span className="font-semibold">Quizzes Completed:</span>
              <span className="font-bold text-indigo-600">--</span>
            </li>
            <li className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <span className="font-semibold">Highest Score:</span>
              <span className="font-bold text-indigo-600">--</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* A section for quick links or announcements */}
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What's New?</h2>
        <p className="text-gray-600">
          We'll add new games and quiz topics soon. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
