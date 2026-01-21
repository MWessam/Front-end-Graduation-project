/**
 * Dashboard JavaScript
 * Handles interactivity and navigation for the Duolingo-style dashboard
 */

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const startBtn = document.getElementById('startBtn');
const jumpBtn = document.getElementById('jumpBtn');
const circleItems = document.querySelectorAll('.circle-item');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initButtons();
    initCircleItems();
});

/**
 * Initialize Navigation
 * Handles sidebar navigation item selection
 */
function initNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the nav ID
            const navId = this.getAttribute('data-nav-id');
            handleNavigation(navId);
        });
    });
}

/**
 * Handle Navigation
 * @param {string} navId - The navigation item ID
 */
function handleNavigation(navId) {
    console.log('Navigated to:', navId);
    
    // In a real app, you would navigate to different pages
    // For now, just log the action
    switch(navId) {
        case 'learn':
            console.log('Going to Learn section');
            break;
        case 'practice':
            console.log('Going to Practice section');
            break;
        case 'leaderboard':
            console.log('Going to Leaderboards');
            break;
        case 'quests':
            console.log('Going to Quests');
            break;
        case 'shop':
            console.log('Going to Shop');
            break;
        case 'profile':
            console.log('Going to Profile');
            break;
        case 'more':
            console.log('Going to More options');
            break;
    }
}

/**
 * Initialize Buttons
 * Handles START and JUMP button clicks
 */
function initButtons() {
    // START Button
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            console.log('START button clicked');
            handleStartLesson();
        });
        
        // Ripple effect on click
        startBtn.addEventListener('mousedown', function(e) {
            createRipple(e, this);
        });
    }
    
    // JUMP Button
    if (jumpBtn) {
        jumpBtn.addEventListener('click', function() {
            console.log('JUMP button clicked');
            handleJumpLesson();
        });
        
        // Ripple effect on click
        jumpBtn.addEventListener('mousedown', function(e) {
            createRipple(e, this);
        });
    }
    
    // Other buttons
    const guidebookBtn = document.querySelector('.btn-guidebook');
    if (guidebookBtn) {
        guidebookBtn.addEventListener('click', function() {
            console.log('Guidebook button clicked');
            showNotification('Opening Guidebook...', 'info');
        });
    }
    
    const superBtn = document.querySelector('.btn-super-week');
    if (superBtn) {
        superBtn.addEventListener('click', function() {
            console.log('Super week button clicked');
            showNotification('Starting 1 week free trial...', 'success');
        });
    }
}

/**
 * Initialize Circle Items
 * Adds interaction to circle items in the cascade layout
 */
function initCircleItems() {
    circleItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Circle item clicked');
            this.style.animation = 'bounce 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

/**
 * Handle Start Lesson
 * Navigates to the lesson page
 */
function handleStartLesson() {
    showNotification('Starting lesson...', 'success');
    
    // In a real app, navigate to the lesson page
    // window.location.href = '/lesson';
    
    // For now, simulate loading
    setTimeout(() => {
        console.log('Lesson started');
    }, 500);
}

/**
 * Handle Jump Lesson
 * Jumps to the next lesson
 */
function handleJumpLesson() {
    showNotification('Jumping to next lesson...', 'success');
    
    // In a real app, this would navigate to the next lesson
    // window.location.href = '/lesson/next';
    
    // For now, simulate loading
    setTimeout(() => {
        console.log('Jumped to next lesson');
    }, 500);
}

/**
 * Show Notification
 * Displays a temporary notification message
 * @param {string} message - The message to display
 * @param {string} type - The notification type: 'success', 'error', 'info', 'warning'
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease-out',
        maxWidth: '300px',
        wordWrap: 'break-word',
    });
    
    // Set background color based on type
    const colors = {
        success: '#22c55e',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Create Ripple Effect
 * Creates a ripple effect on button click
 * @param {Event} event - The mouse event
 * @param {HTMLElement} element - The element to apply ripple to
 */
function createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

/**
 * Handle Links
 * Prevents default action for view league and view all links
 */
function handleLinks() {
    const links = document.querySelectorAll('.link-view');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent;
            showNotification(`${text} feature coming soon!`, 'info');
        });
    });
}

/**
 * Add CSS Animations
 * Dynamically add animation styles to the page
 */
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize Keyboard Shortcuts
 * Adds keyboard navigation support
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // 's' key for start lesson
        if (e.key === 's' || e.key === 'S') {
            if (startBtn) {
                startBtn.click();
            }
        }
        
        // 'j' key for jump lesson
        if (e.key === 'j' || e.key === 'J') {
            if (jumpBtn) {
                jumpBtn.click();
            }
        }
        
        // Number keys for navigation (1-7)
        const num = parseInt(e.key);
        if (num >= 1 && num <= 7) {
            const navItem = navItems[num - 1];
            if (navItem) {
                navItem.click();
            }
        }
    });
}

/**
 * Initialize Responsive Behavior
 * Handles responsive design adjustments
 */
function initResponsive() {
    // Handle sidebar toggle on mobile
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth < 992) {
        if (sidebar) {
            sidebar.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', function() {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth < 992) {
            if (sidebar) {
                sidebar.style.display = 'none';
            }
        } else {
            if (sidebar) {
                sidebar.style.display = 'flex';
            }
        }
    });
}

/**
 * Initialize Accessibility
 * Adds accessibility features
 */
function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #3b82f6;
        color: white;
        padding: 8px;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

/**
 * Load all initializations
 */
function initDashboard() {
    addAnimations();
    handleLinks();
    initKeyboardShortcuts();
    initResponsive();
    initAccessibility();
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

// Export for use in other scripts if needed
window.Dashboard = {
    showNotification,
    handleNavigation,
    handleStartLesson,
    handleJumpLesson
};
