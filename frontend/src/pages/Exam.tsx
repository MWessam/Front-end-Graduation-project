import { useState, useEffect } from 'react';
import { Clock, Menu, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { programmingExam } from '../data/mock';
import type { QuestionStatus } from '../data/types';

const Exam = () => {
  const navigate = useNavigate();
  
  // Get exam data from mock
  const exam = programmingExam;
  const questions = exam.questions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [status, setStatus] = useState<Record<number, QuestionStatus>>({});
  
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedStartTime = localStorage.getItem('examStartTime');
    if (savedStartTime) {
      const startTime = parseInt(savedStartTime);
      const now = new Date().getTime();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      const remaining = exam.timeLimit - elapsedSeconds;
      return remaining > 0 ? remaining : 0;
    } else {
      const now = new Date().getTime();
      localStorage.setItem('examStartTime', now.toString());
      return exam.timeLimit;
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
      examId: exam.id,
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      passed: (score / questions.length) * 100 >= exam.passingScore,
      userAnswers: answers,
      questions,
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
  }, [questions.length]);

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
    if (index === currentQuestionIndex) return "bg-primary text-white";

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
        <h1 className="text-xl font-bold text-sky-600">{exam.title}</h1>
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
