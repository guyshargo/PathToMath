import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../../Utils/UserContext";
import { useGrade } from "../../../Utils/GradeComponent";
import generateQuestions from "../generateQuestions"
import WordProblemsCreator from "./WordProblemsCreator";
import QuestionBox from "../RaceGame//QuestionBox"; 
import GameContainer from "../GameContainer";
import TitleIcon from "../../../../assets/Images/WordGameTitle.png";
import successImage from "../../../../assets/Images/success.png";
import failureImage from "../../../../assets/Images/failure.png";
import { useGrade } from "../../../Utils/GradeComponent";
const WordProblem = () => {

  // Get the subject and level from the URL parameters
  const { subjectGame, level } = useParams();
  const gameSubject = subjectGame;
  const gameLevel = parseInt(level);
  const navigate = useNavigate();
  const { grade } = useGrade();
  // Get the user
  const { user } = useUser();
  //saves correct answers user answered
  const [correctAnswers, setCorrectAnswers] = useState(0);
  // Current question
  const [currentQuestion, setCurrentQuestion] = useState(null);
  //sets the questions for the game
  const [questions, setQuestions] = useState([]);
  //user answer
  const [userAnswer, setUserAnswer] = useState("");
  //feedback for the user
  const [feedback, setFeedback] = useState(null);
  // Flag for ending the game
  const [endGame, setEndGame] = useState(false);
  // End game object
  const [endGameObject, setEndGameObject] = useState(null);
  // Number of questions and options
  const numOfQuestions = 5;
  const numOfOptions = 1;
  //reset game function
  const resetGame = () => {
    setCurrentQuestion(null);
    setFeedback(null);
    setUserAnswer("");
    setEndGame(false);
    setEndGameObject(null);
  };
  // Load new game level function
  const loadGameLevel = () => {
    //generate new questions based on the subject, grade, level, number of questions and options
    const newQuestions = generateQuestions(gameSubject, parseInt(grade), gameLevel, numOfQuestions, numOfOptions);
    // Set the questions for the game 
    setQuestions(newQuestions);
    // Set the current question as the first in the array
    setCurrentQuestion(newQuestions[0]);
    // Reset the correct answers and user answer
    setCorrectAnswers(0);
    setUserAnswer("");
    // Reset feedback
    setFeedback(null);
  };
  //load the game level when the component mounts
  useEffect(() => {
    loadGameLevel();
  }, []);

  // Handle the submit action when the user answers a question
  const handleSubmit = () => {
    // Check if the user has entered an answer
    if (!userAnswer) {
      setFeedback(<p className="text-red-600">Please enter an answer!</p>);
      return;
    }
    const userNumericAnswer = parseInt(userAnswer);
    // Check if the answer is correct
    const correct = currentQuestion?.answer?.value;
    if (userNumericAnswer === correct) {
      // If the answer is correct, set feedback and increment correct answers
      setFeedback(<p className="text-green-600">Correct!</p>);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      // If the answer is incorrect, set feedback with the correct answer
      setFeedback(<p className="text-red-600">Wrong! The correct answer was {correct}</p>);
    }
    // Clear the user answer input
    setUserAnswer("");
    // Set a timeout to show feedback before moving to the next question
    setTimeout(() => {
      nextQuestionClicked();
    }, 1500); // delay for feedback
  };

  // Function to handle the next question click
  const nextQuestionClicked = () => {
    // Remove the first question from the array
    questions.shift();
    // If there are no more questions, generate the end game
    resetGame();
    // If there are remaining questions, set the current question as the first in the array
    if (questions.length >= 1) {
      setQuestions(questions);
      setCurrentQuestion(questions[0]);
    } else {
      // If no more questions, generate end game
      generateEnd();
    }
  };
// Function to generate the end game object
  const generateEnd = () => {
    // Check if the user answered 3 or more questions correctly
    const isSuccess = correctAnswers >= 3;
    // Set the end game object with the appropriate properties
    setEndGameObject({
      bgColor: isSuccess ? "bg-green-200" : "bg-red-200",
      text: `${isSuccess ? 'Great!' : 'Oh no!'} You answered ${correctAnswers} / ${numOfQuestions} Correct Answers.`,
      color: isSuccess ? "green" : "red",
      imgURL: isSuccess ? successImage : failureImage,
      headerText: isSuccess ? "Continue to the next level!" : "Try Again?",
      handleClick: () => {
        if (isSuccess) {
          // If the user succeeded, update their grade level and navigate to the next subject
          const currentFinished = user?.gradeLevel[user.grade - 1]?.[gameSubject];
          if (gameLevel > currentFinished) {
            // Update the user's grade level for the subject if the new level is higher
            let newUser = { ...user };
            newUser.gradeLevel[user.grade - 1][gameSubject] = gameLevel;
            // Call the updateUser function to save the changes
            updateUser(user.email, newUser);
          }
          // Navigate to the subject page
          navigate(`/subjects/${gameSubject}`);
        } else {
          // If the user failed, reset the game and load the game level again
          resetGame();
          loadGameLevel();
        }
      },
      buttonText: isSuccess ? "Next Level" : "Try Again!",
      containerColor: isSuccess ? "bg-green-100" : "bg-red-100",
    });
    // Set the end game flag to true
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
