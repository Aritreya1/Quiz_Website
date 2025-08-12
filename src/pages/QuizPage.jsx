import React, { useState } from 'react';

// Placeholder data for quizzes
const quizList = [
  {
    id: 1,
    title: "General Knowledge",
    description: "Test your knowledge on a wide range of topics.",
    difficulty: "Easy",
    image: "https://placehold.co/400x200/4f46e5/ffffff?text=General+Knowledge",
  },
  {
    id: 2,
    title: "Science & Nature",
    description: "Explore the world of science, from biology to physics.",
    difficulty: "Medium",
    image: "https://placehold.co/400x200/4f46e5/ffffff?text=Science+%26+Nature",
  },
  {
    id: 3,
    title: "History Buff",
    description: "Journey through time and test your historical facts.",
    difficulty: "Hard",
    image: "https://placehold.co/400x200/4f46e5/ffffff?text=History+Buff",
  },
  {
    id: 4,
    title: "Movie Trivia",
    description: "How well do you know your films and actors?",
    difficulty: "Easy",
    image: "https://placehold.co/400x200/4f46e5/ffffff?text=Movie+Trivia",
  },
  {
    id: 5,
    title: "Sports Mania",
    description: "A fun challenge for all the sports fans out there.",
    difficulty: "Medium",
    image: "https://placehold.co/400x200/4f46e5/ffffff?text=Sports+Mania",
  },
];

const QuizPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const startQuiz = (quizId) => {
    // Logic to start a quiz with a given ID
    console.log(`Starting quiz with ID: ${quizId}`);
    setSelectedQuiz(quizId);
    // Here you would navigate to the actual quiz component
  };

  const renderQuizContent = () => {
    if (selectedQuiz) {
      // Logic for displaying the quiz questions
      return (
        <div className="quiz-content">
          <button onClick={() => setSelectedQuiz(null)} className="back-btn">
            &larr; Back to Quizzes
          </button>
          <h2 className="quiz-title-inner">Quiz Questions will appear here!</h2>
          <p className="quiz-description-inner">
            You are currently playing the quiz with ID: {selectedQuiz}.
          </p>
        </div>
      );
    }
    
    // Display the list of quizzes
    return (
      <div className="quiz-page-container">
        <h1 className="quiz-page-header">Choose a Quiz</h1>
        <div className="quiz-card-grid">
          {quizList.map((quiz) => (
            <div
              key={quiz.id}
              className="quiz-card"
              onClick={() => startQuiz(quiz.id)}
            >
              <img src={quiz.image} alt={quiz.title} className="quiz-card-image" />
              <div className="quiz-card-content">
                <h2 className="quiz-card-title">{quiz.title}</h2>
                <p className="quiz-card-description">{quiz.description}</p>
                <span className={`quiz-card-difficulty ${quiz.difficulty.toLowerCase()}`}>
                  {quiz.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Custom styles for the Quiz page */}
        <style>{`
          .quiz-page-container {
            padding: 2rem;
            background-color: var(--background-color);
          }
          
          .quiz-page-header {
            font-size: 2.25rem;
            font-weight: 800;
            text-align: center;
            color: var(--text-color);
            margin-bottom: 2.5rem;
          }
          
          .quiz-card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1280px;
            margin: 0 auto;
          }
          
          .quiz-card {
            background-color: var(--card-background-color);
            border-radius: 1.5rem;
            box-shadow: var(--shadow);
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
          }
          
          .quiz-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          
          .quiz-card-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          
          .quiz-card-content {
            padding: 1.5rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }
          
          .quiz-card-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
          }
          
          .quiz-card-description {
            color: var(--secondary-text-color);
            margin-bottom: 1rem;
            flex-grow: 1;
          }
          
          .quiz-card-difficulty {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px; /* pill shape */
            font-size: 0.875rem;
            font-weight: 600;
          }

          .quiz-card-difficulty.easy {
            background-color: #d1fae5;
            color: #059669;
          }
          
          .quiz-card-difficulty.medium {
            background-color: #fef3c7;
            color: #f59e0b;
          }
          
          .quiz-card-difficulty.hard {
            background-color: #fee2e2;
            color: #ef4444;
          }

          .back-btn {
            background: none;
            border: none;
            color: var(--secondary-text-color);
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 1rem;
          }
          
          .quiz-title-inner {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-color);
            text-align: center;
          }
          
          .quiz-description-inner {
            font-size: 1.125rem;
            color: var(--secondary-text-color);
            text-align: center;
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="quiz-wrapper">
      {renderQuizContent()}
    </div>
  );
};

export default QuizPage;
