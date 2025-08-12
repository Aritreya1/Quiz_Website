import React, { useState } from 'react';

const choices = ['rock', 'paper', 'scissors'];

const RockPaperScissorsGame = ({ onBackToGames }) => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ user: 0, computer: 0 });

  const determineWinner = (user, computer) => {
    if (user === computer) {
      return 'draw';
    } else if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      return 'user';
    } else {
      return 'computer';
    }
  };

  const handleUserChoice = (choice) => {
    const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    const winner = determineWinner(choice, computerRandomChoice);

    setUserChoice(choice);
    setComputerChoice(computerRandomChoice);
    setResult(winner);

    if (winner === 'user') {
      setScore({ ...score, user: score.user + 1 });
    } else if (winner === 'computer') {
      setScore({ ...score, computer: score.computer + 1 });
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  const restartScore = () => {
    setScore({ user: 0, computer: 0 });
    resetGame();
  };
  
  const getResultMessage = () => {
    if (result === 'user') {
      return 'You win!';
    } else if (result === 'computer') {
      return 'Computer wins!';
    } else if (result === 'draw') {
      return "It's a draw!";
    }
    return '';
  };
  
  const getIcon = (choice) => {
    switch(choice) {
      case 'rock': return '✊';
      case 'paper': return '✋';
      case 'scissors': return '✌️';
      default: return '';
    }
  };
  
  return (
    <div className="game-container">
      <div className="game-card">
        <h1 className="game-title">Rock, Paper, Scissors</h1>

        <div className="score-board">
          <div className="score-item">
            <span className="score-label">Your Score</span>
            <span className="score-value">{score.user}</span>
          </div>
          <div className="score-item">
            <span className="score-label">Computer Score</span>
            <span className="score-value">{score.computer}</span>
          </div>
        </div>

        <div className="choices-container">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleUserChoice(choice)}
              className="choice-button"
            >
              <span className="choice-icon">{getIcon(choice)}</span>
              {choice}
            </button>
          ))}
        </div>

        {userChoice && (
          <div className="result-container">
            <p className="selection-text">You chose: <span className="selection-choice">{getIcon(userChoice)} {userChoice}</span></p>
            <p className="selection-text">Computer chose: <span className="selection-choice">{getIcon(computerChoice)} {computerChoice}</span></p>
            <h2 className="result-message">{getResultMessage()}</h2>
          </div>
        )}

        <div className="button-group">
          <button onClick={resetGame} className="btn-secondary">
            Play Again
          </button>
          <button onClick={restartScore} className="btn-secondary">
            Restart Score
          </button>
          <button onClick={onBackToGames} className="btn-primary">
            Back to Games
          </button>
        </div>
      </div>
      
      {/* Custom styles for the Rock, Paper, Scissors game */}
      <style>{`
        .game-container {
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
          max-width: 38rem;
          text-align: center;
        }

        .game-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 2rem;
        }
        
        .score-board {
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: #f3f4f6;
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .score-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .score-label {
          font-size: 1rem;
          color: var(--secondary-text-color);
          font-weight: 600;
        }

        .score-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-color);
        }

        .choices-container {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .choice-button {
          background-color: var(--secondary-color);
          color: white;
          padding: 1rem;
          border-radius: 1rem;
          border: none;
          cursor: pointer;
          font-weight: 700;
          font-size: 1.25rem;
          text-transform: capitalize;
          transition: transform 0.2s, background-color 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          min-width: 8rem;
        }

        .choice-button:hover {
          background-color: var(--primary-color);
          transform: translateY(-5px);
        }
        
        .choice-icon {
          font-size: 2.5rem;
        }

        .result-container {
          margin-bottom: 2rem;
        }

        .selection-text {
          font-size: 1.25rem;
          color: var(--secondary-text-color);
          margin-bottom: 0.5rem;
        }
        
        .selection-choice {
          font-weight: 700;
          color: var(--primary-color);
          text-transform: capitalize;
        }

        .result-message {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-color);
          margin-top: 1rem;
        }

        .button-group {
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
        
        .btn-primary {
          background-color: var(--primary-color);
          color: white;
          font-weight: 700;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          transition: all 0.3s ease-in-out;
          transform: scale(1);
          box-shadow: var(--shadow);
          border: none;
          cursor: pointer;
        }
        
        .btn-primary:hover {
          background-color: var(--primary-hover-color);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default RockPaperScissorsGame;
