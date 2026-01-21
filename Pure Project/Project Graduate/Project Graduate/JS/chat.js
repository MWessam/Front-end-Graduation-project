// Chat Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get student ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = parseInt(urlParams.get('student')) || 1;
    
    // Sample chat data for each student
    const chatData = {
        1: { // Ahmed Mohamed
            name: "Ahmed Mohamed",
            email: "ahmed.mohamed@example.com",
            studentId: "STU-2025-001",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZt6iRSZ322jTn4WI260L9yp9Qz6djTRCvvHqKmL3Tov3FY9lYmPaCV3A407Ck5GcoZ26oBXngEK8XB8LMSwo2sio05E385b0z-1CNyU0HLJEQU7LpvVJR-HEKFEI8sz-qcTIjqBw4U2vZULMWMrUCgSfarJM-7ySeBILeO4Hb2hkGrZbYrY2MBcMuC14Ji1SGmA2yHhnaui34q8MG8vD6lceFS7_cLAvPcS3JpW1mKxBznm8sMFGLXQZt2fQG5O031ZKiII4IADw",
            online: true,
            messages: [
                { id: 1, text: "Good morning sir, I have a question about today's assignment.", sender: "student", time: "09:30 AM" },
                { id: 2, text: "Good morning Ahmed! What's your question?", sender: "teacher", time: "09:31 AM" },
                { id: 3, text: "I'm not sure how to solve problem number 3 in the math homework.", sender: "student", time: "09:32 AM" },
                { id: 4, text: "Let me explain: You need to use the quadratic formula for that problem.", sender: "teacher", time: "09:33 AM" }
            ]
        },
        2: { // Ahmed Sayed
            name: "Ahmed Sayed",
            email: "ahmed.sayed@example.com",
            studentId: "STU-2025-002",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuABwiiI5cTk67r1SNWC10q_iNf7-zBlh0FAAkzSZQzlaej0TvJ5i7es5n8sK8erS87iclAfVZjOEI7oPSUFKqkyfuKSz6fnHatyh0Fa1_sUBUbXBExLE4Bu_BV4QUlZHDKU3mJreuXJ6L-8Z3DXxQtOIWm2EMkbrAOvnMpxafRhcRuAK1fijfxog84jYVOGjCaNzdCn209Nsg4P71Dqh-z0LKHa8VuOk4s-rX1ivnptwbVGUsgAW60n-M6P98GHm849SEcIGlVOb_s",
            online: false,
            messages: [
                { id: 1, text: "Hello sir, when is the project deadline?", sender: "student", time: "Yesterday, 2:30 PM" },
                { id: 2, text: "The deadline is next Friday at 11:59 PM.", sender: "teacher", time: "Yesterday, 2:32 PM" }
            ]
        },
        3: { // Ali Tarek
            name: "Ali Tarek",
            email: "ali.tarek@example.com",
            studentId: "STU-2025-003",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFJvpwdGId9bo8G7JSaS0LZJKMSDcD_ejbvIRlV2AuB6Rc00ildAAx-0J9_chrjEuPgj4Svv4wpXdMg-8H3m0-baHyU-MNkRG-iTmYmoqe_TpoPkfVzryhj1KhekXf-b1DoBl7yJ9556JZrutvth_1JzNbU0BQZuwciUyd0HxepeRSvyVQPGyrJ_In6lcQ7pQSbxjQWUCsV5EDIv6gj4RAICKLYgv_xkaZUQzblgb9Xy3sCvYGSoj6XiUvzyxI-ds-l2YVySlYLvw",
            online: true,
            messages: []
        },
        4: { // Fatma Hassan
            name: "Fatma Hassan",
            email: "fatma.hassan@example.com",
            studentId: "STU-2025-004",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDakJXfhkidnqELGf7FMOKpFnS9DdNYqZpbOmxNxQfqoY3kc9BpFNkk5fWxRUASCL6XTxeKlR_kaAeQWiGttIwtAiZyy7-vd0Ccb_o4FFb_OP5gyzJeepNYAH140PGRPy9MWdfmtmsB2wSt0g3evrT6bvmrAYvnd1fJEv4GRzqooswWGRcuKq_Uexkm1yxlwF4PMt0pR2Fu11EMgV_RDioxU-3HKSXz5TXsYwSWnpu6ATjUNpnRURPgq1ovTkS0FfqXHJ8mf3GeFYE",
            online: false,
            messages: [
                { id: 1, text: "Sir, I won't be able to attend class tomorrow.", sender: "student", time: "2 days ago" },
                { id: 2, text: "Noted. Please check the recorded lecture afterwards.", sender: "teacher", time: "2 days ago" }
            ]
        },
        5: { // Huda Khattab
            name: "Huda Khattab",
            email: "huda.khattab@example.com",
            studentId: "STU-2025-005",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuGsS8SLBLCF52hQDp9Ryvqp0oul-Jsa5CJF_wEgGVAJL1LdWCbW4J3XQUelUsQPwBkn2oi0EuP2-XVt3DIr6HRj7nR0uJu7we0EMKQukRq_WpxuoE_prZCbv3g1QwYIu7RztH7XQtMXkcgQkG8nUKuZveaP8-HFgvgr1iD4KppLKnDMtn8eLkRtoSPabn7YF4VQ_hVEdyym-GoUjtkEYIQNXNgIPGK9KIiMa24yHv5Wz9trSFEU6tug70ySfmBAI_FnsDA_w5_84",
            online: true,
            messages: []
        },
        6: { // Mariam Noor - EXAMPLE WITH CONVERSATION
            name: "Mariam Noor",
            email: "mariam.noor@example.com",
            studentId: "STU-2025-006",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFLBoabenFOWPqgh95CLDGlhnXBiyM3QCXE6yr1EmRdgvvqKtoagWt6bcYbwiRw6ag4eGTNUEp5rV8-c3YKjqpB7BaDUmzNtnxF4VZuI1mJZqX6rtuHVIypnuXQZgiKmJO2KQL-10ie0jtB18qydJjdd0cdFXBZ8FOdq9zGzAizf5M9k-KwiMHOhLzcJDosgqePtk7FOqA-E13TeI1hwLbb6uIf3IGr5e6lgCboPoxPeXIumiISaR-3uLF6pEvbbczuuKMSx5WGFQ",
            online: true,
            messages: [
                { id: 1, text: "Good morning Mr. Ahmed, I wanted to ask about the Programming assignment. I'm not sure how to solve Question 3.", sender: "student", time: "09:41 AM" },
                { id: 2, text: "Good morning! Sure, Question 3 is about writing a simple loop. I'll send you an example below.", sender: "teacher", time: "09:42 AM" },
                { id: 3, text: "Thank you sir! Does it need to include a function?", sender: "student", time: "09:43 AM" },
                { id: 4, text: "Yes, try to write it inside a function so your code looks clean and organized.", sender: "teacher", time: "09:44 AM" },
                { id: 5, text: "Okay, I'll try it and send it to you.", sender: "student", time: "09:45 AM" }
            ]
        },
        7: { // Mohamed Ali
            name: "Mohamed Ali",
            email: "mohamed.ali@example.com",
            studentId: "STU-2025-007",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT9hcAphtOXY_EVpZe0N3Am2Ofzfo-VR2VioTOm5KwtzyVlXB0k_vaMIXLUK9kfD0MfveTeWKDo2vvoEB4ttgMpSxNTGHPKo07gs42j4XuYbeHBIcU3CxTPsnypPilvVhERWXJH9UpPznO4fO9eICJfYjDHWBozalIcqAtIpQ48sq1NBItXjXXQxAeGN_edkxmLKtPe9YJbfs0IazGjtjJHCFtGX7D-50eQ8JgCL_vEiMHblWKn-j4q0wbkpXuoGZPDZ5wiQkvQzE",
            online: false,
            messages: []
        },
        8: { // Mohamed Ibrahim
            name: "Mohamed Ibrahim",
            email: "mohamed.ibrahim@example.com",
            studentId: "STU-2025-008",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHMzQoHiZiIIWItk8hIz4QAORiFYTAVRtCPmQUrgWw3opTe6rWuYSegRUcoOGtmjZI6itV5d7AZHIWfQcgSkpXFLM6BGzIF0FYH1iz_rHhygmshF5DPZD-izgLCT7VOkWVuOqhRuFCF04nGtLVkozh7Lv-7qFZSj5vI0Vk-Fek0_dOUMbvBSO-K9Ch8T_i2HeTlER9tlcvKu-hs_O3HOLu9_O75iqQor3-qYCJaYSNRxytKvEDGVrlfDC_hiKwHjP6SXmRA3iGtXs",
            online: true,
            messages: [
                { id: 1, text: "Sir, can you recommend some extra resources for the upcoming exam?", sender: "student", time: "3 days ago" },
                { id: 2, text: "Of course! I'll share some practice tests with you tomorrow.", sender: "teacher", time: "3 days ago" }
            ]
        }
    };

    // DOM Elements
    const messagesContainer = document.getElementById('messages-container');
    const emptyChatState = document.getElementById('empty-chat-state');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const typingIndicator = document.getElementById('typing-indicator');
    const chatStudentName = document.getElementById('chat-student-name');
    const chatStudentStatus = document.getElementById('chat-student-status');
    const onlineStatus = document.getElementById('online-status');
    const chatAvatar = document.getElementById('chat-avatar-img');
    const searchModal = document.getElementById('search-modal');
    const chatInfoModal = document.getElementById('chat-info-modal');
    const chatSearchInput = document.getElementById('chat-search-input');
    const searchResults = document.getElementById('search-results');
    const closeSearch = document.getElementById('close-search');
    const searchChatBtn = document.getElementById('search-chat');
    const chatInfoBtn = document.getElementById('chat-info');
    const chatMoreBtn = document.getElementById('chat-more');
    const infoStudentName = document.getElementById('info-student-name');
    const infoStudentEmail = document.getElementById('info-student-email');
    const infoStudentId = document.getElementById('info-student-id');
    const infoAvatar = document.getElementById('info-avatar');
    const totalMessages = document.getElementById('total-messages');
    const clearChatBtn = document.getElementById('clear-chat');
    const exportChatBtn = document.getElementById('export-chat');
    const blockStudentBtn = document.getElementById('block-student');

    // Current student data
    let currentStudent = chatData[studentId] || chatData[6]; // Default to Mariam if not found
    let messageIdCounter = currentStudent.messages.length + 1;

    // Initialize the chat
    function initChat() {
        // Load student data
        loadStudentData();
        
        // Render messages
        renderMessages();
        
        // Set up event listeners
        setupEventListeners();
        
        // Auto scroll to bottom
        scrollToBottom();
    }

    // Load student data
    function loadStudentData() {
        // Set header info
        chatStudentName.textContent = currentStudent.name;
        chatStudentStatus.textContent = currentStudent.online ? 'Online' : 'Offline';
        onlineStatus.classList.toggle('offline', !currentStudent.online);
        
        // Set avatar
        if (currentStudent.avatar) {
            chatAvatar.src = currentStudent.avatar;
            chatAvatar.alt = currentStudent.name;
        } else {
            chatAvatar.style.display = 'none';
            chatAvatar.parentElement.classList.add('default');
            chatAvatar.parentElement.innerHTML = '<span class="material-icons-outlined">person</span>';
        }
        
        // Set chat info modal data
        infoStudentName.textContent = currentStudent.name;
        infoStudentEmail.textContent = currentStudent.email;
        infoStudentId.textContent = currentStudent.studentId;
        totalMessages.textContent = currentStudent.messages.length;
        
        if (currentStudent.avatar) {
            infoAvatar.innerHTML = `<img src="${currentStudent.avatar}" alt="${currentStudent.name}">`;
        } else {
            infoAvatar.className = 'info-avatar default';
            infoAvatar.innerHTML = '<span class="material-icons-outlined">person</span>';
        }
    }

    // Render messages
    function renderMessages() {
        messagesContainer.innerHTML = '';
        
        if (currentStudent.messages.length === 0) {
            emptyChatState.style.display = 'flex';
            return;
        }
        
        emptyChatState.style.display = 'none';
        
        // Group messages by date (simplified - just show today)
        currentStudent.messages.forEach(message => {
            const messageElement = createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });
    }

    // Create message element
    function createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender === 'teacher' ? 'sent' : 'received'}`;
        
        // Teacher avatar (you can add your own avatar)
        const teacherAvatar = 'A'; // First letter of teacher name
        
        messageDiv.innerHTML = `
            ${message.sender === 'student' ? 
                `<div class="message-avatar">
                    <img src="${currentStudent.avatar}" alt="${currentStudent.name}" 
                         onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'message-avatar default\\'><span class=\\'material-icons-outlined\\'>person</span></div>'">
                </div>` : 
                `<div class="message-avatar default">
                    <span>${teacherAvatar}</span>
                </div>`
            }
            <div class="message-content">
                <div class="message-bubble">
                    <div class="message-text">${message.text}</div>
                </div>
                <div class="message-time">${message.time}</div>
            </div>
        `;
        
        return messageDiv;
    }

    // Send message
    function sendMessage() {
        const text = messageInput.value.trim();
        
        if (!text) return;
        
        // Create new message
        const newMessage = {
            id: messageIdCounter++,
            text: text,
            sender: 'teacher',
            time: getCurrentTime()
        };
        
        // Add to messages
        currentStudent.messages.push(newMessage);
        
        // Clear input
        messageInput.value = '';
        
        // Render new message
        const messageElement = createMessageElement(newMessage);
        messagesContainer.appendChild(messageElement);
        
        // Hide empty state
        emptyChatState.style.display = 'none';
        
        // Scroll to bottom
        scrollToBottom();
        
        // Simulate student typing
        simulateStudentReply(text);
        
        // Update message count
        totalMessages.textContent = currentStudent.messages.length;
    }

    // Get current time in HH:MM AM/PM format
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        return `${hours}:${minutes} ${ampm}`;
    }

    // Simulate student reply
    function simulateStudentReply(teacherMessage) {
        // Show typing indicator
        typingIndicator.classList.add('show');
        
        // Simulate typing delay (2-5 seconds)
        const typingTime = 2000 + Math.random() * 3000;
        
        setTimeout(() => {
            // Hide typing indicator
            typingIndicator.classList.remove('show');
            
            // Generate auto-reply based on teacher's message
            const autoReplies = [
                "Okay, thank you sir!",
                "I understand now, thanks!",
                "I'll work on it right away.",
                "Can you explain that again?",
                "When is the deadline for this?",
                "Do we need to submit it online?",
                "I'll check and get back to you.",
                "Thanks for the clarification!"
            ];
            
            // Simple keyword matching for better replies
            let reply;
            const lowerMessage = teacherMessage.toLowerCase();
            
            if (lowerMessage.includes('assignment') || lowerMessage.includes('homework')) {
                reply = "When is the deadline for this assignment?";
            } else if (lowerMessage.includes('question') || lowerMessage.includes('problem')) {
                reply = "Can you explain that in more detail?";
            } else if (lowerMessage.includes('grade') || lowerMessage.includes('score')) {
                reply = "When will the grades be posted?";
            } else if (lowerMessage.includes('meeting') || lowerMessage.includes('class')) {
                reply = "What time is the meeting?";
            } else {
                reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
            }
            
            // Add student's reply
            const studentReply = {
                id: messageIdCounter++,
                text: reply,
                sender: 'student',
                time: getCurrentTime()
            };
            
            currentStudent.messages.push(studentReply);
            
            // Render reply
            const replyElement = createMessageElement(studentReply);
            messagesContainer.appendChild(replyElement);
            
            // Scroll to bottom
            scrollToBottom();
            
            // Update message count
            totalMessages.textContent = currentStudent.messages.length;
            
        }, typingTime);
    }

    // Scroll to bottom of messages
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Search in messages
    function searchMessages(query) {
        if (!query.trim()) {
            searchResults.innerHTML = '<p class="no-results">Enter a search term</p>';
            return;
        }
        
        const results = currentStudent.messages.filter(message => 
            message.text.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="no-results">No messages found</p>';
            return;
        }
        
        searchResults.innerHTML = '';
        
        results.forEach(message => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            // Highlight search term
            const highlightedText = message.text.replace(
                new RegExp(query, 'gi'),
                match => `<span class="search-highlight">${match}</span>`
            );
            
            resultItem.innerHTML = `
                <div class="search-result-text">${highlightedText}</div>
                <div class="search-result-time">${message.time} • ${message.sender === 'teacher' ? 'You' : currentStudent.name}</div>
            `;
            
            searchResults.appendChild(resultItem);
        });
    }

    // Clear chat history
    function clearChatHistory() {
        if (confirm('Are you sure you want to clear all messages in this chat?')) {
            currentStudent.messages = [];
            messageIdCounter = 1;
            renderMessages();
            totalMessages.textContent = '0';
            showNotification('Chat history cleared', 'success');
        }
    }

    // Export chat
    function exportChat() {
        const chatText = currentStudent.messages.map(msg => 
            `${msg.time} - ${msg.sender === 'teacher' ? 'Teacher' : currentStudent.name}: ${msg.text}`
        ).join('\n');
        
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat_with_${currentStudent.name.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Chat exported successfully', 'success');
    }

    // Block student
    function blockStudent() {
        if (confirm(`Are you sure you want to block ${currentStudent.name}? You will no longer receive messages from them.`)) {
            showNotification(`${currentStudent.name} has been blocked`, 'success');
            // In a real app, you would update the student's blocked status
        }
    }

    // Set up event listeners
    function setupEventListeners() {
        // Send message on button click
        sendMessageBtn.addEventListener('click', sendMessage);
        
        // Send message on Enter key (but allow Shift+Enter for new line)
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Enable/disable send button based on input
        messageInput.addEventListener('input', () => {
            sendMessageBtn.disabled = !messageInput.value.trim();
        });
        
        // Search functionality
        searchChatBtn.addEventListener('click', () => {
            searchModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            setTimeout(() => chatSearchInput.focus(), 300);
        });
        
        closeSearch.addEventListener('click', () => {
            searchModal.classList.remove('show');
            document.body.style.overflow = '';
        });
        
        chatSearchInput.addEventListener('input', (e) => {
            searchMessages(e.target.value);
        });
        
        // Chat info modal
        chatInfoBtn.addEventListener('click', () => {
            chatInfoModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        // Clear chat
        clearChatBtn.addEventListener('click', clearChatHistory);
        
        // Export chat
        exportChatBtn.addEventListener('click', exportChat);
        
        // Block student
        blockStudentBtn.addEventListener('click', blockStudent);
        
        // Close modals with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchModal.classList.remove('show');
                chatInfoModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close modal buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                searchModal.classList.remove('show');
                chatInfoModal.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
    }

    // Show notification
    function showNotification(message, type = 'info') {
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
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Go back to students page
    window.goBack = function() {
        window.history.back();
    };

    // Initialize the chat
    initChat();
});