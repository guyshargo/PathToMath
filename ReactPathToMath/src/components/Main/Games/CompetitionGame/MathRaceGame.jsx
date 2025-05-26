// MathRaceGame.jsx
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
  { id: 5, question: '10 - 3', answer: '7' },
  { id: 6, question: '6 + 1', answer: '7' },
  { id: 7, question: '4 * 2', answer: '8' },
  { id: 8, question: '18 / 3', answer: '6' },
  { id: 9, question: '9 + 5', answer: '14' },
  { id: 10, question: '7 - 2', answer: '5' },
];

const TRACK_LENGTH = questions.length + 1; // Total number of blocks in the race track, +1 for the "Finish" cube

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

    // Start moving the bot every 3 seconds
    botTimer.current = setInterval(() => {
      setBotPos(prev => {
        const next = prev + 1;

        // If bot will reach or pass the final cube
        if (next >= TRACK_LENGTH - 1) {
          clearInterval(botTimer.current);
          setStarted(false);
          setMessage('Opponent wins! Try Again?');
          return TRACK_LENGTH - 1;
        }
        return next;
      });
    }, 3000);
  };

  // Handles user's answer submission
  const handleAnswerSubmit = () => {
    if (!started || !currentQuestion) return;

    // Check if the user's answer is correct
    if (userAnswer.trim() === currentQuestion.answer) {
      const newPos = userPos + 1;
      setUserAnswer(''); // Clear the input field

      // Check if this move puts the user at the "Finish" cube
      if (newPos === TRACK_LENGTH - 1) {
        setUserPos(newPos); // Update user position
        clearInterval(botTimer.current);
        setMessage('You Win! Race Again?');
        setStarted(false); // End the game
      } else {
        setUserPos(newPos); // Update user position
        setQuestionIndex(prev => prev + 1);
        setMessage('Correct!');
      }
    } else {
      // If the answer is wrong, notify the user
      setMessage('Incorrect, Try again!');
      setUserAnswer(''); // Clear the input field
    }
  };

  return (
    <GameContainer gameName="Math Race" gameSubject="Addition" gameLevel="Easy">
      {/* Show Start Button if game hasn't started */}
      {/* Start Button or Restart Message */}
      {!started && (
        message ? (
          <button
            onClick={startGame}
            className="mt-4 text-2xl font-extrabold text-black bg-yellow-300 rounded-full py-3 px-6 shadow-md text-center select-none transition-transform duration-300 hover:scale-105"
          >
            {message}
          </button>
        ) : (
          <button
            onClick={startGame}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-xl shadow-lg transition-transform duration-300 cursor-pointer hover:scale-110"
          >
            🏁 Start Race
          </button>
        )
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

      {/* Show in-game messages like "Correct!" or "Incorrect" */}
      {started && message && message !== 'You Win! Race Again?' && message !== 'Opponent wins! Try Again?' && (
        <div className="text-xl text-white bg-blue-500 rounded-lg py-2 text-center">
          {message}
        </div>
      )}

      {/* Track display */}
      <div className="my-6">
        <div className="font-bold text-lg text-black">Your Track:</div>
        <Track position={userPos} length={TRACK_LENGTH} color="bg-green-600" startLabel="Start" endLabel="Finish" />
        <div className="font-bold mt-6 text-lg text-black">Opponent Track:</div>
        <Track position={botPos} length={TRACK_LENGTH} color="bg-red-600" startLabel="Start" endLabel="Finish" />
      </div>
    </GameContainer>
  );
}

export default MathRaceGame;
