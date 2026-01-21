document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Add navigation functionality
    initNavigation();
    
    // Add celebration effect
    createCelebration();
});

function initAnimations() {
    // Animate progress bars
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.progress-bar, .level-progress');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
        });
    }, 1200);
    
    // Add staggered animation to achievement items
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.animation = `fadeInUp 0.6s ease ${1 + (index * 0.1)}s forwards`;
    });
}

function initNavigation() {
    // Navigation function
    function navigateTo(page) {
        // Add page transition effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            window.location.href = page;
        }, 300);
    }
    
    // Achievement item navigation
    const achievementItems = document.querySelectorAll('.achievement-item:not(.locked)');
    achievementItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Navigate after animation
            setTimeout(() => {
                navigateTo(targetPage);
            }, 300);
        });
    });
    
    // Continue button navigation
    const continueButton = document.getElementById('continueButton');
    continueButton.addEventListener('click', function() {
        // Add click feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Navigate after animation
        setTimeout(() => {
            navigateTo('lectures.html');
        }, 300);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Enter key to continue
        if (e.key === 'Enter') {
            navigateTo('lectures.html');
        }
        
        // Number keys for achievements
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            const achievementItems = document.querySelectorAll('.achievement-item:not(.locked)');
            if (achievementItems[index]) {
                const targetPage = achievementItems[index].getAttribute('data-target');
                navigateTo(targetPage);
            }
        }
    });
}

function createCelebration() {
    const celebrationContainer = document.getElementById('celebration');
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear ${Math.random() * 2}s forwards`;
        confetti.style.width = `${5 + Math.random() * 10}px`;
        confetti.style.height = `${5 + Math.random() * 10}px`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        celebrationContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation completes
    setTimeout(() => {
        celebrationContainer.innerHTML = '';
    }, 5000);
}

// Add page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});