export function initializeTheme() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const body = document.body;

    if (!themeToggle || !themeIcon) {
        return;
    }

    function applyTheme(theme) {
        if (theme === "dark") {
            body.classList.add("dark-mode");
            themeIcon.src = "../Images/System/night.png";
            themeIcon.alt = "Dark mode icon";
        } else {
            body.classList.remove("dark-mode");
            themeIcon.src = "../Images/System/day.png";
            themeIcon.alt = "Light mode icon";
        }
    }

    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme === "dark" ? "dark" : "light");

    themeToggle.addEventListener("click", () => {
        const nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    });
}
