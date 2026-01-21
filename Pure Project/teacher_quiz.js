document.addEventListener('DOMContentLoaded', function() {
    // Exam questions data
    const questions = [
        {
            id: 1,
            question: "What is the primary purpose of a function in programming?",
            options: [
                "To store data and variables",
                "To encapsulate a piece of code for reuse",
                "To style the user interface",
                "To slow down the program execution"
            ],
            correctAnswer: 1
        },
        {
            id: 2,
            question: "Which keyword is used to define a function in Python?",
            options: [
                "function",
                "def",
                "define",
                "func"
            ],
            correctAnswer: 1
        },
        {
            id: 3,
            question: "What does the 'return' statement do in a function?",
            options: [
                "Stops the function execution",
                "Prints a value to the console",
                "Sends a value back to the calling code",
                "Defines a new variable"
            ],
            correctAnswer: 2
        },
        {
            id: 4,
            question: "What is a parameter in a function?",
            options: [
                "A value returned by the function",
                "A variable that holds the function code",
                "A value passed into the function when it is called",
                "The name of the function"
            ],
            correctAnswer: 2
        },
        {
            id: 5,
            question: "What is the difference between parameters and arguments?",
            options: [
                "Parameters are used in function definition, arguments are values passed when calling",
                "Arguments are used in function definition, parameters are values passed when calling",
                "They are the same thing",
                "Parameters are for math functions, arguments are for other functions"
            ],
            correctAnswer: 0
        },
        {
            id: 6,
            question: "What is a void function?",
            options: [
                "A function that doesn't take any parameters",
                "A function that doesn't return a value",
                "A function that has empty code",
                "A function that can't be called"
            ],
            correctAnswer: 1
        },
        {
            id: 7,
            question: "What is function overloading?",
            options: [
                "Creating functions with the same name but different parameters",
                "Making a function run too many times",
                "Creating functions that are too complex",
                "Using too many functions in a program"
            ],
            correctAnswer: 0
        },
        {
            id: 8,
            question: "What is recursion in programming?",
            options: [
                "A function that calls other functions",
                "A function that calls itself",
                "A function that runs in a loop",
                "A function that returns multiple values"
            ],
            correctAnswer: 1
        },
        {
            id: 9,
            question: "What is a lambda function?",
            options: [
                "A function with no name",
                "A function that only works with numbers",
                "A function that runs automatically",
                "A function that can't be modified"
            ],
            correctAnswer: 0
        },
        {
            id: 10,
            question: "What is the scope of a variable in a function?",
            options: [
                "The time it takes for the function to execute",
                "The part of the program where the variable can be accessed",
                "The size of the variable in memory",
                "The number of times the variable is used"
            ],
            correctAnswer: 1
        },
        {
            id: 11,
            question: "What is a local variable?",
            options: [
                "A variable declared outside all functions",
                "A variable declared inside a function",
                "A variable that can be accessed from anywhere",
                "A variable that never changes"
            ],
            correctAnswer: 1
        },
        {
            id: 12,
            question: "What is a global variable?",
            options: [
                "A variable declared inside a function",
                "A variable declared outside all functions",
                "A variable that is only used once",
                "A variable that changes frequently"
            ],
            correctAnswer: 1
        },
        {
            id: 13,
            question: "What is the purpose of the 'pass' keyword in Python?",
            options: [
                "To pass arguments to a function",
                "To skip the current iteration in a loop",
                "To create a placeholder for empty code blocks",
                "To pass control to another function"
            ],
            correctAnswer: 2
        },
        {
            id: 14,
            question: "What is a default parameter in a function?",
            options: [
                "A parameter that must be provided when calling the function",
                "A parameter that has a predefined value if no argument is provided",
                "A parameter that can only be used once",
                "A parameter that changes automatically"
            ],
            correctAnswer: 1
        },
        {
            id: 15,
            question: "What is a recursive function?",
            options: [
                "A function that calls other functions",
                "A function that calls itself",
                "A function that runs very fast",
                "A function that has multiple return statements"
            ],
            correctAnswer: 1
        },
        {
            id: 16,
            question: "What is the base case in recursion?",
            options: [
                "The first function called in the recursion",
                "The condition that stops the recursion",
                "The most complex part of the recursive function",
                "The return value of the recursive function"
            ],
            correctAnswer: 1
        },
        {
            id: 17,
            question: "What is function composition?",
            options: [
                "Creating functions with the same name",
                "Combining simple functions to build more complex ones",
                "Writing functions in a specific order",
                "Making functions more readable"
            ],
            correctAnswer: 1
        },
        {
            id: 18,
            question: "What is a higher-order function?",
            options: [
                "A function that takes other functions as arguments or returns them",
                "A function that is defined at the top of the file",
                "A function that has more parameters than usual",
                "A function that runs faster than others"
            ],
            correctAnswer: 0
        },
        {
            id: 19,
            question: "What is a pure function?",
            options: [
                "A function that has no parameters",
                "A function that always returns the same result for the same inputs and has no side effects",
                "A function that only uses local variables",
                "A function that is written in a single line"
            ],
            correctAnswer: 1
        },
        {
            id: 20,
            question: "What is a callback function?",
            options: [
                "A function that calls another function",
                "A function that is passed as an argument to another function",
                "A function that returns a value",
                "A function that is called at the end of a program"
            ],
            correctAnswer: 1
        }
    ];

    // Exam state
    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let questionStatus = new Array(questions.length).fill('not-seen'); // not-seen, unanswered, answered, reviewed
    let examTime = 30 * 60; // 30 minutes in seconds
    let timerInterval;
    
    // Mark first question as visited
    questionStatus[0] = 'unanswered';

    // DOM elements
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const questionGrid = document.getElementById('questionGrid');
    const timerElement = document.getElementById('timer');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    const prevButton = document.getElementById('prevButton');
    const clearButton = document.getElementById('clearButton');
    const skipButton = document.getElementById('skipButton');
    const nextButton = document.getElementById('nextButton');
    const firstConfirmModal = document.getElementById('firstConfirmModal');
    const secondConfirmModal = document.getElementById('secondConfirmModal');
    const successModal = document.getElementById('successModal');
    const cancelFirst = document.getElementById('cancelFirst');
    const leaveFirst = document.getElementById('leaveFirst');
    const cancelSecond = document.getElementById('cancelSecond');
    const leaveSecond = document.getElementById('leaveSecond');
    const closeSuccess = document.getElementById('closeSuccess');

    // Initialize the exam
    function initExam() {
        displayQuestion(currentQuestionIndex);
        createQuestionGrid();
        updateNavigationButtons();
        startTimer();
        
        // Set total questions count
        totalQuestionsElement.textContent = questions.length;
    }

    // Display the current question
    function displayQuestion(index) {
        const question = questions[index];
        
        // Update question text
        questionText.textContent = `Question ${index + 1}: ${question.question}`;
        
        // Clear options container
        optionsContainer.innerHTML = '';
        
        // Create option labels
        question.options.forEach((option, optionIndex) => {
            const isSelected = userAnswers[index] === optionIndex;
            const optionId = `option-${index}-${optionIndex}`;
            
            const optionHTML = `
                <label for="${optionId}" class="option-label flex items-center p-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark cursor-pointer ${isSelected ? 'selected' : ''}">
                    <input 
                        id="${optionId}" 
                        class="form-radio h-5 w-5 text-primary border-gray-300 dark:border-gray-600 dark:bg-slate-700 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark" 
                        name="answer" 
                        type="radio" 
                        value="${optionIndex}"
                        ${isSelected ? 'checked' : ''}
                    />
                    <span class="ml-4 text-base text-text-light-secondary dark:text-text-dark-secondary">${option}</span>
                </label>
            `;
            
            optionsContainer.innerHTML += optionHTML;
        });
        
        // Add event listeners to options
        const optionInputs = document.querySelectorAll('input[name="answer"]');
        optionInputs.forEach(input => {
            input.addEventListener('change', function() {
                userAnswers[currentQuestionIndex] = parseInt(this.value);
                questionStatus[currentQuestionIndex] = 'answered';
                updateQuestionGrid();
                updateNavigationButtons();
            });
        });
        
        // Update question status
        if (questionStatus[index] === 'not-seen') {
            questionStatus[index] = 'unanswered';
        }
        
        // Update question grid
        updateQuestionGrid();
    }

    // Create the question grid
    function createQuestionGrid() {
        questionGrid.innerHTML = '';
        
        questions.forEach((question, index) => {
            const button = document.createElement('button');
            button.className = `question-btn aspect-square rounded font-medium ${index === currentQuestionIndex ? 'current bg-primary text-white' : getQuestionButtonClass(index)}`;
            button.textContent = index + 1;
            
            button.addEventListener('click', () => {
                currentQuestionIndex = index;
                displayQuestion(currentQuestionIndex);
                updateNavigationButtons();
                updateQuestionGrid();
            });
            
            questionGrid.appendChild(button);
        });
    }

    // Update the question grid
    function updateQuestionGrid() {
        const buttons = questionGrid.querySelectorAll('.question-btn');
        
        buttons.forEach((button, index) => {
            button.className = `question-btn aspect-square rounded font-medium ${index === currentQuestionIndex ? 'current bg-primary text-white' : getQuestionButtonClass(index)}`;
        });
    }

    // Get CSS class for question button based on status
    function getQuestionButtonClass(index) {
        const status = questionStatus[index];
        
        switch(status) {
            case 'answered':
                return 'bg-green-500 text-white';
            case 'reviewed':
                return 'bg-blue-500 text-white';
            case 'unanswered':
                return 'bg-red-600 text-white';
            case 'not-seen':
            default:
                return 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500';
        }
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        // Previous button
        if (currentQuestionIndex === 0) {
            prevButton.disabled = true;
            prevButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            prevButton.disabled = false;
            prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        
        // Next button
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.textContent = 'Finish';
            nextButton.classList.add('bg-green-600', 'hover:bg-green-700');
            nextButton.classList.remove('bg-primary', 'hover:bg-sky-500');
        } else {
            nextButton.textContent = 'Next';
            nextButton.classList.remove('bg-green-600', 'hover:bg-green-700');
            nextButton.classList.add('bg-primary', 'hover:bg-sky-500');
        }
    }

    // Start the timer
    function startTimer() {
        // Check if we have a saved start time
        const savedStartTime = localStorage.getItem('examStartTime');
        let startTime;
        
        if (savedStartTime) {
            startTime = parseInt(savedStartTime);
        } else {
            startTime = new Date().getTime();
            localStorage.setItem('examStartTime', startTime);
        }
        
        // Calculate elapsed time
        const now = new Date().getTime();
        const elapsedSeconds = Math.floor((now - startTime) / 1000);
        let remainingTime = examTime - elapsedSeconds;
        
        // Update timer immediately
        updateTimerDisplay(remainingTime);
        
        // Set up timer interval
        timerInterval = setInterval(() => {
            remainingTime--;
            
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                autoSubmitExam();
                return;
            }
            
            updateTimerDisplay(remainingTime);
        }, 1000);
    }

    // Update timer display
    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        // Format as MM:SS
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        timerElement.textContent = formattedTime;
        
        // Add warning style when time is running out
        if (minutes < 5) {
            timerElement.classList.add('timer-warning', 'text-red-500');
        }
    }

    // Navigate to previous question
    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
            updateNavigationButtons();
        }
    }

    // Clear current question
    function clearQuestion() {
        userAnswers[currentQuestionIndex] = null;
        questionStatus[currentQuestionIndex] = 'unanswered';
        
        // Uncheck all options
        const optionInputs = document.querySelectorAll('input[name="answer"]');
        optionInputs.forEach(input => {
            input.checked = false;
        });
        
        // Remove selected class from labels
        const optionLabels = document.querySelectorAll('.option-label');
        optionLabels.forEach(label => {
            label.classList.remove('selected');
        });
        
        updateQuestionGrid();
        updateNavigationButtons();
    }

    // Skip current question
    function skipQuestion() {
        // Mark as reviewed if not answered
        if (userAnswers[currentQuestionIndex] === null) {
            questionStatus[currentQuestionIndex] = 'reviewed';
        }
        
        // Move to next question
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
            updateNavigationButtons();
        } else {
            // If this is the last question, show finish modal
            showFirstConfirmModal();
        }
    }

    // Navigate to next question
    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
            updateNavigationButtons();
        } else {
            // If this is the last question, show finish modal
            showFirstConfirmModal();
        }
    }

    // Show first confirmation modal
    function showFirstConfirmModal() {
        firstConfirmModal.classList.remove('hidden');
    }

    // Show second confirmation modal
    function showSecondConfirmModal() {
        firstConfirmModal.classList.add('hidden');
        secondConfirmModal.classList.remove('hidden');
    }

    // Show success modal
    function showSuccessModal() {
        secondConfirmModal.classList.add('hidden');
        successModal.classList.remove('hidden');
    }

    // Auto submit when time is up
    function autoSubmitExam() {
        submitExam();
    }

    // Submit the exam
    function submitExam() {
        // Clear timer
        clearInterval(timerInterval);
        
        // Calculate score
        let score = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                score++;
            }
        });
        
        // Store results in localStorage
        localStorage.setItem('examResults', JSON.stringify({
            score: score,
            totalQuestions: questions.length,
            userAnswers: userAnswers,
            questions: questions
        }));
        
        // Clear exam start time
        localStorage.removeItem('examStartTime');
        
        // Show success modal
        showSuccessModal();
    }

    // Event listeners
    prevButton.addEventListener('click', prevQuestion);
    clearButton.addEventListener('click', clearQuestion);
    skipButton.addEventListener('click', skipQuestion);
    nextButton.addEventListener('click', nextQuestion);
    
    // Modal event listeners
    cancelFirst.addEventListener('click', () => {
        firstConfirmModal.classList.add('hidden');
    });
    
    leaveFirst.addEventListener('click', showSecondConfirmModal);
    
    cancelSecond.addEventListener('click', () => {
        secondConfirmModal.classList.add('hidden');
    });
    
    leaveSecond.addEventListener('click', submitExam);
    
    closeSuccess.addEventListener('click', () => {
        successModal.classList.add('hidden');
        // Redirect to home or results page
        window.location.href = 'instruction.html';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === firstConfirmModal) {
            firstConfirmModal.classList.add('hidden');
        }
        if (event.target === secondConfirmModal) {
            secondConfirmModal.classList.add('hidden');
        }
        if (event.target === successModal) {
            successModal.classList.add('hidden');
        }
    });

    // Initialize the exam
    initExam();
});