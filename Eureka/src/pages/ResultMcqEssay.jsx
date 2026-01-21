import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultMcqEssay.css';

const ResultMcqEssay = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Get results from localStorage
    const storedResults = localStorage.getItem('mcqEssayResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // If no results, redirect to quiz
      navigate('/mcq-essay');
    }
  }, [navigate]);

  const handleRetry = () => {
    localStorage.removeItem('mcqEssayResults');
    navigate('/mcq-essay');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'Excellent!';
    if (percentage >= 80) return 'Very Good!';
    if (percentage >= 70) return 'Good!';
    if (percentage >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#22c55e';
    if (percentage >= 60) return '#3b82f6';
    if (percentage >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreClass = (percentage) => {
    if (percentage >= 80) return 'score-excellent';
    if (percentage >= 60) return 'score-good';
    if (percentage >= 40) return 'score-fair';
    return 'score-poor';
  };

  const getScoreColorClass = (percentage) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (percentage >= 60) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (percentage >= 40) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl bg-background-light dark:bg-background-dark">
        <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
      </div>
    );
  }

  const { scores, userAnswers, questions } = results;

  // Calculate scores
  const mcqScores = [];
  const essayScores = [];

  questions.forEach((question, index) => {
    if (question.type === 'mcq') {
      mcqScores.push(scores[index]);
    } else if (question.type === 'essay') {
      essayScores.push(scores[index]);
    }
  });

  const mcqTotal = mcqScores.reduce((sum, score) => sum + score, 0);
  const essayTotal = essayScores.reduce((sum, score) => sum + score, 0);
  const overallTotal = mcqTotal + essayTotal;

  const mcqPercentage = Math.round((mcqTotal / mcqScores.length) * 100);
  const essayPercentage = Math.round((essayTotal / essayScores.length) * 100);
  const overallPercentage = Math.round((overallTotal / questions.length) * 100);

  const overallGrade = getGrade(overallPercentage);
  const mcqGrade = getGrade(mcqPercentage);
  const essayGrade = getGrade(essayPercentage);
  const overallScoreColor = getScoreColor(overallPercentage);
  const mcqScoreColor = getScoreColor(mcqPercentage);
  const essayScoreColor = getScoreColor(essayPercentage);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 antialiased min-h-screen">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mixed Quiz Results</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Review your performance on both MCQ and Essay questions</p>
      </header>

      {/* Overall Score */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 text-center">
        <div className="mb-4">
          <div className="relative inline-block">
            <svg className="score-circle w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={overallScoreColor}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45 * (1 - overallPercentage / 100)}
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dy="7"
                fontSize="20"
                fontWeight="bold"
                fill={overallScoreColor}
              >
                {overallPercentage}%
              </text>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mt-4" style={{ color: overallScoreColor }}>
            {overallGrade}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Overall Performance</p>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">MCQ Performance</h2>
          <div className="text-center">
            <div className="mb-2">
              <div className="text-4xl font-bold" style={{ color: mcqScoreColor }}>
                {mcqPercentage}%
              </div>
              <p className="text-gray-600 dark:text-gray-400">{mcqGrade}</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {mcqScores.filter(score => score === 1).length} out of {mcqScores.length} correct
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Essay Performance</h2>
          <div className="text-center">
            <div className="mb-2">
              <div className="text-4xl font-bold" style={{ color: essayScoreColor }}>
                {essayPercentage}%
              </div>
              <p className="text-gray-600 dark:text-gray-400">{essayGrade}</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Average score: {(essayTotal / essayScores.length).toFixed(1)}/1
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-6">
        {questions.map((question, index) => {
          const score = scores[index];
          const scorePercentage = Math.round(score * 100);
          const scoreClass = getScoreClass(scorePercentage);
          const userAnswer = userAnswers[index];

          return (
            <div
              key={index}
              className={`question-result bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 ${scoreClass}`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Question {index + 1}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColorClass(scorePercentage)}`}>
                    {scorePercentage}%
                  </span>
                  <span
                    className={`question-type-badge ${
                      question.type === 'mcq' ? 'mcq-badge' : 'essay-badge'
                    }`}
                  >
                    {question.type.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Question:</p>
                <p className="text-gray-600 dark:text-gray-400">{question.question}</p>
              </div>

              {/* MCQ Results */}
              {question.type === 'mcq' && (
                <>
                  <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Your Answer:</p>
                    <div
                      className={`p-4 rounded-lg ${
                        score === 1
                          ? 'bg-green-50 dark:bg-green-900/20'
                          : 'bg-red-50 dark:bg-red-900/20'
                      }`}
                    >
                      <p
                        className={
                          score === 1
                            ? 'text-green-700 dark:text-green-400'
                            : 'text-red-700 dark:text-red-400'
                        }
                      >
                        {userAnswer !== null ? question.options[userAnswer] : 'Not answered'}
                      </p>
                    </div>
                  </div>
                  {score !== 1 && (
                    <div className="mb-4">
                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">Correct Answer:</p>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <p className="text-green-700 dark:text-green-400">
                          {question.options[question.correctAnswer]}
                        </p>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Explanation:</p>
                    <p className="text-gray-600 dark:text-gray-400">{question.explanation}</p>
                  </div>
                </>
              )}

              {/* Essay Results */}
              {question.type === 'essay' && (
                <>
                  <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Your Answer:</p>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                        {userAnswer || 'No answer provided'}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Key Concepts to Include:</p>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                      {question.keyConcepts.map((concept, conceptIndex) => (
                        <li key={conceptIndex}>{concept}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Model Answer:</p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-400">{question.modelAnswer}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={handleRetry}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="material-icons">refresh</span>
          Retry Quiz
        </button>
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <span className="material-icons">arrow_back</span>
          Back to Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultMcqEssay;
