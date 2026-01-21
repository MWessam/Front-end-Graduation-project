document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const overallScore = document.getElementById('overallScore');
    const detailedResults = document.getElementById('detailedResults');
    const retryButton = document.getElementById('retryButton');
    const homeButton = document.getElementById('homeButton');

    // Get results from localStorage
    const results = JSON.parse(localStorage.getItem('essayResults'));

    // If no results found, redirect to essay page
    if (!results) {
        window.location.href = 'essay.html';
        return;
    }

    const { scores, userAnswers, questions } = results;

    // Calculate overall score
    const totalScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const percentage = Math.round(totalScore * 100);
    const grade = getGrade(percentage);

    // Display overall score
    function displayOverallScore() {
        const scoreColor = getScoreColor(percentage);
        
        overallScore.innerHTML = `
            <div class="mb-4">
                <div class="relative inline-block">
                    <svg class="score-circle w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" stroke-width="10" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="${scoreColor}" stroke-width="10" 
                                stroke-dasharray="${2 * Math.PI * 45}" 
                                stroke-dashoffset="${2 * Math.PI * 45 * (1 - percentage / 100)}" />
                        <text x="50" y="50" text-anchor="middle" dy="7" font-size="20" font-weight="bold" 
                              fill="${scoreColor}">
                            ${percentage}%
                        </text>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold mt-4 text-${scoreColor.replace('#', '')}">${grade}</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                    Overall Essay Performance
                </p>
            </div>
        `;
    }

    // Display detailed results for each question
    function displayDetailedResults() {
        let detailedHTML = '';
        
        questions.forEach((question, index) => {
            const score = scores[index];
            const percentage = Math.round(score * 100);
            const scoreClass = getScoreClass(percentage);
            const userAnswer = userAnswers[index] || 'No answer provided';
            
            detailedHTML += `
                <div class="question-result bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 ${scoreClass}">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Question ${index + 1}</h3>
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${getScoreColorClass(percentage)}">
                            ${percentage}%
                        </span>
                    </div>
                    
                    <div class="mb-4">
                        <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Question:</p>
                        <p class="text-gray-600 dark:text-gray-400">${question.question}</p>
                    </div>
                    
                    <div class="mb-4">
                        <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Your Answer:</p>
                        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p class="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">${userAnswer}</p>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Key Concepts to Include:</p>
                        <ul class="list-disc pl-5 text-gray-600 dark:text-gray-400">
                            ${question.keyConcepts.map(concept => `<li>${concept}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div>
                        <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Model Answer:</p>
                        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <p class="text-gray-600 dark:text-gray-400">${question.modelAnswer}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        detailedResults.innerHTML = detailedHTML;
    }

    // Helper function to get grade based on percentage
    function getGrade(percentage) {
        if (percentage >= 90) return 'Excellent!';
        if (percentage >= 80) return 'Very Good!';
        if (percentage >= 70) return 'Good!';
        if (percentage >= 60) return 'Fair';
        return 'Needs Improvement';
    }

    // Helper function to get score color
    function getScoreColor(percentage) {
        if (percentage >= 80) return '#22c55e';
        if (percentage >= 60) return '#3b82f6';
        if (percentage >= 40) return '#f59e0b';
        return '#ef4444';
    }

    // Helper function to get score class for border
    function getScoreClass(percentage) {
        if (percentage >= 80) return 'score-excellent';
        if (percentage >= 60) return 'score-good';
        if (percentage >= 40) return 'score-fair';
        return 'score-poor';
    }

    // Helper function to get score color class for badge
    function getScoreColorClass(percentage) {
        if (percentage >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        if (percentage >= 60) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        if (percentage >= 40) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }

    // Event listeners
    retryButton.addEventListener('click', function() {
        window.location.href = 'essay.html';
    });

    homeButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Adjust to your home page
    });

    // Initialize results display
    displayOverallScore();
    displayDetailedResults();
});