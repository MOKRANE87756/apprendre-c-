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

    // Slideshow
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    document.getElementById("next-slide").addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    document.getElementById("prev-slide").addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    showSlide(currentSlide);

    // Quiz
    function checkAnswer() {
        const selected = document.querySelector('input[name="answer"]:checked');
        const resultDiv = document.getElementById("quizResult");

        if (!selected) {
            resultDiv.textContent = "يرجى اختيار إجابة.";
            return;
        }

        if (selected.value === "15") {
            resultDiv.textContent = "إجابة صحيحة! 👍";
            resultDiv.style.color = "green";
            playSound("success");
        } else {
            resultDiv.textContent = "إجابة خاطئة. حاول مرة أخرى!";
            resultDiv.style.color = "red";
            playSound("fail");
        }
    }

    function playSound(type) {
        const audio = new Audio();
        audio.src = type === "success" ? "https://www.soundjay.com/button/beep-07.wav" : "https://www.soundjay.com/misc/sounds/fail-buzzer-01.mp3";
        audio.play();
    }

    // Certificate
    const certificateModal = document.getElementById("certificate-modal");
    const openCertificateButton = document.getElementById("get-certificate");
    const closeCertificateButton = document.querySelector(".close");

    openCertificateButton.addEventListener("click", () => {
        certificateModal.style.display = "flex";
    });

    closeCertificateButton.addEventListener("click", () => {
        certificateModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === certificateModal) {
            certificateModal.style.display = "none";
        }
    });
});
