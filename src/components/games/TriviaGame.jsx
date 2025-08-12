import React, { useState } from 'react';

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
    answer: "Harper Lee",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    answer: "H2O",
  },
];

const TriviaGame = ({ onBackToGames }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [message, setMessage] = useState('');

  // Function to handle a user's answer choice
  const handleAnswerOptionClick = (selectedOption) => {
    const isCorrect = selectedOption === triviaQuestions[currentQuestionIndex].answer;
    
    if (isCorrect) {
      setScore(score + 1);
      setMessage('Correct!');
    } else {
      setMessage(`Incorrect! The answer was ${triviaQuestions[currentQuestionIndex].answer}.`);
    }

    const nextQuestion = currentQuestionIndex + 1;
    setTimeout(() => {
      if (nextQuestion < triviaQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setMessage('');
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  // Function to reset the game
  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setMessage('');
  };

  return (
    <div className="game-container">
      {showScore ? (
        <div className="game-over-card">
          <h2 className="game-over-header">Game Over!</h2>
          <p className="game-over-message">You scored {score} out of {triviaQuestions.length}!</p>
          <div className="game-over-buttons">
            <button onClick={restartGame} className="btn-primary">
              Play Again
            </button>
            <button onClick={onBackToGames} className="btn-secondary">
              Back to Games
            </button>
          </div>
        </div>
      ) : (
        <div className="trivia-card">
          <h2 className="question-number">Question {currentQuestionIndex + 1}/{triviaQuestions.length}</h2>
          <p className="question-text">{triviaQuestions[currentQuestionIndex].question}</p>
          <div className="options-grid">
            {triviaQuestions[currentQuestionIndex].options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleAnswerOptionClick(option)} 
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
          <p className="feedback-message">{message}</p>
          <button onClick={onBackToGames} className="back-btn">
              Back to Games
          </button>
        </div>
      )}

      {/* Custom styles for the Trivia game */}
      <style>{`
        .game-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 8rem); /* Adjust for navbar height */
          padding: 2rem;
          background-color: var(--background-color);
        }

        .trivia-card, .game-over-card {
          background-color: var(--card-background-color);
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 40rem;
          text-align: center;
        }
        
        .game-over-header {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }
        
        .game-over-message {
          font-size: 1.25rem;
          color: var(--text-color);
          margin-bottom: 2rem;
        }

        .game-over-buttons {
          display: flex;
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

        .question-number {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .question-text {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-color);
          margin-bottom: 2rem;
        }

        .options-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .option-button {
          background-color: var(--secondary-color);
          color: white;
          padding: 1rem;
          font-size: 1.125rem;
          font-weight: 600;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s;
        }

        .option-button:hover {
          background-color: var(--primary-color);
          transform: translateY(-2px);
        }

        .feedback-message {
          height: 1.5rem;
          font-weight: 600;
          font-size: 1rem;
          color: var(--primary-color);
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

        @media (min-width: 768px) {
          .options-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default TriviaGame;
