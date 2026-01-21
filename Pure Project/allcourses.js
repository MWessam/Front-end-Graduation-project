// Tailwind configuration
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#22c55e", // green-500
                "background-light": "#f8fafc", // slate-50
                "background-dark": "#0f172a", // slate-900
            },
            fontFamily: {
                display: ["Public Sans", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.75rem", // rounded-lg
            },
        },
    },
};

// Course button functionality
function setupCourseButtons() {
    const courseButtons = document.querySelectorAll('.course-button');
    
    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            this.textContent = 'Starting...';
            
            // Simulate course loading
            setTimeout(() => {
                alert(`Starting ${courseTitle} course!`);
                this.style.transform = 'scale(1)';
                this.textContent = 'Start Learning';
                
                // Here you can redirect to the actual course page
                // window.location.href = `course-${courseTitle.toLowerCase()}.html`;
            }, 1000);
        });
    });
}

// Dark mode functionality
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

// Navigation functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the page name from the link text
            const pageName = this.querySelector('span:last-child').textContent;
            console.log(`Navigating to: ${pageName}`);
            
            // Here you would typically load the corresponding page content
            // or redirect to a different page
        });
    });
}

// Search functionality (could be added later)
function setupSearch() {
    // This function can be expanded to add search functionality
    console.log('Search functionality ready to be implemented');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupCourseButtons();
    setupNavigation();
    setupSearch();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + D for dark mode toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }
        
        // Escape key to reset animations
        if (e.key === 'Escape') {
            const buttons = document.querySelectorAll('.course-button');
            buttons.forEach(button => {
                button.style.transform = 'scale(1)';
                button.textContent = 'Start Learning';
            });
        }
    });
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupCourseButtons,
        toggleDarkMode,
        initializeTheme,
        setupNavigation,
        setupSearch
    };
}


function startCourse(button) {
    // تأثير الضغط
    button.style.transform = 'scale(0.95)';
    button.textContent = 'Starting...';

    // تحويل للصفحة بعد ثواني قليلة
    setTimeout(() => {
        window.location.href = 'lectures.html';
    }, 500); // 0.5 ثانية للتأثير فقط
}