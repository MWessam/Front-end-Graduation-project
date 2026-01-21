document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const resultsContainer = document.getElementById('resultsContainer');
    const detailedResults = document.getElementById('detailedResults');
    const questionsReview = document.getElementById('questionsReview');
    const retryButton = document.getElementById('retryButton');
    const reviewButton = document.getElementById('reviewButton');

    // Get quiz results from localStorage
    const quizResults = JSON.parse(localStorage.getItem('quizResults'));

    // If no results found, redirect to quiz
    if (!quizResults) {
        window.location.href = 'quiz.html';
        return;
    }

    const { score, totalQuestions, userAnswers, questions } = quizResults;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Display results
    function displayResults() {
        // Create results HTML
        let resultsHTML = `
            <div class="mb-8">
                <div class="relative inline-block">
                    <svg class="score-circle w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" stroke-width="10" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" stroke-width="10" 
                                stroke-dasharray="${2 * Math.PI * 45}" 
                                stroke-dashoffset="${2 * Math.PI * 45 * (1 - percentage / 100)}" />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#6D28D9" />
                                <stop offset="100%" stop-color="#06B6D4" />
                            </linearGradient>
                        </defs>
                        <text x="50" y="50" text-anchor="middle" dy="7" font-size="20" font-weight="bold" 
                              fill="${percentage >= 70 ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444'}">
                            ${percentage}%
                        </text>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold mt-4 ${percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}">
                    ${percentage >= 70 ? 'Excellent!' : percentage >= 50 ? 'Good Job!' : 'Keep Practicing!'}
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                    You scored ${score} out of ${totalQuestions} questions correctly
                </p>
            </div>
        `;

        resultsContainer.innerHTML = resultsHTML;
    }

    // Display detailed results
    function displayDetailedResults() {
        let detailedHTML = '';
        
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            detailedHTML += `
                <div class="result-card p-6 border ${isCorrect ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'} rounded-lg">
                    <div class="flex items-start mb-4">
                        <span class="material-icons ${isCorrect ? 'text-green-500' : 'text-red-500'} mr-2">${isCorrect ? 'check_circle' : 'cancel'}</span>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Question ${index + 1}: ${question.question}</h3>
                    </div>
                    
                    <div class="ml-8 space-y-2">
                        <p class="text-gray-700 dark:text-gray-300"><strong>Your answer:</strong> ${userAnswer !== null ? question.options[userAnswer] : 'Not answered'}</p>
                        <p class="text-green-700 dark:text-green-400"><strong>Correct answer:</strong> ${question.options[question.correctAnswer]}</p>
                        <p class="text-gray-600 dark:text-gray-400 mt-2">${question.explanation}</p>
                    </div>
                </div>
            `;
        });
        
        questionsReview.innerHTML = detailedHTML;
        detailedResults.classList.remove('hidden');
        reviewButton.innerHTML = '<span>Hide Details</span><span class="material-icons">visibility_off</span>';
    }

    // Hide detailed results
    function hideDetailedResults() {
        detailedResults.classList.add('hidden');
        reviewButton.innerHTML = '<span>Review Answers</span><span class="material-icons">list_alt</span>';
    }

    // Event listeners
    retryButton.addEventListener('click', function() {
        window.location.href = 'quiz.html';
    });

    reviewButton.addEventListener('click', function() {
        if (detailedResults.classList.contains('hidden')) {
            displayDetailedResults();
        } else {
            hideDetailedResults();
        }
    });

    // Initialize results display
    displayResults();
});