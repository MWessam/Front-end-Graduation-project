// Students Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sample students data
    const studentsData = [
        {
            id: 1,
            name: "Ahmed Mohamed",
            email: "ahmed.mohamed@example.com",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZt6iRSZ322jTn4WI260L9yp9Qz6djTRCvvHqKmL3Tov3FY9lYmPaCV3A407Ck5GcoZ26oBXngEK8XB8LMSwo2sio05E385b0z-1CNyU0HLJEQU7LpvVJR-HEKFEI8sz-qcTIjqBw4U2vZULMWMrUCgSfarJM-7ySeBILeO4Hb2hkGrZbYrY2MBcMuC14Ji1SGmA2yHhnaui34q8MG8vD6lceFS7_cLAvPcS3JpW1mKxBznm8sMFGLXQZt2fQG5O031ZKiII4IADw",
            studentId: "STU-2025-001",
            status: "active",
            joinDate: "2024-01-15",
            activities: 24,
            avgScore: 92,
            online: true,
            assessments: [
                { name: "Quiz 1", score: "18/20", percentage: 90 },
                { name: "Quiz 2", score: "12/15", percentage: 80 },
                { name: "Bank of Questions", score: "75%", percentage: 75 },
                { name: "Assignment 1", score: "20/25", percentage: 80 },
                { name: "Project Draft Submission", score: "60%", percentage: 60 }
            ]
        },
        {
            id: 2,
            name: "Ahmed Sayed",
            email: "ahmed.sayed@example.com",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuABwiiI5cTk67r1SNWC10q_iNf7-zBlh0FAAkzSZQzlaej0TvJ5i7es5n8sK8erS87iclAfVZjOEI7oPSUFKqkyfuKSz6fnHatyh0Fa1_sUBUbXBExLE4Bu_BV4QUlZHDKU3mJreuXJ6L-8Z3DXxQtOIWm2EMkbrAOvnMpxafRhcRuAK1fijfxog84jYVOGjCaNzdCn209Nsg4P71Dqh-z0LKHa8VuOk4s-rX1ivnptwbVGUsgAW60n-M6P98GHm849SEcIGlVOb_s",
            studentId: "STU-2025-002",
            status: "active",
            joinDate: "2024-02-10",
            activities: 18,
            avgScore: 88,
            online: false,
            assessments: [
                { name: "Quiz 1", score: "15/20", percentage: 75 },
                { name: "Quiz 2", score: "10/15", percentage: 67 },
                { name: "Bank of Questions", score: "85%", percentage: 85 },
                { name: "Assignment 1", score: "18/25", percentage: 72 },
                { name: "Project Draft Submission", score: "75%", percentage: 75 }
            ]
        },
        {
            id: 3,
            name: "Ali Tarek",
            email: "ali.tarek@example.com",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFJvpwdGId9bo8G7JSaS0LZJKMSDcD_ejbvIRlV2AuB6Rc00ildAAx-0J9_chrjEuPgj4Svv4wpXdMg-8H3m0-baHyU-MNkRG-iTmYmoqe_TpoPkfVzryhj1KhekXf-b1DoBl7yJ9556JZrutvth_1JzNbU0BQZuwciUyd0HxepeRSvyVQPGyrJ_In6lcQ7pQSbxjQWUCsV5EDIv6gj4RAICKLYgv_xkaZUQzblgb9Xy3sCvYGSoj6XiUvzyxI-ds-l2YVySlYLvw",
            studentId: "STU-2025-003",
            status: "active",
            joinDate: "2024-01-20",
            activities: 32,
            avgScore: 95,
            online: true,
            assessments: [
                { name: "Quiz 1", score: "20/20", percentage: 100 },
                { name: "Quiz 2", score: "15/15", percentage: 100 },
                { name: "Bank of Questions", score: "95%", percentage: 95 },
                { name: "Assignment 1", score: "24/25", percentage: 96 },
                { name: "Project Draft Submission", score: "90%", percentage: 90 }
            ]
        },
        {
            id: 4,
            name: "Fatma Hassan",
            email: "fatma.hassan@example.com",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDakJXfhkidnqELGf7FMOKpFnS9DdNYqZpbOmxNxQfqoY3kc9BpFNkk5fWxRUASCL6XTxeKlR_kaAeQWiGttIwtAiZyy7-vd0Ccb_o4FFb_OP5gyzJeepNYAH140PGRPy9MWdfmtmsB2wSt0g3evrT6bvmrAYvnd1fJEv4GRzqooswWGRcuKq_Uexkm1yxlwF4PMt0pR2Fu11EMgV_RDioxU-3HKSXz5TXsYwSWnpu6ATjUNpnRURPgq1ovTkS0FfqXHJ8mf3GeFYE",
            studentId: "STU-2025-004",
            status: "inactive",
            joinDate: "2024-03-05",
            activities: 8,
            avgScore: 75,
            online: false,
            assessments: [
                { name: "Quiz 1", score: "12/20", percentage: 60 },
                { name: "Quiz 2", score: "8/15", percentage: 53 },
                { name: "Bank of Questions", score: "65%", percentage: 65 },
                { name: "Assignment 1", score: "15/25", percentage: 60 },
                { name: "Project Draft Submission", score: "50%", percentage: 50 }
            ]
        },
        {
            id: 5,
            name: "Huda Khattab",
            email: "huda.khattab@example.com",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuGsS8SLBLCF52hQDp9Ryvqp0oul-Jsa5CJF_wEgGVAJL1LdWCbW4J3XQUelUsQPwBkn2oi0EuP2-XVt3DIr6HRj7nR0uJu7we0EMKQukRq_WpxuoE_prZCbv3g1QwYIu7RztH7XQtMXkcgQkG8nUKuZveaP8-HFgvgr1iD4KppLKnDMtn8eLkRtoSPabn7YF4VQ_hVEdyym-GoUjtkEYIQNXNgIPGK9KIiMa24yHv5Wz9trSFEU6tug70ySfmBAI_FnsDA_w5_84",
            studentId: "STU-2025-005",
            status: "active",
            joinDate: "2024-02-28",
            activities: 15,
            avgScore: 85,
            online: true,
            assessments: [
                { name: "Quiz 1", score: "16/20", percentage: 80 },
                { name: "Quiz 2", score: "11/15", percentage: 73 },
                { name: "Bank of Questions", score: "80%", percentage: 80 },
                { name: "Assignment 1", score: "19/25", percentage: 76 },
                { name: "Project Draft Submission", score: "70%", percentage: 70 }
            ]
        },
        {
            id: 6,
            name: "Mariam Noor",
            email: "mariam.noor@example.com",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFLBoabenFOWPqgh95CLDGlhnXBiyM3QCXE6yr1EmRdgvvqKtoagWt6bcYbwiRw6ag4eGTNUEp5rV8-c3YKjqpB7BaDUmzNtnxF4VZuI1mJZqX6rtuHVIypnuXQZgiKmJO2KQL-10ie0jtB18qydJjdd0cdFXBZ8FOdq9zGzAizf5M9k-KwiMHOhLzcJDosgqePtk7FOqA-E13TeI1hwLbb6uIf3IGr5e6lgCboPoxPeXIumiISaR-3uLF6pEvbbczuuKMSx5WGFQ",
            studentId: "STU-2025-006",
            status: "pending",
            joinDate: "2024-03-15",
            activities: 0,
            avgScore: 0,
            online: false,
            assessments: [
                { name: "Quiz 1", score: "0/20", percentage: 0 },
                { name: "Quiz 2", score: "0/15", percentage: 0 },
                { name: "Bank of Questions", score: "0%", percentage: 0 },
                { name: "Assignment 1", score: "0/25", percentage: 0 },
                { name: "Project Draft Submission", score: "0%", percentage: 0 }
            ]
        },
        {
            id: 7,
            name: "Mohamed Ali",
            email: "mohamed.ali@example.com",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT9hcAphtOXY_EVpZe0N3Am2Ofzfo-VR2VioTOm5KwtzyVlXB0k_vaMIXLUK9kfD0MfveTeWKDo2vvoEB4ttgMpSxNTGHPKo07gs42j4XuYbeHBIcU3CxTPsnypPilvVhERWXJH9UpPznO4fO9eICJfYjDHWBozalIcqAtIpQ48sq1NBItXjXXQxAeGN_edkxmLKtPe9YJbfs0IazGjtjJHCFtGX7D-50eQ8JgCL_vEiMHblWKn-j4q0wbkpXuoGZPDZ5wiQkvQzE",
            studentId: "STU-2025-007",
            status: "active",
            joinDate: "2024-01-12",
            activities: 28,
            avgScore: 90,
            online: false,
            assessments: [
                { name: "Quiz 1", score: "17/20", percentage: 85 },
                { name: "Quiz 2", score: "13/15", percentage: 87 },
                { name: "Bank of Questions", score: "90%", percentage: 90 },
                { name: "Assignment 1", score: "22/25", percentage: 88 },
                { name: "Project Draft Submission", score: "85%", percentage: 85 }
            ]
        },
        {
            id: 8,
            name: "Mohamed Ibrahim",
            email: "mohamed.ibrahim@example.com",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHMzQoHiZiIIWItk8hIz4QAORiFYTAVRtCPmQUrgWw3opTe6rWuYSegRUcoOGtmjZI6itV5d7AZHIWfQcgSkpXFLM6BGzIF0FYH1iz_rHhygmshF5DPZD-izgLCT7VOkWVuOqhRuFCF04nGtLVkozh7Lv-7qFZSj5vI0Vk-Fek0_dOUMbvBSO-K9Ch8T_i2HeTlER9tlcvKu-hs_O3HOLu9_O75iqQor3-qYCJaYSNRxytKvEDGVrlfDC_hiKwHjP6SXmRA3iGtXs",
            studentId: "STU-2025-008",
            status: "active",
            joinDate: "2024-02-22",
            activities: 20,
            avgScore: 87,
            online: true,
            assessments: [
                { name: "Quiz 1", score: "16/20", percentage: 80 },
                { name: "Quiz 2", score: "12/15", percentage: 80 },
                { name: "Bank of Questions", score: "85%", percentage: 85 },
                { name: "Assignment 1", score: "20/25", percentage: 80 },
                { name: "Project Draft Submission", score: "80%", percentage: 80 }
            ]
        }
    ];

    // Pagination variables
    let currentPage = 1;
    const studentsPerPage = 6;
    let filteredStudents = [...studentsData];
    let currentSort = 'name';

    // DOM Elements
    const studentsList = document.getElementById('students-list');
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const searchInput = document.getElementById('search-students');
    const clearSearch = document.getElementById('clear-search');
    const filterBtn = document.getElementById('filter-btn');
    const filterMenu = document.getElementById('filter-menu');
    const sortBtn = document.getElementById('sort-btn');
    const sortMenu = document.getElementById('sort-menu');
    const sortOptions = document.querySelectorAll('.sort-option');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const deleteStudentModal = document.getElementById('delete-student-modal');
    const studentDetailsModal = document.getElementById('student-details-modal');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('page-numbers');
    const backToTopBtn = document.getElementById('back-to-top');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-student');
    const studentDetailsBackBtn = document.getElementById('student-details-back');
    const deleteFromDetailsBtn = document.getElementById('delete-from-details');
    const messageFromDetailsBtn = document.getElementById('message-from-details');
    const changePhotoBtn = document.getElementById('change-photo-btn');
    const assessmentsList = document.getElementById('assessments-list');

    // Current student being viewed
    let currentStudentId = null;

    // Initialize the page
    function initPage() {
        // Simulate loading
        setTimeout(() => {
            loadingState.style.display = 'none';
            renderStudents();
            updatePagination();
        }, 1000);

        // Set up event listeners
        setupEventListeners();
        
        // Update students count
        updateStudentsCount();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Search functionality
        searchInput.addEventListener('input', handleSearch);
        
        // Clear search button
        clearSearch.addEventListener('click', clearSearchHandler);
        
        // Filter dropdown
        filterBtn.addEventListener('click', toggleFilterMenu);
        
        // Sort dropdown
        sortBtn.addEventListener('click', toggleSortMenu);
        
        // Sort options
        sortOptions.forEach(option => {
            option.addEventListener('click', handleSort);
        });
        
        // Reset filters
        resetFiltersBtn.addEventListener('click', resetFilters);
        
        // Pagination
        prevPageBtn.addEventListener('click', goToPrevPage);
        nextPageBtn.addEventListener('click', goToNextPage);
        
        // Delete modal buttons
        cancelDeleteBtn.addEventListener('click', closeAllModals);
        confirmDeleteBtn.addEventListener('click', deleteStudent);
        
        // Student details modal buttons
        studentDetailsBackBtn.addEventListener('click', closeAllModals);
        deleteFromDetailsBtn.addEventListener('click', deleteFromDetails);
        messageFromDetailsBtn.addEventListener('click', messageFromDetails);
        changePhotoBtn.addEventListener('click', changeStudentPhoto);
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', closeDropdowns);
        
        // Back to top button
        backToTopBtn.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', toggleBackToTopButton);
        
        // Close modals with escape key
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
        
        // Close modal buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });
    }

    // Render students list
    function renderStudents() {
        studentsList.innerHTML = '';
        
        if (filteredStudents.length === 0) {
            emptyState.style.display = 'flex';
            return;
        }
        
        emptyState.style.display = 'none';
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * studentsPerPage;
        const endIndex = startIndex + studentsPerPage;
        const currentStudents = filteredStudents.slice(startIndex, endIndex);
        
        currentStudents.forEach((student, index) => {
            const studentItem = createStudentElement(student);
            studentsList.appendChild(studentItem);
            
            // Add animation delay
            studentItem.style.animationDelay = `${index * 0.05}s`;
        });
    }

    // Create student element
    function createStudentElement(student) {
        const div = document.createElement('div');
        div.className = 'student-item';
        
        // Format join date
        const joinDate = new Date(student.joinDate);
        const formattedDate = joinDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        // Determine status class and text
        let statusClass = 'status-active';
        let statusText = 'Active';
        
        if (student.status === 'inactive') {
            statusClass = 'status-inactive';
            statusText = 'Inactive';
        } else if (student.status === 'pending') {
            statusClass = 'status-pending';
            statusText = 'Pending';
        }
        
        div.innerHTML = `
            <div class="student-info">
                <div class="student-avatar ${student.avatar ? '' : 'default'}">
                    ${student.avatar ? 
                        `<img src="${student.avatar}" alt="${student.name}" onerror="this.onerror=null; this.parentElement.className='student-avatar default'; this.parentElement.innerHTML='<span class=\\'material-icons-outlined\\'>person</span>'">` :
                        `<span class="material-icons-outlined">person</span>`
                    }
                </div>
                <div class="student-details">
                    <div class="student-name">
                        ${student.name}
                        ${student.online ? '<span class="online-badge"></span>' : ''}
                    </div>
                    <div class="student-email">${student.email}</div>
                </div>
            </div>
            <div class="student-email mobile-only">${student.email}</div>
            <div class="status-badge ${statusClass}">${statusText}</div>
            <div class="join-date">${formattedDate}</div>
            <div class="student-actions">
                <button class="action-btn chat" title="Send message" data-id="${student.id}">
                    <span class="material-icons-outlined">chat_bubble_outline</span>
                </button>
                <button class="action-btn view" title="View details" data-id="${student.id}">
                    <span class="material-icons-outlined">visibility</span>
                </button>
                <button class="action-btn delete" title="Delete student" data-id="${student.id}">
                    <span class="material-icons-outlined">delete_outline</span>
                </button>
            </div>
        `;
        
        // Add event listeners to action buttons
        const chatBtn = div.querySelector('.action-btn.chat');
        const viewBtn = div.querySelector('.action-btn.view');
        const deleteBtn = div.querySelector('.action-btn.delete');
        
        chatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openChat(student);
        });
        
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openStudentDetails(student);
        });
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openDeleteConfirmation(student);
        });
        
        // Make entire row clickable
        div.addEventListener('click', () => {
            openStudentDetails(student);
        });
        
        return div;
    }

    // Handle search
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Show/hide clear button
        if (searchTerm) {
            clearSearch.style.opacity = '1';
            clearSearch.style.pointerEvents = 'auto';
        } else {
            clearSearch.style.opacity = '0';
            clearSearch.style.pointerEvents = 'none';
        }
        
        // Filter students
        filteredStudents = studentsData.filter(student => {
            return student.name.toLowerCase().includes(searchTerm) ||
                   student.email.toLowerCase().includes(searchTerm) ||
                   student.studentId.toLowerCase().includes(searchTerm);
        });
        
        // Apply current sort
        applySort();
        
        // Reset to first page
        currentPage = 1;
        
        // Update display
        updateStudentsCount();
        renderStudents();
        updatePagination();
    }

    // Clear search handler
    function clearSearchHandler() {
        searchInput.value = '';
        searchInput.focus();
        handleSearch();
    }

    // Toggle filter menu
    function toggleFilterMenu(e) {
        e.stopPropagation();
        filterMenu.parentElement.classList.toggle('show');
        sortMenu.parentElement.classList.remove('show');
    }

    // Toggle sort menu
    function toggleSortMenu(e) {
        e.stopPropagation();
        sortMenu.parentElement.classList.toggle('show');
        filterMenu.parentElement.classList.remove('show');
    }

    // Handle sort selection
    function handleSort(e) {
        const sortType = e.target.dataset.sort;
        
        // Update active state
        sortOptions.forEach(opt => opt.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update current sort
        currentSort = sortType;
        
        // Apply sort
        applySort();
        
        // Close dropdown
        sortMenu.parentElement.classList.remove('show');
        
        // Update display
        renderStudents();
    }

    // Apply current sort to filtered students
    function applySort() {
        switch (currentSort) {
            case 'name':
                filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredStudents.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'recent':
                filteredStudents.sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
                break;
            case 'active':
                filteredStudents.sort((a, b) => b.activities - a.activities);
                break;
        }
    }

    // Reset all filters
    function resetFilters() {
        searchInput.value = '';
        filteredStudents = [...studentsData];
        currentSort = 'name';
        currentPage = 1;
        
        // Reset sort UI
        sortOptions.forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.sort === 'name') {
                opt.classList.add('active');
            }
        });
        
        // Update display
        updateStudentsCount();
        applySort();
        renderStudents();
        updatePagination();
        
        // Hide clear button
        clearSearch.style.opacity = '0';
        clearSearch.style.pointerEvents = 'none';
    }

    // Update students count display
    function updateStudentsCount() {
        const countElement = document.querySelector('.students-count');
        if (countElement) {
            countElement.innerHTML = `
                <span class="material-icons-outlined" style="font-size: 16px">people</span>
                ${filteredStudents.length} Students
            `;
        }
    }

    // Update pagination
    function updatePagination() {
        const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
        
        // Update button states
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        // Update page numbers
        pageNumbers.innerHTML = '';
        
        if (totalPages === 0) {
            return;
        }
        
        // Always show first page
        addPageNumber(1);
        
        // Calculate range of pages to show
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);
        
        // Add ellipsis if needed
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'ellipsis';
            ellipsis.textContent = '...';
            pageNumbers.appendChild(ellipsis);
        }
        
        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            addPageNumber(i);
        }
        
        // Add ellipsis if needed
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'ellipsis';
            ellipsis.textContent = '...';
            pageNumbers.appendChild(ellipsis);
        }
        
        // Always show last page if there is more than one page
        if (totalPages > 1) {
            addPageNumber(totalPages);
        }
    }

    // Add page number button
    function addPageNumber(page) {
        const button = document.createElement('button');
        button.className = `page-number ${page === currentPage ? 'active' : ''}`;
        button.textContent = page;
        button.addEventListener('click', () => goToPage(page));
        pageNumbers.appendChild(button);
    }

    // Go to specific page
    function goToPage(page) {
        currentPage = page;
        renderStudents();
        updatePagination();
        scrollToStudentsList();
    }

    // Go to previous page
    function goToPrevPage() {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }

    // Go to next page
    function goToNextPage() {
        const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }

    // Scroll to students list
    function scrollToStudentsList() {
        studentsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Open chat with student
    function openChat(student) {
            window.location.href = `chat.html?student=${student.id}`;
        // In a real application, this would open a chat interface
    }

    // Open student details modal - NEW VERSION
    function openStudentDetails(student) {
        currentStudentId = student.id;
        
        // Set basic student info
        document.getElementById('detail-name').textContent = student.name;
        document.getElementById('detail-email').textContent = student.email;
        document.getElementById('detail-id').textContent = student.studentId;
        
        // Set avatar
        const avatarContainer = document.getElementById('detail-avatar');
        if (student.avatar) {
            avatarContainer.innerHTML = `<img src="${student.avatar}" alt="${student.name}" 
                onerror="this.onerror=null; this.parentElement.className='profile-picture default'; 
                this.parentElement.innerHTML='<span class=\\'material-icons-outlined\\'>person</span>'">`;
            avatarContainer.className = 'profile-picture';
        } else {
            avatarContainer.className = 'profile-picture default';
            avatarContainer.innerHTML = '<span class="material-icons-outlined">person</span>';
        }
        
        // Render assessments
        renderAssessments(student.assessments);
        
        openModal(studentDetailsModal);
    }

    // Render assessments list
    function renderAssessments(assessments) {
        assessmentsList.innerHTML = '';
        
        assessments.forEach(assessment => {
            const assessmentItem = document.createElement('div');
            assessmentItem.className = 'assessment-item';
            
            // Determine progress bar class based on percentage
            let progressClass = 'medium';
            if (assessment.percentage >= 80) {
                progressClass = 'high';
            } else if (assessment.percentage <= 50) {
                progressClass = 'low';
            }
            
            assessmentItem.innerHTML = `
                <div class="assessment-item-name">${assessment.name}</div>
                <div class="assessment-item-score">${assessment.score}</div>
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill ${progressClass}" style="width: ${assessment.percentage}%"></div>
                    </div>
                    <span class="progress-percentage">${assessment.percentage}%</span>
                </div>
            `;
            
            assessmentsList.appendChild(assessmentItem);
        });
    }

    // Delete from details modal
    function deleteFromDetails() {
        if (currentStudentId) {
            const student = studentsData.find(s => s.id === currentStudentId);
            if (student) {
                closeAllModals();
                setTimeout(() => {
                    openDeleteConfirmation(student);
                }, 300);
            }
        }
    }

    // Message from details modal
    function messageFromDetails() {
        if (currentStudentId) {
            const student = studentsData.find(s => s.id === currentStudentId);
            if (student) {
                window.location.href = `chat.html?student=${student.id}`;
                // In a real application, this would open a chat interface
            }
        }
    }

    // Change student photo
    function changeStudentPhoto() {
        showNotification('Photo upload feature would be implemented here', 'info');
        // In a real application, this would open a file picker
    }

    // Open delete confirmation modal
    function openDeleteConfirmation(student) {
        document.getElementById('delete-student-name').textContent = student.name;
        confirmDeleteBtn.dataset.id = student.id;
        openModal(deleteStudentModal);
    }

    // Delete student function
    function deleteStudent() {
        const studentId = parseInt(confirmDeleteBtn.dataset.id);
        const studentIndex = studentsData.findIndex(s => s.id === studentId);
        
        if (studentIndex !== -1) {
            const deletedStudent = studentsData[studentIndex];
            
            // Remove from data
            studentsData.splice(studentIndex, 1);
            
            // Update filtered students
            filteredStudents = studentsData.filter(student => {
                const searchTerm = searchInput.value.toLowerCase().trim();
                if (!searchTerm) return true;
                return student.name.toLowerCase().includes(searchTerm) ||
                       student.email.toLowerCase().includes(searchTerm) ||
                       student.studentId.toLowerCase().includes(searchTerm);
            });
            
            // Reset to first page if needed
            const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
            if (currentPage > totalPages && totalPages > 0) {
                currentPage = totalPages;
            } else if (totalPages === 0) {
                currentPage = 1;
            }
            
            // Close modal
            closeAllModals();
            
            // Update display
            updateStudentsCount();
            renderStudents();
            updatePagination();
            
            // Show success message
            showNotification(`Student "${deletedStudent.name}" deleted successfully!`, 'success');
        }
    }

    // Modal functions
    function openModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'slideUp 0.3s ease';
    }

    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
        currentStudentId = null;
    }

    // Close dropdowns when clicking outside
    function closeDropdowns(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
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
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="material-icons-outlined">
                ${type === 'success' ? 'check_circle' : 
                  type === 'error' ? 'error' : 
                  type === 'warning' ? 'warning' : 'info'}
            </span>
            <span>${message}</span>
            <button class="notification-close">
                <span class="material-icons-outlined">close</span>
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
            notification.remove();
        });
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Initialize the page
    initPage();
});