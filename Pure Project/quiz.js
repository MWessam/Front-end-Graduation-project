document.addEventListener('DOMContentLoaded', function() {
    // Quiz questions data
    const questions = [
        {
            question: "What is the primary purpose of a function in programming?",
            options: [
                "To encapsulate a piece of code for reuse",
                "To store data and variables",
                "To style the user interface",
                "To slow down the program execution"
            ],
            correctAnswer: 0,
            explanation: "Functions are key to writing modular, reusable, and maintainable code."
        },
        {
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
            question: "What is a parameter in a function?",
            options: [
                "A value returned by the function",
                "A variable that holds the function code",
                "A value passed into the function when it is called",
                "The name of the function"
            ],
            correctAnswer: 2,
            explanation: "Parameters are variables defined in the function definition that receive values when the function is called."
        },
        {
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
        {
            question: "What is the difference between parameters and arguments?",
            options: [
                "Parameters are used in function definition, arguments are values passed when calling",
                "Arguments are used in function definition, parameters are values passed when calling",
                "They are the same thing",
                "Parameters are for math functions, arguments are for other functions"
            ],
            correctAnswer: 0,
            explanation: "Parameters are the variables in the function definition, while arguments are the actual values passed to the function."
        },
        {
            question: "What is a void function?",
            options: [
                "A function that doesn't take any parameters",
                "A function that doesn't return a value",
                "A function that has empty code",
                "A function that can't be called"
            ],
            correctAnswer: 1,
            explanation: "A void function is one that doesn't return any value."
        },
        {
            question: "What is function overloading?",
            options: [
                "Creating functions with the same name but different parameters",
                "Making a function run too many times",
                "Creating functions that are too complex",
                "Using too many functions in a program"
            ],
            correctAnswer: 0,
            explanation: "Function overloading allows multiple functions with the same name but different parameters."
        },
        {
            question: "What is recursion in programming?",
            options: [
                "A function that calls other functions",
                "A function that calls itself",
                "A function that runs in a loop",
                "A function that returns multiple values"
            ],
            correctAnswer: 1,
            explanation: "Recursion is when a function calls itself to solve a smaller version of the problem."
        },
        {
            question: "What is a lambda function?",
            options: [
                "A function with no name",
                "A function that only works with numbers",
                "A function that runs automatically",
                "A function that can't be modified"
            ],
            correctAnswer: 0,
            explanation: "A lambda function is an anonymous function defined without a name."
        },
        {
            question: "What is the scope of a variable in a function?",
            options: [
                "The time it takes for the function to execute",
                "The part of the program where the variable can be accessed",
                "The size of the variable in memory",
                "The number of times the variable is used"
            ],
            correctAnswer: 1,
            explanation: "Scope determines where in the program a variable can be accessed."
        }
    ];

    // Quiz state
    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);
    let score = 0;

    // DOM elements
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const progressBar = document.getElementById('progressBar');
    const feedbackContainer = document.getElementById('feedbackContainer');
    const correctFeedback = document.getElementById('correctFeedback');
    const incorrectFeedback = document.getElementById('incorrectFeedback');
    const correctMessage = document.getElementById('correctMessage');
    const incorrectMessage = document.getElementById('incorrectMessage');
    const correctAnswerText = document.getElementById('correctAnswerText');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    // Initialize the quiz
    function initQuiz() {
        displayQuestion(currentQuestionIndex);
        updateProgressBar();
        updateNavigationButtons();
    }

    // Display the current question
    function displayQuestion(index) {
        const question = questions[index];
        
        // Update question text
        questionText.textContent = `Question ${index + 1}: ${question.question}`;
        
        // Update question counter
        currentQuestionElement.textContent = index + 1;
        
        // Clear options container
        optionsContainer.innerHTML = '';
        
        // Create option buttons
        question.options.forEach((option, optionIndex) => {
            const button = document.createElement('button');
            button.className = 'option-button w-full text-left p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors';
            button.textContent = option;
            
            // If user has already answered this question, show the result
            if (userAnswers[index] !== null) {
                if (optionIndex === question.correctAnswer) {
                    button.classList.add('correct');
                } else if (optionIndex === userAnswers[index] && userAnswers[index] !== question.correctAnswer) {
                    button.classList.add('incorrect');
                }
                button.disabled = true;
            } else {
                button.addEventListener('click', () => selectAnswer(optionIndex));
            }
            
            optionsContainer.appendChild(button);
        });
        
        // Show/hide feedback based on whether user has answered
        if (userAnswers[index] !== null) {
            showFeedback(index);
        } else {
            feedbackContainer.classList.add('hidden');
        }
    }

    // Handle answer selection
    function selectAnswer(selectedIndex) {
        const question = questions[currentQuestionIndex];
        userAnswers[currentQuestionIndex] = selectedIndex;
        
        // Check if answer is correct
        if (selectedIndex === question.correctAnswer) {
            score++;
        }
        
        // Show feedback
        showFeedback(currentQuestionIndex);
        
        // Disable all option buttons
        const optionButtons = optionsContainer.querySelectorAll('.option-button');
        optionButtons.forEach((button, index) => {
            button.disabled = true;
            if (index === question.correctAnswer) {
                button.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correctAnswer) {
                button.classList.add('incorrect');
            }
        });
        
        // Update navigation buttons
        updateNavigationButtons();
    }

    // Show feedback for the current question
    function showFeedback(index) {
        const question = questions[index];
        const userAnswer = userAnswers[index];
        
        if (userAnswer === question.correctAnswer) {
            correctMessage.textContent = question.explanation;
            correctFeedback.classList.remove('hidden');
            incorrectFeedback.classList.add('hidden');
        } else {
            correctAnswerText.textContent = question.options[question.correctAnswer];
            incorrectFeedback.classList.remove('hidden');
            correctFeedback.classList.add('hidden');
        }
        
        feedbackContainer.classList.remove('hidden');
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        // Show/hide previous button
        if (currentQuestionIndex > 0) {
            prevButton.classList.remove('hidden');
        } else {
            prevButton.classList.add('hidden');
        }
        
        // Update next button text
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.innerHTML = '<span>Submit Quiz</span><span class="material-icons">check</span>';
        } else {
            nextButton.innerHTML = '<span>Next Question</span><span class="material-icons">arrow_forward</span>';
        }
        
        // Enable/disable next button based on whether current question is answered
        if (userAnswers[currentQuestionIndex] === null) {
            nextButton.disabled = true;
            nextButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            nextButton.disabled = false;
            nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    // Navigate to next question
    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
            updateProgressBar();
            updateNavigationButtons();
        } else {
            // Submit quiz and go to result page
            submitQuiz();
        }
    }

    // Navigate to previous question
    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
            updateProgressBar();
            updateNavigationButtons();
        }
    }

    // Submit quiz and go to result page
    function submitQuiz() {
        // Store results in localStorage to pass to result page
        localStorage.setItem('quizResults', JSON.stringify({
            score: score,
            totalQuestions: questions.length,
            userAnswers: userAnswers,
            questions: questions
        }));
        
        // Redirect to result page
        window.location.href = 'result.html';
    }

    // Event listeners
    nextButton.addEventListener('click', nextQuestion);
    prevButton.addEventListener('click', prevQuestion);

    // Initialize the quiz
    initQuiz();
});