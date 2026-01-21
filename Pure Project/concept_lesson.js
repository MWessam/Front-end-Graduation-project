document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const conceptCards = document.querySelectorAll('.concept-card');
    const backButton = document.getElementById('backButton');
    const startQuizButton = document.getElementById('startQuiz');
    
    // Navigation functions
    function navigateToConcept() {
        window.location.href = 'concept.html';
    }
    
    function navigateToLessonLec() {
        window.location.href = 'lesson_lec.html';
    }
    
    function navigateToQuiz() {
        window.location.href = 'quiz.html';
    }
    
    // Event listeners for navigation
    conceptCards.forEach(card => {
        card.addEventListener('click', navigateToConcept);
    });
    
    backButton.addEventListener('click', navigateToLessonLec);
    startQuizButton.addEventListener('click', navigateToQuiz);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to go back
        if (e.key === 'Escape') {
            navigateToLessonLec();
        }
        
        // Enter key on cards to navigate
        if (e.key === 'Enter' && document.activeElement.classList.contains('concept-card')) {
            navigateToConcept();
        }
    });
    
    // Add focus styles for accessibility
    conceptCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid #22c55e';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});