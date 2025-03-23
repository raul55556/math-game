console.log("Game.js loaded"); // Deixe este log para debug
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const problemaDiv = document.getElementById('problema');
    const respostaInput = document.getElementById('resposta');
    const pontuacaoDiv = document.getElementById('pontuacao');
    const restartButton = document.getElementById('restartButton');
    const beepSound = document.getElementById('beep');
    const successSound = document.getElementById('success');
    const errorSound = document.getElementById('error');
    const body = document.body;

    let sequence = [];
    let sequenceIndex = 0;
    let timer;
    let respostaCorreta;

    function gerarProblema() {
        sequence = [];
        for (let i = 0; i < 7; i++) {
            sequence.push(Math.floor(Math.random() * 21) - 10);
        }
        sequenceIndex = 0;
        respostaCorreta = sequence.reduce((a, b) => a + b, 0);
        displayNextNumber();
    }

    function displayNextNumber() {
        if (sequenceIndex < sequence.length) {
            problemaDiv.textContent = sequence[sequenceIndex];
            sequenceIndex++;
            timer = setTimeout(displayNextNumber, 1000);
        } else {
            problemaDiv.textContent = "Qual a soma?";
            respostaInput.style.display = "block";
            respostaInput.focus();
        }
    }

    startButton.addEventListener('click', function() {
        clearTimeout(timer);
        gerarProblema();
        startButton.style.display = 'none';
        respostaInput.style.display = 'none';
        restartButton.style.display = 'none';
    });

    respostaInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const respostaUsuario = parseInt(respostaInput.value);
            if (respostaUsuario === respostaCorreta) {
                body.classList.add('success');
                pontuacaoDiv.textContent = 'Acertou!';
                successSound.play();
            } else {
                body.classList.add('error');
                pontuacaoDiv.textContent = `Errou! A soma era ${respostaCorreta}`;
                errorSound.play();
            }
            setTimeout(() => {
                body.classList.remove('success', 'error');
                respostaInput.value = '';
                respostaInput.style.display = 'none';
                restartButton.style.display = 'block';
            }, 1000);
        }
    });

    restartButton.addEventListener('click', function() {
        startButton.style.display = 'block';
        restartButton.style.display = 'none';
        problemaDiv.textContent = '';
        pontuacaoDiv.textContent = 'Pontos: 0';
    });

    // Initially hide the input
    respostaInput.style.display = 'none';
});