import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../../Utils/UserContext";
import { useGrade } from "../../../Utils/GradeComponent";
import generateQuestions from "../generateQuestions"; 
import WordProblemsCreator from "./WordProblemsCreator";
import QuestionBox from "../RaceGame/QuestionBox"; 
import GameContainer from "../GameContainer";
import TitleIcon from "../../../../assets/Images/quiz.png";
import successImage from "../../../../assets/Images/success.png";
import failureImage from "../../../../assets/Images/failure.png";

const WordProblem = () => {
    // Get the subject and level from the URL parameters
  const { subjectGame, level } = useParams();
  // Define the game subject and level
  const gameSubject = subjectGame;
  const gameLevel = parseInt(level);
  const navigate = useNavigate();
  // Get the user from the UserContext
  const { user } = useUser();
  // Get the current grade from the GradeContext
  const { grade } = useGrade();
  // State to track correct answers
  const [correctAnswers, setCorrectAnswers] = useState(0);
  // State for the current question
  const [currentQuestion, setCurrentQuestion] = useState(null);
  // State to hold the questions for the game
  const [questions, setQuestions] = useState([]);
    // State for the user's answer
  const [userAnswer, setUserAnswer] = useState("");
  // State for feedback to the user
  const [feedback, setFeedback] = useState(null);
  // Flag for ending the game
  const [endGame, setEndGame] = useState(false);
  // Object to hold end game details
  const [endGameObject, setEndGameObject] = useState(null);

  const numOfQuestions = 5;
  const numOfOptions = 1;
    // Function to reset the game state
  const resetGame = () => {
    setCurrentQuestion(null);
    setFeedback(null);
    setUserAnswer("");
    setEndGame(false);
    setEndGameObject(null);
  };
// Function to load a new game level
  const loadGameLevel = () => {
    // Generate new questions based on the subject, grade, level, number of questions and options
    const newQuestions = generateQuestions(gameSubject, parseInt(grade), gameLevel, numOfQuestions, numOfOptions);
    // Set the questions for the game
    setQuestions(newQuestions);
    //  Set the current question as the first in the array
    setCurrentQuestion(newQuestions[0]);
    // Reset the correct answers and user answer
    setCorrectAnswers(0);
    // Reset user answer
    setUserAnswer("");
    // Reset feedback
    setFeedback(null);
  };
    // Load the game level when the component mounts
  useEffect(() => {
    loadGameLevel();
  }, []);
 // Function to handle the submission of the user's answer
  const handleSubmit = () => {
    // Check if the user has entered an answer
    if (!userAnswer) {
        setFeedback(<p className="text-red-600">Please enter an answer!</p>);
        return;
    }
    
    const userNumericAnswer = parseInt(userAnswer);
    // Check if the answer is correct
    const correct = currentQuestion?.answer?.value;
    // If the answer is correct, provide positive feedback
    if (userNumericAnswer === correct) {
      setFeedback(<p className="text-green-600">Correct!</p>);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setFeedback(<p className="text-red-600">Wrong! The correct answer was {correct}</p>);
    }
    // Clear the user's answer
    setUserAnswer("");
    // Delay before moving to the next question to show feedback
    setTimeout(() => {
      nextQuestionClicked();
    }, 1500); // delay for feedback
  };
    // Function to handle the next question click
  const nextQuestionClicked = () => {
    // Remove the first question from the array
    questions.shift();
    //reset game
    resetGame();
// If there are no more questions, generate the end game
    if (questions.length >= 1) {
      setQuestions(questions);
      setCurrentQuestion(questions[0]);
    } else {
        // If no more questions, generate the end game
      generateEnd();
    }
  };
//generate end game function
  const generateEnd = () => {
    // Check if the user answered 3 or more questions correctly
    const isSuccess = correctAnswers >= 3;
    // Set the end game object with details
    setEndGameObject({
      bgColor: isSuccess ? "bg-green-200" : "bg-red-200",
      text: `${isSuccess ? 'Great!' : 'Oh no!'} You answered ${correctAnswers} / ${numOfQuestions} Correct Answers.`,
      color: isSuccess ? "green" : "red",
      imgURL: isSuccess ? successImage : failureImage,
      headerText: isSuccess ? "Continue to the next level!" : "Try Again?",
      handleClick: () => {
        if (isSuccess) {
          const currentFinished = user?.gradeLevel[user.grade - 1]?.[gameSubject];
          if (gameLevel > currentFinished) {
            let newUser = { ...user };
            newUser.gradeLevel[user.grade - 1][gameSubject] = gameLevel;
            updateUser(user.email, newUser);
          }
          navigate(`/subjects/${gameSubject}`);
        } else {
          resetGame();
          loadGameLevel();
        }
      },
      buttonText: isSuccess ? "Next Level" : "Try Again!",
      containerColor: isSuccess ? "bg-green-100" : "bg-red-100",
    });

    setEndGame(true);
  };

  return (
    <GameContainer
      title="Word Problems"
      subject={gameSubject}
      grade={grade}
      level={gameLevel}
      icon={TitleIcon}
      resetGame={resetGame}
      loadGameLevel={loadGameLevel}
      endGame={endGame}
      endGameObject={endGameObject}
    >
      {currentQuestion && (
        <div className="flex flex-col items-center justify-center">
          <WordProblemsCreator
            var1={currentQuestion.var1.value}
            var2={currentQuestion.var2.value}
            answer={currentQuestion.answer.value}
            subject={gameSubject}
          />
          <QuestionBox
            question={"What is the answer?"}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            onSubmit={handleSubmit}
            feedback={feedback}
          />
        </div>
      )}
    </GameContainer>
  );
};

export default WordProblem;
