import React, { useState, useEffect, useRef } from 'react';
import GameContainer from '../GameContainer';
import Track from './Track';
import QuestionBox from './QuestionBox';
import generateQuestions from '../GameLogic';

const NUM_QUESTIONS = 10; // Number of questions in the race

function MathRaceGame() {
  // Game state flags and data
  const [started, setStarted] = useState(false);  // Is the game currently running?
  const [userPos, setUserPos] = useState(0);  // User's current position on the track
  const [botPos, setBotPos] = useState(0);  // Opponent bot position on the track
  const [questionIndex, setQuestionIndex] = useState(0);  // Index of the current question the user is answering
  const [message, setMessage] = useState(''); // Message shown to the user (win\loss, correct\incorrect)
  const [userAnswer, setUserAnswer] = useState(''); // User's answer input
  const [questions, setQuestions] = useState([]); // Array of generated math questions for the race
  const botTimer = useRef(null);  // Opponent bot's interval timer
  const [countdown, setCountdown] = useState(null); // Countdown before game starts
  const [countdownVisible, setCountdownVisible] = useState(false);

  // Countdown effect for the beggining of a race
  useEffect(() => {
    if (countdown !== null) {
      setCountdownVisible(true);
      const timeout = setTimeout(() => setCountdownVisible(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [countdown]);

  // Generate questions on mount, so track is visible immediately when the game loads
  useEffect(() => {
    const generated = generateQuestions('Addition', 2, NUM_QUESTIONS, 1);
    setQuestions(generated);
  }, []);

  // The total length of the track is number of questions + a "Finish" block
  const TRACK_LENGTH = questions.length > 0 ? questions.length + 1 : 0;

  // Effect that controls the bot's automatic movement during the race
  useEffect(() => {
    if (started && TRACK_LENGTH > 1) {

      // Set bot to move forward every 5 seconds
      botTimer.current = setInterval(() => {
        setBotPos((prev) => {
          const next = prev + 1;

          // If bot reaches the finish line, end the game and declare bot winner
          if (next >= TRACK_LENGTH - 1) {
            clearInterval(botTimer.current);
            setStarted(false);
            setMessage('Opponent wins! Try Again?');
            return TRACK_LENGTH - 1;
          }
          return next;
        });
      }, 5000);
    }

    // Clear the interval when component unmounts
    return () => clearInterval(botTimer.current);
  }, [started, TRACK_LENGTH]);

  // Starts the countdown before the game and resets positions and states
  const startCountdown = () => {
    setUserPos(0);
    setBotPos(0);
    setQuestionIndex(0);
    setMessage('');
    setUserAnswer('');
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCountdown('Race!');
          setTimeout(() => {
            setCountdown(null);
            setStarted(true); // Game actually starts
          }, 1000);
        }
        return typeof prev === 'number' ? prev - 1 : prev;
      });
    }, 1000);
  };

  // The current question the user must answer
  const currentQuestion = questions[questionIndex];

  // Handles user submitting an answer
  const handleAnswerSubmit = () => {
    // Prevent submission if game not started or no current question available
    if (!started || !currentQuestion) return;

    // Compare user's trimmed answer to the correct answer (integer value converted to string)
    if (userAnswer.trim() === String(currentQuestion.answer.value)) {
      const newPos = userPos + 1; // User moves one step forward
      setUserAnswer('');  // Clear the input field

      // If user reaches finish line, declare user win and stop the game
      if (newPos === TRACK_LENGTH - 1) {
        setUserPos(newPos);
        clearInterval(botTimer.current);
        setMessage('You Win! Race Again?');
        setStarted(false);
      } else {
        // Otherwise, update user position and move to next question
        setUserPos(newPos);
        setQuestionIndex((prev) => prev + 1);
        setMessage('Correct!');
      }
    } else {
      // If answer is wrong, show message and clear input
      setMessage('Incorrect, Try again!');
      setUserAnswer('');
    }
  };

  return (
    <GameContainer gameName="Math Race" gameSubject="Addition" gameLevel="Easy">
    {/* Show start race button (for first race) or try again message (for next races)
    when the game is not running (before clicking start race or after a race finished and try again needs to be clicked) */}
      {!started && countdown === null && (message ? (
          <button
            onClick={startCountdown}
            className="mt-4 text-2xl cursor-pointer font-extrabold text-black bg-yellow-300 rounded-full py-3 px-6 shadow-md text-center select-none transition-transform duration-300 hover:scale-105"
          >
            {message}
          </button>
        ) : (
          <button
            onClick={startCountdown}
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full text-xl shadow-lg transition-transform duration-300 cursor-pointer hover:scale-110"
          >
            🏁 Start Race
          </button>
        ))}

      {/* Countdown visual before game starts */}
      {countdown !== null && (
      <div
        key={countdown}
        className={`transition-all ease-in-out
          ${countdownVisible ? 'opacity-100 scale-150' : 'opacity-0 scale-50'}
        `}
      >
        <div
          className={`text-6xl font-extrabold text-center my-6
            ${countdown === 3 ? 'text-red-700' : ''}
            ${countdown === 2 ? 'text-yellow-500' : ''}
            ${countdown === 1 ? 'text-green-700' : ''}
            ${countdown === 'Race!' ? 'text-black' : ''}
          `}
        >
          {countdown === 'Race!' ? '🏁 Race!' : countdown}
        </div>
      </div>
    )}

      {/* Show the question box only when the game has started */}
      {started && (
        <QuestionBox
          question={currentQuestion?.question}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          onSubmit={handleAnswerSubmit}
        />
      )}

      {/* Correct\Incorrect messages during game */}
      {started && message && message !== 'You Win! Race Again?' && message !== 'Opponent wins! Try Again?' && (
  <div className="text-xl text-white bg-blue-500 rounded-lg py-2 text-center mx-auto max-w-md inline-block px-4">
    {message}
  </div>
)}


      {/* Show tracks if questions are loaded */}
      {TRACK_LENGTH > 1 && (
        <div className="my-6">
          <div className="font-bold text-lg text-black">Your Track:</div>
          <Track position={userPos} length={TRACK_LENGTH} color="bg-green-600" startLabel="Start" endLabel="Finish" />
          <div className="font-bold mt-6 text-lg text-black">Opponent Track:</div>
          <Track position={botPos} length={TRACK_LENGTH} color="bg-red-600" startLabel="Start" endLabel="Finish" />
        </div>
      )}
    </GameContainer>
  );
}

export default MathRaceGame;
