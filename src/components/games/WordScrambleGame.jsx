import React, { useState, useEffect, useRef } from 'react';

const wordList = [
  "react", "javascript", "tailwind", "firebase", "component",
  "developer", "programming", "database", "computer", "challenge"
];

// Fisher-Yates shuffle algorithm to scramble a word
const shuffleWord = (word) => {
  let array = word.split('');
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array.join('');
};

const WordScrambleGame = ({ onBackToGames }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isGameActive, setIsGameActive] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    startNewRound();
  }, []);

  // Function to start a new round
  const startNewRound = () => {
    const newWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(newWord);
    setScrambledWord(shuffleWord(newWord));
    setUserGuess('');
    setMessage('');
    setIsGameActive(true);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    if (!isGameActive) return;

    if (userGuess.toLowerCase() === currentWord.toLowerCase()) {
      setMessage('Correct! You got it!');
      setIsGameActive(false);
    } else {
      setMessage('Incorrect, try again!');
    }
  };

  const handleRestart = () => {
    startNewRound();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const handleNextWord = () => {
    startNewRound();
  };

  return (
    <div className="word-scramble-container">
      <div className="game-card">
        <h1 className="game-title">Word Scramble</h1>
        
        <p className="scrambled-word">{scrambledWord}</p>
        
        <p className="message">{message}</p>

        <form onSubmit={handleGuess} className="guess-form">
          <input
            ref={inputRef}
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Enter your guess"
            disabled={!isGameActive}
            className="input-field"
          />
          <button type="submit" disabled={!isGameActive} className="btn-primary guess-btn">
            Guess
          </button>
        </form>
        
        <div className="action-buttons">
          <button onClick={handleNextWord} disabled={isGameActive} className="btn-secondary">
            Next Word
          </button>
          <button onClick={handleRestart} className="btn-primary">
            Restart Game
          </button>
          <button onClick={onBackToGames} className="btn-secondary">
            Back to Games
          </button>
        </div>
      </div>
      
      {/* Custom styles for the Word Scramble game */}
      <style>{`
        .word-scramble-container {
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
          max-width: 32rem;
          text-align: center;
        }

        .game-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 2rem;
        }

        .scrambled-word {
          font-family: 'Courier New', Courier, monospace;
          font-size: 3rem;
          font-weight: 700;
          letter-spacing: 0.5rem;
          color: var(--text-color);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .message {
          height: 1.5rem;
          font-weight: 600;
          color: var(--secondary-text-color);
          margin-bottom: 1.5rem;
        }

        .guess-form {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .input-field {
          flex-grow: 1;
          padding: 0.75rem;
          border-radius: 0.75rem;
          border: 2px solid var(--border-color);
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .input-field:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .guess-btn {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        }

        .guess-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        
        .btn-secondary {
          background-color: #e5e7eb;
          color: var(--secondary-text-color);
          font-weight: 700;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          transition: all 0.3s ease-in-out;
          transform: scale(1);
          box-shadow: var(--shadow);
          border: none;
          cursor: pointer;
        }

        .btn-secondary:hover {
          background-color: #d1d5db;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default WordScrambleGame;
