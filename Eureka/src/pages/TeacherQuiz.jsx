import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherQuiz.css';

const TeacherQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const timerIntervalRef = useRef(null);

  const questions = [
    {
      id: 1,
      question: 'What is the primary purpose of a function in programming?',
      options: [
        'To store data and variables',
        'To encapsulate a piece of code for reuse',
        'To style the user interface',
        'To slow down the program execution'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'Which keyword is used to define a function in Python?',
      options: ['function', 'def', 'define', 'func'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "What does the 'return' statement do in a function?",
      options: [
        'Stops the function execution',
        'Prints a value to the console',
        'Sends a value back to the calling code',
        'Defines a new variable'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: 'What is a parameter in a function?',
      options: [
        'A value returned by the function',
        'A variable that holds the function code',
        'A value passed into the function when it is called',
        'The name of the function'
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      question: 'What is the difference between parameters and arguments?',
      options: [
        'Parameters are used in function definition, arguments are values passed when calling',
        'Arguments are used in function definition, parameters are values passed when calling',
        'They are the same thing',
        'Parameters are for math functions, arguments are for other functions'
      ],
      correctAnswer: 0
    },
    {
      id: 6,
      question: "What is a void function?",
      options: [
        "A function that doesn't take any parameters",
        "A function that doesn't return a value",
        'A function that has empty code',
        "A function that can't be called"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      question: 'What is function overloading?',
      options: [
        'Creating functions with the same name but different parameters',
        'Making a function run too many times',
        'Creating functions that are too complex',
        'Using too many functions in a program'
      ],
      correctAnswer: 0
    },
    {
      id: 8,
      question: 'What is recursion in programming?',
      options: [
        'A function that calls other functions',
        'A function that calls itself',
        'A function that runs in a loop',
        'A function that returns multiple values'
      ],
      correctAnswer: 1
    },
    {
      id: 9,
      question: 'What is a lambda function?',
      options: [
        'A function with no name',
        'A function that only works with numbers',
        'A function that runs automatically',
        "A function that can't be modified"
      ],
      correctAnswer: 0
    },
    {
      id: 10,
      question: 'What is the scope of a variable in a function?',
      options: [
        'The time it takes for the function to execute',
        'The part of the program where the variable can be accessed',
        'The size of the variable in memory',
        'The number of times the variable is used'
      ],
      correctAnswer: 1
    },
    {
      id: 11,
      question: 'What is a local variable?',
      options: [
        'A variable declared outside all functions',
        'A variable declared inside a function',
        'A variable that can be accessed from anywhere',
        'A variable that never changes'
      ],
      correctAnswer: 1
    },
    {
      id: 12,
      question: 'What is a global variable?',
      options: [
        'A variable declared inside a function',
        'A variable declared outside all functions',
        'A variable that is only used once',
        'A variable that changes frequently'
      ],
      correctAnswer: 1
    },
    {
      id: 13,
      question: "What is the purpose of the 'pass' keyword in Python?",
      options: [
        'To pass arguments to a function',
        'To skip the current iteration in a loop',
        'To create a placeholder for empty code blocks',
        'To pass control to another function'
      ],
      correctAnswer: 2
    },
    {
      id: 14,
      question: 'What is a default parameter in a function?',
      options: [
        'A parameter that must be provided when calling the function',
        'A parameter that has a predefined value if no argument is provided',
        'A parameter that can only be used once',
        'A parameter that changes automatically'
      ],
      correctAnswer: 1
    },
    {
      id: 15,
      question: 'What is a recursive function?',
      options: [
        'A function that calls other functions',
        'A function that calls itself',
        'A function that runs very fast',
        'A function that has multiple return statements'
      ],
      correctAnswer: 1
    },
    {
      id: 16,
      question: 'What is the base case in recursion?',
      options: [
        'The first function called in the recursion',
        'The condition that stops the recursion',
        'The most complex part of the recursive function',
        'The return value of the recursive function'
      ],
      correctAnswer: 1
    },
    {
      id: 17,
      question: 'What is function composition?',
      options: [
        'Creating functions with the same name',
        'Combining simple functions to build more complex ones',
        'Writing functions in a specific order',
        'Making functions more readable'
      ],
      correctAnswer: 1
    },
    {
      id: 18,
      question: 'What is a higher-order function?',
      options: [
        'A function that takes other functions as arguments or returns them',
        'A function that is defined at the top of the file',
        'A function that has more parameters than usual',
        'A function that runs faster than others'
      ],
      correctAnswer: 0
    },
    {
      id: 19,
      question: 'What is a pure function?',
      options: [
        'A function that has no parameters',
        'A function that always returns the same result for the same inputs and has no side effects',
        'A function that only uses local variables',
        'A function that is written in a single line'
      ],
      correctAnswer: 1
    },
    {
      id: 20,
      question: 'What is a callback function?',
      options: [
        'A function that calls another function',
        'A function that is passed as an argument to another function',
        'A function that returns a value',
        'A function that is called at the end of a program'
      ],
      correctAnswer: 1
    }
  ];

  useEffect(() => {
    // Initialize state
    setUserAnswers(new Array(questions.length).fill(null));
    const initialStatus = new Array(questions.length).fill('not-seen');
    initialStatus[0] = 'unanswered';
    setQuestionStatus(initialStatus);

    // Start timer
    startTimer();

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    const savedStartTime = localStorage.getItem('examStartTime');
    let startTime;

    if (savedStartTime) {
      startTime = parseInt(savedStartTime);
    } else {
      startTime = new Date().getTime();
      localStorage.setItem('examStartTime', startTime);
    }

    const now = new Date().getTime();
    const elapsedSeconds = Math.floor((now - startTime) / 1000);
    let remaining = 30 * 60 - elapsedSeconds;

    if (remaining <= 0) {
      autoSubmitExam();
      return;
    }

    setTimeRemaining(remaining);

    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          autoSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);

    const newStatus = [...questionStatus];
    newStatus[currentQuestionIndex] = 'answered';
    setQuestionStatus(newStatus);
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    const newStatus = [...questionStatus];
    if (newStatus[index] === 'not-seen') {
      newStatus[index] = 'unanswered';
    }
    setQuestionStatus(newStatus);
  };

  const handleClear = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = null;
    setUserAnswers(newAnswers);

    const newStatus = [...questionStatus];
    newStatus[currentQuestionIndex] = 'unanswered';
    setQuestionStatus(newStatus);
  };

  const handleSkip = () => {
    const newStatus = [...questionStatus];
    if (userAnswers[currentQuestionIndex] === null) {
      newStatus[currentQuestionIndex] = 'reviewed';
      setQuestionStatus(newStatus);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowFirstModal(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const newStatus = [...questionStatus];
      if (newStatus[currentQuestionIndex + 1] === 'not-seen') {
        newStatus[currentQuestionIndex + 1] = 'unanswered';
      }
      setQuestionStatus(newStatus);
    } else {
      setShowFirstModal(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getQuestionButtonClass = (index) => {
    const status = questionStatus[index];
    if (index === currentQuestionIndex) {
      return 'current bg-primary text-white';
    }
    switch (status) {
      case 'answered':
        return 'bg-green-500 text-white';
      case 'reviewed':
        return 'bg-blue-500 text-white';
      case 'unanswered':
        return 'bg-red-600 text-white';
      default:
        return 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500';
    }
  };

  const submitExam = () => {
    clearInterval(timerIntervalRef.current);

    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });

    localStorage.setItem(
      'examResults',
      JSON.stringify({
        score: score,
        totalQuestions: questions.length,
        userAnswers: userAnswers,
        questions: questions
      })
    );

    localStorage.removeItem('examStartTime');
    setShowSuccessModal(true);
  };

  const autoSubmitExam = () => {
    submitExam();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];
  const isLowTime = timeRemaining < 5 * 60; // Less than 5 minutes

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-2 flex flex-col space-y-6">
            {/* Question */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
              <p className="text-xl font-semibold text-text-light-primary dark:text-text-dark-primary">
                Question {currentQuestionIndex + 1}: {currentQuestion.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`option-label flex items-center p-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark cursor-pointer ${
                    selectedAnswer === index ? 'selected' : ''
                  }`}
                >
                  <input
                    className="form-radio h-5 w-5 text-primary border-gray-300 dark:border-gray-600 dark:bg-slate-700 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                    name="answer"
                    type="radio"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerChange(index)}
                  />
                  <span className="ml-4 text-base text-text-light-secondary dark:text-text-dark-secondary">
                    {option}
                  </span>
                </label>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex space-x-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-2.5 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-2.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300 transition-colors"
                >
                  Clear fields
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleSkip}
                  className="px-6 py-2.5 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                >
                  Skip & Next
                </button>
                <button
                  onClick={handleNext}
                  className={`px-8 py-2.5 rounded-lg text-white font-medium transition-colors ${
                    currentQuestionIndex === questions.length - 1
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-primary hover:bg-sky-500'
                  }`}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Timer */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark text-center">
              <h3 className="text-base text-text-light-secondary dark:text-text-dark-secondary">Remaining time</h3>
              <p className={`text-4xl font-bold mt-2 ${isLowTime ? 'text-red-500 timer-warning' : 'text-sky-500'}`}>
                {formatTime(timeRemaining)}
              </p>
            </div>

            {/* Question Status */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
              <h3 className="text-base font-medium text-text-light-primary dark:text-text-dark-primary mb-6">
                Total number of questions: {questions.length}
              </h3>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 text-sm text-text-light-secondary dark:text-text-dark-secondary mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-red-600" />
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-slate-300 dark:bg-slate-500" />
                  <span>Not seen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-blue-500" />
                  <span>Reviewed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-green-500" />
                  <span>Answered</span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-4 gap-3">
                {questions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(index)}
                    className={`question-btn aspect-square rounded font-medium ${getQuestionButtonClass(index)}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* First Confirmation Modal */}
      {showFirstModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowFirstModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                <span className="material-icons text-red-600 dark:text-red-400">warning</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirmation Message</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Answers saved. End test and exit program. Are you sure?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowFirstModal(false)}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowFirstModal(false);
                  setShowSecondModal(true);
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Confirmation Modal */}
      {showSecondModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSecondModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                <span className="material-icons text-red-600 dark:text-red-400">warning</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirmation Message</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Answers saved. End test and exit program. Are you sure?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowSecondModal(false)}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitExam}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setShowSuccessModal(false);
            navigate('/instructions');
          }}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-green-600 dark:text-green-400 text-3xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Exam Submitted Successfully!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your answers have been sent correctly. You can now close this window.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/instructions');
              }}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-sky-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherQuiz;
