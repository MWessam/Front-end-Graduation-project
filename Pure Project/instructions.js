document.addEventListener('DOMContentLoaded', function() {
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const startExamButton = document.getElementById('startExam');
    
    // Enable/disable start button based on checkbox
    agreeCheckbox.addEventListener('change', function() {
        startExamButton.disabled = !this.checked;
    });
    
    // Start exam button functionality
    startExamButton.addEventListener('click', function() {
        // Store exam start time in localStorage
        const examStartTime = new Date().getTime();
        localStorage.setItem('examStartTime', examStartTime);
        
        // Redirect to teacher quiz page
        window.location.href = 'teacher_quiz.html';
    });
    
    // Add entrance animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
});