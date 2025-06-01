import React, { useState, useEffect } from 'react';
import ButtonComponent from '../../Utils/Button';
import GameContainer from './GameContainer';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

/**
 * Cube Game Component
 * @param {Object} props - The component props
 * @param {string} props.gameSubject - The subject of the game
 * @param {number} props.gameLevel - The level of the game
 */
const OptionsGame = () =>  {
    const subjectMap = {
        "Addition": {
            "mathAction": "+",
            "function": (a, b) => a + b
        },
        "Subtraction": {
            "mathAction": "-",
            "function": (a, b) => a - b
        },
        "Multiplication": {
            "mathAction": "X",
            "function": (a, b) => a * b
        },
        "Division": {
            "mathAction": "/",
            "function": (a, b) => a / b
        },
        "Percentage": {
            "mathAction": "%",
            "function": (a, b) => a / b * 100
        }
    };

    const { subjectGame, level } = useParams();
    const gameLevel = Number(level);
    console.log(subjectGame, gameLevel);
    
    const navigate = useNavigate();
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [questionObject, setQuestionObject] = useState(null);
    const [clickedAnswer, setClickedAnswer] = useState({ text: '', color: '' });
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);
    const [endGame, setEndGame] = useState(false);
    const [endGameObject, setEndGameObject] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const numOfQuestions = 5;

    const resetGame = () => {
        setCorrectAnswers(0);
        setQuestions([]);
        setQuestionObject(null);
        setDisableButtons(false);
        setIsAnswerVisible(false);
        setClickedAnswer({ text: '', color: '' });
        setEndGame(false);
        setEndGameObject(null);
        setSelectedOption(null);
    };

    const generateVariable = () => {
        let mathLevel = Math.floor(gameLevel / 10) + 1;
        let min = 1 + (mathLevel - 1) * 5;
        let max = 10 * mathLevel;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateOption = (answer) => {
        const offset = Math.max(2, (Math.floor(gameLevel / 10) + 1) * 2);
        const minBorder = answer - offset;
        const maxBorder = answer + offset;
        const option = (Math.random() * (maxBorder - minBorder) + minBorder);
        return Math.round(option);
    };

    const makeQuestion = () => {
        const mathAction = subjectMap[subjectGame].mathAction;
        const mathFunction = subjectMap[subjectGame].function;

        const var1 = generateVariable();
        const var2 = generateVariable();
        const answer = mathFunction(var1, var2);

        let options = [];
        let questionText;

        while (options.length < 3) {
            const fakeAnswer = generateOption(answer);
            if (options.indexOf(fakeAnswer) === -1 && fakeAnswer !== answer) {
                options.push(fakeAnswer);
            }
        }

        const insertIndex = Math.floor(Math.random() * options.length + 1);
        options.splice(insertIndex, 0, answer);

        if (subjectGame === "Percentage") {
            questionText = `What percent is ${var1} of ${var2}?`;
        } else {
            questionText = `What's ${var1} ${mathAction} ${var2}?`;
        }

        return {
            question: questionText,
            var1,
            var2,
            answer,
            options
        };
    };

    const loadGameLevel = () => {
        const newQuestions = [];
        while (newQuestions.length < numOfQuestions) {
            const question = makeQuestion();
            let isDuplicate = false;

            for (const existing of newQuestions) {
                const isSameOrder = question.var1 === existing.var1 && question.var2 === existing.var2;
                const isReversedOrder = question.var1 === existing.var2 && question.var2 === existing.var1;

                if ((subjectGame === "Addition" || subjectGame === "Multiplication") && (isSameOrder || isReversedOrder)) {
                    isDuplicate = true;
                    break;
                } else if (isSameOrder) {
                    isDuplicate = true;
                    break;
                }
            }

            if (!isDuplicate) {
                newQuestions.push(question);
            }
        }
        setQuestions(newQuestions);
        setQuestionObject(newQuestions[0]);
    };

    const optionClicked = (answer, option) => {
        if (option === answer) {
            setClickedAnswer({ text: "Correct!", color: "green" });
            setCorrectAnswers(prev => prev + 1);
        } else {
            setClickedAnswer({ text: "Wrong!", color: "red" });
        }
        setSelectedOption(option);
        setDisableButtons(true);
        setIsAnswerVisible(true);
    };

    const nextQuestionClicked = () => {
        const remainingQuestions = questions.slice(1);
        setQuestions(remainingQuestions);
        resetGame();
        if (remainingQuestions.length >= 1) {
            setQuestionObject(remainingQuestions[0]);
        } else {
            generateEnd();
        }
    };

    const generateEnd = () => {
        const isSuccess = correctAnswers >= 4;
        setEndGameObject({
            bgColor: isSuccess ? "bg-green-200" : "bg-red-200",
            text: `${isSuccess ? 'Great!' : 'Oh no!'} You answered ${correctAnswers} / ${numOfQuestions} Correct Answers.`,
            color: isSuccess ? "green" : "red",
            imgURL: isSuccess ? "/src/Images/success.png" : "/src/Images/failure.png",
            headerText: isSuccess ? "Continue to the next level!" : "Try Again?",
            handleClick: () => {
                if (isSuccess) {
                    navigate('/subjects');
                } else {
                    resetGame();
                    loadGameLevel();
                }
            },
            buttonText: isSuccess ? "Back to Main" : "Again!"
        });
        setEndGame(true);
    };

    const generateOptions = () => {
        return questionObject?.options.map((option, index) => (
            <ButtonComponent
                key={index}
                id={option}
                onClick={() => optionClicked(questionObject.answer, option)}
                label={subjectGame === "Percentage" ? `${option}%` : option}
                bgColor={selectedOption === option ? 
                    (option === questionObject.answer ? "bg-green-200" : "bg-red-200") : 
                    "bg-gray-100"}
                textColor="text-black"
                size="lg"
                disabled={disableButtons}
            />
        ));
    };

    useEffect(() => {
        loadGameLevel();
        return () => {
            resetGame();
        };
    }, [subjectGame, gameLevel]);

    return (

        <GameContainer gameName="Cube Game" gameSubject={subjectGame} gameLevel={gameLevel}>
            <div id="game" className="border-8 border-blue-200 rounded-lg p-9 inline-block shadow-lg">
                <div id="gameHeader" className="text-5xl font-bold mb-6 p-6">
                    {!endGame ? questionObject?.question || "Loading..." : endGameObject?.text}
                </div>
                <div className="grid grid-cols-2 gap-10">
                    {!endGame ? generateOptions() : (
                        <div className="flex flex-col items-center justify-center gap-4">
                            <img 
                                className="h-60 w-auto max-w-full object-contain" 
                                src={endGameObject?.imgURL} 
                                alt={endGameObject?.color === "green" ? "Success" : "Failure"} 
                            />
                            <ButtonComponent
                                label={endGameObject?.buttonText}
                                onClick={endGameObject?.handleClick}
                                textColor="text-black"
                                bgColor={endGameObject?.bgColor}
                            />
                        </div>
                    )}
                </div>
            </div>

            {isAnswerVisible && !endGame && (
                <div>
                    <div className={`text-2xl mb-4 font-bold text-${clickedAnswer.color}`}>
                        {clickedAnswer.text}
                    </div>
                    <ButtonComponent
                        label="Next Question"
                        onClick={nextQuestionClicked}
                        bgColor="bg-gray-100"
                        textColor="text-black"
                        size="lg"
                    />
                </div>
            )}
        </GameContainer>
    );
}

export default OptionsGame;