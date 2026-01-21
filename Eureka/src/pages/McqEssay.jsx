import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './McqEssay.css';

const McqEssay = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const questions = [
    {
      id: 1,
      type: 'mcq',
      question: 'What is the primary purpose of a function in programming?',
      options: [
        'To store data and variables',
        'To encapsulate a piece of code for reuse',
        'To style the user interface',
        'To slow down the program execution'
      ],
      correctAnswer: 1,
      explanation: 'Functions are key to writing modular, reusable, and maintainable code.'
    },
    {
      id: 2,
      type: 'mcq',
      question: 'Which keyword is used to define a function in Python?',
      options: ['function', 'def', 'define', 'func'],
      correctAnswer: 1,
      explanation: "In Python, the 'def' keyword is used to define a function."
    },
    {
      id: 3,
      type: 'mcq',
      question: "What does the 'return' statement do in a function?",
      options: [
        'Stops the function execution',
        'Prints a value to the console',
        'Sends a value back to the calling code',
        'Defines a new variable'
      ],
      correctAnswer: 2,
      explanation: "The 'return' statement sends a value back to the code that called the function."
    },
    {
      id: 4,
      type: 'essay',
      question: 'Explain the concept of function scope and how it affects variable accessibility in different parts of a program.',
      minWords: 60,
      keyConcepts: ['scope', 'local variables', 'global variables', 'accessibility'],
      modelAnswer: 'Function scope determines where variables can be accessed within a program. Variables declared inside a function have local scope and are only accessible within that function. Variables declared outside functions have global scope and can be accessed from anywhere in the program. This affects variable accessibility by preventing naming conflicts, controlling data access, and managing memory usage. Understanding scope is crucial for avoiding bugs and writing maintainable code.'
    },
    {
      id: 5,
      type: 'essay',
      question: 'Discuss the importance of return values in functions and how they facilitate data flow between different parts of a program.',
      minWords: 55,
      keyConcepts: ['return values', 'data flow', 'function output', 'program communication'],
      modelAnswer: 'Return values are crucial in functions as they allow the function to send data back to the calling code. This facilitates data flow between different program parts by enabling functions to process information and provide results that can be used elsewhere. Return values make functions more versatile and reusable, as they can be integrated into larger expressions, assigned to variables, or passed to other functions. Without return values, functions would be limited to performing actions without communicating their outcomes.'
    }
  ];

  useEffect(() => {
    setUserAnswers(new Array(questions.length).fill(null));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const userAnswer = userAnswers[currentQuestionIndex];

  const handleMCQSelect = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleEssayChange = (value) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = value;
    setUserAnswers(newAnswers);
  };

  const getWordCount = (text) => {
    return text ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
  };

  const canProceed = () => {
    if (currentQuestion.type === 'mcq') {
      return userAnswer !== null;
    } else if (currentQuestion.type === 'essay') {
      const wordCount = getWordCount(userAnswer);
      return wordCount >= currentQuestion.minWords;
    }
    return false;
  };

  const handleNext = () => {
    if (!canProceed()) {
      alert(
        currentQuestion.type === 'essay'
          ? `Please provide at least ${currentQuestion.minWords} words.`
          : 'Please select an answer before proceeding.'
      );
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      setShowSubmitModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    // Evaluate all answers
    const scores = questions.map((question, index) => {
      if (question.type === 'mcq') {
        return userAnswers[index] === question.correctAnswer ? 1 : 0;
      } else {
        // Essay evaluation
        const answer = (userAnswers[index] || '').toLowerCase();
        const foundConcepts = question.keyConcepts.filter(concept =>
          answer.includes(concept.toLowerCase())
        ).length;
        const conceptCoverage = foundConcepts / question.keyConcepts.length;
        const wordCount = getWordCount(userAnswers[index]);
        const wordCountRatio = Math.min(wordCount / question.minWords, 1);
        return conceptCoverage * 0.6 + wordCountRatio * 0.4;
      }
    });

    // Store results
    localStorage.setItem(
      'mcqEssayResults',
      JSON.stringify({
        scores: scores,
        userAnswers: userAnswers,
        questions: questions
      })
    );

    // Navigate to results page
    navigate('/result-mcq-essay');
  };

  const wordCount = getWordCount(userAnswer);
  const wordCountClass =
    wordCount < currentQuestion.minWords
      ? 'error'
      : wordCount < currentQuestion.minWords + 10
      ? 'warning'
      : '';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 antialiased min-h-screen">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mixed Quiz: MCQ & Essay</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Test your knowledge with multiple choice and essay questions</p>

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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 question-card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Question {currentQuestionIndex + 1}</h2>
          <span
            className={`question-type-indicator ${
              currentQuestion.type === 'mcq' ? 'mcq-indicator' : 'essay-indicator'
            }`}
          >
            {currentQuestion.type.toUpperCase()}
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{currentQuestion.question}</p>

        {/* MCQ Options */}
        {currentQuestion.type === 'mcq' && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`mcq-option p-4 rounded-lg border ${
                  userAnswer === index
                    ? 'selected border-primary bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } cursor-pointer`}
                onClick={() => handleMCQSelect(index)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                      userAnswer === index
                        ? 'border-primary bg-primary'
                        : 'border-gray-400 dark:border-gray-500'
                    }`}
                  >
                    {userAnswer === index && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Essay Textarea */}
        {currentQuestion.type === 'essay' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Answer (minimum {currentQuestion.minWords} words)
            </label>
            <textarea
              value={userAnswer || ''}
              onChange={(e) => handleEssayChange(e.target.value)}
              className="essay-textarea w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type your answer here..."
              rows="6"
            />
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Minimum {currentQuestion.minWords} words required
              </span>
              <span className={`char-counter ${wordCountClass}`}>{wordCount} words</span>
            </div>
            {wordCount > currentQuestion.minWords / 2 && (
              <div className="word-count-highlight mt-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Tip:</span> Make sure your answer covers all key aspects of the question.
                </p>
              </div>
            )}
          </div>
        )}
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
          disabled={!canProceed()}
          className={`flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors ${
            !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          <span className="material-icons">{currentQuestionIndex === questions.length - 1 ? 'check' : 'arrow_forward'}</span>
        </button>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSubmitModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-blue-600 dark:text-blue-400 text-3xl">assignment</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Submit Quiz?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to submit your answers? You cannot change them after submission.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitQuiz}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default McqEssay;
