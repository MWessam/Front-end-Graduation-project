document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');
        
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        
        // Animation for theme toggle
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    });
    
    // Classes Data
    const classesData = [
        {
            id: 1,
            name: "Class 1",
            description: "Material for Substance",
            location: "Mansura's College - Mansura, Dept.",
            sets: 2,
            members: 15,
            exams: 3,
            color: "#22c55e"
        },
        {
            id: 2,
            name: "Class 2",
            description: "Students Groups",
            location: "Mansura's College - Mansura, Dept.",
            sets: 2,
            members: 22,
            exams: 5,
            color: "#3b82f6"
        },
        {
            id: 3,
            name: "Class 3",
            description: "Material for Substance",
            location: "Mansura's College - Mansura, Dept.",
            sets: 2,
            members: 18,
            exams: 2,
            color: "#8b5cf6"
        },
        {
            id: 4,
            name: "Class 4",
            description: "Students Groups",
            location: "Mansura's College - Mansura, Dept.",
            sets: 2,
            members: 25,
            exams: 4,
            color: "#f97316"
        }
    ];
    
    // Save classes to localStorage to use in class page
    localStorage.setItem('classesData', JSON.stringify(classesData));
    
    // Render Classes in main grid AND update sidebar
    function renderClasses() {
        // Render main grid
        const classesGrid = document.querySelector('.classes-grid');
        classesGrid.innerHTML = '';
        
        classesData.forEach(classItem => {
            const classCard = document.createElement('div');
            classCard.className = 'class-card';
            classCard.style.setProperty('--primary', classItem.color);
            classCard.dataset.id = classItem.id;
            
            classCard.innerHTML = `
                <div class="class-card-header">
                    <div>
                        <h3 class="class-card-title">${classItem.name}</h3>
                        <p class="class-card-subtitle">${classItem.description}</p>
                        <p class="class-card-subtitle">${classItem.location}</p>
                    </div>
                    <div class="class-card-actions">
                        <button class="class-card-action-btn more-options-btn" title="More options" data-id="${classItem.id}">
                            <span class="material-symbols-outlined">more_horiz</span>
                        </button>
                        <button class="class-card-action-btn settings-btn" title="Settings" data-id="${classItem.id}">
                            <span class="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                </div>
                <div class="class-card-stats">
                    <div class="class-card-stat">
                        <span class="material-symbols-outlined">bolt</span>
                        <span>${classItem.sets} sets</span>
                    </div>
                    <div class="class-card-stat">
                        <span class="material-symbols-outlined">group</span>
                        <span>${classItem.members} members</span>
                    </div>
                    <div class="class-card-stat">
                        <span class="material-symbols-outlined">assignment</span>
                        <span>${classItem.exams} exams</span>
                    </div>
                </div>
            `;
            
            // Add click event to view class details - NOW REDIRECTS TO CLASS PAGE
            classCard.addEventListener('click', function(e) {
                if (!e.target.closest('.class-card-actions')) {
                    viewClassDetails(classItem);
                }
            });
            
            // Add hover effect with color
            classCard.addEventListener('mouseenter', function() {
                this.style.borderColor = classItem.color;
            });
            
            classCard.addEventListener('mouseleave', function() {
                this.style.borderColor = '';
            });
            
            classesGrid.appendChild(classCard);
        });
        
        // Add event listeners to buttons after rendering
        addClassActionListeners();
        
        // Update sidebar classes
        updateSidebarClasses();
    }
    
    // Update Sidebar Classes List
    function updateSidebarClasses() {
        const sidebarClassesList = document.getElementById('sidebar-classes-list');
        
        if (!sidebarClassesList) {
            console.error('Sidebar classes list not found! Check HTML for id="sidebar-classes-list"');
            return;
        }
        
        // Find the "New class" item
        const newClassItem = sidebarClassesList.querySelector('.new-class-link')?.closest('.nav-item');
        
        if (!newClassItem) {
            console.error('New class item not found in sidebar!');
            return;
        }
        
        // Remove all existing class items (except "New class")
        const existingClassItems = Array.from(sidebarClassesList.querySelectorAll('.nav-item'));
        existingClassItems.forEach(item => {
            if (!item.querySelector('.new-class-link')) {
                item.remove();
            }
        });
        
        // Add current classes to sidebar (in order)
        classesData.forEach(classItem => {
            const listItem = document.createElement('li');
            listItem.className = 'nav-item';
            listItem.innerHTML = `
                <a href="class.html?id=${classItem.id}" class="nav-link class-link" data-class="${classItem.id}">
                    ${classItem.name}
                </a>
            `;
            
            // Insert before "New class" item
            sidebarClassesList.insertBefore(listItem, newClassItem);
        });
        
        // Add click events to sidebar class links
        addSidebarClassListeners();
    }
    
    // Add event listeners to sidebar class links
    function addSidebarClassListeners() {
        document.querySelectorAll('.class-link').forEach(link => {
            // Remove any existing listeners to prevent duplicates
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add new listener
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                const classId = this.getAttribute('data-class');
                const classItem = classesData.find(c => c.id == classId);
                
                if (classItem) {
                    viewClassDetails(classItem);
                    
                    // Remove active class from all nav items
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Add active class to clicked item
                    this.closest('.nav-item').classList.add('active');
                    
                    // Highlight the class in main grid
                    const classCard = document.querySelector(`.class-card[data-id="${classId}"]`);
                    if (classCard) {
                        classCard.style.animation = 'pulse 1s';
                        setTimeout(() => {
                            classCard.style.animation = '';
                        }, 1000);
                    }
                }
            });
        });
    }
    
    // View Class Details - NOW REDIRECTS TO CLASS PAGE
    function viewClassDetails(classItem) {
        // Save current class to localStorage for class page
        localStorage.setItem('currentClass', JSON.stringify(classItem));
        
        // Redirect to class page with ID parameter
        window.location.href = `class.html?id=${classItem.id}`;
    }
    
    // Add event listeners to class action buttons
    function addClassActionListeners() {
        // Settings buttons (Update)
        document.querySelectorAll('.settings-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const classId = this.getAttribute('data-id');
                const classItem = classesData.find(c => c.id == classId);
                if (classItem) {
                    openUpdateModal(classItem);
                }
            });
        });
        
        // More options buttons (Delete)
        document.querySelectorAll('.more-options-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const classId = this.getAttribute('data-id');
                const classItem = classesData.find(c => c.id == classId);
                if (classItem) {
                    openDeleteModal(classItem);
                }
            });
        });
    }
    
    // Initialize classes
    renderClasses();
    
    // Modals
    const createClassModal = document.getElementById('create-class-modal');
    const updateClassModal = document.getElementById('update-class-modal');
    const deleteClassModal = document.getElementById('delete-class-modal');
    
    // Open modals functions
    function openUpdateModal(classItem) {
        document.getElementById('update-class-id').value = classItem.id;
        document.getElementById('update-class-name').value = classItem.name;
        document.getElementById('update-class-location').value = classItem.location;
        document.getElementById('update-class-description').value = classItem.description;
        
        updateClassModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('update-class-name').focus();
        }, 300);
    }
    
    function openDeleteModal(classItem) {
        document.getElementById('delete-class-name').textContent = classItem.name;
        document.getElementById('confirm-delete').dataset.id = classItem.id;
        
        deleteClassModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modals functions
    function closeAllModals() {
        createClassModal.classList.remove('show');
        updateClassModal.classList.remove('show');
        deleteClassModal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Create class modal functionality
    const createClassBtn = document.getElementById('create-class-btn');
    const fab = document.getElementById('fab');
    const sidebarNewClass = document.getElementById('sidebar-new-class');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const modalCancelBtns = document.querySelectorAll('.modal-cancel, .update-modal-cancel, .delete-modal-cancel');
    const createClassForm = document.getElementById('create-class-form');
    const updateClassForm = document.getElementById('update-class-form');
    
    // Open create class modal from multiple sources
    createClassBtn.addEventListener('click', () => {
        createClassModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.getElementById('class-name').focus();
        }, 300);
    });
    
    fab.addEventListener('click', () => {
        createClassModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.getElementById('class-name').focus();
        }, 300);
    });
    
    sidebarNewClass.addEventListener('click', (e) => {
        e.preventDefault();
        createClassModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.getElementById('class-name').focus();
        }, 300);
    });
    
    // Close modals
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    modalCancelBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });
    
    // Create class form submission
    createClassForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const className = document.getElementById('class-name').value.trim();
        const classDescription = document.getElementById('class-description').value.trim();
        const classSubject = document.getElementById('class-subject').value.trim();
        const classColor = document.querySelector('input[name="color"]:checked').value;
        
        if (!className) {
            showNotification('Please enter a class name', 'error');
            document.getElementById('class-name').focus();
            return;
        }
        
        // Create new class object
        const newClass = {
            id: classesData.length + 1,
            name: className,
            description: classDescription || "New Class",
            location: "Mansura's College - Mansura, Dept.",
            sets: 0,
            members: 0,
            exams: 0,
            color: classColor
        };
        
        // Add to classes data
        classesData.push(newClass);
        
        // Update localStorage
        localStorage.setItem('classesData', JSON.stringify(classesData));
        
        // Re-render classes (this will also update sidebar)
        renderClasses();
        
        // Close modal
        closeAllModals();
        createClassForm.reset();
        document.getElementById('color-green').checked = true;
        
        // Show success message
        showNotification(`Class "${newClass.name}" created successfully!`, 'success');
        
        // Add to recent activity
        addToRecentActivity(`You created a new class: ${newClass.name}`);
        
        // Scroll to new class with animation
        setTimeout(() => {
            const newClassCard = document.querySelector('.classes-grid').lastElementChild;
            if (newClassCard) {
                newClassCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                newClassCard.style.animation = 'fadeInUp 0.5s ease, pulse 2s';
                setTimeout(() => {
                    newClassCard.style.animation = '';
                }, 2000);
            }
        }, 300);
    });
    
    // Update class form submission
    updateClassForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const classId = parseInt(document.getElementById('update-class-id').value);
        const className = document.getElementById('update-class-name').value.trim();
        const classLocation = document.getElementById('update-class-location').value.trim();
        const classDescription = document.getElementById('update-class-description').value.trim();
        
        if (!className || !classLocation) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Find and update class
        const classIndex = classesData.findIndex(c => c.id === classId);
        if (classIndex !== -1) {
            const oldName = classesData[classIndex].name;
            classesData[classIndex].name = className;
            classesData[classIndex].location = classLocation;
            classesData[classIndex].description = classDescription;
            
            // Update localStorage
            localStorage.setItem('classesData', JSON.stringify(classesData));
            
            // Re-render classes (this will also update sidebar)
            renderClasses();
            
            // Close modal
            closeAllModals();
            updateClassForm.reset();
            
            // Show success message
            showNotification(`Class "${oldName}" updated to "${className}" successfully!`, 'success');
            
            // Add to recent activity
            addToRecentActivity(`You updated class: ${oldName} → ${className}`);
            
            // Highlight updated class
            setTimeout(() => {
                const updatedCard = document.querySelector(`.class-card[data-id="${classId}"]`);
                if (updatedCard) {
                    updatedCard.style.animation = 'pulse 1.5s';
                    setTimeout(() => {
                        updatedCard.style.animation = '';
                    }, 1500);
                }
            }, 300);
        }
    });
    
    // Delete class confirmation
    document.getElementById('confirm-delete').addEventListener('click', function() {
        const classId = parseInt(this.getAttribute('data-id'));
        const classIndex = classesData.findIndex(c => c.id === classId);
        
        if (classIndex !== -1) {
            const deletedClassName = classesData[classIndex].name;
            
            // Remove class from data
            classesData.splice(classIndex, 1);
            
            // Update localStorage
            localStorage.setItem('classesData', JSON.stringify(classesData));
            
            // Re-render classes (this will also update sidebar)
            renderClasses();
            
            // Close modal
            closeAllModals();
            
            // Show success message
            showNotification(`Class "${deletedClassName}" deleted successfully!`, 'success');
            
            // Add to recent activity
            addToRecentActivity(`You deleted class: ${deletedClassName}`);
        }
    });
    
    // Add to recent activity
    function addToRecentActivity(message) {
        const activityList = document.querySelector('.activity-list');
        const now = new Date();
        const timeString = getRelativeTime(now);
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <span class="material-symbols-outlined">${message.includes('created') ? 'add_circle' : message.includes('updated') ? 'edit' : 'delete'}</span>
            </div>
            <div class="activity-content">
                <p>${message}</p>
                <span class="activity-time">${timeString}</span>
            </div>
        `;
        
        // Add at the beginning of the list
        activityList.insertBefore(activityItem, activityList.firstChild);
        
        // Limit to 5 items
        const items = activityList.querySelectorAll('.activity-item');
        if (items.length > 5) {
            items[items.length - 1].remove();
        }
    }
    
    // Get relative time string
    function getRelativeTime(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
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
        
        // Add styles for notification
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
        
        // Add keyframes for animation if not already added
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm) {
                // Filter classes based on search term
                const filteredClasses = classesData.filter(classItem => 
                    classItem.name.toLowerCase().includes(searchTerm) ||
                    classItem.description.toLowerCase().includes(searchTerm) ||
                    classItem.location.toLowerCase().includes(searchTerm)
                );
                
                // Update grid with filtered classes
                const classesGrid = document.querySelector('.classes-grid');
                const classCards = classesGrid.querySelectorAll('.class-card');
                
                classCards.forEach((card, index) => {
                    if (index < filteredClasses.length) {
                        card.style.display = 'block';
                        // Add highlight effect for matching text
                        const title = card.querySelector('.class-card-title');
                        const subtitle = card.querySelectorAll('.class-card-subtitle');
                        
                        highlightText(title, searchTerm);
                        subtitle.forEach(el => highlightText(el, searchTerm));
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Show message if no results
                if (filteredClasses.length === 0) {
                    const noResults = document.createElement('div');
                    noResults.className = 'no-results';
                    noResults.innerHTML = `
                        <span class="material-symbols-outlined">search_off</span>
                        <h3>No classes found</h3>
                        <p>Try different search terms</p>
                    `;
                    
                    noResults.style.cssText = `
                        text-align: center;
                        padding: 3rem 1rem;
                        grid-column: 1 / -1;
                        color: var(--text-light-secondary);
                    `;
                    
                    // Check if no-results message already exists
                    if (!classesGrid.querySelector('.no-results')) {
                        classesGrid.appendChild(noResults);
                    }
                } else {
                    // Remove no-results message if it exists
                    const noResults = classesGrid.querySelector('.no-results');
                    if (noResults) {
                        noResults.remove();
                    }
                }
            } else {
                // Reset to show all classes
                const classesGrid = document.querySelector('.classes-grid');
                const classCards = classesGrid.querySelectorAll('.class-card');
                
                classCards.forEach(card => {
                    card.style.display = 'block';
                    // Remove highlights
                    const highlighted = card.querySelectorAll('.highlight');
                    highlighted.forEach(el => {
                        const parent = el.parentNode;
                        parent.replaceChild(document.createTextNode(el.textContent), el);
                        parent.normalize();
                    });
                });
                
                // Remove no-results message if it exists
                const noResults = classesGrid.querySelector('.no-results');
                    if (noResults) {
                        noResults.remove();
                    }
            }
        }, 300);
    });
    
    // Helper function to highlight text
    function highlightText(element, searchTerm) {
        if (!element || !searchTerm) return;
        
        const text = element.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const newText = text.replace(regex, '<span class="highlight" style="background-color: #fef3c7; padding: 0 2px; border-radius: 2px;">$1</span>');
        
        element.innerHTML = newText;
    }
    
    // Active navigation item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const link = this.querySelector('a');
            const href = link.getAttribute('href');
            
            // If the link is # or empty (internal navigation), prevent default
            if (href === '#' || href === '') {
                e.preventDefault();
                
                if (!this.classList.contains('active')) {
                    navItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Add click animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                }
            }
        });
    });
    
    // Card hover animations
    const classCards = document.querySelectorAll('.class-card');
    classCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Update notification badge count
    function updateNotificationBadge() {
        // In a real app, this would come from an API or localStorage
        const unreadCount = 3; // Example count
        
        // Update badge in header
        const badges = document.querySelectorAll('.notification-badge .badge');
        badges.forEach(badge => {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        });
    }
    
    // Initialize with demo notification after page loads
    setTimeout(() => {
        showNotification('Welcome to your Teacher Dashboard!', 'info');
        updateNotificationBadge();
    }, 1000);
});