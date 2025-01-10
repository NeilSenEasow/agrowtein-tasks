// Quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 2 + 2 * 2?",
        choices: ["6", "8", "4", "10"],
        correct: 0
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
        correct: 1
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let selectedChoice = null;

// DOM elements
const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');
const scoreElement = document.getElementById('score');
const highScoresElement = document.getElementById('highScores');
const restartButton = document.getElementById('restart');

// Initialize quiz
function initializeQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

// Display current question
function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    
    choicesElement.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const choiceDiv = document.createElement('div');
        choiceDiv.className = 'choice';
        choiceDiv.textContent = choice;
        choiceDiv.dataset.index = index;
        choicesElement.appendChild(choiceDiv);
    });

    submitButton.style.display = 'block';
    nextButton.style.display = 'none';
    selectedChoice = null;
}

// Handle choice selection
choicesElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('choice')) {
        document.querySelectorAll('.choice').forEach(choice => {
            choice.classList.remove('selected');
        });
        e.target.classList.add('selected');
        selectedChoice = parseInt(e.target.dataset.index);
        submitButton.disabled = false;
    }
});

// Handle submit button
submitButton.addEventListener('click', () => {
    if (selectedChoice === null) return;

    const choices = document.querySelectorAll('.choice');
    const correctAnswer = quizData[currentQuestion].correct;

    choices.forEach((choice, index) => {
        if (index === correctAnswer) {
            choice.classList.add('correct');
        } else if (index === selectedChoice) {
            choice.classList.add('wrong');
        }
    });

    if (selectedChoice === correctAnswer) {
        score++;
    }

    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
});

// Handle next button
nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// Show results and update high scores
function showResults() {
    quizElement.style.display = 'none';
    resultsElement.style.display = 'block';
    scoreElement.textContent = `${score} out of ${quizData.length}`;
    
    // Update high scores
    let highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5); // Keep only top 5 scores
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    // Display high scores
    highScoresElement.innerHTML = highScores
        .map(score => `<li>${score} out of ${quizData.length}</li>`)
        .join('');
}

// Handle restart button
restartButton.addEventListener('click', () => {
    quizElement.style.display = 'block';
    resultsElement.style.display = 'none';
    initializeQuiz();
});

// Start the quiz
initializeQuiz(); 