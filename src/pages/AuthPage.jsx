import React, { useState } from 'react';
// Import the Firebase auth object from your firebase.js file.
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase';

// This is a basic authentication form component for sign-in and sign-up.
const AuthForm = ({ formType, onAuthSuccess, onMessage, onReturn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handles the form submission for either sign-in or sign-up.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (formType === 'signup') {
        // Attempt to create a new user with email and password.
        await createUserWithEmailAndPassword(auth, email, password);
        onMessage('success', 'Successfully signed up! You are now logged in.');
        onAuthSuccess(); // Call a function to handle successful auth (e.g., redirect to dashboard)
      } else {
        // Attempt to sign in an existing user.
        await signInWithEmailAndPassword(auth, email, password);
        onMessage('success', 'Successfully signed in!');
        onAuthSuccess();
      }
    } catch (e) {
      // Handle different Firebase authentication errors.
      let errorMessage = 'An unknown error occurred.';
      switch (e.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use. Please try to sign in or use a different email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please enable them in your Firebase console.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please use a stronger password.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password.';
          break;
        default:
          errorMessage = e.message;
      }
      onMessage('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {formType === 'signup' ? 'Create an Account' : 'Welcome Back'}
        </h2>
        {/* Input for the user's email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="your_email@example.com"
          />
        </div>
        {/* Input for the user's password */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="********"
          />
        </div>
        {/* Submit button for the form */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
          >
            {loading ? 'Processing...' : (formType === 'signup' ? 'Sign Up' : 'Sign In')}
          </button>
          <button
            type="button"
            onClick={onReturn}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors duration-200"
          >
            Go back
          </button>
        </div>
      </form>
    </div>
  );
};

// The main AuthPage component that handles the different views and messages.
const AuthPage = ({ onAuthSuccess }) => {
  const [currentView, setCurrentView] = useState('landing');
  const [message, setMessage] = useState({ type: null, text: '' });

  // Function to display a message to the user
  const handleMessage = (type, text) => {
    setMessage({ type, text });
  };

  // Renders the appropriate view based on the current state.
  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="text-center mb-10">
              <h1 className="text-6xl font-extrabold text-gray-900 mb-4 animate-fadeInDown">
                Welcome to Our Awesome App!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeInUp">
                Your one-stop destination for fun games, challenging quizzes, and a great community.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => { setCurrentView('signin'); setMessage({ type: null, text: '' }); }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
              >
                Sign In
              </button>
              <button
                onClick={() => { setCurrentView('signup'); setMessage({ type: null, text: '' }); }}
                className="bg-white text-indigo-600 border border-indigo-600 font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
              >
                Sign Up
              </button>
            </div>
          </div>
        );
      case 'signin':
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <AuthForm
              formType="signin"
              onAuthSuccess={onAuthSuccess}
              onMessage={handleMessage}
              onReturn={() => setCurrentView('landing')}
            />
          </div>
        );
      case 'signup':
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <AuthForm
              formType="signup"
              onAuthSuccess={onAuthSuccess}
              onMessage={handleMessage}
              onReturn={() => setCurrentView('landing')}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-800">
      {renderView()}

      {/* Message Box for success or error messages */}
      {message.type && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 p-4 rounded-xl shadow-lg z-50 animate-fadeInUp">
          <div
            className={`flex items-center space-x-3 p-4 rounded-xl shadow-lg
              ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
          >
            <span className="text-xl">
              {message.type === 'success' ? '✅' : '❌'}
            </span>
            <p className="font-semibold">{message.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
