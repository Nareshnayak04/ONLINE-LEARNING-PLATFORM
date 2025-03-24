document.addEventListener("DOMContentLoaded", function() {
    console.log("N Dreams Learning Platform Loaded");

    // Load progress from localStorage
    let userProgress = JSON.parse(localStorage.getItem("userProgress")) || {};

    // Progress tracking example
    const quizzes = document.querySelectorAll(".quiz-link");
    quizzes.forEach(quiz => {
        quiz.addEventListener("click", function() {
            startQuiz(quiz.dataset.quiz);
        });
    });

    // Video player enhancement (Optional: Add interactive controls in the future)
    const videos = document.querySelectorAll("video");
    videos.forEach(video => {
        video.addEventListener("play", function() {
            console.log("Playing: " + video.src);
        });
    });

    function startQuiz(quizType) {
        const questions = {
            "frontend": [
                { question: "What does HTML stand for?", options: ["HyperText Markup Language", "Hyper Transfer Markup Language", "HyperText Making Language"], answer: 0 },
                { question: "Which CSS property changes text color?", options: ["text-style", "color", "font-color"], answer: 1 }
            ],
            "backend": [
                { question: "What is a common backend language?", options: ["JavaScript", "Python", "CSS"], answer: 1 },
                { question: "Which database is SQL-based?", options: ["MongoDB", "MySQL", "Neo4j"], answer: 1 }
            ]
        };

        if (!questions[quizType]) {
            alert("Quiz not found!");
            return;
        }

        let score = 0;
        questions[quizType].forEach(q => {
            let userAnswer = prompt(q.question + "\n" + q.options.map((opt, i) => `${i + 1}. ${opt}`).join("\n"));
            if (parseInt(userAnswer) - 1 === q.answer) {
                score++;
            }
        });

        alert("You scored " + score + " out of " + questions[quizType].length);

        // Save progress
        userProgress[quizType] = score;
        localStorage.setItem("userProgress", JSON.stringify(userProgress));
        console.log("Progress saved", userProgress);
    }

    // Display progress
    function displayProgress() {
        const progressContainer = document.getElementById("progress");
        if (progressContainer) {
            progressContainer.innerHTML = "<h3>Your Progress</h3>";
            for (let quiz in userProgress) {
                progressContainer.innerHTML += `<p>${quiz}: ${userProgress[quiz]} points</p>`;
            }
        }
    }
    displayProgress();
});
