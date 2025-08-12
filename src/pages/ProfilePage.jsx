import React, { useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from '../firebase';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up an auth state listener to get user data
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading profile...</div>;
  }

  if (!user) {
    return <div className="profile-container"><p>Please sign in to view your profile.</p></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-header">My Profile</h1>
        
        <div className="profile-info-grid">
          <div className="profile-info-item">
            <span className="profile-label">User ID:</span>
            <span className="profile-value">{user.uid}</span>
          </div>
          <div className="profile-info-item">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{user.email || 'N/A'}</span>
          </div>
          <div className="profile-info-item">
            <span className="profile-label">Display Name:</span>
            <span className="profile-value">{user.displayName || 'N/A'}</span>
          </div>
          <div className="profile-info-item">
            <span className="profile-label">Created On:</span>
            <span className="profile-value">{user.metadata.creationTime}</span>
          </div>
        </div>
        
        <div className="profile-settings-section">
          <h2 className="settings-header">Account Settings</h2>
          <button className="btn-primary edit-profile-btn">
            Edit Profile
          </button>
        </div>
      </div>
      
      {/* Custom styles for the Profile page */}
      <style>{`
        .profile-container {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          min-height: calc(100vh - 8rem);
          padding: 2rem;
          background-color: var(--background-color);
        }

        .profile-card {
          background-color: var(--card-background-color);
          padding: 2.5rem;
          border-radius: 1.5rem;
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 48rem;
          text-align: center;
        }

        .profile-header {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 2rem;
        }
        
        .profile-info-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr;
          text-align: left;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .profile-info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .profile-info-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background-color: #f3f4f6;
          padding: 1.5rem;
          border-radius: 1rem;
        }
        
        .profile-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--secondary-text-color);
        }

        .profile-value {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-color);
          word-break: break-all;
        }

        .profile-settings-section {
          margin-top: 2rem;
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
        }
        
        .settings-header {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }
        
        .edit-profile-btn {
          padding: 1rem 2rem;
        }

        .loading-container {
          text-align: center;
          padding: 2rem;
          font-size: 1.25rem;
          color: var(--secondary-text-color);
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
