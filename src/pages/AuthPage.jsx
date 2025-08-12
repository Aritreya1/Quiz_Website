import React, { useState } from 'react';
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from '../firebase';

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission for both login and sign up
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess(); // Call the success handler on successful authentication
    } catch (err) {
      // Catch specific Firebase errors and display a user-friendly message
      if (err.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else if (err.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      } else if (err.code === 'auth/weak-password') {
        setError('The password must be at least 6 characters long.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-header">{isLogin ? 'Log In' : 'Sign Up'}</h1>
        
        {/* Display error message if there is one */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-field"
          />
          
          <button type="submit" disabled={loading} className="btn-primary auth-btn">
            {loading ? 'Loading...' : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <p className="toggle-auth-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-auth-btn"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
      
      {/* We'll add some new custom CSS rules for the auth page */}
      <style>{`
        .auth-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: var(--background-color);
          padding: 2rem;
        }

        .auth-card {
          background-color: var(--card-background-color);
          padding: 2.5rem;
          border-radius: 1.5rem;
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 28rem;
          text-align: center;
        }

        .auth-header {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-color);
          margin-bottom: 2rem;
        }

        .error-message {
          color: #ef4444;
          background-color: #fecaca;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
          border: 1px solid #f87171;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .input-field {
          width: 100%;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 2px solid var(--border-color);
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .input-field:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .auth-btn {
          width: 100%;
          padding: 1rem;
        }

        .auth-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .toggle-auth-text {
          color: var(--secondary-text-color);
          font-size: 1rem;
          margin-top: 1.5rem;
        }

        .toggle-auth-btn {
          background: none;
          border: none;
          color: var(--primary-color);
          font-weight: 600;
          cursor: pointer;
          margin-left: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
