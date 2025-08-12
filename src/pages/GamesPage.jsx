import React from 'react';

// This is the component for a single game card.
// We'll use this to display each game on the GamesPage.
const GameCard = ({ title, description, imageUrl, comingSoon }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-all duration-300 transform ${
        comingSoon ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl'
      }`}
    >
      {/* Placeholder for a game image or icon */}
      <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-200 rounded-full">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-full" />
        ) : (
          <span className="text-4xl text-gray-500">🎮</span>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {/* Button to play the game, disabled if it's not yet available */}
      <button
        disabled={comingSoon}
        className={`w-full py-2 rounded-xl font-semibold transition-all duration-300 ${
          comingSoon
            ? 'bg-gray-400 text-gray-700'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {comingSoon ? 'Coming Soon' : 'Play Now'}
      </button>
    </div>
  );
};

// This is the main GamesPage component.
const GamesPage = () => {
  // A sample array of game data. You can expand this later.
  const games = [
    {
      title: 'Trivia Challenge',
      description: 'Test your knowledge with a series of challenging trivia questions!',
      comingSoon: false,
    },
    {
      title: 'Bingo Blitz',
      description: 'Mark off your numbers and shout BINGO!',
      comingSoon: true,
    },
    {
      title: 'Word Scramble',
      description: 'Unscramble the letters to find the hidden word.',
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Games
      </h1>
      <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Choose a game from the list below and start playing! More games are on the way.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            description={game.description}
            comingSoon={game.comingSoon}
          />
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
