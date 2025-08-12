import React, { useState, useEffect } from 'react';
import { db, auth, onSnapshot, collection, query, getDocs, addDoc, serverTimestamp } from '../firebase';

const DashboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userStats, setUserStats] = useState({
    gamesPlayed: 0,
    quizzesCompleted: 0,
    highestScore: 0,
  });

  // Use a state variable to hold the user's ID
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Set up an auth state listener to get the user ID
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    // Clean up the auth listener when the component unmounts
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // We only fetch data if a user ID is available
    if (!userId) return;

    // Set up a real-time listener for the leaderboard
    const leaderboardCollection = collection(db, 'artifacts', 'fun-quiz-website-leaderboard', 'public', 'data', 'leaderboard');
    const q = query(leaderboardCollection);
    
    // onSnapshot provides real-time updates
    const unsubscribeLeaderboard = onSnapshot(q, (snapshot) => {
      const leaderboardData = [];
      snapshot.forEach(doc => {
        leaderboardData.push({ id: doc.id, ...doc.data() });
      });
      // Sort the leaderboard by score in descending order
      leaderboardData.sort((a, b) => b.score - a.score);
      setLeaderboard(leaderboardData);
    }, (error) => {
      console.error("Error fetching leaderboard data:", error);
    });

    // Clean up the leaderboard listener when the component unmounts
    return () => unsubscribeLeaderboard();
  }, [userId]);

  // Handler for adding sample data for demonstration
  const handleAddSampleScore = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to add a score.");
        return;
      }
      
      const leaderboardCollectionRef = collection(db, 'artifacts', 'fun-quiz-website-leaderboard', 'public', 'data', 'leaderboard');
      
      // Add a document to the leaderboard with a sample score
      await addDoc(leaderboardCollectionRef, {
        user: user.email || 'Anonymous', // Use email if available, otherwise 'Anonymous'
        userId: user.uid,
        score: Math.floor(Math.random() * 100) + 1, // Random score for demo
        timestamp: serverTimestamp(),
      });
      console.log("Sample score added successfully!");
    } catch (error) {
      console.error("Error adding sample score:", error);
      alert("Failed to add sample score. Please check the console for details.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welcome to the Dashboard!</h1>
      </header>

      <section className="dashboard-section card">
        <h2 className="section-title">Leaderboard</h2>
        <p className="section-description">See how you stack up against other players!</p>
        
        <div className="leaderboard-table">
          <div className="table-header">
            <span className="rank-column">Rank</span>
            <span className="user-column">User</span>
            <span className="score-column">Score</span>
          </div>
          {leaderboard.length > 0 ? (
            leaderboard.map((item, index) => (
              <div key={item.id} className="table-row">
                <span className="rank-column">{index + 1}</span>
                <span className="user-column">{item.user}</span>
                <span className="score-column">{item.score}</span>
              </div>
            ))
          ) : (
            <p className="no-data">No leaderboard data yet. Add some scores!</p>
          )}
        </div>
        <button onClick={handleAddSampleScore} className="btn-primary add-score-btn">
          Add Sample Score
        </button>
      </section>

      <section className="dashboard-section card">
        <h2 className="section-title">Your Stats</h2>
        <ul className="stats-list">
          <li className="stats-item">Games Played: --</li>
          <li className="stats-item">Quizzes Completed: --</li>
          <li className="stats-item">Highest Score: --</li>
        </ul>
      </section>

      <section className="dashboard-section card">
        <h2 className="section-title">What's New?</h2>
        <p className="whats-new-text">
          We'll add new games and quiz topics soon. Stay tuned!
        </p>
      </section>

      {/* Adding custom styles for the dashboard */}
      <style>{`
        .dashboard-container {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .dashboard-title {
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-color);
        }

        .dashboard-section {
          padding: 2rem;
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--primary-color);
        }

        .section-description {
          color: var(--secondary-text-color);
          margin-bottom: 1.5rem;
        }

        .leaderboard-table {
          width: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .table-header, .table-row {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr;
          gap: 1rem;
          padding: 1rem;
          text-align: left;
        }

        .table-header {
          background-color: var(--primary-color);
          color: white;
          font-weight: 700;
        }

        .table-row {
          background-color: var(--card-background-color);
          border-bottom: 1px solid var(--border-color);
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .rank-column, .user-column, .score-column {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .no-data {
          padding: 1rem;
          text-align: center;
          color: var(--secondary-text-color);
        }

        .add-score-btn {
          width: auto;
          align-self: center;
        }
        
        .stats-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .stats-item {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-color);
        }

        .stats-item:last-child {
          border-bottom: none;
        }

        .whats-new-text {
          font-style: italic;
          color: var(--secondary-text-color);
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
