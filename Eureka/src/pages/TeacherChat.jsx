import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TeacherChat.css';

export default function TeacherChat() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [teacher] = useState({ name: 'Ahmed Emad', role: 'Teacher' });

  // Mock chat data
  const chatData = {
    1: {
      name: 'Ahmed Mohamed',
      email: 'ahmed.mohamed@example.com',
      studentId: 'STU-2025-001',
      avatar: '',
      online: true,
      messages: [
        { id: 1, text: "Good morning sir, I have a question about today's assignment.", sender: 'student', time: '09:30 AM' },
        { id: 2, text: "Good morning Ahmed! What's your question?", sender: 'teacher', time: '09:31 AM' },
        { id: 3, text: "I'm not sure how to solve problem number 3 in the math homework.", sender: 'student', time: '09:32 AM' },
        { id: 4, text: 'Let me explain: You need to use the quadratic formula for that problem.', sender: 'teacher', time: '09:33 AM' }
      ]
    },
    2: {
      name: 'Ahmed Sayed',
      email: 'ahmed.sayed@example.com',
      studentId: 'STU-2025-002',
      avatar: '',
      online: false,
      messages: [
        { id: 1, text: "Hello sir, when is the project deadline?", sender: 'student', time: 'Yesterday, 2:30 PM' },
        { id: 2, text: 'The deadline is next Friday at 11:59 PM.', sender: 'teacher', time: 'Yesterday, 2:32 PM' }
      ]
    },
    3: {
      name: 'Ali Tarek',
      email: 'ali.tarek@example.com',
      studentId: 'STU-2025-003',
      avatar: '',
      online: true,
      messages: []
    },
    4: {
      name: 'Fatma Hassan',
      email: 'fatma.hassan@example.com',
      studentId: 'STU-2025-004',
      avatar: '',
      online: false,
      messages: [
        { id: 1, text: "Sir, I won't be able to attend class tomorrow.", sender: 'student', time: '2 days ago' },
        { id: 2, text: 'Noted. Please check the recorded lecture afterwards.', sender: 'teacher', time: '2 days ago' }
      ]
    },
    5: {
      name: 'Huda Khattab',
      email: 'huda.khattab@example.com',
      studentId: 'STU-2025-005',
      avatar: '',
      online: true,
      messages: []
    },
    6: {
      name: 'Mariam Noor',
      email: 'mariam.noor@example.com',
      studentId: 'STU-2025-006',
      avatar: '',
      online: true,
      messages: [
        { id: 1, text: "Good morning Mr. Ahmed, I wanted to ask about the Programming assignment. I'm not sure how to solve Question 3.", sender: 'student', time: '09:41 AM' },
        { id: 2, text: "Good morning! Sure, Question 3 is about writing a simple loop. I'll send you an example below.", sender: 'teacher', time: '09:42 AM' },
        { id: 3, text: "Thank you sir! Does it need to include a function?", sender: 'student', time: '09:43 AM' },
        { id: 4, text: 'Yes, try to write it inside a function so your code looks clean and organized.', sender: 'teacher', time: '09:44 AM' },
        { id: 5, text: "Okay, I'll try it and send it to you.", sender: 'student', time: '09:45 AM' }
      ]
    },
    7: {
      name: 'Mohamed Ali',
      email: 'mohamed.ali@example.com',
      studentId: 'STU-2025-007',
      avatar: '',
      online: false,
      messages: []
    },
    8: {
      name: 'Mohamed Ibrahim',
      email: 'mohamed.ibrahim@example.com',
      studentId: 'STU-2025-008',
      avatar: '',
      online: true,
      messages: [
        { id: 1, text: 'Sir, can you recommend some extra resources for the upcoming exam?', sender: 'student', time: '3 days ago' },
        { id: 2, text: "Of course! I'll share some practice tests with you tomorrow.", sender: 'teacher', time: '3 days ago' }
      ]
    }
  };

  const studentId = id ? parseInt(id) : 1;
  const [currentStudent, setCurrentStudent] = useState(() => {
    const student = chatData[studentId] || chatData[6];
    // Load from localStorage if available
    try {
      const saved = localStorage.getItem(`teacherChat_${studentId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...student, messages: parsed.messages || student.messages };
      }
    } catch {
      // ignore
    }
    return student;
  });

  const [messages, setMessages] = useState(currentStudent.messages);
  const [messageInput, setMessageInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [messageIdCounter, setMessageIdCounter] = useState(messages.length + 1);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get current time
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Send message
  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (!text) return;

    const newMessage = {
      id: messageIdCounter,
      text: text,
      sender: 'teacher',
      time: getCurrentTime()
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput('');
    setMessageIdCounter((prev) => prev + 1);

    // Save to localStorage
    try {
      const updated = [...messages, newMessage];
      localStorage.setItem(`teacherChat_${studentId}`, JSON.stringify({ messages: updated }));
    } catch {
      // ignore
    }

    // Simulate student reply
    setTimeout(() => {
      simulateStudentReply(text);
    }, 1000);
  };

  // Simulate student reply
  const simulateStudentReply = (teacherMessage) => {
    setTyping(true);

    const typingTime = 2000 + Math.random() * 3000;

    setTimeout(() => {
      setTyping(false);

      const autoReplies = [
        'Okay, thank you sir!',
        'I understand now, thanks!',
        "I'll work on it right away.",
        'Can you explain that again?',
        'When is the deadline for this?',
        'Do we need to submit it online?',
        "I'll check and get back to you.",
        'Thanks for the clarification!'
      ];

      let reply;
      const lowerMessage = teacherMessage.toLowerCase();

      if (lowerMessage.includes('assignment') || lowerMessage.includes('homework')) {
        reply = 'When is the deadline for this assignment?';
      } else if (lowerMessage.includes('question') || lowerMessage.includes('problem')) {
        reply = 'Can you explain that in more detail?';
      } else if (lowerMessage.includes('grade') || lowerMessage.includes('score')) {
        reply = 'When will the grades be posted?';
      } else if (lowerMessage.includes('meeting') || lowerMessage.includes('class')) {
        reply = 'What time is the meeting?';
      } else {
        reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      }

      const studentReply = {
        id: messageIdCounter,
        text: reply,
        sender: 'student',
        time: getCurrentTime()
      };

      setMessages((prev) => [...prev, studentReply]);
      setMessageIdCounter((prev) => prev + 1);

      // Save to localStorage
      try {
        const updated = [...messages, studentReply];
        localStorage.setItem(`teacherChat_${studentId}`, JSON.stringify({ messages: updated }));
      } catch {
        // ignore
      }
    }, typingTime);
  };

  // Search messages
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = messages.filter((message) => message.text.toLowerCase().includes(query.toLowerCase()));
    setSearchResults(results);
  };

  // Clear chat
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages in this chat?')) {
      setMessages([]);
      setMessageIdCounter(1);
      try {
        localStorage.setItem(`teacherChat_${studentId}`, JSON.stringify({ messages: [] }));
      } catch {
        // ignore
      }
    }
  };

  // Export chat
  const handleExportChat = () => {
    const chatText = messages
      .map((msg) => `${msg.time} - ${msg.sender === 'teacher' ? 'Teacher' : currentStudent.name}: ${msg.text}`)
      .join('\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_with_${currentStudent.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Block student
  const handleBlockStudent = () => {
    if (window.confirm(`Are you sure you want to block ${currentStudent.name}? You will no longer receive messages from them.`)) {
      alert(`${currentStudent.name} has been blocked`);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  // Close modals on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setInfoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Calculate chat duration
  const chatDuration = useMemo(() => {
    if (messages.length === 0) return '0 days';
    const firstMessage = messages[0];
    const daysSince = Math.floor((Date.now() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return `${Math.abs(daysSince)} days`;
  }, [messages]);

  // Get last active time
  const lastActive = useMemo(() => {
    if (messages.length === 0) return 'Just now';
    const lastMessage = messages[messages.length - 1];
    return lastMessage.time;
  }, [messages]);

  return (
    <div className="teacher-chat flex w-full font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 min-h-screen flex-col">
      {/* Header */}
      <header className="teacher-chat-header">
        <div className="teacher-chat-header-container">
          <div className="teacher-chat-header-left">
            <button className="teacher-chat-back-button" onClick={() => navigate('/teacher/students')}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="teacher-chat-info">
              <div className={`teacher-chat-user-avatar-small ${currentStudent.avatar ? '' : 'default'}`}>
                {currentStudent.avatar ? (
                  <img src={currentStudent.avatar} alt={currentStudent.name} onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentElement.className = 'teacher-chat-user-avatar-small default';
                    e.target.parentElement.innerHTML = '<span class="material-symbols-outlined">person</span>';
                  }} />
                ) : (
                  <span className="material-symbols-outlined">person</span>
                )}
                <span className={`teacher-chat-online-status ${currentStudent.online ? '' : 'offline'}`}></span>
              </div>
              <div className="teacher-chat-user-info">
                <h2 className="teacher-chat-user-name">{currentStudent.name}</h2>
                <p className={`teacher-chat-user-status ${currentStudent.online ? 'online' : ''}`}>
                  {currentStudent.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </div>

          <div className="teacher-chat-header-actions">
            <button className="teacher-chat-icon-btn" onClick={() => setSearchModalOpen(true)}>
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="teacher-chat-icon-btn" onClick={() => setInfoModalOpen(true)}>
              <span className="material-symbols-outlined">info</span>
            </button>
            <button className="teacher-chat-icon-btn">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="teacher-chat-container" ref={messagesContainerRef}>
        <div className="teacher-chat-date-separator">
          <span className="teacher-chat-date-text">Today</span>
        </div>

        <div className="teacher-chat-messages-container">
          {messages.length === 0 ? (
            <div className="teacher-chat-empty-chat">
              <div className="teacher-chat-empty-chat-icon">
                <span className="material-symbols-outlined">chat_bubble_outline</span>
              </div>
              <h3>Start Conversation</h3>
              <p>Send your first message to begin chatting with the student</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`teacher-chat-message ${message.sender === 'teacher' ? 'sent' : 'received'}`}>
                {message.sender === 'student' ? (
                  <div className="teacher-chat-message-avatar">
                    {currentStudent.avatar ? (
                      <img
                        src={currentStudent.avatar}
                        alt={currentStudent.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentElement.className = 'teacher-chat-message-avatar default';
                          e.target.parentElement.innerHTML = '<span class="material-symbols-outlined">person</span>';
                        }}
                      />
                    ) : (
                      <div className="teacher-chat-message-avatar default">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="teacher-chat-message-avatar default">
                    <span>{teacher.name.charAt(0)}</span>
                  </div>
                )}
                <div className="teacher-chat-message-content">
                  <div className="teacher-chat-message-bubble">
                    <div className="teacher-chat-message-text">{message.text}</div>
                  </div>
                  <div className="teacher-chat-message-time">{message.time}</div>
                </div>
              </div>
            ))
          )}

          {typing && (
            <div className="teacher-chat-typing-indicator show">
              <span className="teacher-chat-typing-text">Student is typing</span>
              <div className="teacher-chat-typing-dots">
                <span className="teacher-chat-dot"></span>
                <span className="teacher-chat-dot"></span>
                <span className="teacher-chat-dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Message Input Area */}
      <footer className="teacher-chat-message-input-container">
        <div className="teacher-chat-input-wrapper">
          <button className="teacher-chat-input-action-btn teacher-chat-emoji-btn">
            <span className="material-symbols-outlined">sentiment_satisfied</span>
          </button>

          <div className="teacher-chat-message-input-wrapper">
            <input
              type="text"
              className="teacher-chat-message-input"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyPress}
              autoComplete="off"
            />
            <button className="teacher-chat-input-action-btn teacher-chat-attach-btn">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
          </div>

          <button
            className="teacher-chat-send-btn"
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </footer>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="teacher-chat-modal" onClick={() => setSearchModalOpen(false)}>
          <div className="teacher-chat-modal-content teacher-chat-search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-chat-modal-header">
              <div className="teacher-chat-search-input-container">
                <span className="material-symbols-outlined teacher-chat-search-icon">search</span>
                <input
                  type="text"
                  className="teacher-chat-search-input"
                  placeholder="Search in conversation..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                />
                <button className="teacher-chat-search-close" onClick={() => setSearchModalOpen(false)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
            <div className="teacher-chat-modal-body">
              <div className="teacher-chat-search-results">
                {searchQuery.trim() && searchResults.length === 0 ? (
                  <p className="teacher-chat-no-results">No messages found</p>
                ) : searchQuery.trim() ? (
                  searchResults.map((message) => {
                    const highlightedText = message.text.replace(
                      new RegExp(searchQuery, 'gi'),
                      (match) => `<span class="teacher-chat-search-highlight">${match}</span>`
                    );
                    return (
                      <div key={message.id} className="teacher-chat-search-result-item">
                        <div
                          className="teacher-chat-search-result-text"
                          dangerouslySetInnerHTML={{ __html: highlightedText }}
                        ></div>
                        <div className="teacher-chat-search-result-time">
                          {message.time} • {message.sender === 'teacher' ? 'You' : currentStudent.name}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="teacher-chat-no-results">Enter a search term</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Info Modal */}
      {infoModalOpen && (
        <div className="teacher-chat-modal" onClick={() => setInfoModalOpen(false)}>
          <div className="teacher-chat-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-chat-modal-header">
              <h3>Chat Information</h3>
              <button className="teacher-chat-modal-close" onClick={() => setInfoModalOpen(false)}>
                &times;
              </button>
            </div>
            <div className="teacher-chat-modal-body">
              <div className="teacher-chat-info-profile">
                <div className={`teacher-chat-info-avatar ${currentStudent.avatar ? '' : 'default'}`}>
                  {currentStudent.avatar ? (
                    <img src={currentStudent.avatar} alt={currentStudent.name} />
                  ) : (
                    <span className="material-symbols-outlined">person</span>
                  )}
                </div>
                <h4>{currentStudent.name}</h4>
                <p className="teacher-chat-info-email">{currentStudent.email}</p>
                <p className="teacher-chat-info-id">{currentStudent.studentId}</p>
              </div>

              <div className="teacher-chat-stats">
                <div className="teacher-chat-stat-item">
                  <span className="teacher-chat-stat-value">{messages.length}</span>
                  <span className="teacher-chat-stat-label">Messages</span>
                </div>
                <div className="teacher-chat-stat-item">
                  <span className="teacher-chat-stat-value">{chatDuration}</span>
                  <span className="teacher-chat-stat-label">Duration</span>
                </div>
                <div className="teacher-chat-stat-item">
                  <span className="teacher-chat-stat-value">{lastActive}</span>
                  <span className="teacher-chat-stat-label">Last Active</span>
                </div>
              </div>

              <div className="teacher-chat-actions">
                <button className="teacher-chat-action-btn" onClick={handleClearChat}>
                  <span className="material-symbols-outlined">delete_sweep</span>
                  Clear Chat History
                </button>
                <button className="teacher-chat-action-btn" onClick={handleExportChat}>
                  <span className="material-symbols-outlined">download</span>
                  Export Conversation
                </button>
                <button className="teacher-chat-action-btn teacher-chat-danger" onClick={handleBlockStudent}>
                  <span className="material-symbols-outlined">block</span>
                  Block Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
