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

    // التحقق من الإجابة
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
        } else {
            resultDiv.textContent = "إجابة خاطئة. حاول مرة أخرى!";
            resultDiv.style.color = "red";
        }
    }

    // تفعيل الشريط الجانبي
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
});
