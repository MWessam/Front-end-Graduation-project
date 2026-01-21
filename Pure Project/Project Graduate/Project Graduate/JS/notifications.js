// Notifications Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sample notifications data
    const notificationsData = [
        {
            id: 1,
            type: 'assignment',
            title: 'New Assignment Graded',
            content: 'Your submission for "Calculus Midterm" has been graded by Prof. Davis.',
            time: '5m ago',
            timestamp: new Date(Date.now() - 5 * 60000),
            read: false,
            important: true,
            icon: 'assignment',
            color: '#8b5cf6',
            class: 'Math 101',
            actions: ['view', 'reply']
        },
        {
            id: 2,
            type: 'message',
            title: 'Student Message',
            content: 'Ahmed Mohamed sent you a message regarding the "History Project".',
            time: '2h ago',
            timestamp: new Date(Date.now() - 2 * 3600000),
            read: false,
            important: false,
            icon: 'chat_bubble',
            color: '#3b82f6',
            student: 'Ahmed Mohamed',
            actions: ['reply', 'snooze']
        },
        {
            id: 3,
            type: 'class',
            title: 'Class Update',
            content: '"Physics 101" lecture tomorrow is cancelled. Please check your email for more details.',
            time: '1d ago',
            timestamp: new Date(Date.now() - 24 * 3600000),
            read: false,
            important: true,
            icon: 'campaign',
            color: '#f59e0b',
            class: 'Physics 101',
            actions: ['view', 'snooze']
        },
        {
            id: 4,
            type: 'class',
            title: 'New Group Member',
            content: 'Fatma Hassan has been added to your "Biology Study Group".',
            time: '2d ago',
            timestamp: new Date(Date.now() - 48 * 3600000),
            read: true,
            important: false,
            icon: 'group',
            color: '#8b5cf6',
            class: 'Biology Study Group',
            actions: ['view']
        },
        {
            id: 5,
            type: 'assignment',
            title: 'Upcoming Deadline',
            content: 'The "Literature Essay" is due in 3 days. Don\'t forget to submit.',
            time: '4d ago',
            timestamp: new Date(Date.now() - 96 * 3600000),
            read: true,
            important: true,
            icon: 'notification_important',
            color: '#ef4444',
            class: 'Literature 201',
            actions: ['view', 'snooze']
        },
        {
            id: 6,
            type: 'system',
            title: 'System Maintenance',
            content: 'The platform will be undergoing maintenance this Sunday from 2:00 AM to 4:00 AM.',
            time: '1w ago',
            timestamp: new Date(Date.now() - 7 * 24 * 3600000),
            read: true,
            important: false,
            icon: 'build',
            color: '#6b7280',
            actions: ['dismiss']
        },
        {
            id: 7,
            type: 'message',
            title: 'Parent Meeting Reminder',
            content: 'You have a scheduled parent-teacher meeting tomorrow at 3:00 PM.',
            time: '1w ago',
            timestamp: new Date(Date.now() - 7 * 24 * 3600000),
            read: true,
            important: true,
            icon: 'event',
            color: '#10b981',
            actions: ['view', 'snooze']
        },
        {
            id: 8,
            type: 'assignment',
            title: 'Quiz Results Available',
            content: 'Results for the "Chemistry Quiz" are now available for review.',
            time: '2w ago',
            timestamp: new Date(Date.now() - 14 * 24 * 3600000),
            read: true,
            important: false,
            icon: 'quiz',
            color: '#8b5cf6',
            class: 'Chemistry 101',
            actions: ['view']
        }
    ];

    // State variables
    let currentFilter = 'all';
    let filteredNotifications = [...notificationsData];
    let currentNotifications = [];

    // DOM Elements
    const notificationsList = document.getElementById('notifications-list');
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const markAllReadBtn = document.getElementById('mark-all-read');
    const clearAllBtn = document.getElementById('clear-all');
    const settingsBtn = document.getElementById('notifications-settings');
    const settingsModal = document.getElementById('settings-modal');
    const cancelSettingsBtn = document.getElementById('cancel-settings');
    const saveSettingsBtn = document.getElementById('save-settings');
    const backToTopBtn = document.getElementById('back-to-top');
    const totalNotificationsEl = document.getElementById('total-notifications');
    const unreadNotificationsEl = document.getElementById('unread-notifications');

    // Initialize page
    function initPage() {
        // Simulate loading delay
        setTimeout(() => {
            loadingState.style.display = 'none';
            renderNotifications();
            updateStats();
            setupAnimations();
        }, 800);

        setupEventListeners();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Filter tabs
        filterTabs.forEach(tab => {
            tab.addEventListener('click', handleFilterChange);
        });

        // Action buttons
        markAllReadBtn.addEventListener('click', markAllAsRead);
        clearAllBtn.addEventListener('click', clearAllNotifications);
        settingsBtn.addEventListener('click', openSettingsModal);
        
        // Modal buttons
        cancelSettingsBtn.addEventListener('click', closeSettingsModal);
        saveSettingsBtn.addEventListener('click', saveSettings);
        
        // Close modal with escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSettingsModal();
            }
        });
        
        // Close modal on outside click
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                closeSettingsModal();
            }
        });
        
        // Back to top
        backToTopBtn.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', toggleBackToTopButton);
        
        // Close modal buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', closeSettingsModal);
        });
    }

    // Render notifications
    function renderNotifications() {
        notificationsList.innerHTML = '';
        
        // Apply current filter
        applyFilter();
        
        if (currentNotifications.length === 0) {
            emptyState.style.display = 'flex';
            notificationsList.style.display = 'none';
            return;
        }
        
        emptyState.style.display = 'none';
        notificationsList.style.display = 'flex';
        
        currentNotifications.forEach((notification, index) => {
            const notificationEl = createNotificationElement(notification, index);
            notificationsList.appendChild(notificationEl);
        });
    }

    // Create notification element
    function createNotificationElement(notification, index) {
        const div = document.createElement('div');
        div.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
        div.dataset.id = notification.id;
        div.style.setProperty('--delay', `${index * 0.05}s`);
        
        // Format time with relative time
        const timeAgo = getRelativeTime(notification.timestamp);
        
        // Get icon class
        const iconClass = getIconClass(notification.type);
        
        // Create actions HTML
        const actionsHTML = createActionsHTML(notification);
        
        div.innerHTML = `
            <div class="notification-header">
                <div class="notification-info">
                    <div class="notification-icon ${iconClass}" style="background-color: ${notification.color}10; color: ${notification.color}">
                        <span class="material-symbols-outlined">${notification.icon}</span>
                    </div>
                    <div>
                        <h4 class="notification-title">${notification.title}</h4>
                        <div class="notification-meta">
                            <span class="notification-time">
                                <span class="material-symbols-outlined" style="font-size: 14px">schedule</span>
                                ${timeAgo}
                            </span>
                            ${notification.class ? `<span class="class-name">${notification.class}</span>` : ''}
                            ${notification.student ? `<span class="student-name">${notification.student}</span>` : ''}
                            ${notification.important ? '<span class="notification-badge important">Important</span>' : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div class="notification-content">
                ${notification.content}
            </div>
            <div class="notification-actions">
                ${actionsHTML}
            </div>
        `;
        
        // Add click event to mark as read
        if (!notification.read) {
            div.addEventListener('click', (e) => {
                if (!e.target.closest('.notification-actions')) {
                    markAsRead(notification.id);
                }
            });
        }
        
        return div;
    }

    // Get icon class based on notification type
    function getIconClass(type) {
        switch(type) {
            case 'message': return 'message';
            case 'assignment': return 'assignment';
            case 'class': return 'class';
            case 'system': return 'system';
            default: return '';
        }
    }

    // Create actions HTML
    function createActionsHTML(notification) {
        let actions = '';
        
        notification.actions.forEach(action => {
            switch(action) {
                case 'view':
                    actions += `<button class="notification-action-btn read" data-action="view" data-id="${notification.id}">
                        <span class="material-symbols-outlined" style="font-size: 16px">visibility</span>
                        View
                    </button>`;
                    break;
                case 'reply':
                    actions += `<button class="notification-action-btn read" data-action="reply" data-id="${notification.id}">
                        <span class="material-symbols-outlined" style="font-size: 16px">reply</span>
                        Reply
                    </button>`;
                    break;
                case 'snooze':
                    actions += `<button class="notification-action-btn snooze" data-action="snooze" data-id="${notification.id}">
                        <span class="material-symbols-outlined" style="font-size: 16px">snooze</span>
                        Snooze
                    </button>`;
                    break;
                case 'dismiss':
                    actions += `<button class="notification-action-btn delete" data-action="dismiss" data-id="${notification.id}">
                        <span class="material-symbols-outlined" style="font-size: 16px">close</span>
                        Dismiss
                    </button>`;
                    break;
            }
        });
        
        // Always add delete button
        actions += `<button class="notification-action-btn delete" data-action="delete" data-id="${notification.id}">
            <span class="material-symbols-outlined" style="font-size: 16px">delete</span>
            Delete
        </button>`;
        
        return actions;
    }

    // Get relative time string
    function getRelativeTime(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        const diffWeeks = Math.floor(diffDays / 7);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffWeeks < 4) return `${diffWeeks}w ago`;
        return date.toLocaleDateString();
    }

    // Handle filter change
    function handleFilterChange(e) {
        const filter = e.target.dataset.filter;
        
        // Update active tab
        filterTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.filter === filter) {
                tab.classList.add('active');
                // Add animation effect
                tab.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    tab.style.transform = '';
                }, 150);
            }
        });
        
        // Update current filter
        currentFilter = filter;
        
        // Apply filter and re-render
        applyFilter();
        renderNotifications();
        updateStats();
    }

    // Apply current filter
    function applyFilter() {
        switch(currentFilter) {
            case 'all':
                currentNotifications = [...filteredNotifications];
                break;
            case 'unread':
                currentNotifications = filteredNotifications.filter(n => !n.read);
                break;
            case 'messages':
                currentNotifications = filteredNotifications.filter(n => n.type === 'message');
                break;
            case 'assignments':
                currentNotifications = filteredNotifications.filter(n => n.type === 'assignment');
                break;
            case 'classes':
                currentNotifications = filteredNotifications.filter(n => n.type === 'class');
                break;
        }
    }

    // Mark notification as read
    function markAsRead(id) {
        const notification = notificationsData.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            
            // Update UI
            const notificationEl = document.querySelector(`.notification-item[data-id="${id}"]`);
            if (notificationEl) {
                notificationEl.classList.remove('unread');
                notificationEl.classList.add('read');
                
                // Add fade animation
                notificationEl.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    notificationEl.style.animation = '';
                }, 300);
            }
            
            updateStats();
            showNotification('Notification marked as read', 'success');
        }
    }

    // Mark all as read
    function markAllAsRead() {
        // Add animation to button
        markAllReadBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            markAllReadBtn.style.transform = '';
        }, 150);
        
        // Mark all unread as read
        notificationsData.forEach(notification => {
            if (!notification.read) {
                notification.read = true;
            }
        });
        
        // Update all notification elements
        document.querySelectorAll('.notification-item.unread').forEach(el => {
            el.classList.remove('unread');
            el.classList.add('read');
            el.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                el.style.animation = '';
            }, 300);
        });
        
        updateStats();
        showNotification('All notifications marked as read', 'success');
    }

    // Clear all notifications
    function clearAllNotifications() {
        // Add confirmation
        if (!confirm('Are you sure you want to clear all notifications?')) {
            return;
        }
        
        // Add animation to button
        clearAllBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clearAllBtn.style.transform = '';
        }, 150);
        
        // Clear all notifications with animation
        const notifications = document.querySelectorAll('.notification-item');
        notifications.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = 'notificationSlideIn 0.3s ease reverse';
                setTimeout(() => {
                    el.remove();
                }, 300);
            }, index * 50);
        });
        
        // Clear data
        notificationsData.length = 0;
        filteredNotifications = [];
        currentNotifications = [];
        
        // Show empty state
        setTimeout(() => {
            emptyState.style.display = 'flex';
            notificationsList.style.display = 'none';
            updateStats();
            showNotification('All notifications cleared', 'success');
        }, notifications.length * 50 + 300);
    }

    // Update statistics
    function updateStats() {
        const total = notificationsData.length;
        const unread = notificationsData.filter(n => !n.read).length;
        
        // Animate the number change
        animateNumber(totalNotificationsEl, total);
        animateNumber(unreadNotificationsEl, unread);
    }

    // Animate number change
    function animateNumber(element, newValue) {
        const oldValue = parseInt(element.textContent) || 0;
        const difference = newValue - oldValue;
        const duration = 500;
        const steps = 20;
        const stepValue = difference / steps;
        let currentStep = 0;
        
        const interval = setInterval(() => {
            currentStep++;
            const currentValue = Math.round(oldValue + (stepValue * currentStep));
            element.textContent = currentValue;
            
            if (currentStep >= steps) {
                element.textContent = newValue;
                clearInterval(interval);
            }
        }, duration / steps);
    }

    // Open settings modal
    function openSettingsModal() {
        settingsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Animate modal
        const modalContent = settingsModal.querySelector('.modal-content');
        modalContent.style.animation = 'slideUp 0.3s ease';
    }

    // Close settings modal
    function closeSettingsModal() {
        settingsModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Save settings
    function saveSettings() {
        // In a real app, you would save these to localStorage or server
        showNotification('Notification settings saved', 'success');
        closeSettingsModal();
    }

    // Setup animations
    function setupAnimations() {
        // Add hover effects to notifications
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.notification-item')) {
                const notification = e.target.closest('.notification-item');
                notification.style.transform = 'translateY(-2px)';
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.notification-item')) {
                const notification = e.target.closest('.notification-item');
                notification.style.transform = '';
            }
        });
        
        // Add click animations to action buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.notification-action-btn')) {
                const btn = e.target.closest('.notification-action-btn');
                const action = btn.dataset.action;
                const id = parseInt(btn.dataset.id);
                
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
                
                handleNotificationAction(action, id);
            }
        });
    }

    // Handle notification action
    function handleNotificationAction(action, id) {
        const notification = notificationsData.find(n => n.id === id);
        
        switch(action) {
            case 'view':
                showNotification(`Opening ${notification.title}`, 'info');
                // In real app, this would navigate to the relevant page
                break;
            case 'reply':
                showNotification(`Replying to ${notification.student || 'notification'}`, 'info');
                break;
            case 'snooze':
                showNotification('Notification snoozed for 1 hour', 'success');
                // Remove notification temporarily
                const notificationEl = document.querySelector(`.notification-item[data-id="${id}"]`);
                if (notificationEl) {
                    notificationEl.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        notificationEl.remove();
                        // Re-add after 1 hour in real app
                    }, 300);
                }
                break;
            case 'delete':
            case 'dismiss':
                deleteNotification(id);
                break;
        }
    }

    // Delete notification
    function deleteNotification(id) {
        const index = notificationsData.findIndex(n => n.id === id);
        if (index !== -1) {
            // Remove from data
            notificationsData.splice(index, 1);
            filteredNotifications = notificationsData.filter(n => {
                // Reapply current filter
                switch(currentFilter) {
                    case 'all': return true;
                    case 'unread': return !n.read;
                    case 'messages': return n.type === 'message';
                    case 'assignments': return n.type === 'assignment';
                    case 'classes': return n.type === 'class';
                    default: return true;
                }
            });
            
            // Remove from UI with animation
            const notificationEl = document.querySelector(`.notification-item[data-id="${id}"]`);
            if (notificationEl) {
                notificationEl.style.animation = 'notificationSlideIn 0.3s ease reverse';
                setTimeout(() => {
                    notificationEl.remove();
                    renderNotifications();
                    updateStats();
                    showNotification('Notification deleted', 'success');
                }, 300);
            }
        }
    }

    // Toggle back to top button
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    // Scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add bounce animation to button
        backToTopBtn.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            backToTopBtn.style.animation = 'bounce 2s infinite';
        }, 500);
    }

    // Show notification toast
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification-toast notification-${type}`;
        notification.innerHTML = `
            <span class="material-symbols-outlined">
                ${type === 'success' ? 'check_circle' : 
                  type === 'error' ? 'error' : 
                  type === 'warning' ? 'warning' : 'info'}
            </span>
            <span>${message}</span>
            <button class="notification-close">
                <span class="material-symbols-outlined">close</span>
            </button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${type === 'success' ? '#10b981' : 
                             type === 'error' ? '#ef4444' : 
                             type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 1000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 3000);
    }

    // Initialize
    initPage();
});