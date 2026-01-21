// Tailwind configuration
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#22c55e",
                "background-light": "#ffffff",
                "background-dark": "#111827",
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

// Star icon click functionality
function setupStarClick() {
    const starIcon = document.querySelector('.clickable-star');
    if (starIcon) {
        starIcon.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            this.style.backgroundColor = '#1d4ed8';
            
            // Redirect to fff.html after a short delay for animation
            setTimeout(() => {
                window.location.href = 'allcourses.html';
            }, 300);
        });
    }
}

// Dark mode toggle functionality
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme based on user preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
}

// Play button functionality
function setupPlayButton() {
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            // Add animation class
            this.classList.add('animate-pulse');
            
            // Simulate loading/starting a lesson
            setTimeout(() => {
                alert('Starting lesson...');
                this.classList.remove('animate-pulse');
            }, 500);
        });
    }
}

// Progress animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const currentWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = currentWidth;
        }, 100);
    });
}

// Navigation active state
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupStarClick(); // This is the new function for star click
    setupPlayButton();
    animateProgressBars();
    setupNavigation();
    
    // Add keyboard shortcut for dark mode (Ctrl/Cmd + D)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }
    });
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupStarClick,
        toggleDarkMode,
        initializeTheme,
        setupPlayButton,
        animateProgressBars,
        setupNavigation
    };
}