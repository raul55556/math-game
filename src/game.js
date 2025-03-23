class Game {
    constructor() {
        this.score = 0;
        this.currentProblem = '';
        this.timeLimit = 5; // seconds
        this.timer = null;
    }

    start() {
        this.score = 0;
        this.nextProblem();
    }

    nextProblem() {
        this.currentProblem = this.generateProblem();
        this.displayProblem();
        this.startTimer();
    }

    generateProblem() {
        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 10);
        const operation = Math.random() < 0.5 ? 'add' : 'subtract';
        return operation === 'add' ? `${a} + ${b}` : `${a} - ${b}`;
    }

    displayProblem() {
        // Logic to display the current problem on the screen
        console.log(this.currentProblem);
    }

    startTimer() {
        let timeLeft = this.timeLimit;
        this.timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(this.timer);
                this.endGame();
            } else {
                timeLeft--;
            }
        }, 1000);
    }

    endGame() {
        // Logic to end the game and display the score
        console.log(`Game over! Your score: ${this.score}`);
    }

    checkAnswer(userAnswer) {
        const [a, operator, b] = this.currentProblem.split(' ');
        const correctAnswer = operator === '+' ? parseInt(a) + parseInt(b) : parseInt(a) - parseInt(b);
        
        if (parseInt(userAnswer) === correctAnswer) {
            this.score++;
            this.nextProblem();
        } else {
            this.endGame();
        }
    }
}

export default Game;