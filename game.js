let pontos = 0;
let resultado = 0;
let intervalId;
let numerosMostrados = 0;
let sequencia = [];
let aguardandoResposta = false;
const TOTAL_NUMEROS = 7;
let velocidade = 1000; // 1 segundo entre cada número
let audioEnabled = false;

function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Substituir a função inicializarAudio
async function inicializarAudio() {
    const beep = document.getElementById('beep');
    const success = document.getElementById('success');
    const error = document.getElementById('error');

    try {
        await beep.play();
        beep.pause();
        beep.currentTime = 0;
        audioEnabled = true;
    } catch (e) {
        console.error('Erro ao inicializar áudio:', e);
        audioEnabled = false;
    }
}

function criarProblema() {
    if (numerosMostrados < TOTAL_NUMEROS) {
        resultado = gerarNumeroAleatorio(-10, 10);
        sequencia.push(resultado);
        const displayNumber = resultado > 0 ? `+${resultado}` : resultado;
        document.getElementById('problema').textContent = displayNumber;
        
        if (audioEnabled) {
            const beep = document.getElementById('beep');
            beep.currentTime = 0;
            beep.play().catch(e => console.log('Erro no beep:', e));
        }
        
        numerosMostrados++;
    } else {
        clearInterval(intervalId);
        document.getElementById('problema').textContent = "?";
        document.getElementById('resposta').focus();
        aguardandoResposta = true;
    }
}

function iniciarJogo() {
    criarProblema();
    intervalId = setInterval(criarProblema, velocidade);
}

function iniciarNovaSequencia() {
    numerosMostrados = 0;
    sequencia = [];
    aguardandoResposta = false;
    iniciarJogo();
}

function celebrar() {
    if (audioEnabled) {
        const success = document.getElementById('success');
        success.currentTime = 0;
        success.play().catch(e => console.log('Erro no som de sucesso:', e));
    }
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function mostrarErro() {
    if (audioEnabled) {
        const error = document.getElementById('error');
        error.currentTime = 0;
        error.play().catch(e => console.log('Erro no som de erro:', e));
    }
    document.querySelector('.container').classList.add('error');
    setTimeout(() => {
        document.querySelector('.container').classList.remove('error');
    }, 500);
}

document.getElementById('resposta').addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && aguardandoResposta) {
        const resposta = parseInt(this.value);
        const somaCorreta = sequencia.reduce((a, b) => a + b, 0);
        
        if (resposta === somaCorreta) {
            pontos++;
            document.getElementById('pontuacao').textContent = `Pontos: ${pontos}`;
            this.value = '';
            this.placeholder = 'Correto!';
            celebrar();
            setTimeout(() => {
                this.placeholder = '?';
                iniciarNovaSequencia();
            }, 1000);
        } else {
            this.value = '';
            this.placeholder = 'Tente novamente!';
            mostrarErro();
            setTimeout(() => {
                this.placeholder = '?';
                iniciarNovaSequencia();
            }, 1000);
        }
    }
});

// Substituir window.onload
window.onload = function() {
    const startButton = document.getElementById('startButton');
    const problema = document.getElementById('problema');
    const resposta = document.getElementById('resposta');

    startButton.addEventListener('click', async function() {
        await inicializarAudio();
        startButton.style.display = 'none';
        problema.style.display = 'block';
        resposta.style.display = 'block';
        iniciarJogo();
    });
};

// Example: Assuming you have a function that ends a round
function endRound() {
    // ... lógica de término de rodada (por exemplo, verificar se o jogo acabou, atualizar pontuação) ...

    // Tornar o botão de início visível novamente
    const startButton = document.getElementById('startButton');
    startButton.style.display = 'block'; // Ou 'inline', dependendo do seu layout
}

// Example:  No seu manipulador de clique do botão de início:
startButton.addEventListener('click', function() {
    startButton.style.display = 'none'; // Ocultar o botão quando o jogo começar
    startGame(); // Sua função para iniciar o jogo
});