document.addEventListener("DOMContentLoaded", function () {
    const codeAreas = document.querySelectorAll(".code");

    // تفعيل CodeMirror
    codeAreas.forEach((area) => {
        CodeMirror.fromTextArea(area, {
            lineNumbers: true,
            mode: "text/x-c++src",
            theme: "default",
        });
    });

    // زر العودة إلى الأعلى
    const backToTopButton = document.getElementById("backToTop");
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // تشغيل الكود
    function runCode(id) {
        const code = document.getElementById(id).value;
        const outputDiv = document.getElementById(`output${id.slice(-1)}`);
        try {
            eval(code);
        } catch (error) {
            outputDiv.textContent = `خطأ: ${error.message}`;
        }
    }

    // تحميل الكود
    function downloadCode(id, fileName) {
        const code = document.getElementById(id).value;
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Dark Mode
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Scroll Indicator
    const scrollIndicator = document.getElementById("scroll-indicator");
    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollIndicator.style.width = `${scrollPercentage}%`;
    });

    // Pomodoro Timer
    let timerInterval;
    let timeLeft = 25 * 60;

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("timer").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    document.getElementById("start-timer").addEventListener("click", () => {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                }
            }, 1000);
        }
    });

    document.getElementById("pause-timer").addEventListener("click", () => {
        clearInterval(timerInterval);
        timerInterval = null;
    });

    document.getElementById("reset-timer").addEventListener("click", () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = 25 * 60;
        updateTimerDisplay();
    });

    updateTimerDisplay();

    // لوحة التحكم
    let completedLessons = 0;
    const studyTimeElement = document.getElementById("study-time");
    let studyTime = 0;

    function updateDashboard() {
        document.getElementById("completed-lessons").textContent = completedLessons;
        studyTimeElement.textContent = studyTime;
    }

    document.querySelectorAll(".lesson button").forEach((button) => {
        button.addEventListener("click", () => {
            completedLessons++;
            studyTime += 5; // افتراض أن كل درس يستغرق 5 دقائق
            updateDashboard();
        });
    });

    updateDashboard();
});
