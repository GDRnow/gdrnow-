// Elements
const pointsDisplay = document.getElementById('points-display');
const redeemButton = document.getElementById('redeem-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const loginSection = document.getElementById('login-section');
const loginSubmitButton = document.getElementById('login-submit');
const questionSection = document.getElementById('question-section');
const loginError = document.getElementById('login-error');
const redeemSection = document.getElementById('redeem-section');
const generateCodeButton = document.getElementById('generate-code-button');
const generatedCodeDisplay = document.getElementById('generated-code');

let points = 0;
let currentQuestionIndex = 0;
let isAuthenticated = false;

// Questions and Answers
const questions = [
    { question: "¿Cuál es el precio de una barra de pan?", options: ["1€", "2€", "3€"], correct: 1 },
    { question: "¿Cuál es el precio de un litro de leche?", options: ["0.5€", "1€", "1.5€"], correct: 2 },
    { question: "¿Cuál es el precio de un café?", options: ["0.8€", "1.2€", "2€"], correct: 3 },
    // Agrega más preguntas aquí
];

function loadQuestion(index) {
    const question = questions[index];
    document.getElementById('question-text').innerText = question.question;
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach((button, i) => {
        button.innerText = question.options[i];
        button.onclick = () => {
            handleAnswer(i + 1, question.correct);
        };
    });
}

// Handle Answer
function handleAnswer(selected, correct) {
    if (selected === correct) {
        alert("¡Correcto!");
        points += Math.floor(Math.random() * 5) + 38; // Add 38 to 42 points randomly
    } else {
        alert("Incorrecto.");
        points += Math.floor(Math.random() * 5) + 38;
    }
    updatePoints();
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion(currentQuestionIndex);
}

// Update Points Display
function updatePoints() {
    pointsDisplay.innerText = `Puntos: ${points}`;
}

// Handle Login
loginSubmitButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "usuario" && password === "contraseña") {
        isAuthenticated = true;
        loginSection.classList.add('hidden');
        loginButton.classList.add('hidden');
        logoutButton.classList.remove('hidden');
        redeemButton.classList.remove('hidden');
        questionSection.classList.remove('hidden');
        loadQuestion(currentQuestionIndex);
    } else {
        loginError.classList.remove('hidden');
    }
});

// Handle Logout
logoutButton.addEventListener('click', () => {
    isAuthenticated = false;
    loginButton.classList.remove('hidden');
    logoutButton.classList.add('hidden');
    redeemButton.classList.add('hidden');
    questionSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    pointsDisplay.innerText = "Puntos: 0";
    points = 0;
    currentQuestionIndex = 0;
});

// Show Redeem Section
redeemButton.addEventListener('click', () => {
    redeemSection.classList.toggle('hidden');
});

// Generate Redeem Code
generateCodeButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('.redeem-option[data-points]');
    const requiredPoints = parseInt(selectedOption.getAttribute('data-points'));

    if (points >= requiredPoints) {
        const code = generateCode(requiredPoints);
        generatedCodeDisplay.innerText = `Código: ${code}`;
        points -= requiredPoints; // Deduct points
        updatePoints();
    } else {
        alert('No tienes suficientes puntos.');
    }
});

// Generate Complex Redeem Code
function generateCode(amount) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 12; i++) {
        if (i === 9) { // Place the amount at the 10th position
            code += amount.toString();
        } else {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }
    return code;
}

// Initial Points Update
updatePoints();
