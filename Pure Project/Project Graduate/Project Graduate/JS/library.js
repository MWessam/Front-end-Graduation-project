// Library Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sample resources data
    const resourcesData = [
        {
            id: 1,
            title: "Cell Biology Flashcards",
            description: "Key concepts and diagrams for understanding cellular structures and functions. Contains 50 cards.",
            type: "flashcard",
            subject: "biology",
            cards: 50,
            lastUpdated: "2024-03-15",
            color: "#3b82f6"
        },
        {
            id: 2,
            title: "Photosynthesis Quiz",
            description: "A 20-question multiple choice quiz covering the light-dependent and independent reactions.",
            type: "quiz",
            subject: "biology",
            questions: 20,
            lastUpdated: "2024-03-10",
            color: "#10b981"
        },
        {
            id: 3,
            title: "Lab Report: Mitosis",
            description: "Assignment guidelines and rubric for microscope observation of onion root tip cells.",
            type: "assignment",
            subject: "biology",
            lastUpdated: "2024-03-05",
            color: "#8b5cf6"
        },
        {
            id: 4,
            title: "Modern Chemistry Ch. 4",
            description: "Chapter covering atomic structure, isotopes, and electron configurations. Includes practice problems.",
            type: "textbook",
            subject: "chemistry",
            pages: 45,
            lastUpdated: "2024-02-28",
            color: "#f59e0b"
        },
        {
            id: 5,
            title: "Physics Equations Flashcards",
            description: "Essential physics equations and formulas for mechanics and thermodynamics. 30 cards.",
            type: "flashcard",
            subject: "physics",
            cards: 30,
            lastUpdated: "2024-02-25",
            color: "#3b82f6"
        },
        {
            id: 6,
            title: "Algebra Practice Quiz",
            description: "15 problems covering linear equations, factoring, and quadratic equations.",
            type: "quiz",
            subject: "math",
            questions: 15,
            lastUpdated: "2024-02-20",
            color: "#10b981"
        },
        {
            id: 7,
            title: "Chemistry Lab Safety",
            description: "Assignment on laboratory safety procedures and chemical handling guidelines.",
            type: "assignment",
            subject: "chemistry",
            lastUpdated: "2024-02-15",
            color: "#8b5cf6"
        },
        {
            id: 8,
            title: "Biology Textbook Ch. 7",
            description: "Genetics and inheritance patterns with Punnett square examples and exercises.",
            type: "textbook",
            subject: "biology",
            pages: 60,
            lastUpdated: "2024-02-10",
            color: "#f59e0b"
        },
        {
            id: 9,
            title: "Periodic Table Flashcards",
            description: "Elements, symbols, atomic numbers, and properties. 118 cards in total.",
            type: "flashcard",
            subject: "chemistry",
            cards: 118,
            lastUpdated: "2024-02-05",
            color: "#3b82f6"
        },
        {
            id: 10,
            title: "Geometry Final Exam",
            description: "Comprehensive geometry exam covering angles, triangles, circles, and proofs.",
            type: "quiz",
            subject: "math",
            questions: 25,
            lastUpdated: "2024-01-30",
            color: "#10b981"
        },
        {
            id: 11,
            title: "Physics Project: Simple Machines",
            description: "Group project to design and analyze simple machines with real-world applications.",
            type: "assignment",
            subject: "physics",
            lastUpdated: "2024-01-25",
            color: "#8b5cf6"
        },
        {
            id: 12,
            title: "Calculus Fundamentals",
            description: "Introduction to limits, derivatives, and basic integration techniques.",
            type: "textbook",
            subject: "math",
            pages: 75,
            lastUpdated: "2024-01-20",
            color: "#f59e0b"
        }
    ];

    // State variables
    let currentFilter = 'all';
    let currentSubject = 'all';
    let currentSort = 'recent';
    let filteredResources = [...resourcesData];
    let currentResources = [];

    // DOM Elements
    const resourcesGrid = document.getElementById('resources-grid');
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const subjectFilterBtn = document.getElementById('subject-filter-btn');
    const subjectFilterMenu = document.getElementById('subject-filter-menu');
    const sortBtn = document.getElementById('sort-btn');
    const sortMenu = document.getElementById('sort-menu');
    const searchInput = document.getElementById('library-search');
    const clearSearchBtn = document.getElementById('clear-library-search');
    const resetFiltersBtn = document.getElementById('reset-library-filters');
    const createResourceBtn = document.getElementById('create-resource-btn');
    const createResourceModal = document.getElementById('create-resource-modal');
    const cancelCreateResourceBtn = document.getElementById('cancel-create-resource');
    const createResourceForm = document.getElementById('create-resource-form');
    const backToTopBtn = document.getElementById('back-to-top');
    const totalResourcesEl = document.getElementById('total-resources');
    const flashcardsCountEl = document.getElementById('flashcards-count');
    const themeToggle = document.getElementById('theme-toggle');

    // Initialize page
    function initPage() {
        // Simulate loading delay
        setTimeout(() => {
            loadingState.style.display = 'none';
            renderResources();
            updateStats();
            setupAnimations();
        }, 800);

        setupEventListeners();
        setupThemeToggle();
    }

    // Setup theme toggle
    function setupThemeToggle() {
        const body = document.body;
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
            
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 150);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Filter tabs
        filterTabs.forEach(tab => {
            tab.addEventListener('click', handleFilterChange);
        });

        // Subject filter
        subjectFilterBtn.addEventListener('click', toggleSubjectFilter);
        subjectFilterMenu.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', handleSubjectFilter);
        });

        // Sort filter
        sortBtn.addEventListener('click', toggleSortMenu);
        sortMenu.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', handleSortChange);
        });

        // Search
        searchInput.addEventListener('input', handleSearch);
        clearSearchBtn.addEventListener('click', clearSearch);

        // Reset filters
        resetFiltersBtn.addEventListener('click', resetFilters);

        // Create resource
        createResourceBtn.addEventListener('click', openCreateResourceModal);
        cancelCreateResourceBtn.addEventListener('click', closeCreateResourceModal);
        createResourceForm.addEventListener('submit', handleCreateResource);

        // Back to top
        backToTopBtn.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', toggleBackToTopButton);

        // Close dropdowns when clicking outside
        document.addEventListener('click', closeDropdowns);

        // Close modals
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });

        // Close modal on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeAllModals();
                }
            });
        });

        // Escape key to close modals
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });
    }

    // Render resources
    function renderResources() {
        resourcesGrid.innerHTML = '';
        
        // Apply filters and sort
        applyFilters();
        applySort();
        
        if (currentResources.length === 0) {
            emptyState.style.display = 'flex';
            resourcesGrid.style.display = 'none';
            return;
        }
        
        emptyState.style.display = 'none';
        resourcesGrid.style.display = 'grid';
        
        currentResources.forEach((resource, index) => {
            const resourceCard = createResourceCard(resource, index);
            resourcesGrid.appendChild(resourceCard);
        });
    }

    // Create resource card
    function createResourceCard(resource, index) {
        const div = document.createElement('div');
        div.className = 'resource-card';
        div.dataset.id = resource.id;
        div.style.setProperty('--delay', `${index * 0.05}s`);
        
        // Format last updated
        const lastUpdated = getRelativeTime(new Date(resource.lastUpdated));
        
        // Get type badge class and icon
        const typeClass = getTypeClass(resource.type);
        const typeIcon = getTypeIcon(resource.type);
        const typeLabel = getTypeLabel(resource.type);
        
        // Get count text
        const countText = getCountText(resource);
        
        div.innerHTML = `
            <div class="resource-header">
                <div>
                    <h3 class="resource-title">${resource.title}</h3>
                    <span class="resource-type-badge ${typeClass}">${typeLabel}</span>
                    <p class="resource-subject">${resource.subject.charAt(0).toUpperCase() + resource.subject.slice(1)}</p>
                </div>
                <div class="resource-actions">
                    <button class="resource-action-btn more-options-btn" data-id="${resource.id}" title="More options">
                        <span class="material-symbols-outlined">more_horiz</span>
                    </button>
                    <button class="resource-action-btn favorite-btn" data-id="${resource.id}" title="Add to favorites">
                        <span class="material-symbols-outlined">favorite</span>
                    </button>
                </div>
            </div>
            <p class="resource-description">${resource.description}</p>
            <div class="resource-footer">
                <span class="resource-subject">
                    <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle;">schedule</span>
                    ${lastUpdated} • ${countText}
                </span>
                <div class="resource-actions-footer">
                    <button class="resource-action-footer-btn edit" data-action="edit" data-id="${resource.id}">
                        <span class="material-symbols-outlined" style="font-size: 14px">edit</span>
                        Edit
                    </button>
                    <button class="resource-action-footer-btn assign" data-action="assign" data-id="${resource.id}">
                        <span class="material-symbols-outlined" style="font-size: 14px">assignment_add</span>
                        Assign
                    </button>
                </div>
            </div>
        `;
        
        // Add hover effect with color
        div.addEventListener('mouseenter', function() {
            this.style.borderColor = resource.color;
        });
        
        div.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
        });
        
        // Add action button listeners
        const moreOptionsBtn = div.querySelector('.more-options-btn');
        const favoriteBtn = div.querySelector('.favorite-btn');
        const editBtn = div.querySelector('.edit');
        const assignBtn = div.querySelector('.assign');
        
        moreOptionsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showMoreOptions(resource);
        });
        
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(resource.id);
        });
        
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editResource(resource.id);
        });
        
        assignBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            assignResource(resource.id);
        });
        
        return div;
    }

    // Get type class
    function getTypeClass(type) {
        switch(type) {
            case 'flashcard': return 'flashcard';
            case 'quiz': return 'quiz';
            case 'assignment': return 'assignment';
            case 'textbook': return 'textbook';
            default: return '';
        }
    }

    // Get type icon
    function getTypeIcon(type) {
        switch(type) {
            case 'flashcard': return 'library_books';
            case 'quiz': return 'quiz';
            case 'assignment': return 'assignment';
            case 'textbook': return 'menu_book';
            default: return 'description';
        }
    }

    // Get type label
    function getTypeLabel(type) {
        switch(type) {
            case 'flashcard': return 'Flashcard Set';
            case 'quiz': return 'Quiz';
            case 'assignment': return 'Assignment';
            case 'textbook': return 'Textbook';
            default: return 'Resource';
        }
    }

    // Get count text
    function getCountText(resource) {
        switch(resource.type) {
            case 'flashcard': return `${resource.cards} cards`;
            case 'quiz': return `${resource.questions} questions`;
            case 'textbook': return `${resource.pages} pages`;
            default: return '';
        }
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
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    // Handle filter change - FIXED VERSION
    function handleFilterChange(e) {
        const filter = e.target.dataset.filter;
        
        // Update active tab
        filterTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.filter === filter) {
                tab.classList.add('active');
                // Animation effect
                tab.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    tab.style.transform = '';
                }, 150);
            }
        });
        
        // Update current filter
        currentFilter = filter;
        
        // Re-render with new filter
        renderResources();
        updateStats();
    }

    // Toggle subject filter
    function toggleSubjectFilter(e) {
        e.stopPropagation();
        subjectFilterMenu.parentElement.classList.toggle('show');
        sortMenu.parentElement.classList.remove('show');
    }

    // Handle subject filter
    function handleSubjectFilter(e) {
        const subject = e.target.dataset.subject;
        
        // Update button text
        subjectFilterBtn.innerHTML = `
            <span class="material-symbols-outlined">filter_list</span>
            ${subject === 'all' ? 'Filter by Subject' : subject.charAt(0).toUpperCase() + subject.slice(1)}
            <span class="material-symbols-outlined dropdown-icon">expand_more</span>
        `;
        
        // Update active state
        subjectFilterMenu.querySelectorAll('.filter-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.subject === subject) {
                opt.classList.add('active');
            }
        });
        
        // Update current subject
        currentSubject = subject;
        
        // Close dropdown
        subjectFilterMenu.parentElement.classList.remove('show');
        
        // Re-render
        renderResources();
    }

    // Toggle sort menu
    function toggleSortMenu(e) {
        e.stopPropagation();
        sortMenu.parentElement.classList.toggle('show');
        subjectFilterMenu.parentElement.classList.remove('show');
    }

    // Handle sort change
    function handleSortChange(e) {
        const sort = e.target.dataset.sort;
        
        // Update button text
        sortBtn.innerHTML = `
            <span class="material-symbols-outlined">sort</span>
            ${getSortLabel(sort)}
            <span class="material-symbols-outlined dropdown-icon">expand_more</span>
        `;
        
        // Update active state
        sortMenu.querySelectorAll('.filter-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.sort === sort) {
                opt.classList.add('active');
            }
        });
        
        // Update current sort
        currentSort = sort;
        
        // Close dropdown
        sortMenu.parentElement.classList.remove('show');
        
        // Re-render
        renderResources();
    }

    // Get sort label
    function getSortLabel(sort) {
        switch(sort) {
            case 'recent': return 'Recently Added';
            case 'alphabetical': return 'Alphabetical (A-Z)';
            case 'alphabetical-desc': return 'Alphabetical (Z-A)';
            case 'used': return 'Most Used';
            default: return 'Recently Added';
        }
    }

    // Apply filters - FIXED VERSION
    function applyFilters() {
        // Start with all resources
        currentResources = [...filteredResources];
        
        // Filter by type if not "all"
        if (currentFilter !== 'all') {
            currentResources = currentResources.filter(resource => resource.type === currentFilter);
        }
        
        // Filter by subject if not "all"
        if (currentSubject !== 'all') {
            currentResources = currentResources.filter(resource => resource.subject === currentSubject);
        }
    }

    // Apply sort
    function applySort() {
        switch(currentSort) {
            case 'recent':
                currentResources.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
                break;
            case 'alphabetical':
                currentResources.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'alphabetical-desc':
                currentResources.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'used':
                // In real app, this would be based on usage data
                currentResources.sort((a, b) => (b.cards || b.questions || b.pages || 0) - (a.cards || a.questions || a.pages || 0));
                break;
        }
    }

    // Handle search
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Show/hide clear button
        if (searchTerm) {
            clearSearchBtn.style.opacity = '1';
            clearSearchBtn.style.pointerEvents = 'auto';
        } else {
            clearSearchBtn.style.opacity = '0';
            clearSearchBtn.style.pointerEvents = 'none';
        }
        
        // Filter resources
        filteredResources = resourcesData.filter(resource => {
            return resource.title.toLowerCase().includes(searchTerm) ||
                   resource.description.toLowerCase().includes(searchTerm) ||
                   resource.subject.toLowerCase().includes(searchTerm) ||
                   resource.type.toLowerCase().includes(searchTerm);
        });
        
        // Re-render
        renderResources();
        updateStats();
    }

    // Clear search
    function clearSearch() {
        searchInput.value = '';
        searchInput.focus();
        handleSearch();
    }

    // Reset all filters
    function resetFilters() {
        // Reset search
        searchInput.value = '';
        
        // Reset filter tabs
        filterTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.filter === 'all') {
                tab.classList.add('active');
            }
        });
        
        // Reset subject filter
        currentSubject = 'all';
        subjectFilterBtn.innerHTML = `
            <span class="material-symbols-outlined">filter_list</span>
            Filter by Subject
            <span class="material-symbols-outlined dropdown-icon">expand_more</span>
        `;
        
        subjectFilterMenu.querySelectorAll('.filter-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.subject === 'all') {
                opt.classList.add('active');
            }
        });
        
        // Reset sort
        currentSort = 'recent';
        sortBtn.innerHTML = `
            <span class="material-symbols-outlined">sort</span>
            Recently Added
            <span class="material-symbols-outlined dropdown-icon">expand_more</span>
        `;
        
        sortMenu.querySelectorAll('.filter-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.sort === 'recent') {
                opt.classList.add('active');
            }
        });
        
        // Reset data
        filteredResources = [...resourcesData];
        currentFilter = 'all';
        
        // Hide clear button
        clearSearchBtn.style.opacity = '0';
        clearSearchBtn.style.pointerEvents = 'none';
        
        // Re-render
        renderResources();
        updateStats();
        
        showNotification('All filters reset', 'success');
    }

    // Update statistics
    function updateStats() {
        // Total resources based on current filter
        const filteredCount = currentResources.length;
        animateNumber(totalResourcesEl, filteredCount);
        
        // Flashcard count from all data
        const flashcardCount = resourcesData.filter(r => r.type === 'flashcard')
            .reduce((total, resource) => total + (resource.cards || 0), 0);
        animateNumber(flashcardsCountEl, flashcardCount);
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

    // Show more options
    function showMoreOptions(resource) {
        // In real app, this would show a context menu
        showNotification(`Options for "${resource.title}"`, 'info');
    }

    // Toggle favorite
    function toggleFavorite(resourceId) {
        const resource = resourcesData.find(r => r.id === resourceId);
        if (resource) {
            const favoriteBtn = document.querySelector(`.favorite-btn[data-id="${resourceId}"] span`);
            const isFavorite = favoriteBtn.textContent === 'favorite';
            
            favoriteBtn.textContent = isFavorite ? 'favorite_border' : 'favorite';
            favoriteBtn.style.animation = 'bounce 0.5s ease';
            
            setTimeout(() => {
                favoriteBtn.style.animation = '';
            }, 500);
            
            showNotification(`${isFavorite ? 'Removed from' : 'Added to'} favorites`, isFavorite ? 'info' : 'success');
        }
    }

    // Edit resource
    function editResource(resourceId) {
        const resource = resourcesData.find(r => r.id === resourceId);
        if (resource) {
            showNotification(`Editing "${resource.title}"`, 'info');
            // In real app, this would open an edit modal
        }
    }

    // Assign resource
    function assignResource(resourceId) {
        const resource = resourcesData.find(r => r.id === resourceId);
        if (resource) {
            showNotification(`Assigning "${resource.title}" to class`, 'success');
            // In real app, this would open an assignment modal
        }
    }

    // Open create resource modal
    function openCreateResourceModal() {
        createResourceModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Animate modal
        const modalContent = createResourceModal.querySelector('.modal-content');
        modalContent.style.animation = 'slideUp 0.3s ease';
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('resource-title').focus();
        }, 300);
    }

    // Close create resource modal
    function closeCreateResourceModal() {
        createResourceModal.classList.remove('show');
        document.body.style.overflow = '';
        createResourceForm.reset();
    }

    // Handle create resource
    function handleCreateResource(e) {
        e.preventDefault();
        
        const title = document.getElementById('resource-title').value.trim();
        const description = document.getElementById('resource-description').value.trim();
        const type = document.getElementById('resource-type').value;
        const subject = document.getElementById('resource-subject').value;
        
        if (!title || !type) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Create new resource object
        const newResource = {
            id: resourcesData.length + 1,
            title: title,
            description: description || "New resource",
            type: type,
            subject: subject || 'general',
            lastUpdated: new Date().toISOString().split('T')[0],
            color: getColorForType(type)
        };
        
        // Add count based on type
        switch(type) {
            case 'flashcard':
                newResource.cards = Math.floor(Math.random() * 50) + 10;
                break;
            case 'quiz':
                newResource.questions = Math.floor(Math.random() * 30) + 5;
                break;
            case 'textbook':
                newResource.pages = Math.floor(Math.random() * 100) + 20;
                break;
        }
        
        // Add to data
        resourcesData.unshift(newResource); // Add at beginning
        
        // Close modal
        closeCreateResourceModal();
        
        // Reset filters to show new resource
        currentFilter = 'all';
        currentSubject = 'all';
        filteredResources = [...resourcesData];
        
        // Re-render
        renderResources();
        updateStats();
        
        // Show success message
        showNotification(`Resource "${title}" created successfully!`, 'success');
        
        // Scroll to top with animation
        setTimeout(() => {
            resourcesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const newCard = document.querySelector(`.resource-card[data-id="${newResource.id}"]`);
            if (newCard) {
                newCard.style.animation = 'pulse 2s';
                setTimeout(() => {
                    newCard.style.animation = '';
                }, 2000);
            }
        }, 300);
    }

    // Get color for type
    function getColorForType(type) {
        switch(type) {
            case 'flashcard': return '#3b82f6';
            case 'quiz': return '#10b981';
            case 'assignment': return '#8b5cf6';
            case 'textbook': return '#f59e0b';
            default: return '#6b7280';
        }
    }

    // Setup animations
    function setupAnimations() {
        // Add hover animations
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.resource-card')) {
                const card = e.target.closest('.resource-card');
                card.style.transform = 'translateY(-5px)';
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.resource-card')) {
                const card = e.target.closest('.resource-card');
                card.style.transform = '';
            }
        });
    }

    // Close dropdowns
    function closeDropdowns(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    }

    // Close all modals
    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
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
        
        // Add bounce animation
        backToTopBtn.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            backToTopBtn.style.animation = 'bounce 2s infinite';
        }, 500);
    }

    // Show notification
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