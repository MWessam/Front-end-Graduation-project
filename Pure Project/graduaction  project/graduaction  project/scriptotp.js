document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    const otpInputs = document.querySelectorAll('.otp-inputs input');

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }

            if (e.key.length === 1 && !/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        });
    });

    const timerDisplay = document.getElementById('timer');
    const resendLink = document.getElementById('resendLink');
    let timeLeft = 60;

    function startTimer() {
        resendLink.classList.add('hidden');
        timerDisplay.style.display = 'inline';
        timeLeft = 60;

        const interval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(interval);
                timerDisplay.style.display = 'none';
                resendLink.classList.remove('hidden');
            } else {
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `00:${seconds < 10 ? '0' : ''}${seconds}`;
                timeLeft--;
            }
        }, 1000);
    }


    startTimer();


    resendLink.addEventListener('click', (e) => {
        e.preventDefault();

        console.log('Resending verification code...');
        startTimer();
    });

});