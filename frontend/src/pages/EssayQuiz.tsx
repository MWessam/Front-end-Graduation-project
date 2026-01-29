import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { functionEssayQuiz } from '../data/mock';

const EssayQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Get essay quiz data from mock
  const quiz = functionEssayQuiz;
  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex] || '';

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: value }));
  };

  const validateAnswer = () => {
    const answer = currentAnswer.toLowerCase();
    const minLength = currentQuestion.minLength || 50;
    
    // Check minimum length
    if (currentAnswer.length < minLength) {
      return false;
    }
    
    // Check if answer contains at least some keywords
    const matchedKeywords = currentQuestion.keywords.filter(keyword => 
      answer.includes(keyword.toLowerCase())
    );
    
    return matchedKeywords.length >= 1;
  };

  const handleSubmit = () => {
    if (validateAnswer()) {
      setShowSuccess(true);
    } else {
      setShowError(true);
    }
  };

  const handleContinue = () => {
    setShowSuccess(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{quiz.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Test your understanding with detailed written responses</p>
        
        <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </header>

      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{currentQuestion.question}</h2>
        {currentQuestion.hints && currentQuestion.hints.length > 0 && (
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{currentQuestion.hints[0]}</p>
        )}
        <textarea 
          className="w-full h-48 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          placeholder="Type your answer here..."
          value={currentAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
        />
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {currentAnswer.length} / {currentQuestion.minLength || 50} minimum characters
        </div>
      </div>

      <div className="flex justify-between">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Previous
        </button>
        
        <button 
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-lg shadow-green-500/30"
        >
          Submit Answer
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl transform animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Correct!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Your answer demonstrates good understanding of the concept.</p>
            <button 
              onClick={handleContinue}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Continue' : 'Finish Quiz'}
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl transform animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-red-600 dark:text-red-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Needs Improvement</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Your answer seems too short or is missing key concepts.</p>
            <button 
              onClick={() => setShowError(false)}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EssayQuiz;
