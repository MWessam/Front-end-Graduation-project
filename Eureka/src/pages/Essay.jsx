import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Essay.css';

const Essay = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const questions = [
    {
      id: 1,
      question: 'Explain the concept of a function in programming. What are its main benefits?',
      keywords: ['reusable', 'modular', 'organized', 'code']
    },
    {
      id: 2,
      question: 'Describe the difference between parameters and arguments in functions.',
      keywords: ['parameters', 'arguments', 'definition', 'call']
    },
    {
      id: 3,
      question: 'What is function scope? Explain local and global scope.',
      keywords: ['scope', 'local', 'global', 'variable']
    },
    {
      id: 4,
      question: 'Explain recursion in programming. Provide an example use case.',
      keywords: ['recursion', 'calls itself', 'base case', 'example']
    },
    {
      id: 5,
      question: 'What are lambda functions? When would you use them?',
      keywords: ['lambda', 'anonymous', 'inline', 'short']
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestionIndex] || '';

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const checkAnswer = () => {
    const answer = currentAnswer.toLowerCase();
    const keywords = currentQuestion.keywords.map(k => k.toLowerCase());
    const foundKeywords = keywords.filter(keyword => answer.includes(keyword));

    if (foundKeywords.length >= keywords.length * 0.6) {
      // Good answer - show success
      setShowSuccessModal(true);
    } else {
      // Needs improvement - show error with suggestions
      const missingKeywords = keywords.filter(k => !answer.includes(k));
      setSuggestions(missingKeywords);
      setShowErrorModal(true);
    }
  };

  const handleNext = () => {
    if (currentAnswer.trim() === '') {
      alert('Please provide an answer before proceeding.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowSuccessModal(false);
      setShowErrorModal(false);
    } else {
      // Submit quiz
      submitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowSuccessModal(false);
      setShowErrorModal(false);
    }
  };

  const submitQuiz = () => {
    // Store results and navigate to results page
    localStorage.setItem(
      'essayResults',
      JSON.stringify({
        answers: answers,
        questions: questions
      })
    );
    navigate('/essay-result');
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 antialiased min-h-screen">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Essay Questions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Test your understanding with detailed written responses</p>

        {/* Progress Bar */}
        <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>
            Question {currentQuestionIndex + 1}/{questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </header>

      {/* Quiz Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Question {currentQuestionIndex + 1}: {currentQuestion.question}
        </h2>
        <textarea
          value={currentAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Type your answer here..."
        />
        <div className="mt-4">
          <button
            onClick={checkAnswer}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Check Answer
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          className={`flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            currentQuestionIndex === 0 ? 'opacity-0 pointer-events-none' : ''
          }`}
        >
          <span className="material-icons">arrow_back</span>
          Previous
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next Question'}
          <span className="material-icons">arrow_forward</span>
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-green-600 dark:text-green-400 text-3xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Correct!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Your answer demonstrates good understanding of the concept.</p>
            <button
              onClick={handleModalClose}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-red-600 dark:text-red-400 text-3xl">error</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Needs Improvement</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Your answer is missing some key concepts.</p>
            <div className="text-left bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6 text-sm">
              <p className="font-semibold mb-2">Consider including:</p>
              <ul className="list-disc list-inside space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-yellow-800 dark:text-yellow-300">{suggestion}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleModalClose}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Essay;
