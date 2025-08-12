import React, { useState, useEffect } from 'react';

const GuessTheNumberGame = ({ onBackToGames }) => {
  const [secretNumber, setSecretNumber] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100!');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize the game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newSecretNumber = Math.floor(Math.random() * 100) + 1;
    setSecretNumber(newSecretNumber);
    setUserGuess('');
    setMessage('Guess a number between 1 and 100!');
    setAttempts(0);
    setGameOver(false);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    const guess = parseInt(userGuess, 10);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (guess === secretNumber) {
      setMessage(`You got it! The number was ${secretNumber}. It took you ${attempts + 1} attempts.`);
      setGameOver(true);
    } else if (guess > secretNumber) {
      setMessage('Too high! Try again.');
    } else {
      setMessage('Too low! Try again.');
    }
  };

  return (
    <div className="number-game-container">
      <div className="game-card">
        <h1 className="game-title">Guess the Number</h1>
        <p className="game-message">{message}</p>
        
        {!gameOver ? (
          <form onSubmit={handleGuess} className="guess-form">
            <input
              type="number"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Enter your guess"
              min="1"
              max="100"
              required
              className="input-field"
            />
            <button type="submit" className="btn-primary guess-btn">
              Submit Guess
            </button>
          </form>
        ) : (
          <div className="game-over-buttons">
            <button onClick={startNewGame} className="btn-primary">
              Play Again
            </button>
          </div>
        )}
        
        <p className="attempts-text">Attempts: {attempts}</p>

        <button onClick={onBackToGames} className="back-btn">
          Back to Games
        </button>
      </div>

      {/* Custom styles for the Guess the Number game */}
      <style>{`
        .number-game-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 8rem);
          padding: 2rem;
          background-color: var(--background-color);
        }

        .game-card {
          background-color: var(--card-background-color);
          padding: 2.5rem;
          border-radius: 1.5rem;
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 30rem;
          text-align: center;
        }

        .game-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }

        .game-message {
          height: 1.5rem;
          font-weight: 600;
          color: var(--secondary-text-color);
          margin-bottom: 2rem;
        }

        .guess-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-field {
          width: 100%;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 2px solid var(--border-color);
          font-size: 1.125rem;
          text-align: center;
          transition: border-color 0.2s;
        }

        .input-field:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .guess-btn {
          padding: 1rem 1.5rem;
        }

        .attempts-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-color);
          margin-top: 1.5rem;
        }
        
        .game-over-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .back-btn {
          background: none;
          border: none;
          color: var(--secondary-text-color);
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default GuessTheNumberGame;
