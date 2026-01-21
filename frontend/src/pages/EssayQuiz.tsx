import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const EssayQuiz = () => {
  const [answer, setAnswer] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    // Mock validation logic
    if (answer.length > 50 && answer.toLowerCase().includes('function')) {
      setShowSuccess(true);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Essay Questions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Test your understanding with detailed written responses</p>
        
        <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full transition-all duration-500" style={{ width: '20%' }}></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Question 1/5</span>
            <span>20% Complete</span>
        </div>
      </header>

      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-zinc-700">
         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Explain the concept of a Function in your own words.</h2>
         <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">Include keywords like "reusable", "block of code", "task".</p>
         <textarea 
           className="w-full h-48 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
           placeholder="Type your answer here..."
           value={answer}
           onChange={(e) => setAnswer(e.target.value)}
         />
      </div>

      <div className="flex justify-between">
        <button disabled className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-400 rounded-lg cursor-not-allowed">
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
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full"
                >
                    Continue
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

