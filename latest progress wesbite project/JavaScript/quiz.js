export class Quiz {
    quizData = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Lisbon"],
            answer: "Paris"
        },
        {
            question: "Who is the CEO of Tesla?",
            options: ["Elon Musk", "Jeff Bezos", "Tim Cook", "Sundar Pichai"],
            answer: "Elon Musk"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Jupiter"
        },
        {
            question: "What is the currency of Japan?",
            options: ["Yen", "Won", "Dollar", "Euro"],
            answer: "Yen"
        },
    ];

    currentQuestion = 0;
    score = 0;
    answerSelected = false;
    time = 10;
    timer = document.getElementById("timer");
    gameRunning = false;

    // References to DOM
    questionNumberEl;
    questionEl;
    optionEl;
    nextBtn;
    resultEl;
    scoreEl;

    constructor() {
        // Get references
        this.questionNumberEl = document.getElementById("question-number");
        this.questionEl = document.getElementById("question");
        this.optionEl = document.querySelectorAll(".option");
        this.nextBtn = document.getElementById("next-btn");
        this.resultEl = document.getElementById("result");
        this.scoreEl = document.getElementById("score");

        // Load first question
        this.gameRunning = true;
        this.loadQuestion();
        this.countDown();
        this.nextBtn.addEventListener("click", () => this.answerQuestion());
    }

    countDown() {
        setInterval(() => {
            if (this.gameRunning) {
                this.time--;
                this.timer.innerHTML = `Time left: ${this.time}`;
                console.log(this.time)
                console.log(this.time > -1);
            }
        }, 1000);
    }

    loadQuestion() {
        // Check for end of quiz
        if (this.currentQuestion >= this.quizData.length) {
            this.endQuiz();
            return;
        }

        const { question, options } = this.quizData[this.currentQuestion];
        this.questionNumberEl.textContent = `Question ${this.currentQuestion + 1} of ${this.quizData.length}`;
        this.questionEl.textContent = question;
        this.optionEl.forEach((option, index) => {
            option.textContent = options[index];
            option.classList.remove("correct", "incorrect");
            option.onclick = () => this.selectOption(option);
        });
        this.time = 10;
        this.timer.innerHTML = `Time left: ${this.time}`;
        setTimeout(() => {
            this.currentQuestion++;
            this.loadQuestion();
        }, 10000);
    }

    // allows the user to select an answer


    selectOption(selectedOption) {
        if (this.answerSelected) return;

        this.answerSelected = true;
        const correctAnswer = this.quizData[this.currentQuestion].answer;

        if (selectedOption.textContent === correctAnswer) {
            selectedOption.classList.add("correct");
            this.score++;
        } else {
            selectedOption.classList.add("incorrect");
            this.optionEl.forEach(option => {
                if (option.textContent === correctAnswer) {
                    option.classList.add("correct");
                }
            });
        }
        this.updateScore();
    }
    
    // updates the score 

    updateScore() {
        this.scoreEl.textContent = this.score;
        this.nextBtn.style.display = 'block'; // Show next button after selecting an answer
    }

    answerQuestion() {
        this.currentQuestion++;
        this.answerSelected = false; // Reset answer selected for the next question
        this.loadQuestion();
        this.nextBtn.style.display = 'none'; // Hide next button until answer is selected
    }
    
    // ends the quiz

    endQuiz() {
        this.gameRunning = false;
        console.log("Quiz over!");
        this.resultEl.classList.remove("hide");
        this.resultEl.querySelector("span").textContent = this.score;
        this.questionEl.textContent = ''; // Clear question text
        this.questionNumberEl.textContent = ''; // Clear question number
        this.optionEl.forEach(option => option.style.display = 'none'); // Hide options
        this.nextBtn.style.display = 'none'; // Hide next button

        // Save score to local storage
        this.saveScore();
    }

    saveScore() {
        // Retrieve the username from sessionStorage
        const username = sessionStorage.getItem('loggedInUser');
        if (username) {
            const scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
            const userIndex = scores.findIndex(user => user.username === username);

            if (userIndex > -1) {
                // Update score if the new score is higher
                if (scores[userIndex].score < this.score) {
                    scores[userIndex].score = this.score;
                }
            } else {
                // If user not found, add new entry
                scores.push({ username, score: this.score });
            }

            localStorage.setItem('leaderboard', JSON.stringify(scores));

            // Optionally, redirect to leaderboard after saving
            window.location.href = 'Leaderboard.html';
        }
    }
}


