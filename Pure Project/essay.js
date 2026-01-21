document.addEventListener('DOMContentLoaded', function() {
    // Essay questions data
    const questions = [
        {
            id: 1,
            question: "Explain the concept of a function in programming. What are its main purposes and benefits?",
            minWords: 50,
            keyConcepts: ["code reusability", "modularity", "abstraction", "organization"],
            modelAnswer: "A function in programming is a reusable block of code that performs a specific task. Its main purposes include promoting code reusability (avoiding duplication), improving modularity (breaking complex problems into smaller parts), providing abstraction (hiding implementation details), and organizing code logically. Benefits include easier debugging, better maintainability, and improved collaboration among developers."
        },
        {
            id: 2,
            question: "Describe the difference between parameters and arguments in function definitions and calls.",
            minWords: 40,
            keyConcepts: ["parameters", "arguments", "function definition", "function call"],
            modelAnswer: "Parameters are variables defined in a function's declaration that act as placeholders for the values the function will receive. Arguments are the actual values passed to the function when it is called. Parameters define what a function expects, while arguments provide the concrete data that fulfills those expectations during execution."
        },
        {
            id: 3,
            question: "What is function scope and how does it affect variable accessibility in different parts of a program?",
            minWords: 60,
            keyConcepts: ["scope", "local variables", "global variables", "accessibility"],
            modelAnswer: "Function scope determines where variables can be accessed within a program. Variables declared inside a function have local scope and are only accessible within that function. Variables declared outside functions have global scope and can be accessed from anywhere in the program. This affects variable accessibility by preventing naming conflicts, controlling data access, and managing memory usage. Understanding scope is crucial for avoiding bugs and writing maintainable code."
        },
        {
            id: 4,
            question: "Explain the concept of recursion in programming. Provide an example of when you would use a recursive function.",
            minWords: 70,
            keyConcepts: ["recursion", "base case", "recursive case", "stack"],
            modelAnswer: "Recursion is a programming technique where a function calls itself to solve a smaller instance of the same problem. It requires a base case (the condition that stops the recursion) and a recursive case (where the function calls itself). Recursion is useful for problems that can be broken down into similar subproblems, such as calculating factorials, traversing tree structures, or solving the Tower of Hanoi. For example, calculating factorial: n! = n * (n-1)! with base case 0! = 1."
        },
        {
            id: 5,
            question: "Discuss the importance of return values in functions and how they facilitate data flow between different parts of a program.",
            minWords: 55,
            keyConcepts: ["return values", "data flow", "function output", "program communication"],
            modelAnswer: "Return values are crucial in functions as they allow the function to send data back to the calling code. This facilitates data flow between different program parts by enabling functions to process information and provide results that can be used elsewhere. Return values make functions more versatile and reusable, as they can be integrated into larger expressions, assigned to variables, or passed to other functions. Without return values, functions would be limited to performing actions without communicating their outcomes."
        }
    ];

    // Quiz state
    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill('');
    let scores = new Array(questions.length).fill(0);

    // DOM elements
    const quizContainer = document.getElementById('quizContainer');
    const progressBar = document.getElementById('progressBar');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const progressPercent = document.getElementById('progressPercent');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const modalClose = document.getElementById('modalClose');
    const errorModalClose = document.getElementById('errorModalClose');
    const suggestions = document.getElementById('suggestions');

    // Initialize the quiz
    function initQuiz() {
        displayQuestion(currentQuestionIndex);
        updateProgress();
        updateNavigationButtons();
    }

    // Display the current question
    function displayQuestion(index) {
        const question = questions[index];
        
        // Create question HTML
        const questionHTML = `
            <div class="question-card">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Question ${index + 1}</h2>
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
                    >${userAnswers[index]}</textarea>
                    <div class="flex justify-between mt-2 text-sm">
                        <span class="text-gray-500 dark:text-gray-400">Minimum ${question.minWords} words required</span>
                        <span id="wordCount" class="char-counter">0 words</span>
                    </div>
                </div>
                
                <div class="word-count-highlight hidden">
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        <span class="font-semibold">Tip:</span> Make sure your answer covers all key aspects of the question.
                    </p>
                </div>
            </div>
        `;
        
        quizContainer.innerHTML = questionHTML;
        
        // Add event listeners
        const textarea = document.getElementById('essayAnswer');
        const wordCount = document.getElementById('wordCount');
        
        textarea.addEventListener('input', function() {
            const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
            const wordCountValue = words.length;
            
            // Update word count display
            wordCount.textContent = `${wordCountValue} words`;
            
            // Update color based on word count
            if (wordCountValue < question.minWords) {
                wordCount.classList.add('error');
                wordCount.classList.remove('warning');
            } else if (wordCountValue < question.minWords + 10) {
                wordCount.classList.remove('error');
                wordCount.classList.add('warning');
            } else {
                wordCount.classList.remove('error', 'warning');
            }
            
            // Store the answer
            userAnswers[index] = this.value;
            
            // Update navigation buttons
            updateNavigationButtons();
        });
        
        // Initialize word count
        const initialWords = textarea.value.trim().split(/\s+/).filter(word => word.length > 0);
        wordCount.textContent = `${initialWords.length} words`;
        
        if (initialWords.length < question.minWords) {
            wordCount.classList.add('error');
        }
        
        // Show/hide tip based on word count
        if (initialWords.length > question.minWords / 2) {
            document.querySelector('.word-count-highlight').classList.remove('hidden');
        }
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
        const currentAnswer = userAnswers[currentQuestionIndex] || '';
        const wordCount = currentAnswer.trim().split(/\s+/).filter(word => word.length > 0).length;
        const minWords = questions[currentQuestionIndex].minWords;
        
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.innerHTML = '<span>Submit Quiz</span><span class="material-icons">check</span>';
        } else {
            nextButton.innerHTML = '<span>Next Question</span><span class="material-icons">arrow_forward</span>';
        }
        
        // Enable/disable next button based on word count
        if (wordCount >= minWords) {
            nextButton.disabled = false;
            nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            nextButton.disabled = true;
            nextButton.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    // Evaluate the current answer
    function evaluateAnswer() {
        const currentAnswer = userAnswers[currentQuestionIndex].toLowerCase();
        const question = questions[currentQuestionIndex];
        let score = 0;
        
        // Check for key concepts
        question.keyConcepts.forEach(concept => {
            if (currentAnswer.includes(concept.toLowerCase())) {
                score += 1;
            }
        });
        
        // Calculate percentage of key concepts covered
        const conceptCoverage = score / question.keyConcepts.length;
        
        // Check word count
        const wordCount = currentAnswer.trim().split(/\s+/).filter(word => word.length > 0).length;
        const wordCountRatio = Math.min(wordCount / question.minWords, 1);
        
        // Combined score (60% concepts, 40% length)
        const finalScore = (conceptCoverage * 0.6) + (wordCountRatio * 0.4);
        scores[currentQuestionIndex] = finalScore;
        
        return finalScore >= 0.7; // 70% threshold for passing
    }

    // Show success modal
    function showSuccessModal() {
        successModal.classList.remove('hidden');
    }

    // Show error modal with suggestions
    function showErrorModal() {
        const question = questions[currentQuestionIndex];
        let suggestionsHTML = '<p class="font-semibold mb-2">Try to include these concepts:</p><ul class="list-disc pl-5 space-y-1">';
        
        question.keyConcepts.forEach(concept => {
            suggestionsHTML += `<li>${concept}</li>`;
        });
        
        suggestionsHTML += '</ul>';
        suggestions.innerHTML = suggestionsHTML;
        
        errorModal.classList.remove('hidden');
    }

    // Navigate to next question
    function nextQuestion() {
        // Evaluate current answer
        const isCorrect = evaluateAnswer();
        
        if (isCorrect) {
            showSuccessModal();
        } else {
            showErrorModal();
            return; // Don't proceed until user acknowledges
        }
        
        // If this is the last question, submit the quiz
        if (currentQuestionIndex === questions.length - 1) {
            submitQuiz();
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
        // Store results in localStorage
        localStorage.setItem('essayResults', JSON.stringify({
            scores: scores,
            userAnswers: userAnswers,
            questions: questions
        }));
        
        // Redirect to results page
        window.location.href = 'essay_result.html';
    }

    // Event listeners
    nextButton.addEventListener('click', nextQuestion);
    prevButton.addEventListener('click', prevQuestion);
    
    modalClose.addEventListener('click', function() {
        successModal.classList.add('hidden');
        
        // If this is the last question, submit after closing modal
        if (currentQuestionIndex === questions.length - 1) {
            submitQuiz();
        }
    });
    
    errorModalClose.addEventListener('click', function() {
        errorModal.classList.add('hidden');
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            successModal.classList.add('hidden');
        }
        if (event.target === errorModal) {
            errorModal.classList.add('hidden');
        }
    });

    // Initialize the quiz
    initQuiz();
});