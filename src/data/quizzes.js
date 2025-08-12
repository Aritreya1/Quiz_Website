// src/data/quizzes.js

// This file contains all the quiz data for your application.
// We've structured it as an array of quiz objects, with each object
// representing a different topic.

export const quizzes = [
  {
    topic: 'General Knowledge',
    questions: [
      {
        questionText: 'What is the capital of France?',
        answerOptions: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswerIndex: 2,
      },
      {
        questionText: 'Which planet is known as the Red Planet?',
        answerOptions: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
        correctAnswerIndex: 0,
      },
      {
        questionText: 'Who painted the Mona Lisa?',
        answerOptions: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correctAnswerIndex: 1,
      },
      {
        questionText: 'What is the largest ocean on Earth?',
        answerOptions: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswerIndex: 3,
      },
      {
        questionText: 'What is the powerhouse of the cell?',
        answerOptions: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cytoplasm'],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    topic: 'Sports',
    questions: [
      {
        questionText: 'How many players are on a standard soccer team?',
        answerOptions: ['10', '11', '9', '12'],
        correctAnswerIndex: 1,
      },
      {
        questionText: 'Which country won the first-ever FIFA World Cup?',
        answerOptions: ['Brazil', 'Italy', 'Uruguay', 'Germany'],
        correctAnswerIndex: 2,
      },
      {
        questionText: 'What is the national sport of Japan?',
        answerOptions: ['Karate', 'Judo', 'Sumo Wrestling', 'Kendo'],
        correctAnswerIndex: 2,
      },
      {
        questionText: 'How many holes are on a standard golf course?',
        answerOptions: ['12', '15', '18', '21'],
        correctAnswerIndex: 2,
      },
      {
        questionText: 'In tennis, what score is referred to as "love"?',
        answerOptions: ['15', '30', '40', '0'],
        correctAnswerIndex: 3,
      },
    ],
  },
  {
    topic: 'Science',
    questions: [
      {
        questionText: 'What is the chemical symbol for water?',
        answerOptions: ['O2', 'H2O', 'CO2', 'NaCl'],
        correctAnswerIndex: 1,
      },
      {
        questionText: 'What is the nearest planet to the sun?',
        answerOptions: ['Earth', 'Venus', 'Mercury', 'Mars'],
        correctAnswerIndex: 2,
      },
      {
        questionText: 'What force keeps the planets in orbit around the sun?',
        answerOptions: ['Gravity', 'Magnetism', 'Friction', 'Tension'],
        correctAnswerIndex: 0,
      },
      {
        questionText: 'What is the largest organ in the human body?',
        answerOptions: ['Heart', 'Brain', 'Liver', 'Skin'],
        correctAnswerIndex: 3,
      },
      {
        questionText: 'Which element is most abundant in the Earth’s atmosphere?',
        answerOptions: ['Oxygen', 'Hydrogen', 'Carbon Dioxide', 'Nitrogen'],
        correctAnswerIndex: 3,
      },
    ],
  },
];
