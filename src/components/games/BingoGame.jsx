import React, { useState, useEffect } from 'react';

const generateBingoCard = () => {
  const numbers = [];
  // Generate a random, unique set of numbers for the Bingo card
  while (numbers.length < 25) {
    const newNum = Math.floor(Math.random() * 75) + 1;
    if (!numbers.includes(newNum)) {
      numbers.push(newNum);
    }
  }
  return numbers;
};

const checkBingo = (card, selected) => {
  // All possible winning combinations (rows, columns, diagonals)
  const winningPatterns = [
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
  ];

  // Check if any winning pattern is completed
  for (const pattern of winningPatterns) {
    if (pattern.every(index => selected.includes(card[index]))) {
      return true;
    }
  }
  return false;
};

const BingoGame = ({ onBackToGames }) => {
  const [bingoCard, setBingoCard] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [isBingo, setIsBingo] = useState(false);
  const [message, setMessage] = useState('Click numbers to mark them!');

  useEffect(() => {
    // Generate a new card when the component mounts
    setBingoCard(generateBingoCard());
  }, []);

  const handleCellClick = (number) => {
    if (isBingo) return;
    
    // Toggle the selected state of the number
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(num => num !== number));
    } else {
      const newSelected = [...selectedNumbers, number];
      setSelectedNumbers(newSelected);
      // Check for Bingo after a new number is selected
      if (checkBingo(bingoCard, newSelected)) {
        setIsBingo(true);
        setMessage('BINGO! You won!');
      }
    }
  };

  const restartGame = () => {
    setBingoCard(generateBingoCard());
    setSelectedNumbers([]);
    setIsBingo(false);
    setMessage('Click numbers to mark them!');
  };

  return (
    <div className="bingo-container">
      <div className="bingo-card">
        <h1 className="bingo-header">Bingo Blitz</h1>
        <p className="bingo-message">{message}</p>
        
        <div className="bingo-grid">
          {bingoCard.map((number, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(number)}
              disabled={isBingo}
              className={`bingo-cell ${selectedNumbers.includes(number) ? 'selected-cell' : ''} ${isBingo ? 'bingo-win' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>

        <div className="button-group">
          <button onClick={restartGame} className="btn-primary" disabled={!isBingo}>
            Play Again
          </button>
          <button onClick={onBackToGames} className="btn-secondary">
            Back to Games
          </button>
        </div>
      </div>

      {/* Custom styles for the Bingo game */}
      <style>{`
        .bingo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 8rem);
          padding: 2rem;
          background-color: var(--background-color);
        }

        .bingo-card {
          background-color: var(--card-background-color);
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 40rem;
          text-align: center;
        }

        .bingo-header {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .bingo-message {
          font-size: 1.25rem;
          color: var(--secondary-text-color);
          margin-bottom: 2rem;
          height: 1.5rem; /* Maintain space */
        }
        
        .bingo-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .bingo-cell {
          background-color: #e2e8f0;
          color: var(--text-color);
          font-weight: 700;
          font-size: 1.25rem;
          border-radius: 0.5rem;
          aspect-ratio: 1 / 1; /* Keep cells square */
          border: none;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
        }

        .bingo-cell:hover:not(:disabled) {
          background-color: #cbd5e1;
          transform: scale(1.05);
        }

        .bingo-cell:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .selected-cell {
          background-color: var(--primary-color);
          color: white;
        }
        
        .bingo-win {
          animation: bingo-pulse 1.5s infinite;
        }
        
        .button-group {
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

        @keyframes bingo-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default BingoGame;
