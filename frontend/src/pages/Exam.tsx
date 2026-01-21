import React, { useState, useEffect } from 'react';
import { Clock, Menu, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const questions = [
    {
        id: 1,
        question: "What is the primary purpose of a function in programming?",
        options: [
            "To store data and variables",
            "To encapsulate a piece of code for reuse",
            "To style the user interface",
            "To slow down the program execution"
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "Which keyword is used to define a function in Python?",
        options: [
            "function",
            "def",
            "define",
            "func"
        ],
        correctAnswer: 1
    },
    {
        id: 3,
        question: "What does the 'return' statement do in a function?",
        options: [
            "Stops the function execution",
            "Prints a value to the console",
            "Sends a value back to the calling code",
            "Defines a new variable"
        ],
        correctAnswer: 2
    },
    {
        id: 4,
        question: "What is a parameter in a function?",
        options: [
            "A value returned by the function",
            "A variable that holds the function code",
            "A value passed into the function when it is called",
            "The name of the function"
        ],
        correctAnswer: 2
    },
    {
        id: 5,
        question: "What is the difference between parameters and arguments?",
        options: [
            "Parameters are used in function definition, arguments are values passed when calling",
            "Arguments are used in function definition, parameters are values passed when calling",
            "They are the same thing",
            "Parameters are for math functions, arguments are for other functions"
        ],
        correctAnswer: 0
    },
    {
        id: 6,
        question: "What is a void function?",
        options: [
            "A function that doesn't take any parameters",
            "A function that doesn't return a value",
            "A function that has empty code",
            "A function that can't be called"
        ],
        correctAnswer: 1
    },
    {
        id: 7,
        question: "What is function overloading?",
        options: [
            "Creating functions with the same name but different parameters",
            "Making a function run too many times",
            "Creating functions that are too complex",
            "Using too many functions in a program"
        ],
        correctAnswer: 0
    },
    {
        id: 8,
        question: "What is recursion in programming?",
        options: [
            "A function that calls other functions",
            "A function that calls itself",
            "A function that runs in a loop",
            "A function that returns multiple values"
        ],
        correctAnswer: 1
    },
    {
        id: 9,
        question: "What is a lambda function?",
        options: [
            "A function with no name",
            "A function that only works with numbers",
            "A function that runs automatically",
            "A function that can't be modified"
        ],
        correctAnswer: 0
    },
    {
        id: 10,
        question: "What is the scope of a variable in a function?",
        options: [
            "The time it takes for the function to execute",
            "The part of the program where the variable can be accessed",
            "The size of the variable in memory",
            "The number of times the variable is used"
        ],
        correctAnswer: 1
    },
    {
        id: 11,
        question: "What is a local variable?",
        options: [
            "A variable declared outside all functions",
            "A variable declared inside a function",
            "A variable that can be accessed from anywhere",
            "A variable that never changes"
        ],
        correctAnswer: 1
    },
    {
        id: 12,
        question: "What is a global variable?",
        options: [
            "A variable declared inside a function",
            "A variable declared outside all functions",
            "A variable that is only used once",
            "A variable that changes frequently"
        ],
        correctAnswer: 1
    },
    {
        id: 13,
        question: "What is the purpose of the 'pass' keyword in Python?",
        options: [
            "To pass arguments to a function",
            "To skip the current iteration in a loop",
            "To create a placeholder for empty code blocks",
            "To pass control to another function"
        ],
        correctAnswer: 2
    },
    {
        id: 14,
        question: "What is a default parameter in a function?",
        options: [
            "A parameter that must be provided when calling the function",
            "A parameter that has a predefined value if no argument is provided",
            "A parameter that can only be used once",
            "A parameter that changes automatically"
        ],
        correctAnswer: 1
    },
    {
        id: 15,
        question: "What is a recursive function?",
        options: [
            "A function that calls other functions",
            "A function that calls itself",
            "A function that runs very fast",
            "A function that has multiple return statements"
        ],
        correctAnswer: 1
    },
    {
        id: 16,
        question: "What is the base case in recursion?",
        options: [
            "The first function called in the recursion",
            "The condition that stops the recursion",
            "The most complex part of the recursive function",
            "The return value of the recursive function"
        ],
        correctAnswer: 1
    },
    {
        id: 17,
        question: "What is function composition?",
        options: [
            "Creating functions with the same name",
            "Combining simple functions to build more complex ones",
            "Writing functions in a specific order",
            "Making functions more readable"
        ],
        correctAnswer: 1
    },
    {
        id: 18,
        question: "What is a higher-order function?",
        options: [
            "A function that takes other functions as arguments or returns them",
            "A function that is defined at the top of the file",
            "A function that has more parameters than usual",
            "A function that runs faster than others"
        ],
        correctAnswer: 0
    },
    {
        id: 19,
        question: "What is a pure function?",
        options: [
            "A function that has no parameters",
            "A function that always returns the same result for the same inputs and has no side effects",
            "A function that only uses local variables",
            "A function that is written in a single line"
        ],
        correctAnswer: 1
    },
    {
        id: 20,
        question: "What is a callback function?",
        options: [
            "A function that calls another function",
            "A function that is passed as an argument to another function",
            "A function that returns a value",
            "A function that is called at the end of a program"
        ],
        correctAnswer: 1
    }
];

type QuestionStatus = 'not-seen' | 'unanswered' | 'answered' | 'reviewed';

const Exam = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [status, setStatus] = useState<Record<number, QuestionStatus>>({});
  
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedStartTime = localStorage.getItem('examStartTime');
    if (savedStartTime) {
        const startTime = parseInt(savedStartTime);
        const now = new Date().getTime();
        const elapsedSeconds = Math.floor((now - startTime) / 1000);
        const remaining = (30 * 60) - elapsedSeconds;
        return remaining > 0 ? remaining : 0;
    } else {
        const now = new Date().getTime();
        localStorage.setItem('examStartTime', now.toString());
        return 30 * 60;
    }
  });

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const [showFirstConfirm, setShowFirstConfirm] = useState(false);
  const [showSecondConfirm, setShowSecondConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const submitExam = () => {
      // Calculate score
      let score = 0;
      questions.forEach((q, i) => {
          if (answers[i] === q.correctAnswer) {
              score++;
          }
      });

      // Save results
      const results = {
          score,
          totalQuestions: questions.length,
          userAnswers: answers,
          questions
      };
      localStorage.setItem('examResults', JSON.stringify(results));
      localStorage.removeItem('examStartTime');
      
      setShowSuccess(true);
  };

  // Initialize status
  useEffect(() => {
    const initialStatus: Record<number, QuestionStatus> = {};
    questions.forEach((_, index) => {
      initialStatus[index] = 'not-seen';
    });
    initialStatus[0] = 'unanswered'; // Mark first as unanswered/seen
    setStatus(initialStatus);
  }, []);

  // Update status when viewing a new question
  useEffect(() => {
    setStatus(prev => {
      if (prev[currentQuestionIndex] === 'not-seen') {
        return { ...prev, [currentQuestionIndex]: 'unanswered' };
      }
      return prev;
    });
  }, [currentQuestionIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
        submitExam();
    }
  }, [timeLeft]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    setStatus(prev => ({ ...prev, [currentQuestionIndex]: 'answered' }));
  };

  const handleClear = () => {
    setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[currentQuestionIndex];
        return newAnswers;
    });
    setStatus(prev => ({ ...prev, [currentQuestionIndex]: 'unanswered' }));
  };

  const handleSkip = () => {
    if (status[currentQuestionIndex] !== 'answered') {
        setStatus(prev => ({ ...prev, [currentQuestionIndex]: 'reviewed' }));
    }
    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
    } else {
        setShowFirstConfirm(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowFirstConfirm(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getStatusColor = (index: number) => {
    // Special case for current question in sidebar
    if (index === currentQuestionIndex) return "bg-primary text-white"; // Using primary color for current

    const s = status[index] || 'not-seen';
    switch (s) {
      case 'answered': return "bg-green-500 text-white";
      case 'reviewed': return "bg-blue-500 text-white";
      case 'unanswered': return "bg-red-600 text-white";
      case 'not-seen': 
      default: return "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-xl font-bold text-sky-600">Programming Fundamentals Exam</h1>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 text-xl font-mono font-bold px-4 py-2 rounded-lg ${timeLeft < 300 ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-sky-600 bg-sky-50 dark:bg-sky-900/20'}`}>
            <Clock size={24} />
            {formatTime(timeLeft)}
          </div>
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div className="flex-1 container mx-auto max-w-7xl p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <main className="lg:col-span-2 flex flex-col space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-xl font-semibold mb-4">
              Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
            </p>
          </div>

          <div className="space-y-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center",
                  answers[currentQuestionIndex] === index
                    ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 ring-1 ring-sky-500"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 bg-white dark:bg-gray-800"
                )}
              >
                 <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 shrink-0",
                    answers[currentQuestionIndex] === index 
                        ? "border-sky-500" 
                        : "border-gray-400 dark:border-gray-500"
                  )}>
                    {answers[currentQuestionIndex] === index && <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />}
                  </div>
                  <span className="text-base">{option}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
             <div className="flex gap-4">
                <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2.5 rounded-lg border-2 border-sky-500 text-sky-600 font-medium hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:hover:bg-sky-900/20"
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

             <div className="flex gap-4">
                <button
                onClick={handleSkip}
                className="px-6 py-2.5 rounded-lg border-2 border-sky-500 text-sky-600 font-medium hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
                >
                Skip & Next
                </button>

                <button
                onClick={handleNext}
                className="px-8 py-2.5 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-600 shadow-lg shadow-sky-500/30 transition-colors"
                >
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 p-6 shadow-2xl transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-auto lg:bg-transparent lg:shadow-none lg:p-0 lg:block z-30",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex justify-between items-center lg:hidden mb-6">
            <h3 className="font-bold text-lg">Question Navigator</h3>
            <button onClick={() => setSidebarOpen(false)}><X size={24} /></button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
             <h3 className="text-base text-gray-500 dark:text-gray-400 mb-2">Remaining time</h3>
             <p className={`text-4xl font-bold mb-8 ${timeLeft < 300 ? 'text-red-500' : 'text-sky-500'}`}>{formatTime(timeLeft)}</p>

            <h3 className="font-medium mb-6 text-gray-900 dark:text-white">
              Total number of questions: <span className="font-bold">{questions.length}</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-red-600"></div> Unanswered
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700"></div> Not seen
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded bg-blue-500"></div> Reviewed
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-green-500"></div> Answered
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQuestionIndex(i);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "aspect-square rounded-lg font-medium text-sm flex items-center justify-center transition-colors",
                    getStatusColor(i),
                    currentQuestionIndex === i && "ring-2 ring-offset-2 ring-sky-500 dark:ring-offset-gray-800"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => setShowFirstConfirm(true)}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* First Confirmation Modal */}
      {showFirstConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                        <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirmation Message</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Answers saved. End test and exit program. Are you sure?</p>
                <div className="flex justify-end space-x-4">
                    <button 
                        onClick={() => setShowFirstConfirm(false)}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            setShowFirstConfirm(false);
                            setShowSecondConfirm(true);
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
      {showSecondConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-4">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                        <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirmation Message</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Answers saved. End test and exit program. Are you sure?</p>
                <div className="flex justify-end space-x-4">
                    <button 
                        onClick={() => setShowSecondConfirm(false)}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            setShowSecondConfirm(false);
                            submitExam();
                        }}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Leave
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Exam Submitted Successfully!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Your answers have been sent correctly. You can now close this window.</p>
                <button 
                    onClick={() => navigate('/instructions')}
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

export default Exam;
