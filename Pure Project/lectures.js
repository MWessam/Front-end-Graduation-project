// Tailwind configuration
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#22c55e", // green-500
                "background-light": "#ffffff",
                "background-dark": "#18181b", // zinc-900
            },
            fontFamily: {
                display: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "1rem",
            },
        },
    },
};

// Lecture button functionality
function setupLectureButtons() {
    const lectureButtons = document.querySelectorAll('.lecture-button');
    
    lectureButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const lectureCard = this.closest('.lecture-card');
            const lectureTitle = lectureCard.querySelector('.lecture-title').textContent;
            
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.classList.add('loading');
            
            // Add pulse animation to card
            lectureCard.style.transform = 'scale(0.98)';
            
            // Simulate lecture loading
            setTimeout(() => {
                // Remove loading state
                this.textContent = originalText;
                this.classList.remove('loading');
                lectureCard.style.transform = '';
                
                // Show success message
                showNotification(`Opening lecture: ${lectureTitle}`);
                
                // Here you would typically redirect to the actual lecture page
                // window.location.href = `lecture-${lectureTitle.toLowerCase().replace(/\s+/g, '-')}.html`;
            }, 1500);
        });
    });
}

// Notification system
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Dark mode functionality
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '🌙';
        showNotification('Light mode activated');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '☀️';
        showNotification('Dark mode activated');
    }
}

// Initialize theme based on user preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        themeToggle.innerHTML = '☀️';
    } else {
        themeToggle.innerHTML = '🌙';
    }
}

// Create theme toggle button
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.addEventListener('click', toggleDarkMode);
    document.body.appendChild(themeToggle);
}

// Search functionality (could be added to filter lectures)
function setupSearch() {
    // This would be implemented if we add a search bar
    console.log('Search functionality ready to be implemented');
}

// Progress tracking (optional feature)
function setupProgressTracking() {
    const lectureCards = document.querySelectorAll('.lecture-card');
    
    // Simulate progress for demo purposes
    lectureCards.forEach((card, index) => {
        const progress = Math.min(100, (index + 1) * 11); // Progress for demo
        
        // Create progress indicator (optional visual element)
        if (index % 2 === 0) { // Add to some cards for demo
            const progressText = document.createElement('div');
            progressText.className = 'text-xs text-zinc-500 dark:text-zinc-400 mt-2';
            progressText.textContent = `Progress: ${progress}%`;
            card.querySelector('.lecture-info').appendChild(progressText);
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createThemeToggle();
    initializeTheme();
    setupLectureButtons();
    setupSearch();
    setupProgressTracking();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + D for dark mode toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }
        
        // Escape key to cancel loading states
        if (e.key === 'Escape') {
            const loadingButtons = document.querySelectorAll('.lecture-button.loading');
            loadingButtons.forEach(button => {
                button.textContent = 'View Lecture';
                button.classList.remove('loading');
                
                const lectureCard = button.closest('.lecture-card');
                if (lectureCard) {
                    lectureCard.style.transform = '';
                }
            });
        }
    });
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupLectureButtons,
        toggleDarkMode,
        initializeTheme,
        setupSearch,
        setupProgressTracking
    };
}