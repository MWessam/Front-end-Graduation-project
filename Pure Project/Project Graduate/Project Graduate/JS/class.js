document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme
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
    
    // Get class data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const classId = urlParams.get('id') || 1;
    
    // Load classes from localStorage or use default
    let classesData = JSON.parse(localStorage.getItem('classesData')) || [
        {
            id: 1,
            name: "Class 1",
            description: "Material for Substance",
            location: "Mansura's College - Mansura, Dept.",
            sets: 2,
            members: 15,
            exams: 3,
            color: "#22c55e",
            teacher: "Ahmed Emad"
        },
        {
            id: 2,
            name: "Class 2",
            description: "Students Groups",
            location: "Mansura's College - Mansura, Dept.",
            sets: 4,
            members: 22,
            exams: 5,
            color: "#3b82f6",
            teacher: "Ahmed Emad"
        },
        {
            id: 3,
            name: "Class 3",
            description: "Advanced Mathematics",
            location: "Cairo University - Giza, Egypt",
            sets: 6,
            members: 30,
            exams: 8,
            color: "#8b5cf6",
            teacher: "Ahmed Emad"
        },
        {
            id: 4,
            name: "Class 4",
            description: "Physics Lab",
            location: "Alexandria University - Alexandria",
            sets: 3,
            members: 18,
            exams: 4,
            color: "#f97316",
            teacher: "Ahmed Emad"
        }
    ];
    
    // Sample Materials Data
    let materialsData = JSON.parse(localStorage.getItem('materialsData')) || [
        {
            id: 1,
            title: "Introduction to Chemistry",
            type: "document",
            description: "<p><strong>Basic concepts</strong> of chemistry and <em>chemical reactions</em>.</p><p>This material covers:</p><ul><li>Atomic structure</li><li>Chemical bonding</li><li>Reaction types</li></ul>",
            date: "2025-01-15",
            views: 124
        },
        {
            id: 2,
            title: "Organic Chemistry Presentation",
            type: "presentation",
            description: "<p><u>Comprehensive slides</u> about <span style='color: #22c55e'>organic compounds</span>.</p><p>Topics include:</p><ol><li>Hydrocarbons</li><li>Functional groups</li><li>Reaction mechanisms</li></ol>",
            date: "2025-01-20",
            views: 89
        },
        {
            id: 3,
            title: "Chemical Bonds Video",
            type: "video",
            description: "<p>Video explanation of different <a href='#'>chemical bonds</a>.</p><p>Learn about:</p><ul><li>Ionic bonds</li><li>Covalent bonds</li><li>Metallic bonds</li></ul>",
            date: "2025-01-25",
            views: 156
        }
    ];
    
    // Sample Exams Data
    let examsData = JSON.parse(localStorage.getItem('examsData')) || [
        {
            id: 1,
            title: "Midterm Exam",
            type: "midterm",
            date: "2025-02-15",
            duration: 120,
            totalMarks: 100,
            description: "Covers chapters 1-5",
            submissions: 28,
            averageScore: 78,
            highestScore: 95,
            lowestScore: 45
        },
        {
            id: 2,
            title: "Chapter 1 Quiz",
            type: "quiz",
            date: "2025-02-10",
            duration: 45,
            totalMarks: 50,
            description: "Basic concepts quiz",
            submissions: 32,
            averageScore: 82,
            highestScore: 98,
            lowestScore: 60
        },
        {
            id: 3,
            title: "Final Assignment",
            type: "assignment",
            date: "2025-03-01",
            duration: 180,
            totalMarks: 150,
            description: "Comprehensive final assignment",
            submissions: 15,
            averageScore: 85,
            highestScore: 142,
            lowestScore: 75
        }
    ];
    
    // Sample Submissions Data
    const submissionsData = [
        { id: 1, student: "Sarah Ahmed", date: "2025-02-15", score: 92, status: "graded" },
        { id: 2, student: "Mohamed Ali", date: "2025-02-15", score: 85, status: "graded" },
        { id: 3, student: "Nour Hassan", date: "2025-02-15", score: 78, status: "graded" },
        { id: 4, student: "Omar Khaled", date: "2025-02-15", score: 95, status: "graded" },
        { id: 5, student: "Fatma Mahmoud", date: "2025-02-14", score: 67, status: "graded" }
    ];
    
    // Initialize Quill Editor
    let quill;
    function initQuillEditor() {
        quill = new Quill('#editor-container', {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'color': [] }],
                    ['link'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            },
            placeholder: 'Enter material description...'
        });
    }
    
    // Load Class Data
    function loadClassData() {
        const classItem = classesData.find(c => c.id == classId) || classesData[0];
        
        // Update banner
        document.getElementById('class-title').textContent = classItem.name;
        document.getElementById('class-description').textContent = classItem.description;
        document.getElementById('class-location').textContent = classItem.location;
        
        // Update counts
        document.getElementById('exams-count').textContent = classItem.exams;
        
        // Update sidebar classes
        updateSidebarClasses();
        
        // Update banner color
        const banner = document.getElementById('class-banner');
        banner.style.background = `linear-gradient(135deg, ${classItem.color} 0%, ${darkenColor(classItem.color, 20)} 100%)`;
        
        // Load tab content
        loadMaterials();
        loadExams();
    }
    
    // Helper function to darken color
    function darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1);
    }
    
    // Update Sidebar Classes List
    function updateSidebarClasses() {
        const sidebarClassesList = document.getElementById('sidebar-classes-list');
        
        if (!sidebarClassesList) return;
        
        sidebarClassesList.innerHTML = '';
        
        classesData.forEach(classItem => {
            const listItem = document.createElement('li');
            listItem.className = 'nav-item';
            const isActive = classItem.id == classId ? 'active' : '';
            listItem.classList.toggle('active', isActive);
            
            listItem.innerHTML = `
                <a href="class.html?id=${classItem.id}" class="nav-link ${isActive}">
                    <span>${classItem.name}</span>
                </a>
            `;
            
            sidebarClassesList.appendChild(listItem);
        });
        
        // Add back to dashboard link
        const dashboardItem = document.createElement('li');
        dashboardItem.className = 'nav-item';
        dashboardItem.innerHTML = `
            <a href="index.html" class="nav-link">
                <span class="material-symbols-outlined">arrow_back</span>
                <span>Back to Dashboard</span>
            </a>
        `;
        sidebarClassesList.appendChild(dashboardItem);
    }
    
    // Load Materials
    function loadMaterials() {
        const materialsList = document.getElementById('materials-list');
        if (!materialsList) return;
        
        materialsList.innerHTML = '';
        
        materialsData.forEach(material => {
            const materialCard = document.createElement('div');
            materialCard.className = 'material-card';
            materialCard.dataset.id = material.id;
            materialCard.innerHTML = `
                <div class="material-header">
                    <div>
                        <h3 class="material-title">${material.title}</h3>
                        <span class="material-type">
                            <span class="material-symbols-outlined">
                                ${getMaterialIcon(material.type)}
                            </span>
                            ${material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                        </span>
                    </div>
                    <div class="material-actions">
                        <button class="class-card-action-btn download-material-btn" title="Download" data-id="${material.id}">
                            <span class="material-symbols-outlined">download</span>
                        </button>
                        <button class="class-card-action-btn share-material-btn" title="Share" data-id="${material.id}">
                            <span class="material-symbols-outlined">share</span>
                        </button>
                    </div>
                </div>
                <div class="material-description">${stripHtmlTags(material.description)}</div>
                <div class="material-footer">
                    <span class="material-date">
                        <span class="material-symbols-outlined" style="font-size: 14px">calendar_month</span>
                        ${new Date(material.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric' 
                        })}
                    </span>
                    <span class="material-views">
                        <span class="material-symbols-outlined" style="font-size: 14px">visibility</span>
                        ${material.views} views
                    </span>
                </div>
            `;
            
            materialsList.appendChild(materialCard);
        });
        
        // Add download button event listeners
        document.querySelectorAll('.download-material-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const materialId = this.getAttribute('data-id');
                showDownloadModal(materialId);
            });
        });
        
        // Add share button event listeners
        document.querySelectorAll('.share-material-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const materialId = this.getAttribute('data-id');
                showShareModal(materialId);
            });
        });
    }
    
    // Helper function to strip HTML tags for preview
    function stripHtmlTags(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }
    
    // Get Material Icon
    function getMaterialIcon(type) {
        const icons = {
            'document': 'description',
            'presentation': 'slideshow',
            'video': 'videocam',
            'link': 'link',
            'assignment': 'assignment'
        };
        return icons[type] || 'description';
    }
    
    // Load Exams
    function loadExams() {
        const examsList = document.getElementById('exams-list');
        if (!examsList) return;
        
        examsList.innerHTML = '';
        
        examsData.forEach(exam => {
            const examCard = document.createElement('div');
            examCard.className = 'exam-card';
            examCard.dataset.id = exam.id;
            examCard.innerHTML = `
                <div class="exam-header">
                    <div>
                        <h3 class="exam-title">${exam.title}</h3>
                        <span class="exam-type">
                            ${exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                        </span>
                    </div>
                    <div class="material-actions">
                        <button class="class-card-action-btn edit-exam-btn" title="Edit" data-id="${exam.id}">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="class-card-action-btn delete-exam-btn" title="Delete" data-id="${exam.id}">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
                <div class="exam-details">
                    <div class="exam-detail">
                        <span class="material-symbols-outlined">calendar_month</span>
                        <span>${new Date(exam.date).toLocaleDateString()}</span>
                    </div>
                    <div class="exam-detail">
                        <span class="material-symbols-outlined">schedule</span>
                        <span>${exam.duration} min</span>
                    </div>
                    <div class="exam-detail">
                        <span class="material-symbols-outlined">grade</span>
                        <span>${exam.totalMarks} marks</span>
                    </div>
                    <div class="exam-detail">
                        <span class="material-symbols-outlined">group</span>
                        <span>${exam.submissions} submissions</span>
                    </div>
                </div>
                <div class="exam-actions">
                    <button class="btn-secondary view-submissions-btn" data-id="${exam.id}">
                        <span class="material-symbols-outlined" style="font-size: 16px">visibility</span>
                        View Submissions
                    </button>
                    <button class="btn-primary analytics-btn" data-id="${exam.id}">
                        <span class="material-symbols-outlined" style="font-size: 16px">analytics</span>
                        Analytics
                    </button>
                </div>
            `;
            
            examsList.appendChild(examCard);
        });
        
        // Add edit button event listeners
        document.querySelectorAll('.edit-exam-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const examId = this.getAttribute('data-id');
                editExam(examId);
            });
        });
        
        // Add delete button event listeners
        document.querySelectorAll('.delete-exam-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const examId = this.getAttribute('data-id');
                deleteExam(examId);
            });
        });
        
        // Add view submissions button event listeners
        document.querySelectorAll('.view-submissions-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const examId = this.getAttribute('data-id');
                viewSubmissions(examId);
            });
        });
        
        // Add analytics button event listeners
        document.querySelectorAll('.analytics-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const examId = this.getAttribute('data-id');
                showAnalytics(examId);
            });
        });
    }
    
    // Tab Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Add animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        });
    });
    
    // Back to Dashboard
    document.getElementById('back-to-dashboard').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Close Banner
    document.querySelector('.close-banner-btn').addEventListener('click', function() {
        const banner = this.closest('.invite-banner');
        banner.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            banner.remove();
        }, 300);
    });
    
    // Invite Students Modal
    const inviteModal = document.getElementById('invite-modal');
    const inviteStudentsBtn = document.getElementById('invite-students-btn');
    const inviteOptions = document.querySelectorAll('.invite-option');
    
    inviteStudentsBtn.addEventListener('click', () => {
        inviteModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Invite Options Selection
    inviteOptions.forEach(option => {
        option.addEventListener('click', () => {
            inviteOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Copy Link Functionality
    document.querySelector('.copy-link-btn-small').addEventListener('click', function() {
        const linkInput = document.getElementById('class-invite-link');
        linkInput.select();
        document.execCommand('copy');
        
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="material-symbols-outlined">check</span> Copied!';
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
    
    // Copy Class Code
    document.querySelector('.copy-code-btn').addEventListener('click', function() {
        const code = document.getElementById('class-code').textContent;
        navigator.clipboard.writeText(code);
        
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="material-symbols-outlined">check</span> Copied!';
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
    
    // Send Invites
    document.getElementById('send-invites-btn').addEventListener('click', function() {
        const activeOption = document.querySelector('.invite-option.active');
        const method = activeOption.getAttribute('data-method');
        
        if (method === 'email') {
            const emails = document.getElementById('student-emails').value;
            if (!emails.trim()) {
                alert('Please enter at least one email address.');
                return;
            }
        }
        
        this.innerHTML = '<span class="material-symbols-outlined">check</span> Sent!';
        this.disabled = true;
        
        setTimeout(() => {
            closeAllModals();
            showNotification('Invitations sent successfully!', 'success');
            this.innerHTML = 'Send Invitations';
            this.disabled = false;
        }, 1500);
    });
    
    // Add Material Modal
    const addMaterialModal = document.getElementById('add-material-modal');
    const addMaterialBtn = document.getElementById('add-material-btn');
    const addMaterialAction = document.getElementById('add-material-action');
    const addMaterialForm = document.getElementById('add-material-form');
    
    addMaterialBtn.addEventListener('click', () => {
        addMaterialModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Initialize Quill editor if not already initialized
        if (!quill) {
            initQuillEditor();
        }
        
        // Clear editor
        if (quill) {
            quill.setText('');
        }
    });
    
    addMaterialAction.addEventListener('click', () => {
        addMaterialModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Initialize Quill editor if not already initialized
        if (!quill) {
            initQuillEditor();
        }
        
        // Clear editor
        if (quill) {
            quill.setText('');
        }
    });
    
    addMaterialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('material-title').value.trim();
        const type = document.getElementById('material-type').value;
        const description = quill ? quill.root.innerHTML : '';
        
        if (!title || !type) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Add to materials list
        const newMaterial = {
            id: materialsData.length > 0 ? Math.max(...materialsData.map(m => m.id)) + 1 : 1,
            title,
            type,
            description: description || '<p>No description provided.</p>',
            date: new Date().toISOString().split('T')[0],
            views: 0
        };
        
        materialsData.unshift(newMaterial);
        localStorage.setItem('materialsData', JSON.stringify(materialsData));
        loadMaterials();
        
        closeAllModals();
        addMaterialForm.reset();
        showNotification('Material added successfully!', 'success');
    });
    
    // File Upload Preview
    document.getElementById('material-file').addEventListener('change', function(e) {
        const fileName = this.files[0]?.name || 'No file chosen';
        document.querySelector('.file-name').textContent = fileName;
    });
    
    // Class Settings Modal
    const classSettingsModal = document.getElementById('class-settings-modal');
    const classSettingsBtn = document.getElementById('class-settings-btn');
    const classSettingsForm = document.getElementById('class-settings-form');
    const deleteClassBtn = document.getElementById('delete-class-btn');
    const deleteClassModal = document.getElementById('delete-class-modal');
    const confirmDeleteClassBtn = document.getElementById('confirm-delete-class');
    
    classSettingsBtn.addEventListener('click', () => {
        const currentClass = classesData.find(c => c.id == classId);
        if (!currentClass) return;
        
        // Fill form with current class data
        document.getElementById('settings-class-id').value = currentClass.id;
        document.getElementById('settings-class-name').value = currentClass.name;
        document.getElementById('settings-class-description').value = currentClass.description;
        
        // Set color radio button
        const colorRadios = document.querySelectorAll('input[name="settings-color"]');
        colorRadios.forEach(radio => {
            radio.checked = radio.value === currentClass.color;
        });
        
        classSettingsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Class Settings Form Submission
    classSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const classId = parseInt(document.getElementById('settings-class-id').value);
        const className = document.getElementById('settings-class-name').value.trim();
        const classDescription = document.getElementById('settings-class-description').value.trim();
        const classColor = document.querySelector('input[name="settings-color"]:checked').value;
        
        if (!className) {
            showNotification('Please enter a class name', 'error');
            return;
        }
        
        // Update class in classesData
        const classIndex = classesData.findIndex(c => c.id === classId);
        if (classIndex !== -1) {
            const oldName = classesData[classIndex].name;
            classesData[classIndex].name = className;
            classesData[classIndex].description = classDescription;
            classesData[classIndex].color = classColor;
            
            // Update localStorage
            localStorage.setItem('classesData', JSON.stringify(classesData));
            
            // Update the dashboard page's classesData as well
            if (window.parent && window.parent.updateClassesData) {
                window.parent.updateClassesData(classesData);
            }
            
            // Reload class data
            loadClassData();
            
            closeAllModals();
            classSettingsForm.reset();
            
            showNotification(`Class "${oldName}" updated successfully!`, 'success');
        }
    });
    
    // Delete Class
    deleteClassBtn.addEventListener('click', () => {
        const currentClass = classesData.find(c => c.id == classId);
        if (!currentClass) return;
        
        document.getElementById('delete-class-name').textContent = currentClass.name;
        deleteClassModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    confirmDeleteClassBtn.addEventListener('click', () => {
        const classIndex = classesData.findIndex(c => c.id == classId);
        if (classIndex !== -1) {
            const deletedClassName = classesData[classIndex].name;
            
            // Remove class from data
            classesData.splice(classIndex, 1);
            
            // Update localStorage
            localStorage.setItem('classesData', JSON.stringify(classesData));
            
            // Update the dashboard page's classesData as well
            if (window.parent && window.parent.updateClassesData) {
                window.parent.updateClassesData(classesData);
            }
            
            closeAllModals();
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
            
            showNotification(`Class "${deletedClassName}" deleted successfully!`, 'success');
        }
    });
    
    // Create Exam Modal - 3 Steps (الجديد)
    const createExamModal = document.getElementById('create-exam-modal');
    const createExamBtn = document.getElementById('create-exam-btn');
    const createExamAction = document.getElementById('create-exam-action');
    const prevStepBtn = document.getElementById('prev-step-btn');
    const nextStepBtn = document.getElementById('next-step-btn');
    const submitExamBtn = document.getElementById('submit-exam-btn');
    const steps = document.querySelectorAll('.step');
    const examSteps = document.querySelectorAll('.exam-step');
    let currentStep = 1;
    
    // Exam Questions Data
    let examQuestions = [];
    let uploadedFileName = '';
    
    // Open Create Exam Modal
    createExamBtn.addEventListener('click', () => {
        resetExamForm();
        createExamModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    createExamAction.addEventListener('click', () => {
        resetExamForm();
        createExamModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    function resetExamForm() {
        currentStep = 1;
        examQuestions = [];
        uploadedFileName = '';
        
        // Reset steps
        steps.forEach(step => {
            step.classList.remove('active', 'completed');
            if (parseInt(step.dataset.step) === 1) {
                step.classList.add('active');
            }
        });
        
        // Reset steps content
        examSteps.forEach(step => {
            step.style.display = 'none';
            if (step.id === 'step-1') {
                step.style.display = 'block';
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Reset buttons
        prevStepBtn.style.display = 'none';
        nextStepBtn.style.display = 'block';
        submitExamBtn.style.display = 'none';
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('exam-date').value = tomorrow.toISOString().split('T')[0];
        
        // Reset file upload
        document.getElementById('exam-file').value = '';
        document.getElementById('exam-file-name').textContent = 'No file chosen';
        document.getElementById('upload-review').style.display = 'none';
        
        // Reset questions list
        document.getElementById('questions-list').innerHTML = '';
        
        // Reset question forms
        document.getElementById('mc-question').value = '';
        document.getElementById('mc-marks').value = '';
        document.getElementById('essay-question').value = '';
        document.getElementById('essay-answer').value = '';
        document.getElementById('essay-marks').value = '';
        
        // Reset options container
        const container = document.getElementById('mc-options-container');
        container.innerHTML = `
            <div class="option-item">
                <div class="option-input-group">
                    <input type="checkbox" class="correct-option">
                    <input type="text" placeholder="Option 1" class="option-text">
                    <button type="button" class="remove-option-btn">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
            <div class="option-item">
                <div class="option-input-group">
                    <input type="checkbox" class="correct-option">
                    <input type="text" placeholder="Option 2" class="option-text">
                    <button type="button" class="remove-option-btn">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        `;
        
        // Re-add event listeners to remove buttons
        document.querySelectorAll('.remove-option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const container = document.getElementById('mc-options-container');
                if (container.children.length > 2) {
                    this.closest('.option-item').remove();
                } else {
                    showNotification('Exam must have at least 2 options', 'warning');
                }
            });
        });
        
        // Reset question type selection
        document.querySelectorAll('.question-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.question-type-btn[data-type="multiple-choice"]').classList.add('active');
        
        document.querySelectorAll('.question-form').forEach(form => {
            form.style.display = 'none';
            form.classList.remove('active');
        });
        document.getElementById('multiple-choice-form').style.display = 'block';
        document.getElementById('multiple-choice-form').classList.add('active');
    }
    
    // Navigation between steps
    nextStepBtn.addEventListener('click', () => {
        if (currentStep === 1) {
            // Validate step 1
            if (!validateStep1()) {
                return;
            }
            goToStep(2);
        } else if (currentStep === 2) {
            // Validate step 2
            if (!validateStep2()) {
                return;
            }
            updateReviewStep();
            goToStep(3);
        }
    });
    
    prevStepBtn.addEventListener('click', () => {
        if (currentStep === 2) {
            goToStep(1);
        } else if (currentStep === 3) {
            goToStep(2);
        }
    });
    
    function goToStep(step) {
        // Hide current step
        document.getElementById(`step-${currentStep}`).style.display = 'none';
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        
        // Update current step
        currentStep = step;
        
        // Show new step
        document.getElementById(`step-${currentStep}`).style.display = 'block';
        document.getElementById(`step-${currentStep}`).classList.add('active');
        
        // Update steps indicator
        steps.forEach(s => {
            s.classList.remove('active', 'completed');
            const stepNum = parseInt(s.dataset.step);
            if (stepNum === currentStep) {
                s.classList.add('active');
            } else if (stepNum < currentStep) {
                s.classList.add('completed');
            }
        });
        
        // Update navigation buttons
        if (currentStep === 1) {
            prevStepBtn.style.display = 'none';
            nextStepBtn.style.display = 'block';
            submitExamBtn.style.display = 'none';
        } else if (currentStep === 2) {
            prevStepBtn.style.display = 'block';
            nextStepBtn.style.display = 'block';
            submitExamBtn.style.display = 'none';
        } else if (currentStep === 3) {
            prevStepBtn.style.display = 'block';
            nextStepBtn.style.display = 'none';
            submitExamBtn.style.display = 'block';
        }
    }
    
    function validateStep1() {
        const title = document.getElementById('exam-title').value.trim();
        const type = document.getElementById('exam-type').value;
        const date = document.getElementById('exam-date').value;
        const duration = document.getElementById('exam-duration').value;
        const totalMarks = document.getElementById('exam-total-marks').value;
        
        if (!title || !type || !date || !duration || !totalMarks) {
            showNotification('Please fill all required fields in Step 1', 'error');
            return false;
        }
        
        return true;
    }
    
    function validateStep2() {
        const fileInput = document.getElementById('exam-file');
        const hasQuestions = examQuestions.length > 0;
        const hasFile = fileInput.files.length > 0;
        
        if (!hasQuestions && !hasFile) {
            showNotification('Please add questions or upload an exam file', 'error');
            return false;
        }
        
        return true;
    }
    
    // Question Type Selection
    document.querySelectorAll('.question-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            
            // Update active button
            document.querySelectorAll('.question-type-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show corresponding form
            document.querySelectorAll('.question-form').forEach(form => {
                form.style.display = 'none';
                form.classList.remove('active');
            });
            
            const form = document.getElementById(`${type}-form`);
            form.style.display = 'block';
            form.classList.add('active');
        });
    });
    
    // Add Multiple Choice Option
    document.getElementById('add-option-btn').addEventListener('click', function() {
        const container = document.getElementById('mc-options-container');
        const optionCount = container.children.length + 1;
        
        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';
        optionItem.innerHTML = `
            <div class="option-input-group">
                <input type="checkbox" class="correct-option">
                <input type="text" placeholder="Option ${optionCount}" class="option-text">
                <button type="button" class="remove-option-btn">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
        `;
        
        container.appendChild(optionItem);
        
        // Add event listener to remove button
        optionItem.querySelector('.remove-option-btn').addEventListener('click', function() {
            if (container.children.length > 2) {
                this.closest('.option-item').remove();
            } else {
                showNotification('Exam must have at least 2 options', 'warning');
            }
        });
    });
    
    // Add Multiple Choice Question
    document.getElementById('add-mc-question').addEventListener('click', function() {
        const question = document.getElementById('mc-question').value.trim();
        const marks = document.getElementById('mc-marks').value.trim();
        const options = [];
        let correctOptionIndex = -1;
        
        if (!question) {
            showNotification('Please enter a question', 'error');
            return;
        }
        
        if (!marks) {
            showNotification('Please enter marks for this question', 'error');
            return;
        }
        
        // Collect options
        document.querySelectorAll('#mc-options-container .option-item').forEach((item, index) => {
            const optionText = item.querySelector('.option-text').value.trim();
            const isCorrect = item.querySelector('.correct-option').checked;
            
            if (optionText) {
                options.push(optionText);
                if (isCorrect) {
                    correctOptionIndex = index;
                }
            }
        });
        
        if (options.length < 2) {
            showNotification('Please add at least 2 options', 'error');
            return;
        }
        
        if (correctOptionIndex === -1) {
            showNotification('Please select the correct answer', 'error');
            return;
        }
        
        // Add question to array
        examQuestions.push({
            type: 'multiple-choice',
            question: question,
            options: options,
            correctAnswer: correctOptionIndex,
            marks: parseInt(marks)
        });
        
        // Clear form for next question (بدل ما نمسح السؤال عشان يضيف تاني)
        document.getElementById('mc-question').value = '';
        document.getElementById('mc-marks').value = '';
        
        // Reset options (keep 2 empty ones)
        const container = document.getElementById('mc-options-container');
        container.innerHTML = `
            <div class="option-item">
                <div class="option-input-group">
                    <input type="checkbox" class="correct-option">
                    <input type="text" placeholder="Option 1" class="option-text">
                    <button type="button" class="remove-option-btn">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
            <div class="option-item">
                <div class="option-input-group">
                    <input type="checkbox" class="correct-option">
                    <input type="text" placeholder="Option 2" class="option-text">
                    <button type="button" class="remove-option-btn">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        `;
        
        // Re-add event listeners
        document.querySelectorAll('.remove-option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const container = document.getElementById('mc-options-container');
                if (container.children.length > 2) {
                    this.closest('.option-item').remove();
                } else {
                    showNotification('Exam must have at least 2 options', 'warning');
                }
            });
        });
        
        // Clear the correct answer checkbox
        document.querySelectorAll('.correct-option').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        showNotification('Multiple choice question added successfully! Add another or go to next step.', 'success');
    });
    
    // Add Essay Question
    document.getElementById('add-essay-question').addEventListener('click', function() {
        const question = document.getElementById('essay-question').value.trim();
        const answer = document.getElementById('essay-answer').value.trim();
        const marks = document.getElementById('essay-marks').value.trim();
        
        if (!question) {
            showNotification('Please enter a question', 'error');
            return;
        }
        
        if (!marks) {
            showNotification('Please enter marks for this question', 'error');
            return;
        }
        
        // Add question to array
        examQuestions.push({
            type: 'essay',
            question: question,
            sampleAnswer: answer || '',
            marks: parseInt(marks)
        });
        
        // Clear form for next question
        document.getElementById('essay-question').value = '';
        document.getElementById('essay-answer').value = '';
        document.getElementById('essay-marks').value = '';
        
        showNotification('Essay question added successfully! Add another or go to next step.', 'success');
    });
    
    // File Upload for Exam
    document.getElementById('exam-file').addEventListener('change', function(e) {
        if (this.files.length > 0) {
            const fileName = this.files[0].name;
            uploadedFileName = fileName;
            document.getElementById('exam-file-name').textContent = fileName;
            
            // If user uploads file, show message that questions will be from file
            showNotification('File uploaded. Questions will be taken from the file. You can still add manual questions if needed.', 'info');
        } else {
            document.getElementById('exam-file-name').textContent = 'No file chosen';
            uploadedFileName = '';
        }
    });
    
    // Update Review Step
    function updateReviewStep() {
        // Update exam details
        document.getElementById('review-title').textContent = document.getElementById('exam-title').value;
        document.getElementById('review-type').textContent = document.getElementById('exam-type').value;
        document.getElementById('review-date').textContent = new Date(document.getElementById('exam-date').value).toLocaleDateString();
        document.getElementById('review-duration').textContent = `${document.getElementById('exam-duration').value} minutes`;
        document.getElementById('review-total-marks').textContent = document.getElementById('exam-total-marks').value;
        
        // Update questions list
        const questionsList = document.getElementById('questions-list');
        questionsList.innerHTML = '';
        
        if (examQuestions.length > 0) {
            examQuestions.forEach((q, index) => {
                const questionItem = document.createElement('div');
                questionItem.className = 'question-review-item';
                
                let questionHTML = `
                    <div class="question-review-header">
                        <span class="question-review-text">${index + 1}. ${q.question.substring(0, 100)}${q.question.length > 100 ? '...' : ''}</span>
                        <span class="question-review-type">
                            ${q.type === 'multiple-choice' ? 'Multiple Choice' : 'Essay'}
                        </span>
                    </div>
                    <div class="question-review-marks">${q.marks} marks</div>
                `;
                
                if (q.type === 'multiple-choice' && q.options) {
                    questionHTML += `<div class="question-review-options" style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-light-secondary);">
                        Options: ${q.options.join(', ')}
                    </div>`;
                }
                
                questionItem.innerHTML = questionHTML;
                questionsList.appendChild(questionItem);
            });
        } else if (uploadedFileName) {
            questionsList.innerHTML = `
                <div class="question-review-item" style="text-align: center; padding: 2rem;">
                    <span class="material-symbols-outlined" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;">description</span>
                    <div style="font-weight: 500; margin-bottom: 0.5rem;">Exam questions will be taken from uploaded file</div>
                    <div style="font-size: 0.875rem; color: var(--text-light-secondary);">${uploadedFileName}</div>
                </div>
            `;
        } else {
            questionsList.innerHTML = '<p class="text-text-light-secondary dark:text-text-dark-secondary" style="padding: 1rem; text-align: center;">No questions added</p>';
        }
        
        // Update file upload info
        if (uploadedFileName) {
            document.getElementById('review-file-name').textContent = uploadedFileName;
            document.getElementById('upload-review').style.display = 'block';
        } else {
            document.getElementById('upload-review').style.display = 'none';
        }
    }
    
    // Submit Exam
    submitExamBtn.addEventListener('click', function() {
        const title = document.getElementById('exam-title').value.trim();
        const type = document.getElementById('exam-type').value;
        const date = document.getElementById('exam-date').value;
        const duration = document.getElementById('exam-duration').value;
        const description = document.getElementById('exam-description').value.trim();
        const totalMarks = document.getElementById('exam-total-marks').value;
        
        // Calculate total marks from questions if manually added
        let calculatedTotalMarks = parseInt(totalMarks);
        if (examQuestions.length > 0) {
            calculatedTotalMarks = examQuestions.reduce((sum, q) => sum + q.marks, 0);
        }
        
        // Add to exams list
        const newExam = {
            id: examsData.length > 0 ? Math.max(...examsData.map(e => e.id)) + 1 : 1,
            title,
            type,
            date,
            duration: parseInt(duration),
            totalMarks: calculatedTotalMarks,
            description,
            questions: examQuestions,
            uploadedFile: uploadedFileName,
            submissions: 0,
            averageScore: 0,
            highestScore: 0,
            lowestScore: 0
        };
        
        examsData.unshift(newExam);
        localStorage.setItem('examsData', JSON.stringify(examsData));
        loadExams();
        
        // Update exams count
        const currentClass = classesData.find(c => c.id == classId);
        if (currentClass) {
            currentClass.exams++;
            localStorage.setItem('classesData', JSON.stringify(classesData));
            document.getElementById('exams-count').textContent = currentClass.exams;
        }
        
        closeAllModals();
        
        // Reset form
        document.getElementById('create-exam-form').reset();
        
        // Show success message with summary
        let summaryMessage = `Exam "${title}" created successfully!`;
        if (examQuestions.length > 0) {
            summaryMessage += ` ${examQuestions.length} question${examQuestions.length > 1 ? 's' : ''} added (Total marks: ${calculatedTotalMarks}).`;
        }
        if (uploadedFileName) {
            summaryMessage += ` File "${uploadedFileName}" uploaded.`;
        }
        
        showNotification(summaryMessage, 'success');
    });
    
    // Edit Exam
    function editExam(examId) {
        const exam = examsData.find(e => e.id == examId);
        if (!exam) return;
        
        // Fill edit form with exam data
        document.getElementById('edit-exam-id').value = exam.id;
        document.getElementById('edit-exam-title').value = exam.title;
        document.getElementById('edit-exam-type').value = exam.type;
        document.getElementById('edit-exam-date').value = exam.date;
        document.getElementById('edit-exam-duration').value = exam.duration;
        document.getElementById('edit-exam-description').value = exam.description;
        document.getElementById('edit-exam-total-marks').value = exam.totalMarks;
        
        const editExamModal = document.getElementById('edit-exam-modal');
        editExamModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Edit Exam Form Submission
    document.getElementById('edit-exam-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const examId = parseInt(document.getElementById('edit-exam-id').value);
        const title = document.getElementById('edit-exam-title').value.trim();
        const type = document.getElementById('edit-exam-type').value;
        const date = document.getElementById('edit-exam-date').value;
        const duration = document.getElementById('edit-exam-duration').value;
        const description = document.getElementById('edit-exam-description').value.trim();
        const totalMarks = document.getElementById('edit-exam-total-marks').value;
        
        if (!title || !type || !date || !duration || !totalMarks) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Update exam in examsData
        const examIndex = examsData.findIndex(e => e.id === examId);
        if (examIndex !== -1) {
            const oldTitle = examsData[examIndex].title;
            examsData[examIndex].title = title;
            examsData[examIndex].type = type;
            examsData[examIndex].date = date;
            examsData[examIndex].duration = parseInt(duration);
            examsData[examIndex].description = description;
            examsData[examIndex].totalMarks = parseInt(totalMarks);
            
            localStorage.setItem('examsData', JSON.stringify(examsData));
            loadExams();
            
            closeAllModals();
            showNotification(`Exam "${oldTitle}" updated successfully!`, 'success');
        }
    });
    
    // Delete Exam
    function deleteExam(examId) {
        const exam = examsData.find(e => e.id == examId);
        if (!exam) return;
        
        document.getElementById('delete-exam-name').textContent = exam.title;
        document.getElementById('confirm-delete-exam').dataset.id = examId;
        
        const deleteExamModal = document.getElementById('delete-exam-modal');
        deleteExamModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Confirm Delete Exam
    document.getElementById('confirm-delete-exam').addEventListener('click', function() {
        const examId = parseInt(this.getAttribute('data-id'));
        const examIndex = examsData.findIndex(e => e.id === examId);
        
        if (examIndex !== -1) {
            const deletedExamTitle = examsData[examIndex].title;
            
            // Remove exam from data
            examsData.splice(examIndex, 1);
            localStorage.setItem('examsData', JSON.stringify(examsData));
            loadExams();
            
            // Update exams count
            const currentClass = classesData.find(c => c.id == classId);
            if (currentClass && currentClass.exams > 0) {
                currentClass.exams--;
                localStorage.setItem('classesData', JSON.stringify(classesData));
                document.getElementById('exams-count').textContent = currentClass.exams;
            }
            
            closeAllModals();
            showNotification(`Exam "${deletedExamTitle}" deleted successfully!`, 'success');
        }
    });
    
    // View Submissions
    function viewSubmissions(examId) {
        const exam = examsData.find(e => e.id == examId);
        if (!exam) return;
        
        // Update modal title
        document.querySelector('#view-submissions-modal h3').textContent = `Submissions - ${exam.title}`;
        
        // Load submissions
        const submissionsList = document.getElementById('submissions-list');
        submissionsList.innerHTML = '';
        
        // Create sample submissions based on exam data
        const sampleSubmissions = Array.from({ length: exam.submissions }, (_, i) => ({
            id: i + 1,
            student: `Student ${i + 1}`,
            date: exam.date,
            score: Math.floor(Math.random() * (exam.totalMarks - 30)) + 30,
            status: 'graded'
        }));
        
        sampleSubmissions.forEach(submission => {
            const submissionItem = document.createElement('div');
            submissionItem.className = 'submission-item';
            submissionItem.innerHTML = `
                <div class="submission-info">
                    <h4>${submission.student}</h4>
                    <p>Submitted on ${new Date(submission.date).toLocaleDateString()}</p>
                </div>
                <div class="submission-score">
                    ${submission.score}/${exam.totalMarks}
                </div>
            `;
            submissionsList.appendChild(submissionItem);
        });
        
        const viewSubmissionsModal = document.getElementById('view-submissions-modal');
        viewSubmissionsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Show Analytics
    function showAnalytics(examId) {
        const exam = examsData.find(e => e.id == examId);
        if (!exam) return;
        
        // Update analytics data
        document.getElementById('total-submissions').textContent = exam.submissions;
        document.getElementById('average-score').textContent = `${exam.averageScore}%`;
        document.getElementById('highest-score').textContent = `${exam.highestScore}%`;
        document.getElementById('lowest-score').textContent = `${exam.lowestScore}%`;
        
        // Generate score distribution chart
        const distributionChart = document.getElementById('distribution-chart');
        distributionChart.innerHTML = '';
        
        // Create sample distribution
        const scoreRanges = [
            { range: '0-20%', count: 2 },
            { range: '21-40%', count: 3 },
            { range: '41-60%', count: 5 },
            { range: '61-80%', count: 8 },
            { range: '81-100%', count: 10 }
        ];
        
        const maxCount = Math.max(...scoreRanges.map(r => r.count));
        
        scoreRanges.forEach(range => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${(range.count / maxCount) * 100}%`;
            bar.title = `${range.range}: ${range.count} students`;
            distributionChart.appendChild(bar);
        });
        
        const analyticsModal = document.getElementById('analytics-modal');
        analyticsModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Show Download Modal
    function showDownloadModal(materialId) {
        const material = materialsData.find(m => m.id == materialId);
        if (!material) return;
        
        document.getElementById('start-download').dataset.id = materialId;
        
        const downloadModal = document.getElementById('download-material-modal');
        downloadModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Start Download
    document.getElementById('start-download').addEventListener('click', function() {
        const materialId = this.getAttribute('data-id');
        const material = materialsData.find(m => m.id == materialId);
        if (!material) return;
        
        const format = document.getElementById('download-format').value;
        const includeImages = document.getElementById('include-images').checked;
        const includeLinks = document.getElementById('include-links').checked;
        
        // Simulate download
        this.innerHTML = '<span class="material-symbols-outlined">download</span> Downloading...';
        this.disabled = true;
        
        setTimeout(() => {
            closeAllModals();
            showNotification(`Downloading "${material.title}" as ${format.toUpperCase()}...`, 'success');
            
            // Reset button
            this.innerHTML = '<span class="material-symbols-outlined">download</span> Download';
            this.disabled = false;
        }, 1500);
    });
    
    // Show Share Modal
    function showShareModal(materialId) {
        const material = materialsData.find(m => m.id == materialId);
        if (!material) return;
        
        document.getElementById('material-share-link').value = `https://eureka.edu/material/${materialId}`;
        
        const shareModal = document.getElementById('share-material-modal');
        shareModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Copy Share Link
    document.querySelector('#share-material-modal .copy-link-btn-small').addEventListener('click', function() {
        const linkInput = document.getElementById('material-share-link');
        linkInput.select();
        document.execCommand('copy');
        
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="material-symbols-outlined">check</span> Copied!';
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
    
    // Share via Email
    document.getElementById('share-via-email').addEventListener('click', function() {
        const message = document.getElementById('share-message').value;
        const link = document.getElementById('material-share-link').value;
        
        this.innerHTML = '<span class="material-symbols-outlined">check</span> Sending...';
        this.disabled = true;
        
        setTimeout(() => {
            closeAllModals();
            showNotification('Material shared via email successfully!', 'success');
            
            // Reset button
            this.innerHTML = '<span class="material-symbols-outlined">mail</span> Share via Email';
            this.disabled = false;
        }, 1500);
    });
    
    // Copy Link from Invite Buttons
    document.querySelector('.copy-link-btn').addEventListener('click', function() {
        navigator.clipboard.writeText('https://eureka.edu/class/join/abc123');
        
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="material-symbols-outlined">check</span> Copied!';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 2000);
    });
    
    // Google Invite
    document.querySelector('.google-invite').addEventListener('click', function() {
        showNotification('Redirecting to Google Classroom...', 'info');
        setTimeout(() => {
            showNotification('Google Classroom integration coming soon!', 'info');
        }, 1000);
    });
    
    // Email Invite
    document.querySelector('.email-invite').addEventListener('click', function() {
        inviteModal.classList.add('show');
        document.querySelector('.invite-option[data-method="email"]').click();
        document.body.style.overflow = 'hidden';
    });
    
    // Show Students Button
    document.getElementById('show-students-btn').addEventListener('click', function() {
        showNotification('Showing students list...', 'info');
    });
    
    document.getElementById('show-students-action').addEventListener('click', function() {
        showNotification('Showing students list...', 'info');
    });
    
    // Modal Management
    const modals = document.querySelectorAll('.modal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const modalCancelBtns = document.querySelectorAll('.modal-cancel, .delete-modal-cancel, .delete-exam-cancel');
    
    function closeAllModals() {
        modals.forEach(modal => modal.classList.remove('show'));
        document.body.style.overflow = '';
        
        // Reset forms
        document.querySelectorAll('form').forEach(form => form.reset());
        document.querySelector('.file-name').textContent = 'No file chosen';
    }
    
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    modalCancelBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Notification System
    function showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };
        
        notification.innerHTML = `
            <span class="material-symbols-outlined">${icons[type] || 'info'}</span>
            <span>${message}</span>
            <button class="notification-close">
                <span class="material-symbols-outlined">close</span>
            </button>
        `;
        
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
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
        
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
    
    // Initialize
    loadClassData();
    
    // Initialize Quill editor
    initQuillEditor();
    
    // Show welcome notification
    setTimeout(() => {
        const classItem = classesData.find(c => c.id == classId) || classesData[0];
        showNotification(`Welcome to ${classItem.name}!`, 'info');
    }, 1000);
    
    // Initialize remove option buttons
    document.querySelectorAll('.remove-option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const container = document.getElementById('mc-options-container');
            if (container.children.length > 2) {
                this.closest('.option-item').remove();
            } else {
                showNotification('Exam must have at least 2 options', 'warning');
            }
        });
    });
});