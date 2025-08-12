import React, { useState } from 'react';
import TriviaGame from '../components/games/TriviaGame';
import BingoGame from '../components/games/BingoGame';
import WordScrambleGame from '../components/games/WordScrambleGame';
import GuessTheNumberGame from '../components/games/GuessTheNumberGame';
import RockPaperScissorsGame from '../components/games/RockPaperScissorsGame';

// This component acts as the main game page, handling game selection and rendering.
const GamesPage = () => {
  // State to track which game is currently selected.
  const [currentGame, setCurrentGame] = useState(null);

  // A list of all available games for the selection menu.
  const games = [
    { id: 'trivia', name: 'Trivia Challenge', description: 'Test your general knowledge!' },
    { id: 'bingo', name: 'Bingo Blitz', description: 'Mark your card and call BINGO!' },
    { id: 'wordscramble', name: 'Word Scramble', description: 'Unscramble the letters to find the word.' },
    { id: 'guessthenumber', name: 'Guess the Number', description: 'Can you guess the secret number?' },
    { id: 'rockpaperscissors', name: 'Rock, Paper, Scissors', description: 'The classic game of chance.' },
  ];

  // A function to render the correct game component based on the state.
  const renderGame = () => {
    switch (currentGame) {
      case 'trivia':
        return <TriviaGame onBackToGames={() => setCurrentGame(null)} />;
      case 'bingo':
        return <BingoGame onBackToGames={() => setCurrentGame(null)} />;
      case 'wordscramble':
        return <WordScrambleGame onBackToGames={() => setCurrentGame(null)} />;
      case 'guessthenumber':
        return <GuessTheNumberGame onBackToGames={() => setCurrentGame(null)} />;
      case 'rockpaperscissors':
        return <RockPaperScissorsGame onBackToGames={() => setCurrentGame(null)} />;
      default:
        // This is the default view, showing the game selection menu.
        return (
          <div className="games-page-container">
            <h1 className="games-header">Choose a Game</h1>
            <div className="game-card-grid">
              {games.map((game) => (
                <div
                  key={game.id}
                  onClick={() => setCurrentGame(game.id)}
                  className="game-card"
                >
                  <h2 className="game-card-title">
                    {game.name}
                  </h2>
                  <p className="game-card-description">
                    {game.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Adding the custom styles for this page directly for simplicity */}
            <style>{`
              .games-page-container {
                padding: 2rem;
                background-color: var(--background-color);
              }
              
              .games-header {
                font-size: 2.25rem;
                font-weight: 800;
                text-align: center;
                color: var(--text-color);
                margin-bottom: 2.5rem;
              }
              
              .game-card-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
                max-width: 1280px;
                margin: 0 auto;
              }
              
              .game-card {
                background-color: var(--card-background-color);
                border-radius: 1.5rem;
                box-shadow: var(--shadow);
                padding: 1.5rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
              }
              
              .game-card:hover {
                transform: translateY(-5px) scale(1.02);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
              }
              
              .game-card-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary-color);
                margin-bottom: 0.5rem;
              }
              
              .game-card-description {
                color: var(--secondary-text-color);
              }
            `}</style>
          </div>
        );
    }
  };

  return (
    <div className="games-wrapper">
      {renderGame()}
    </div>
  );
};

export default GamesPage;
