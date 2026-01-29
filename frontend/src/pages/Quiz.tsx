import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { programmingQuiz } from '../data/mock';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // Get quiz data from mock
  const quiz = programmingQuiz;
  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionClick = (index: number) => {
    if (!isAnswered) {
      setSelectedOption(index);
      setIsAnswered(true);
      if (index === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Save results and navigate to results page
      const results = {
        quizId: quiz.id,
        score,
        totalQuestions: questions.length,
        percentage: Math.round((score / questions.length) * 100),
      };
      localStorage.setItem('quizResults', JSON.stringify(results));
      navigate('/results');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 flex flex-col items-center py-8 px-4">
      <header className="w-full max-w-4xl mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
            <img src="/images/calcculate 1.png" alt="Quiz Icon" className="w-12 h-12 object-contain" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{quiz.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{quiz.subtitle}</p>
          </div>
          <div className="font-semibold text-gray-700 dark:text-gray-300 w-16 text-right">
            {currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
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
            let buttonClass = "p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50";
            
            if (isAnswered) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass = "p-4 rounded-xl border-2 bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300";
              } else if (index === selectedOption) {
                buttonClass = "p-4 rounded-xl border-2 bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300";
              } else {
                buttonClass = "p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 opacity-50";
              }
            } else if (selectedOption === index) {
              buttonClass = "p-4 rounded-xl border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20";
            } else {
              buttonClass = "p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={cn(
            "mt-8 p-4 rounded-lg border",
            selectedOption === currentQuestion.correctAnswer 
              ? "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800" 
              : "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800"
          )}>
            {selectedOption === currentQuestion.correctAnswer ? (
              <div>
                <p className="font-bold text-green-800 dark:text-green-300 flex items-center gap-2">
                  <CheckCircle size={20} /> Correct!
                </p>
                <p className="text-green-700 dark:text-green-400 mt-1">
                  {currentQuestion.explanation || "Great job! You understood the concept."}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-red-800 dark:text-red-300 flex items-center gap-2">
                  <XCircle size={20} /> Not Quite!
                </p>
                <p className="text-red-700 dark:text-red-400 mt-1">
                  The correct answer is: {currentQuestion.options[currentQuestion.correctAnswer]}
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="w-full max-w-4xl mt-8 flex justify-between">
        <Link 
          to="/assignments" 
          className="flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft size={20} />
          Exit Quiz
        </Link>
        
        {isAnswered && (
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 transition-opacity shadow-lg"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight size={20} />
          </button>
        )}
      </footer>
    </div>
  );
};

export default Quiz;
