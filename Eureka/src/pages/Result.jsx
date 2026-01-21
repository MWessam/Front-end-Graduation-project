import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Result.css';

const Result = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  useEffect(() => {
    // Get quiz results from localStorage
    const storedResults = localStorage.getItem('quizResults');
    if (storedResults) {
      setQuizData(JSON.parse(storedResults));
    } else {
      // If no results, redirect to quiz
      navigate('/quiz');
    }
  }, [navigate]);

  const handleRetry = () => {
    localStorage.removeItem('quizResults');
    navigate('/quiz');
  };

  const handleReview = () => {
    setShowDetailedResults(!showDetailedResults);
  };

  if (!quizData) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center min-h-screen bg-background-light dark:bg-background-dark">
        <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
      </div>
    );
  }

  const { score, totalQuestions, userAnswers, questions } = quizData;
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 antialiased">
      <header className="w-full max-w-4xl text-center mb-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="w-16 h-16">
            <img
              alt="A computer monitor with code on screen"
              className="w-full h-full object-contain"
              src="images/calcculate 1.png"
            />
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quiz Results</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Programming Fundamentals - Functions</p>
          </div>
        </div>
      </header>

      <main className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="text-center">
          {/* Score Display */}
          <div className="mb-8">
            <div
              className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold mb-4 ${
                isPassing
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              }`}
            >
              {percentage}%
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isPassing ? 'Congratulations!' : 'Keep Practicing!'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You scored {score} out of {totalQuestions} questions
            </p>
          </div>

          {/* Performance Message */}
          <div
            className={`p-4 rounded-lg mb-6 ${
              isPassing
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
            }`}
          >
            <p className={`font-semibold ${isPassing ? 'text-green-800 dark:text-green-300' : 'text-yellow-800 dark:text-yellow-300'}`}>
              {isPassing
                ? 'Great job! You have a solid understanding of functions.'
                : 'You need more practice. Review the concepts and try again!'}
            </p>
          </div>
        </div>

        {/* Detailed Results */}
        {showDetailedResults && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detailed Results</h2>
            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border ${
                      isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <span
                        className={`material-icons ${
                          isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {isCorrect ? 'check_circle' : 'cancel'}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Question {index + 1}: {question.question}
                        </h3>
                        <div className="space-y-2 mt-3">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = optionIndex === userAnswer;
                            const isCorrectAnswer = optionIndex === question.correctAnswer;

                            let optionClass = 'p-3 rounded-lg border text-sm';
                            if (isCorrectAnswer) {
                              optionClass += ' bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 font-semibold';
                            } else if (isUserAnswer && !isCorrect) {
                              optionClass += ' bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300';
                            } else {
                              optionClass += ' bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300';
                            }

                            return (
                              <div key={optionIndex} className={optionClass}>
                                {option}
                                {isCorrectAnswer && <span className="ml-2">✓ Correct Answer</span>}
                                {isUserAnswer && !isCorrectAnswer && <span className="ml-2">✗ Your Answer</span>}
                              </div>
                            );
                          })}
                        </div>
                        {question.explanation && (
                          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 italic">{question.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="w-full max-w-4xl mt-8 flex justify-between">
        <button
          onClick={handleRetry}
          className="flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="material-icons">refresh</span>
          <span>Retry Quiz</span>
        </button>

        <button
          onClick={handleReview}
          className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90 transition-opacity"
        >
          <span>{showDetailedResults ? 'Hide Details' : 'Review Answers'}</span>
          <span className="material-icons">list_alt</span>
        </button>
      </footer>
    </div>
  );
};

export default Result;
