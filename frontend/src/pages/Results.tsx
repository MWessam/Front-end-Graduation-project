import { useEffect, useState } from 'react';
import { RotateCcw, List, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { sampleDetailedResults, calculatePercentage } from '../data/mock';
import type { QuestionResult } from '../data/types';

interface StoredQuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}

const Results = () => {
  const [score, setScore] = useState(8);
  const [total, setTotal] = useState(10);
  const [detailedResults, setDetailedResults] = useState<QuestionResult[]>(sampleDetailedResults);

  // Try to load results from localStorage (saved by Quiz.tsx)
  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
      try {
        const parsed: StoredQuizResult = JSON.parse(savedResults);
        setScore(parsed.score);
        setTotal(parsed.totalQuestions);
        // Note: detailed results would need to be saved separately
        // For now, we use sample data as fallback
      } catch (e) {
        console.error('Failed to parse quiz results:', e);
      }
    }
  }, []);

  const percentage = calculatePercentage(score, total);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center min-h-screen">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quiz Results</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Programming Fundamentals - Functions</p>
      </header>

      <Card className="w-full max-w-4xl shadow-lg">
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-48 h-48 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="16"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="16"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
                className="text-purple-600"
              />
            </svg>
            <div className="absolute text-4xl font-bold text-gray-900 dark:text-white">{percentage}%</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {percentage >= 70 ? 'Great Job!' : 'Keep Practicing!'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">You scored {score} out of {total}</p>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detailed Results</h2>
          <div className="space-y-4">
            {detailedResults.map((item, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-lg border ${
                  item.status === 'correct' 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  {item.status === 'correct' 
                    ? <CheckCircle className="text-green-600 mt-1" /> 
                    : <XCircle className="text-red-600 mt-1" />
                  }
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.question}</p>
                    <p className="text-gray-700 dark:text-gray-300">Your Answer: {item.userAnswer}</p>
                    {item.correctAnswer && (
                      <p className="text-green-600 dark:text-green-400 font-medium mt-1">
                        Correct Answer: {item.correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <footer className="w-full max-w-4xl mt-8 flex justify-between">
        <Link 
          to="/quiz" 
          className="flex items-center gap-2 px-6 py-3 text-gray-700 dark:text-gray-300 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <RotateCcw size={20} />
          Retry Quiz
        </Link>
        
        <div className="flex gap-4">
          <Link 
            to="/achievements"
            className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 transition-opacity"
          >
            <span>View Achievements</span>
            <List size={20} />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Results;
