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

  const submitQuiz = () => {
    // Store results
    localStorage.setItem(
      'quizResult',
      JSON.stringify({
        score: score,
        totalQuestions: questions.length,
        userAnswers: userAnswers,
        questions: questions
      })
    );
    navigate('/result');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="quiz-page bg-background-light dark:bg-background-dark min-h-screen p-4 sm:p-8 font-display text-gray-800 dark:text-gray-200">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <header className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors">
              <span className="material-icons">close</span>
            </button>
            <h1 className="text-xl font-bold">Programming Quiz</h1>
            <div className="flex items-center gap-1 text-primary font-bold">
              <span className="material-icons">bolt</span>
              <span>{score * 10}</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-right text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </header>

        {/* Question Area */}
        <main className="p-6 sm:p-10">
          <h2 className="text-2xl font-bold mb-8">{currentQuestion.question}</h2>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              let statusClass = '';
              if (userAnswer !== null) {
                if (index === currentQuestion.correctAnswer) statusClass = 'correct';
                else if (index === userAnswer) statusClass = 'incorrect';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={userAnswer !== null}
                  className={`quiz-option w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                    userAnswer === index ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-gray-700 hover:border-primary/50'
                  } ${statusClass}`}
                >
                  <span className="text-lg">{option}</span>
                  {statusClass === 'correct' && (
                    <span className="material-icons text-green-500">check_circle</span>
                  )}
                  {statusClass === 'incorrect' && (
                    <span className="material-icons text-red-500">cancel</span>
                  )}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`mt-8 p-6 rounded-2xl animate-fade-in ${
              userAnswer === currentQuestion.correctAnswer 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
            }`}>
              <p className="font-bold mb-2">
                {userAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Not quite right.'}
              </p>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button
            onClick={handleNext}
            disabled={userAnswer === null}
            className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
              userAnswer !== null 
                ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <span className="material-icons">arrow_forward</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Quiz;
