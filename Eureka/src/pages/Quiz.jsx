import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      question: 'What is the primary purpose of a function in programming?',
      options: [
        'To encapsulate a piece of code for reuse',
        'To store data and variables',
        'To style the user interface',
        'To slow down the program execution'
      ],
      correctAnswer: 0,
      explanation: 'Functions are key to writing modular, reusable, and maintainable code.'
    },
    {
      question: 'Which keyword is used to define a function in Python?',
      options: ['function', 'def', 'define', 'func'],
      correctAnswer: 1,
      explanation: "In Python, the 'def' keyword is used to define a function."
    },
    {
      question: 'What is a parameter in a function?',
      options: [
        'A value returned by the function',
        'A variable that holds the function code',
        'A value passed into the function when it is called',
        'The name of the function'
      ],
      correctAnswer: 2,
      explanation: 'Parameters are variables defined in the function definition that receive values when the function is called.'
    },
    {
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
      question: 'What is the difference between parameters and arguments?',
      options: [
        'Parameters are used in function definition, arguments are values passed when calling',
        'Arguments are used in function definition, parameters are values passed when calling',
        'They are the same thing',
        'Parameters are for math functions, arguments are for other functions'
      ],
      correctAnswer: 0,
      explanation: 'Parameters are the variables in the function definition, while arguments are the actual values passed to the function.'
    },
    {
      question: 'What is a void function?',
      options: [
        "A function that doesn't take any parameters",
        "A function that doesn't return a value",
        'A function that has empty code',
        "A function that can't be called"
      ],
      correctAnswer: 1,
      explanation: "A void function is one that doesn't return any value."
    },
    {
      question: 'What is function overloading?',
      options: [
        'Creating functions with the same name but different parameters',
        'Making a function run too many times',
        'Creating functions that are too complex',
        'Using too many functions in a program'
      ],
      correctAnswer: 0,
      explanation: 'Function overloading allows multiple functions with the same name but different parameters.'
    },
    {
      question: 'What is recursion in programming?',
      options: [
        'A function that calls other functions',
        'A function that calls itself',
        'A function that runs in a loop',
        'A function that returns multiple values'
      ],
      correctAnswer: 1,
      explanation: 'Recursion is when a function calls itself to solve a smaller version of the problem.'
    },
    {
      question: 'What is a lambda function?',
      options: [
        'A function with no name',
        'A function that only works with numbers',
        'A function that runs automatically',
        "A function that can't be modified"
      ],
      correctAnswer: 0,
      explanation: 'A lambda function is an anonymous function defined without a name.'
    },
    {
      question: 'What is the scope of a variable in a function?',
      options: [
        'The time it takes for the function to execute',
        'The part of the program where the variable can be accessed',
        'The size of the variable in memory',
        'The number of times the variable is used'
      ],
      correctAnswer: 1,
      explanation: 'Scope determines where in the program a variable can be accessed.'
    }
  ];

  useEffect(() => {
    setUserAnswers(new Array(questions.length).fill(null));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const userAnswer = userAnswers[currentQuestionIndex];

  const handleAnswerSelect = (selectedIndex) => {
    if (userAnswer !== null) return; // Already answered

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedIndex;
    setUserAnswers(newAnswers);

    if (selectedIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setShowFeedback(true);
  };

  const handleNext = () => {
    if (userAnswer === null) return; // Must answer before proceeding

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    } else {
      submitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(userAnswers[currentQuestionIndex - 1] !== null);
    }
  };

  const submitQuiz = () => {
    // Store results in localStorage to pass to result page
    localStorage.setItem(
      'quizResults',
      JSON.stringify({
        score: score,
        totalQuestions: questions.length,
        userAnswers: userAnswers,
        questions: questions
      })
    );

    // Navigate to result page
    navigate('/result');
  };

  const isCorrect = (optionIndex) => {
    return optionIndex === currentQuestion.correctAnswer;
  };

  const isSelected = (optionIndex) => {
    return optionIndex === userAnswer;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 antialiased">
      <header className="w-full max-w-4xl text-center mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-16 h-16">
            <img
              alt="A computer monitor with code on screen"
              className="w-full h-full object-contain"
              src="images/calcculate 1.png"
            />
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Programming Fundamentals Quiz</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Lesson: Introduction to Functions</p>
          </div>
          <div className="font-semibold text-gray-700 dark:text-gray-300 w-16 text-right">
            {currentQuestionIndex + 1}/10
          </div>
        </div>
        <div className="mt-8 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Question {currentQuestionIndex + 1}: {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            const correct = isCorrect(index);
            const selected = isSelected(index);
            const answered = userAnswer !== null;

            let buttonClass = 'option-button w-full text-left p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors';

            if (answered) {
              if (correct) {
                buttonClass += ' correct';
              } else if (selected && !correct) {
                buttonClass += ' incorrect';
              }
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswerSelect(index)}
                disabled={answered}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showFeedback && userAnswer !== null && (
          <div className="mt-8 space-y-4">
            {userAnswer === currentQuestion.correctAnswer ? (
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                <p className="font-bold text-green-800 dark:text-green-300">Correct!</p>
                <p className="text-green-700 dark:text-green-400">{currentQuestion.explanation}</p>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                <p className="font-bold text-red-800 dark:text-red-300">Not Quite!</p>
                <p className="text-red-700 dark:text-red-400">
                  The correct answer is: <span className="font-semibold">{currentQuestion.options[currentQuestion.correctAnswer]}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="w-full max-w-4xl mt-8 flex justify-between">
        <button
          onClick={handlePrevious}
          className={`flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            currentQuestionIndex === 0 ? 'hidden' : ''
          }`}
        >
          <span className="material-icons">arrow_back</span>
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={userAnswer === null}
          className={`flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-primary to-cyan-500 hover:opacity-90 transition-opacity ${
            userAnswer === null ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span>{currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}</span>
          <span className="material-icons">{currentQuestionIndex === questions.length - 1 ? 'check' : 'arrow_forward'}</span>
        </button>
      </footer>
    </div>
  );
};

export default Quiz;
