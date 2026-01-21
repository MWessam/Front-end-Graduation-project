document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const overallScore = document.getElementById('overallScore');
    const mcqScore = document.getElementById('mcqScore');
    const essayScore = document.getElementById('essayScore');
    const detailedResults = document.getElementById('detailedResults');
    const retryButton = document.getElementById('retryButton');
    const backButton = document.getElementById('backButton');

    // Get results from localStorage
    const results = JSON.parse(localStorage.getItem('mcqEssayResults'));

    // If no results found, redirect to quiz page
    if (!results) {
        window.location.href = 'mcq_essay.html';
        return;
    }

    const { scores, userAnswers, questions } = results;

    // Calculate scores
    let mcqScores = [];
    let essayScores = [];
    
    questions.forEach((question, index) => {
        if (question.type === "mcq") {
            mcqScores.push(scores[index]);
        } else if (question.type === "essay") {
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

    // Display overall score
    function displayOverallScore() {
        const scoreColor = getScoreColor(overallPercentage);
        
        overallScore.innerHTML = `
            <div class="mb-4">
                <div class="relative inline-block">
                    <svg class="score-circle w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" stroke-width="10" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="${scoreColor}" stroke-width="10" 
                                stroke-dasharray="${2 * Math.PI * 45}" 
                                stroke-dashoffset="${2 * Math.PI * 45 * (1 - overallPercentage / 100)}" />
                        <text x="50" y="50" text-anchor="middle" dy="7" font-size="20" font-weight="bold" 
                              fill="${scoreColor}">
                            ${overallPercentage}%
                        </text>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold mt-4" style="color: ${scoreColor}">${overallGrade}</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                    Overall Performance
                </p>
            </div>
        `;
    }

    // Display MCQ score
    function displayMCQScore() {
        const scoreColor = getScoreColor(mcqPercentage);
        
        mcqScore.innerHTML = `
            <div class="mb-2">
                <div class="text-4xl font-bold" style="color: ${scoreColor}">${mcqPercentage}%</div>
                <p class="text-gray-600 dark:text-gray-400">${mcqGrade}</p>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
                ${mcqScores.filter(score => score === 1).length} out of ${mcqScores.length} correct
            </div>
        `;
    }

    // Display Essay score
    function displayEssayScore() {
        const scoreColor = getScoreColor(essayPercentage);
        
        essayScore.innerHTML = `
            <div class="mb-2">
                <div class="text-4xl font-bold" style="color: ${scoreColor}">${essayPercentage}%</div>
                <p class="text-gray-600 dark:text-gray-400">${essayGrade}</p>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
                Average score: ${(essayTotal / essayScores.length).toFixed(1)}/1
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
            const userAnswer = userAnswers[index];
            
            let questionHTML = '';
            
            if (question.type === "mcq") {
                const isCorrect = score === 1;
                const userAnswerText = userAnswer !== null ? question.options[userAnswer] : 'Not answered';
                const correctAnswerText = question.options[question.correctAnswer];
                
                questionHTML = `
                    <div class="mb-4">
                        <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Your Answer:</p>
                        <div class="${isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'} p-4 rounded-lg">
                            <p class="${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}">${userAnswerText}</p>
                        </div>
                        ${!isCorrect ? `
                            <div class="mt-2">
                                <p class="text-gray-700 dark:text-gray-300 font-medium mb-1">Correct Answer:</p>
                                <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                    <p class="text-green-700 dark:text-green-400">${correctAnswerText}</p>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div>
                        <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Explanation:</p>
                        <p class="text-gray-600 dark:text-gray-400">${question.explanation}</p>
                    </div>
                `;
            } else if (question.type === "essay") {
                const userAnswerText = userAnswer || 'No answer provided';
                
                questionHTML = `
                    <div class="mb-4">
                        <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Your Answer:</p>
                        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p class="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">${userAnswerText}</p>
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
                `;
            }
            
            detailedHTML += `
                <div class="question-result bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 ${scoreClass}">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Question ${index + 1}</h3>
                        <div class="flex items-center space-x-2">
                            <span class="px-3 py-1 rounded-full text-sm font-medium ${getScoreColorClass(percentage)}">
                                ${percentage}%
                            </span>
                            <span class="question-type-badge ${question.type === 'mcq' ? 'mcq-badge' : 'essay-badge'}">
                                ${question.type.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Question:</p>
                        <p class="text-gray-600 dark:text-gray-400">${question.question}</p>
                    </div>
                    
                    ${questionHTML}
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
        window.location.href = 'mcq_essay.html';
    });

    backButton.addEventListener('click', function() {
        window.history.back();
    });

    // Initialize results display
    displayOverallScore();
    displayMCQScore();
    displayEssayScore();
    displayDetailedResults();
});