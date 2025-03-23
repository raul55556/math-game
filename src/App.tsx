import React, { useEffect, useState } from 'react';
import { soundService } from './services/SoundService';
import './App.css';

function generateProblem() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return {
    num1,
    num2,
    answer: num1 * num2
  };
}

function App() {
  const [problem, setProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    soundService.init().catch(error => {
      console.error('Failed to initialize sounds:', error);
    });
    soundService.play('beep');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAnswer = parseInt(userAnswer);

    if (numAnswer === problem.answer) {
      soundService.play('success');
      setScore(score + 1);
      setProblem(generateProblem());
    } else {
      soundService.play('error');
      setScore(Math.max(0, score - 1));
    }
    setUserAnswer('');
  };

  return (
    <div className="App">
      <div className="game-container">
        <h1>Math Game</h1>
        <div className="score">Score: {score}</div>
        <div className="problem">
          {problem.num1} × {problem.num2} = ?
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button type="submit">Check</button>
        </form>
      </div>
    </div>
  );
}

export default App;