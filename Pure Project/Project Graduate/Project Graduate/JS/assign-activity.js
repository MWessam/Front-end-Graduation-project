// Assign Activity Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sample data
    const activitiesData = [
        {
            id: 1,
            title: "Cell Biology Quiz",
            description: "Test your knowledge of cellular structures and functions with 20 multiple-choice questions.",
            type: "quiz",
            subject: "biology",
            questions: 20,
            duration: 30,
            lastUsed: "2024-03-10"
        },
        {
            id: 2,
            title: "Photosynthesis Assignment",
            description: "Research project on the light-dependent and light-independent reactions of photosynthesis.",
            type: "assignment",
            subject: "biology",
            pages: 3,
            points: 100,
            lastUsed: "2024-02-28"
        },
        {
            id: 3,
            title: "Periodic Table Flashcards",
            description: "Memorize elements, symbols, and atomic numbers with interactive flashcards.",
            type: "flashcard",
            subject: "chemistry",
            cards: 118,
            lastUsed: "2024-03-15"
        },
        {
            id: 4,
            title: "Algebra Equations Quiz",
            description: "Practice solving linear and quadratic equations with step-by-step feedback.",
            type: "quiz",
            subject: "math",
            questions: 15,
            duration: 25,
            lastUsed: "2024-03-05"
        },
        {
            id: 5,
            title: "Physics Lab Report",
            description: "Write-up template for the simple machines experiment with grading rubric.",
            type: "assignment",
            subject: "physics",
            pages: 5,
            points: 150,
            lastUsed: "2024-02-20"
        },
        {
            id: 6,
            title: "Genetics Terminology",
            description: "Flashcards covering key genetics terms and inheritance patterns.",
            type: "flashcard",
            subject: "biology",
            cards: 50,
            lastUsed: "2024-03-12"
        },
        {
            id: 7,
            title: "Chemical Reactions Quiz",
            description: "Identify reaction types and balance chemical equations.",
            type: "quiz",
            subject: "chemistry",
            questions: 18,
            duration: 35,
            lastUsed: "2024-02-25"
        },
        {
            id: 8,
            title: "Geometry Proofs Assignment",
            description: "Practice proving theorems with guided examples and practice problems.",
            type: "assignment",
            subject: "math",
            pages: 4,
            points: 120,
            lastUsed: "2024-03-08"
        }
    ];

    const classesData = [
        {
            id: 1,
            name: "Class 1 - Biology 101",
            description: "Introduction to Biology",
            students: 24,
            subject: "biology",
            color: "#22c55e"
        },
        {
            id: 2,
            name: "Class 2 - Chemistry Basics",
            description: "Fundamental Chemistry Concepts",
            students: 18,
            subject: "chemistry",
            color: "#3b82f6"
        },
        {
            id: 3,
            name: "Class 3 - Physics Fundamentals",
            description: "Mechanics and Thermodynamics",
            students: 20,
            subject: "physics",
            color: "#8b5cf6"
        },
        {
            id: 4,
            name: "Class 4 - Mathematics",
            description: "Algebra and Geometry",
            students: 22,
            subject: "math",
            color: "#f59e0b"
        }
    ];

    const studentsData = [
        { id: 1, name: "Ahmed Mohamed", class: "Class 1", avatar: "A" },
        { id: 2, name: "Fatma Hassan", class: "Class 1", avatar: "F" },
        { id: 3, name: "Mohamed Ali", class: "Class 2", avatar: "M" },
        { id: 4, name: "Huda Khattab", class: "Class 2", avatar: "H" },
        { id: 5, name: "Ali Tarek", class: "Class 3", avatar: "A" },
        { id: 6, name: "Mariam Noor", class: "Class 3", avatar: "M" },
        { id: 7, name: "Mohamed Ibrahim", class: "Class 4", avatar: "M" },
        { id: 8, name: "Ahmed Sayed", class: "Class 4", avatar: "A" }
    ];

    // State variables
    let currentStep = 1;
    let selectedActivity = null;
    let selectedClasses = [];
    let selectedStudents = [];
    let assignType = "class"; // "class" or "students"
    let assignmentDetails = {
        dueDate: "",
        dueTime: "23:59",
        availability: "immediate",
        startDate: "",
        timeLimit: "",
        attempts: "1",
        instructions: ""
    };

    // DOM Elements
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.wizard-step');
    const prevStepBtn = document.getElementById('prev-step');
    const nextStepBtn = document.getElementById('next-step');
    const confirmBtn = document.getElementById('confirm-assignment');
    const currentStepNumber = document.getElementById('current-step-number');
    const activitiesGrid = document.getElementById('activities-grid');
    const activitiesLoading = document.getElementById('activities-loading');
    const activitiesEmpty = document.getElementById('activities-empty');
    const classesList = document.getElementById('classes-list');
    const assignTypeBtns = document.querySelectorAll('.assign-type-btn');
    const assignOptions = document.querySelectorAll('.assign-options');
    const studentsList = document.getElementById('students-list');
    const searchStudentsInput = document.getElementById('search-students');
    const selectedPreview = document.getElementById('selected-preview');
    const clearSelectionBtn = document.getElementById('clear-selection');
    const summaryModal = document.getElementById('summary-modal');
    const backToTopBtn = document.getElementById('back-to-top');
    const assignedTodayEl = document.getElementById('assigned-today');
    const totalAssignmentsEl = document.getElementById('total-assignments');
    const themeToggle = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('assign-search');
    const clearSearchBtn = document.getElementById('clear-assign-search');

    // Form elements
    const dueDateInput = document.getElementById('due-date');
    const dueTimeInput = document.getElementById('due-time');
    const availabilitySelect = document.getElementById('availability');
    const startDateInput = document.getElementById('start-date');
    const timeLimitInput = document.getElementById('time-limit');
    const attemptsSelect = document.getElementById('attempts');
    const instructionsTextarea = document.getElementById('instructions');

    // Success modal elements
    const successActivityTitle = document.getElementById('success-activity-title');
    const successAssignedTo = document.getElementById('success-assigned-to');
    const successDueDate = document.getElementById('success-due-date');
    const successStudentsCount = document.getElementById('success-students-count');
    const viewAssignmentBtn = document.getElementById('view-assignment');
    const assignAnotherBtn = document.getElementById('assign-another');

    // Initialize page
    function initPage() {
        // Set default dates
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 7);
        
        dueDateInput.value = tomorrow.toISOString().split('T')[0];
        dueDateInput.min = today.toISOString().split('T')[0];
        startDateInput.min = today.toISOString().split('T')[0];
        
        // Initialize state
        assignmentDetails.dueDate = dueDateInput.value;
        assignmentDetails.dueTime = dueTimeInput.value;
        assignmentDetails.availability = availabilitySelect.value;
        assignmentDetails.attempts = attemptsSelect.value;

        // Load data
        setTimeout(() => {
            activitiesLoading.style.display = 'none';
            renderActivities();
            renderClasses();
            renderStudents();
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
        // Wizard navigation
        prevStepBtn.addEventListener('click', goToPrevStep);
        nextStepBtn.addEventListener('click', goToNextStep);
        confirmBtn.addEventListener('click', confirmAssignment);

        // Assign type selection
        assignTypeBtns.forEach(btn => {
            btn.addEventListener('click', handleAssignTypeChange);
        });

        // Clear selection
        clearSelectionBtn.addEventListener('click', clearSelectedActivity);

        // Search
        searchInput.addEventListener('input', handleSearch);
        clearSearchBtn.addEventListener('click', clearSearch);
        searchStudentsInput.addEventListener('input', handleStudentSearch);

        // Form inputs
        dueDateInput.addEventListener('change', updateAssignmentDetails);
        dueTimeInput.addEventListener('change', updateAssignmentDetails);
        availabilitySelect.addEventListener('change', handleAvailabilityChange);
        startDateInput.addEventListener('change', updateAssignmentDetails);
        timeLimitInput.addEventListener('input', updateAssignmentDetails);
        attemptsSelect.addEventListener('change', updateAssignmentDetails);
        instructionsTextarea.addEventListener('input', updateAssignmentDetails);

        // Success modal
        viewAssignmentBtn.addEventListener('click', viewAssignment);
        assignAnotherBtn.addEventListener('click', assignAnother);

        // Back to top
        backToTopBtn.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', toggleBackToTopButton);

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

    // Render activities
    function renderActivities(filter = '') {
        activitiesGrid.innerHTML = '';
        
        let filteredActivities = activitiesData;
        if (filter) {
            const searchTerm = filter.toLowerCase();
            filteredActivities = activitiesData.filter(activity => 
                activity.title.toLowerCase().includes(searchTerm) ||
                activity.description.toLowerCase().includes(searchTerm) ||
                activity.subject.toLowerCase().includes(searchTerm) ||
                activity.type.toLowerCase().includes(searchTerm)
            );
        }
        
        if (filteredActivities.length === 0) {
            activitiesEmpty.style.display = 'flex';
            return;
        }
        
        activitiesEmpty.style.display = 'none';
        
        filteredActivities.forEach((activity, index) => {
            const activityCard = createActivityCard(activity, index);
            activitiesGrid.appendChild(activityCard);
        });
    }

    // Create activity card
    function createActivityCard(activity, index) {
        const div = document.createElement('div');
        div.className = `activity-card ${selectedActivity?.id === activity.id ? 'selected' : ''}`;
        div.dataset.id = activity.id;
        div.style.setProperty('--delay', `${index * 0.05}s`);
        
        const lastUsed = getRelativeTime(new Date(activity.lastUsed));
        const typeLabel = activity.type === 'quiz' ? 'Quiz' : 
                         activity.type === 'assignment' ? 'Assignment' : 'Flashcard Set';
        
        div.innerHTML = `
            <div class="activity-header">
                <div>
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-type ${activity.type}">${typeLabel}</div>
                </div>
                <div class="select-indicator"></div>
            </div>
            <div class="activity-description">${activity.description}</div>
            <div class="activity-footer">
                <span>${activity.subject.charAt(0).toUpperCase() + activity.subject.slice(1)} • Last used ${lastUsed}</span>
                <span>${activity.questions || activity.cards || activity.pages} ${activity.type === 'quiz' ? 'questions' : activity.type === 'flashcard' ? 'cards' : 'pages'}</span>
            </div>
        `;
        
        div.addEventListener('click', () => {
            selectActivity(activity);
            div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        
        return div;
    }

    // Render classes
    function renderClasses() {
        classesList.innerHTML = '';
        
        classesData.forEach((classItem, index) => {
            const classDiv = document.createElement('div');
            classDiv.className = `class-item ${selectedClasses.includes(classItem.id) ? 'selected' : ''}`;
            classDiv.dataset.id = classItem.id;
            classDiv.style.setProperty('--delay', `${index * 0.05}s`);
            
            classDiv.innerHTML = `
                <div class="class-name">${classItem.name}</div>
                <div class="class-description">${classItem.description}</div>
                <div class="class-stats">
                    <span>${classItem.students} students</span>
                    <span>${classItem.subject}</span>
                </div>
            `;
            
            classDiv.addEventListener('click', () => {
                toggleClassSelection(classItem.id);
            });
            
            classesList.appendChild(classDiv);
        });
    }

    // Render students
    function renderStudents(filter = '') {
        studentsList.innerHTML = '';
        
        let filteredStudents = studentsData;
        if (filter) {
            const searchTerm = filter.toLowerCase();
            filteredStudents = studentsData.filter(student => 
                student.name.toLowerCase().includes(searchTerm) ||
                student.class.toLowerCase().includes(searchTerm)
            );
        }
        
        filteredStudents.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.className = `student-item ${selectedStudents.includes(student.id) ? 'selected' : ''}`;
            studentDiv.dataset.id = student.id;
            
            studentDiv.innerHTML = `
                <div class="student-info">
                    <div class="student-avatar">${student.avatar}</div>
                    <div>
                        <div class="student-name">${student.name}</div>
                        <div class="student-class">${student.class}</div>
                    </div>
                </div>
                <div class="student-checkbox"></div>
            `;
            
            studentDiv.addEventListener('click', () => {
                toggleStudentSelection(student.id);
            });
            
            studentsList.appendChild(studentDiv);
        });
    }

    // Get relative time string
    function getRelativeTime(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffDays < 1) return 'today';
        if (diffDays === 1) return 'yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    // Select activity
    function selectActivity(activity) {
        selectedActivity = activity;
        
        // Update UI
        document.querySelectorAll('.activity-card').forEach(card => {
            card.classList.remove('selected');
            if (parseInt(card.dataset.id) === activity.id) {
                card.classList.add('selected');
            }
        });
        
        // Show preview
        showSelectedPreview();
        
        // Enable next step
        if (currentStep === 1) {
            nextStepBtn.disabled = false;
        }
    }

    // Show selected preview
    function showSelectedPreview() {
        if (!selectedActivity) {
            selectedPreview.style.display = 'none';
            return;
        }
        
        const typeLabel = selectedActivity.type === 'quiz' ? 'Quiz' : 
                         selectedActivity.type === 'assignment' ? 'Assignment' : 'Flashcard Set';
        
        document.getElementById('selected-title').textContent = selectedActivity.title;
        document.getElementById('selected-type').textContent = typeLabel;
        document.getElementById('selected-type').className = `preview-type ${selectedActivity.type}`;
        document.getElementById('selected-description').textContent = selectedActivity.description;
        
        selectedPreview.style.display = 'block';
        selectedPreview.style.animation = 'slideUp 0.3s ease';
    }

    // Clear selected activity
    function clearSelectedActivity() {
        selectedActivity = null;
        selectedPreview.style.display = 'none';
        document.querySelectorAll('.activity-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        if (currentStep === 1) {
            nextStepBtn.disabled = true;
        }
    }

    // Toggle class selection
    function toggleClassSelection(classId) {
        const index = selectedClasses.indexOf(classId);
        if (index === -1) {
            selectedClasses.push(classId);
        } else {
            selectedClasses.splice(index, 1);
        }
        
        // Update UI
        document.querySelectorAll('.class-item').forEach(item => {
            item.classList.toggle('selected', selectedClasses.includes(parseInt(item.dataset.id)));
        });
        
        validateStep2();
    }

    // Toggle student selection
    function toggleStudentSelection(studentId) {
        const index = selectedStudents.indexOf(studentId);
        if (index === -1) {
            selectedStudents.push(studentId);
        } else {
            selectedStudents.splice(index, 1);
        }
        
        // Update UI
        document.querySelectorAll('.student-item').forEach(item => {
            item.classList.toggle('selected', selectedStudents.includes(parseInt(item.dataset.id)));
        });
        
        validateStep2();
    }

    // Handle assign type change
    function handleAssignTypeChange(e) {
        const type = e.target.dataset.type;
        assignType = type;
        
        // Update UI
        assignTypeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });
        
        assignOptions.forEach(option => {
            option.classList.toggle('active', option.id === `${type}-selection`);
        });
        
        // Reset selections when switching types
        if (type === 'class') {
            selectedStudents = [];
            renderStudents();
        } else {
            selectedClasses = [];
            document.querySelectorAll('.class-item').forEach(item => {
                item.classList.remove('selected');
            });
        }
        
        validateStep2();
    }

    // Validate step 2
    function validateStep2() {
        let isValid = false;
        
        if (assignType === 'class') {
            isValid = selectedClasses.length > 0;
        } else {
            isValid = selectedStudents.length > 0;
        }
        
        // Update next button
        const nextStepBtn = document.getElementById('next-step');
        if (currentStep === 2) {
            nextStepBtn.disabled = !isValid;
        }
    }

    // Handle search
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        
        // Show/hide clear button
        if (searchTerm) {
            clearSearchBtn.style.opacity = '1';
            clearSearchBtn.style.pointerEvents = 'auto';
        } else {
            clearSearchBtn.style.opacity = '0';
            clearSearchBtn.style.pointerEvents = 'none';
        }
        
        renderActivities(searchTerm);
    }

    // Clear search
    function clearSearch() {
        searchInput.value = '';
        searchInput.focus();
        handleSearch();
    }

    // Handle student search
    function handleStudentSearch() {
        const searchTerm = searchStudentsInput.value.trim();
        renderStudents(searchTerm);
    }

    // Update assignment details
    function updateAssignmentDetails() {
        assignmentDetails.dueDate = dueDateInput.value;
        assignmentDetails.dueTime = dueTimeInput.value;
        assignmentDetails.availability = availabilitySelect.value;
        assignmentDetails.startDate = startDateInput.value;
        assignmentDetails.timeLimit = timeLimitInput.value;
        assignmentDetails.attempts = attemptsSelect.value;
        assignmentDetails.instructions = instructionsTextarea.value;
        
        validateStep3();
    }

    // Handle availability change
    function handleAvailabilityChange() {
        if (availabilitySelect.value === 'schedule') {
            startDateInput.disabled = false;
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            startDateInput.value = tomorrow.toISOString().split('T')[0];
            assignmentDetails.startDate = startDateInput.value;
        } else {
            startDateInput.disabled = true;
            startDateInput.value = '';
            assignmentDetails.startDate = '';
        }
    }

    // Validate step 3
    function validateStep3() {
        const isValid = assignmentDetails.dueDate !== '';
        
        // Update confirm button
        if (currentStep === 3) {
            confirmBtn.disabled = !isValid;
        }
    }

    // Go to next step
    function goToNextStep() {
        if (currentStep < 3) {
            // Validate current step
            if (currentStep === 1 && !selectedActivity) {
                showNotification('Please select an activity to assign', 'error');
                return;
            }
            
            if (currentStep === 2) {
                if (assignType === 'class' && selectedClasses.length === 0) {
                    showNotification('Please select at least one class', 'error');
                    return;
                }
                if (assignType === 'students' && selectedStudents.length === 0) {
                    showNotification('Please select at least one student', 'error');
                    return;
                }
            }
            
            // Update UI
            steps[currentStep - 1].classList.remove('active');
            steps[currentStep - 1].classList.add('completed');
            steps[currentStep].classList.add('active');
            
            stepContents[currentStep - 1].classList.remove('active');
            stepContents[currentStep].classList.add('active');
            
            currentStep++;
            currentStepNumber.textContent = currentStep;
            
            // Update navigation buttons
            prevStepBtn.disabled = currentStep === 1;
            
            if (currentStep === 3) {
                nextStepBtn.style.display = 'none';
                confirmBtn.style.display = 'flex';
                validateStep3();
            }
            
            // Animate step change
            stepContents[currentStep - 1].style.animation = 'fadeIn 0.5s ease';
        }
    }

    // Go to previous step
    function goToPrevStep() {
        if (currentStep > 1) {
            // Update UI
            steps[currentStep - 1].classList.remove('active');
            steps[currentStep - 2].classList.add('active');
            steps[currentStep - 2].classList.remove('completed');
            
            stepContents[currentStep - 1].classList.remove('active');
            stepContents[currentStep - 2].classList.add('active');
            
            currentStep--;
            currentStepNumber.textContent = currentStep;
            
            // Update navigation buttons
            prevStepBtn.disabled = currentStep === 1;
            
            if (currentStep < 3) {
                nextStepBtn.style.display = 'flex';
                confirmBtn.style.display = 'none';
                nextStepBtn.disabled = currentStep === 1 && !selectedActivity;
            }
            
            // Animate step change
            stepContents[currentStep - 1].style.animation = 'fadeIn 0.5s ease';
        }
    }

    // Confirm assignment
    function confirmAssignment() {
        // Validate step 3
        if (!assignmentDetails.dueDate) {
            showNotification('Please set a due date', 'error');
            return;
        }
        
        // Calculate total students
        let totalStudents = 0;
        let assignedTo = '';
        
        if (assignType === 'class') {
            selectedClasses.forEach(classId => {
                const classItem = classesData.find(c => c.id === classId);
                if (classItem) {
                    totalStudents += classItem.students;
                    if (assignedTo) assignedTo += ', ';
                    assignedTo += classItem.name;
                }
            });
        } else {
            totalStudents = selectedStudents.length;
            assignedTo = `${selectedStudents.length} selected student${selectedStudents.length !== 1 ? 's' : ''}`;
        }
        
        // Format due date
        const dueDate = new Date(assignmentDetails.dueDate);
        const formattedDueDate = dueDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        // Update success modal
        successActivityTitle.textContent = selectedActivity.title;
        successAssignedTo.textContent = assignedTo;
        successDueDate.textContent = formattedDueDate;
        successStudentsCount.textContent = totalStudents;
        
        // Show success modal
        summaryModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Update stats
        updateStats(true);
        
        // Show notification
        showNotification(`Activity assigned to ${totalStudents} student${totalStudents !== 1 ? 's' : ''}`, 'success');
    }

    // View assignment
    function viewAssignment() {
        closeAllModals();
        showNotification('Redirecting to assignment details...', 'info');
        // In real app, this would navigate to the assignment page
    }

    // Assign another
    function assignAnother() {
        closeAllModals();
        
        // Reset form
        resetForm();
        
        // Go back to step 1
        while (currentStep > 1) {
            goToPrevStep();
        }
        
        showNotification('Ready to assign another activity', 'info');
    }

    // Reset form
    function resetForm() {
        // Reset selections
        selectedActivity = null;
        selectedClasses = [];
        selectedStudents = [];
        assignType = "class";
        
        // Reset UI
        clearSelectedActivity();
        renderClasses();
        renderStudents();
        
        // Update assign type UI
        assignTypeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === 'class');
        });
        
        assignOptions.forEach(option => {
            option.classList.toggle('active', option.id === 'class-selection');
        });
        
        // Reset assignment details
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 7);
        dueDateInput.value = tomorrow.toISOString().split('T')[0];
        dueTimeInput.value = "23:59";
        availabilitySelect.value = "immediate";
        startDateInput.value = "";
        startDateInput.disabled = true;
        timeLimitInput.value = "";
        attemptsSelect.value = "1";
        instructionsTextarea.value = "";
        
        updateAssignmentDetails();
    }

    // Update statistics
    function updateStats(incrementToday = false) {
        // Total assignments (from localStorage or API in real app)
        const total = 24 + (incrementToday ? 1 : 0);
        animateNumber(totalAssignmentsEl, total);
        
        // Assigned today (from localStorage or API in real app)
        const today = incrementToday ? 1 : 0;
        animateNumber(assignedTodayEl, today);
        
        // Save to localStorage for persistence
        if (incrementToday) {
            localStorage.setItem('assignmentsToday', today);
            localStorage.setItem('totalAssignments', total);
        }
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

    // Setup animations
    function setupAnimations() {
        // Add hover animations
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.activity-card, .class-item, .student-item')) {
                const element = e.target.closest('.activity-card, .class-item, .student-item');
                element.style.transform = 'translateY(-2px)';
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.activity-card, .class-item, .student-item')) {
                const element = e.target.closest('.activity-card, .class-item, .student-item');
                element.style.transform = '';
            }
        });
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

    // Close all modals
    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
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