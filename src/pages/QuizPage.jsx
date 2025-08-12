import React, { useState } from 'react';
import { quizzes } from '../data/quizzes'; // Import the quiz data

const QuizPage = () => {
  // State for the currently selected quiz topic
  const [currentQuiz, setCurrentQuiz] = useState(null);
  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State for the user's score
  const [score, setScore] = useState(0);
  // State to check if the quiz is over
  const [showResults, setShowResults] = useState(false);
  // State to track the user's selected answer for the current question
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // State to manage if an answer has been chosen
  const [answerChosen, setAnswerChosen] = useState(false);

  // Function to handle the user's answer selection
  const handleAnswerClick = (answerIndex) => {
    if (!answerChosen) {
      setSelectedAnswer(answerIndex);
      setAnswerChosen(true);

      // Check if the answer is correct and update the score
      if (answerIndex === currentQuiz.questions[currentQuestionIndex].correctAnswerIndex) {
        setScore(score + 1);
      }
    }
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;

    // Reset states for the next question
    setSelectedAnswer(null);
    setAnswerChosen(false);

    if (nextQuestion < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      // If no more questions, show the results
      setShowResults(true);
    }
  };

  // Function to reset the quiz
  const restartQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
  };

  // ---------------- Render quiz topic selection screen -----------------
  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Choose a Quiz Topic
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              onClick={() => setCurrentQuiz(quiz)}
              className="bg-white rounded-2xl shadow-xl p-6 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-indigo-600 mb-2">
                {quiz.topic}
              </h2>
              <p className="text-gray-600">
                Test your knowledge with {quiz.questions.length} questions.
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------- Render quiz results screen -----------------
  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {currentQuiz.questions.length}.
          </p>
          <button
            onClick={restartQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // ---------------- Render active quiz questions -----------------
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const totalQuestions = currentQuiz.questions.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-right text-gray-500 mb-4">
          Question {currentQuestionIndex + 1} / {totalQuestions}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentQuestion.questionText}
        </h2>
        
        <div className="space-y-4">
          {currentQuestion.answerOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={answerChosen}
              className={`w-full py-3 px-4 text-left rounded-xl border-2 transition-all duration-300 transform
                ${
                  answerChosen
                    ? index === currentQuestion.correctAnswerIndex
                      ? 'bg-green-100 border-green-500 text-green-700 font-bold' // Correct answer
                      : index === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-700 font-bold' // Incorrect selected answer
                      : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' // Other options
                    : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
        
        {/* 'Next Question' button, visible only after an answer is chosen */}
        {answerChosen && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleNextQuestion}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'See Results' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
