import { Game } from './game.js';

const game = new Game();

function startGame() {
    game.start();
}

document.addEventListener('DOMContentLoaded', () => {
    startGame();
});