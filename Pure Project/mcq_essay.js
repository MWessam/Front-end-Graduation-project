document.addEventListener('DOMContentLoaded', function() {
    // Mixed questions data (3 MCQ + 2 Essay)
    const questions = [
        // MCQ Questions
        {
            id: 1,
            type: "mcq",
            question: "What is the primary purpose of a function in programming?",
            options: [
                "To store data and variables",
                "To encapsulate a piece of code for reuse",
                "To style the user interface",
                "To slow down the program execution"
            ],
            correctAnswer: 1,
            explanation: "Functions are key to writing modular, reusable, and maintainable code."
        },
        {
            id: 2,
            type: "mcq",
            question: "Which keyword is used to define a function in Python?",
            options: [
                "function",
                "def",
                "define",
                "func"
            ],
            correctAnswer: 1,
            explanation: "In Python, the 'def' keyword is used to define a function."
        },
        {
            id: 3,
            type: "mcq",
            question: "What does the 'return' statement do in a function?",
            options: [
                "Stops the function execution",
                "Prints a value to the console",
                "Sends a value back to the calling code",
                "Defines a new variable"
            ],
            correctAnswer: 2,
            explanation: "The 'return' statement sends a value back to the code that called the function."
        },
        // Essay Questions
        {
            id: 4,
            type: "essay",
            question: "Explain the concept of function scope and how it affects variable accessibility in different parts of a program.",
            minWords: 60,
            keyConcepts: ["scope", "local variables", "global variables", "accessibility"],
            modelAnswer: "Function scope determines where variables can be accessed within a program. Variables declared inside a function have local scope and are only accessible within that function. Variables declared outside functions have global scope and can be accessed from anywhere in the program. This affects variable accessibility by preventing naming conflicts, controlling data access, and managing memory usage. Understanding scope is crucial for avoiding bugs and writing maintainable code."
        },
        {
            id: 5,
            type: "essay",
            question: "Discuss the importance of return values in functions and how they facilitate data flow between different parts of a program.",
            minWords: 55,
            keyConcepts: ["return values", "data flow", "function output", "program communication"],
            modelAnswer: "Return values are crucial in functions as they allow the function to send data back to the calling code. This facilitates data flow between different program parts by enabling functions to process information and provide results that can be used elsewhere. Return values make functions more versatile and reusable, as they can be integrated into larger expressions, assigned to variables, or passed to other functions. Without return values, functions would be limited to performing actions without communicating their outcomes."
        }
    ];

    // Quiz state
    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let scores = new Array(questions.length).fill(0);

    // DOM elements
    const quizContainer = document.getElementById('quizContainer');
    const progressBar = document.getElementById('progressBar');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const progressPercent = document.getElementById('progressPercent');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const submitModal = document.getElementById('submitModal');
    const cancelSubmit = document.getElementById('cancelSubmit');
    const confirmSubmit = document.getElementById('confirmSubmit');

    // Initialize the quiz
    function initQuiz() {
        displayQuestion(currentQuestionIndex);
        updateProgress();
        updateNavigationButtons();
    }

    // Display the current question
    function displayQuestion(index) {
        const question = questions[index];
        
        let questionHTML = '';
        
        if (question.type === "mcq") {
            questionHTML = createMCQHTML(question, index);
        } else if (question.type === "essay") {
            questionHTML = createEssayHTML(question, index);
        }
        
        quizContainer.innerHTML = questionHTML;
        
        // Add event listeners based on question type
        if (question.type === "mcq") {
            addMCQEventListeners(index);
        } else if (question.type === "essay") {
            addEssayEventListeners(index);
        }
    }

    // Create HTML for MCQ question
    function createMCQHTML(question, index) {
        let optionsHTML = '';
        
        question.options.forEach((option, optionIndex) => {
            const isSelected = userAnswers[index] === optionIndex;
            const optionClass = isSelected ? 'mcq-option selected' : 'mcq-option';
            
            optionsHTML += `
                <div class="${optionClass} p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 mb-3">
                    <div class="flex items-center">
                        <div class="w-6 h-6 rounded-full border-2 border-gray-400 dark:border-gray-500 flex items-center justify-center mr-3">
                            ${isSelected ? '<div class="w-3 h-3 rounded-full bg-primary"></div>' : ''}
                        </div>
                        <span class="text-gray-700 dark:text-gray-300">${option}</span>
                    </div>
                </div>
            `;
        });
        
        return `
            <div class="question-card">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Question ${index + 1}</h2>
                    <span class="question-type-indicator mcq-indicator">MCQ</span>
                </div>
                <p class="text-gray-700 dark:text-gray-300 mb-6 text-lg">${question.question}</p>
                
                <div class="space-y-3">
                    ${optionsHTML}
                </div>
            </div>
        `;
    }

    // Create HTML for Essay question
    function createEssayHTML(question, index) {
        const currentAnswer = userAnswers[index] || '';
        const wordCount = currentAnswer.trim().split(/\s+/).filter(word => word.length > 0).length;
        const wordCountClass = wordCount < question.minWords ? 'error' : (wordCount < question.minWords + 10 ? 'warning' : '');
        
        return `
            <div class="question-card">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Question ${index + 1}</h2>
                    <span class="question-type-indicator essay-indicator">Essay</span>
                </div>
                <p class="text-gray-700 dark:text-gray-300 mb-6 text-lg">${question.question}</p>
                
                <div class="mb-4">
                    <label for="essayAnswer" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Answer (minimum ${question.minWords} words)
                    </label>
                    <textarea 
                        id="essayAnswer" 
                        class="essay-textarea w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Type your answer here..."
                        rows="6"
                    >${currentAnswer}</textarea>
                    <div class="flex justify-between mt-2 text-sm">
                        <span class="text-gray-500 dark:text-gray-400">Minimum ${question.minWords} words required</span>
                        <span id="wordCount" class="char-counter ${wordCountClass}">${wordCount} words</span>
                    </div>
                </div>
                
                <div class="word-count-highlight ${wordCount > question.minWords / 2 ? '' : 'hidden'}">
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        <span class="font-semibold">Tip:</span> Make sure your answer covers all key aspects of the question.
                    </p>
                </div>
            </div>
        `;
    }

    // Add event listeners for MCQ questions
    function addMCQEventListeners(index) {
        const options = document.querySelectorAll('.mcq-option');
        
        options.forEach((option, optionIndex) => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                options.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                option.classList.add('selected');
                
                // Store the answer
                userAnswers[index] = optionIndex;
                
                // Update navigation buttons
                updateNavigationButtons();
            });
        });
    }

    // Add event listeners for Essay questions
    function addEssayEventListeners(index) {
        const textarea = document.getElementById('essayAnswer');
        const wordCount = document.getElementById('wordCount');
        
        textarea.addEventListener('input', function() {
            const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
            const wordCountValue = words.length;
            
            // Update word count display
            wordCount.textContent = `${wordCountValue} words`;
            
            // Update color based on word count
            if (wordCountValue < questions[index].minWords) {
                wordCount.classList.add('error');
                wordCount.classList.remove('warning');
            } else if (wordCountValue < questions[index].minWords + 10) {
                wordCount.classList.remove('error');
                wordCount.classList.add('warning');
            } else {
                wordCount.classList.remove('error', 'warning');
            }
            
            // Store the answer
            userAnswers[index] = this.value;
            
            // Show/hide tip based on word count
            const tipElement = document.querySelector('.word-count-highlight');
            if (wordCountValue > questions[index].minWords / 2) {
                tipElement.classList.remove('hidden');
            } else {
                tipElement.classList.add('hidden');
            }
            
            // Update navigation buttons
            updateNavigationButtons();
        });
    }

    // Update progress bar and indicators
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        progressPercent.textContent = `${Math.round(progress)}% Complete`;
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        // Show/hide previous button
        if (currentQuestionIndex > 0) {
            prevButton.classList.remove('opacity-0');
        } else {
            prevButton.classList.add('opacity-0');
        }
        
        // Update next button text and state
        const currentQuestion = questions[currentQuestionIndex];
        
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.innerHTML = '<span>Submit Quiz</span><span class="material-icons">check</span>';
        } else {
            nextButton.innerHTML = '<span>Next Question</span><span class="material-icons">arrow_forward</span>';
        }
        
        // Enable/disable next button based on answer status
        let canProceed = false;
        
        if (currentQuestion.type === "mcq") {
            canProceed = userAnswers[currentQuestionIndex] !== null;
        } else if (currentQuestion.type === "essay") {
            const answer = userAnswers[currentQuestionIndex] || '';
            const wordCount = answer.trim().split(/\s+/).filter(word => word.length > 0).length;
            canProceed = wordCount >= currentQuestion.minWords;
        }
        
        if (canProceed) {
            nextButton.disabled = false;
            nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            nextButton.disabled = true;
            nextButton.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    // Evaluate MCQ answer
    function evaluateMCQ(questionIndex) {
        const question = questions[questionIndex];
        const userAnswer = userAnswers[questionIndex];
        
        if (userAnswer === question.correctAnswer) {
            scores[questionIndex] = 1;
            return true;
        } else {
            scores[questionIndex] = 0;
            return false;
        }
    }

    // Evaluate Essay answer
    function evaluateEssay(questionIndex) {
        const question = questions[questionIndex];
        const userAnswer = (userAnswers[questionIndex] || '').toLowerCase();
        let score = 0;
        
        // Check for key concepts
        question.keyConcepts.forEach(concept => {
            if (userAnswer.includes(concept.toLowerCase())) {
                score += 1;
            }
        });
        
        // Calculate percentage of key concepts covered
        const conceptCoverage = score / question.keyConcepts.length;
        
        // Check word count
        const wordCount = userAnswer.trim().split(/\s+/).filter(word => word.length > 0).length;
        const wordCountRatio = Math.min(wordCount / question.minWords, 1);
        
        // Combined score (60% concepts, 40% length)
        const finalScore = (conceptCoverage * 0.6) + (wordCountRatio * 0.4);
        scores[questionIndex] = finalScore;
        
        return finalScore >= 0.7; // 70% threshold for passing
    }

    // Navigate to next question
    function nextQuestion() {
        // If this is the last question, show submit modal
        if (currentQuestionIndex === questions.length - 1) {
            submitModal.classList.remove('hidden');
            return;
        }
        
        // Move to next question
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
        updateProgress();
        updateNavigationButtons();
    }

    // Navigate to previous question
    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
            updateProgress();
            updateNavigationButtons();
        }
    }

    // Submit the quiz and go to results
    function submitQuiz() {
        // Evaluate all answers
        questions.forEach((question, index) => {
            if (question.type === "mcq") {
                evaluateMCQ(index);
            } else if (question.type === "essay") {
                evaluateEssay(index);
            }
        });
        
        // Store results in localStorage
        localStorage.setItem('mcqEssayResults', JSON.stringify({
            scores: scores,
            userAnswers: userAnswers,
            questions: questions
        }));
        
        // Redirect to results page
        window.location.href = 'result_mcq_essay.html';
    }

    // Event listeners
    nextButton.addEventListener('click', nextQuestion);
    prevButton.addEventListener('click', prevQuestion);
    
    cancelSubmit.addEventListener('click', function() {
        submitModal.classList.add('hidden');
    });
    
    confirmSubmit.addEventListener('click', submitQuiz);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === submitModal) {
            submitModal.classList.add('hidden');
        }
    });

    // Initialize the quiz
    initQuiz();
});