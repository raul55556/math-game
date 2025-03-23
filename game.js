let num1, num2, operador, correctAnswer;
let pontuacao = 0;
let chances = 2; // Initial number of chances
let jogoIniciado = false;

const problemaDiv = document.getElementById('problema');
const respostaInput = document.getElementById('resposta');
const pontuacaoDiv = document.getElementById('pontuacao');
const startButton = document.getElementById('startButton');
const chancesDisplay = document.getElementById('chances'); // Get the chances display
const beepSound = document.getElementById('beep');
const successSound = document.getElementById('success');
const errorSound = document.getElementById('error');

function atualizarPontuacao() {
    pontuacaoDiv.innerText = `Pontos: ${pontuacao}`;
}

function gerarProblema() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    operador = ['+', '-', '*'][Math.floor(Math.random() * 3)];

    problemaDiv.innerText = `${num1} ${operador} ${num2} = ?`;

    switch (operador) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
    }
}

function verificarResposta() {
    if (!jogoIniciado) return;

    const playerAnswer = parseInt(respostaInput.value);

    if (playerAnswer === correctAnswer) {
        successSound.play();
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        pontuacao += 10;
        atualizarPontuacao();
        gerarProblema();
        respostaInput.value = '';
    } else {
        errorSound.play();
        respostaInput.classList.add('error');
        setTimeout(() => respostaInput.classList.remove('error'), 500);
        chances--; // Decrement chances
        updateChancesDisplay();

        if (chances === 0) {
            gameOver();
        }
    }
}

function updateChancesDisplay() {
    chancesDisplay.innerText = `Chances Left: ${chances}`;
}

function gameOver() {
    problemaDiv.innerText = `Game Over! A resposta correta era ${correctAnswer}.`;
    respostaInput.disabled = true;
    jogoIniciado = false;
    startButton.innerText = 'Reiniciar Jogo';
    startButton.style.display = 'block';
}

startButton.addEventListener('click', () => {
    beepSound.play();
    if (!jogoIniciado) {
        pontuacao = 0;
        chances = 2; // Reset chances
        updateChancesDisplay();
        atualizarPontuacao();
        gerarProblema();
        respostaInput.disabled = false;
        respostaInput.value = '';
        startButton.style.display = 'none';
        jogoIniciado = true;
    }
});

respostaInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        verificarResposta();
    }
});

updateChancesDisplay(); // Initialize the display
