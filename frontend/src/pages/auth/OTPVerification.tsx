import type { KeyboardEvent, FormEvent, MouseEvent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/otp.css';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

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
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Verify OTP logic
    console.log('Verifying OTP:', otp.join(''));
    // Redirect to login or dashboard
    navigate('/login');
  };

  const handleResend = (e: MouseEvent) => {
    e.preventDefault();
    setTimeLeft(60);
    console.log('Resending code...');
  };

  const formatTime = (seconds: number) => {
    const secs = seconds % 60;
    return `00:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="main-container">
        <button id="themeToggle" className="theme-btn" onClick={toggleTheme}>
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>

        <div className="verification-card">
            <div className="card-header">
                <i className="fa-solid fa-shield-check icon-large"></i>
                <h2>Verify Your Identity</h2>
                <p>A verification code has been sent to your email address. Please enter the 6-digit code below to confirm your account.</p>
            </div>

            <form id="otpForm" onSubmit={handleSubmit}>
                <div className="otp-inputs">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            ref={el => { inputsRef.current[index] = el; }}
                            autoFocus={index === 0}
                        />
                    ))}
                </div>

                <button type="submit" className="submit-btn gradient-btn">Verify Account</button>
            </form>

            <div className="resend-timer">
                Didn't receive the code? 
                {timeLeft > 0 ? (
                    <span id="timer">{formatTime(timeLeft)}</span>
                ) : (
                    <a href="#" id="resendLink" className="resend-link" onClick={handleResend}>Resend Code</a>
                )}
            </div>
        </div>
    </div>
  );
};

export default OTPVerification;


