const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const themeIcon = themeToggleBtn.querySelector('i');


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});


showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.remove('active');
    setTimeout(() => {
        registerSection.classList.add('active');

        resetAnimations(registerSection);
    }, 200);
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerSection.classList.remove('active');
    setTimeout(() => {
        loginSection.classList.add('active');
        resetAnimations(loginSection);
    }, 200);
});

function resetAnimations(section) {
    const animatedElements = section.querySelectorAll('.fade-in-left, .fade-in-up');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = null;
    });
}
function setLoginRole(role, btn) {

    const buttons = document.querySelectorAll('#loginSection .role-btn');
    buttons.forEach(b => b.classList.remove('active'));


    btn.classList.add('active');


    console.log(`Login Mode: ${role}`);
}

const regStudentBtn = document.getElementById('regStudentBtn');
const regTeacherBtn = document.getElementById('regTeacherBtn');
const studentFields = document.getElementById('studentFields');
const teacherFields = document.getElementById('teacherFields');

function setRegisterRole(role) {
    if (role === 'student') {
        regStudentBtn.classList.add('active');
        regTeacherBtn.classList.remove('active');

        studentFields.classList.remove('hidden');
        teacherFields.classList.add('hidden');
    } else {
        regTeacherBtn.classList.add('active');
        regStudentBtn.classList.remove('active');

        teacherFields.classList.remove('hidden');
        studentFields.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const button = document.getElementById('nextPageBtn');

    if (button) {
        button.addEventListener('click', () => {
            window.location.href = 'indexotp.html';

        });
    }
});