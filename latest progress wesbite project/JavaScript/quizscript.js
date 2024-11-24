// these are the questions for the quiz

const quizData = [
    {
        question: "what is the capital of france?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "what is the CEO of Tesla?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "what is the largest planet in our solar system?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "what is the currency of japan?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
];

// these are the html elements for the quiz that allows the user to receive a score after playing

const questionNumberEl = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionEl = document.querySelectorAll(".option");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn"); 
const resultEl = document.getElementById("result"); 
const scoreEl= document.getElementById("score"); 


let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let answerSelected = false;

// this is the function for loading each question and storing the user answer as correct or incorrect

function loadQuestion() {
   const { question, options } = quizData[currentQuestion];
   questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
   questionEl.textContent = question;
   optionEl.forEach((option, index) => {
     option.textContent = options[index];
     option.classList.remove("correct", "incorrect");
     option.onclick = () => selectoption(option);
   });
   
}

// initialize quiz
loadQuestion();
