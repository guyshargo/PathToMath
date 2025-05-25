import React, { useState, useEffect, useRef } from 'react';
import GameContainer from '../GameContainer';
import Track from './Track';
import QuestionBox from './QuestionBox';

// Sample questions for the game
const questions = [
  { id: 1, question: '5 + 7', answer: '12' },
  { id: 2, question: '3 * 4', answer: '12' },
  { id: 3, question: '9 - 6', answer: '3' },
  { id: 4, question: '8 / 2', answer: '4' },
];

const TRACK_LENGTH = 10; // Total number of blocks in the race track

function MathRaceGame() {
  const [started, setStarted] = useState(false); // Game start state
  const [userPos, setUserPos] = useState(0); // User track position
  const [botPos, setBotPos] = useState(0); // Timed player track position
  const [questionIndex, setQuestionIndex] = useState(0); // Current question index
  const [message, setMessage] = useState(''); // Status message
  const [userAnswer, setUserAnswer] = useState(''); // User input answer
  const botTimer = useRef(null); // Timer for bot movement

  const currentQuestion = questions[questionIndex];

  // Starts the game and reset all state
  const startGame = () => {
    setStarted(true);
    setUserPos(0);
    setBotPos(0);
    setQuestionIndex(0);
    setMessage('');
    setUserAnswer('');

    // Start moving the bot every second
    botTimer.current = setInterval(() => {
      setBotPos(prev => {
        const next = prev + 1;
        if (next >= TRACK_LENGTH) {
          clearInterval(botTimer.current);
          setMessage('Timed player wins!');
          setStarted(false);
        }
        return next;
      });
    }, 1000);
  };

  // Handles user's answer submission
  const handleAnswerSubmit = () => {
    if (!started || !currentQuestion) return;

    // Check if the answer is correct
    if (userAnswer.trim() === currentQuestion.answer) {
      const newPos = userPos + 1;
      setUserPos(newPos);
      setUserAnswer('');
      setMessage('Correct!');

      // Win condition
      if (newPos >= TRACK_LENGTH) {
        clearInterval(botTimer.current);
        setMessage('You win!');
        setStarted(false);

        // Move to next question
      } else if (questionIndex + 1 < questions.length) {
        setQuestionIndex(prev => prev + 1);

      } else {
        setMessage('No more questions!');
      }
      // Incorrect answer
    } else {
      setMessage('Try again!');
    }
  };

  return (
    <GameContainer gameName="Math Race" gameSubject="Math" gameLevel="Easy">
      {/* Show Start Button if game hasn't started */}
      {!started && (
        <button onClick={startGame} className="bg-blue-600 text-white px-4 py-2 rounded mb-6">
          Start Race
        </button>
      )}

      {/* Show question input if game has started */}
      {started && (
        <QuestionBox
          question={currentQuestion?.question}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          onSubmit={handleAnswerSubmit}
        />
      )}

      {/* Track display */}
      <div className="my-4">
        <div className="font-semibold">Your Track:</div>
        <Track position={userPos} length={TRACK_LENGTH} color="bg-green-500" />
        <div className="font-semibold mt-4">Timed Player Track:</div>
        <Track position={botPos} length={TRACK_LENGTH} color="bg-red-500" />
      </div>

      {/* Display game status message */}
      {message && <div className="mt-4 text-xl font-bold">{message}</div>}
    </GameContainer>
  );
}

export default MathRaceGame;
