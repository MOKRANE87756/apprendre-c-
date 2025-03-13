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

    // Rating System
    const stars = document.querySelectorAll(".rating i");
    stars.forEach((star) => {
        star.addEventListener("click", () => {
            const rating = star.getAttribute("data-rating");
            stars.forEach((s, index) => {
                s.classList.toggle("active", index < rating);
            });
        });
    });

    // Progress Chart
    const ctx = document.getElementById("progress-chart").getContext("2d");
    const progressChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["الدرس 1", "الدرس 2", "الدرس 3", "الدرس 4"],
            datasets: [{
                label: "التقدم (%)",
                data: [80, 60, 90, 70],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });

    document.querySelectorAll(".lesson, .section").forEach((el) => {
        observer.observe(el);
    });
});
