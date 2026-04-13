const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.src = '../Images/System/night.png';
        themeIcon.alt = 'Dark mode icon';
    } else {
        body.classList.remove('dark-mode');
        themeIcon.src = '../Images/System/day.png';
        themeIcon.alt = 'Light mode icon';
    }
}

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    applyTheme('dark');
} else {
    applyTheme('light');
}

themeToggle.addEventListener('click', function () {
    if (body.classList.contains('dark-mode')) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
});