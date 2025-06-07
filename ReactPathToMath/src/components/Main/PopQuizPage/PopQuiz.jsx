import React, { useEffect } from "react";
import { useUser } from '../../Utils/UserContext';
import { useNavigate } from 'react-router-dom';
import { generateRandomGame } from "../Games/generateRandomGame.jsx";
import RaceGame from "../Games/RaceGame/RaceGame.jsx";
import OptionsGame from "../Games/OptionsGame.jsx";
import GameCube from "../Games/GameCube.jsx";
import WordGame from "../Games/WordGame/WordProblem.jsx";
import { useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
const PopQuiz = () => {
    const navigate = useNavigate();

    const { user } = useUser();
    const grade = user?.grade;

    const subjectsConfigs = [
        { name: "Addition" },
        { name: "Subtraction" },
        { name: "Multiplication" },
        { name: "Division" },
        { name: "Percentage" }
    ];

    const gameComponents = {
        RaceGame: RaceGame,
        WordGame: WordGame,
        OptionsGame: OptionsGame,
        GameCube: GameCube
    };

    const subjects = grade === 1
        ? subjectsConfigs.slice(0, grade + 1)
        : subjectsConfigs.slice(0, grade);

    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)].name;
    const randomLevel = Math.floor(Math.random() * 30) + 1;
    const randomGameName = generateRandomGame(randomSubject);
    const Game = gameComponents[randomGameName];
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem("quiz","true")
        if (!grade) return;

        const subjects = grade === 1
            ? subjectsConfigs.slice(0, grade + 1)
            : subjectsConfigs.slice(0, grade);

        const randomSubject = subjects[Math.floor(Math.random() * subjects.length)].name;
        const randomLevel = Math.floor(Math.random() * 30) + 1;
        const randomGameName = generateRandomGame(randomSubject);

        navigate(`/${randomGameName}/${randomSubject}/${grade}/${randomLevel}`, {
         state: { fromQuiz: true }
        });
    }, [grade,location]);

    return <div>Loading quiz...</div>;
};

export default PopQuiz;
