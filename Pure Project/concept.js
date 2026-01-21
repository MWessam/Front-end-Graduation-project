document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');
    
    // Navigation function to concept_lesson.html
    function navigateToConceptLesson() {
        window.location.href = 'concept_lesson.html';
    }
    
    // Event listeners for navigation
    backButton.addEventListener('click', navigateToConceptLesson);
    nextButton.addEventListener('click', navigateToConceptLesson);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to navigate back
        if (e.key === 'Escape') {
            navigateToConceptLesson();
        }
        
        // Enter key to navigate (if focused on buttons)
        if (e.key === 'Enter') {
            if (document.activeElement === backButton || document.activeElement === nextButton) {
                navigateToConceptLesson();
            }
        }
    });
    
    // Add scroll animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Add image lazy loading enhancement
    const conceptImage = document.getElementById('conceptImage');
    if (conceptImage) {
        // Preload image for better performance
        const img = new Image();
        img.src = conceptImage.src;
        img.onload = function() {
            conceptImage.style.opacity = '1';
        };
        
        conceptImage.style.opacity = '0';
        conceptImage.style.transition = 'opacity 0.5s ease';
    }
});