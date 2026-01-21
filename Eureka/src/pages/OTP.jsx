import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './OTP.css';

const OTP = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResend, setShowResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Start timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOTPChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Prevent non-numeric input
    if (e.key.length === 1 && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length === 6) {
      // Verify OTP logic here
      // For now, navigate to student dashboard
      navigate('/student');
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    setTimeLeft(60);
    setShowResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    // Resend OTP logic here
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `00:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="otp-wrapper">
      <button 
        id="themeToggle" 
        className="theme-btn"
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
      >
        <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>

      <div className="main-container">
        <div className="verification-card">
          <div className="card-header">
            <i className="fa-solid fa-shield-check icon-large"></i>
            <h2>Verify Your Identity</h2>
            <p>
              A verification code has been sent to your email address. Please enter the 6-digit code below to
              confirm your account.
            </p>
          </div>

          <form id="otpForm" onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  inputMode="numeric"
                  value={value}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button type="submit" className="submit-btn gradient-btn">
              Verify Account
            </button>
          </form>

          <div className="resend-timer">
            Didn't receive the code?
            {!showResend ? (
              <span id="timer">{formatTime(timeLeft)}</span>
            ) : (
              <>
                {' '}
                <a href="#" id="resendLink" className="resend-link" onClick={handleResend}>
                  Resend Code
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
