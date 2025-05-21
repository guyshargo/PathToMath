import React from "react";
import { useNavigate } from "react-router-dom";
import { useSubject } from "../Main/SubjectComponent";

function Levels({ currentLevel, numOfLevels }) {
    const levels = [];
    const { gameSubject, updateLevel } = useSubject();
    const { subject } = gameSubject;
    const navigate = useNavigate();

    for (let i = 1; i <= numOfLevels; i++) {
        if (i < currentLevel) {
            levels.push({ levelNum: i, color: "bg-green-400 cursor-pointer",canPlay: false });
        } else if (i === currentLevel) {
            levels.push({ levelNum: i, color: "bg-orange-400 cursor-pointer",canPlay: false });
        } else {
            levels.push({ levelNum: i, color: "bg-red-400 cursor-not-allowed", canPlay: true });
        }
    }
    // next level is unlocked when the current level is completed
    // being called whan player finish game with success
    const handleLevelCompleted = (levelNum) => {
        if (levelNum <= numOfLevels) {
            updateLevel(levelNum+1);
        }
    }

    // open the game with the selected level
    const openGameLevel = (levelNum) => {
        navigate("/gameLevel/play", { state: { subject, levelNum } });
    }

    return (
        <div className="flex flex-col items-center py-10">
            {/* Progress Bar */}
            <div className="w-full max-w-screen-lg px-4 mb-6">
                <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                        className="bg-green-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${((currentLevel - 1) / numOfLevels) * 100}%` }}
                    ></div>
                </div>
                <p className="text-center text-sm mt-2">
                    {Math.round(((currentLevel - 1) / numOfLevels) * 100)}% Complete
                </p>
            </div>
            {/* Levels grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 w-full max-w-screen-lg p-1">
                {levels.map(({ levelNum, color,canPlay }, index) => (
                    <button
                        key={`level-${levelNum}-${index}`} // Ensure the key is unique
                        className={`${color} text-white ${canPlay} text-2xl font-bold py-4 px-4 rounded-4xl shadow-md flex items-center justify-center transition-transform duration-200 hover:scale-105 hover:animate-pulse`}
                        onClick={() => { handleLevelCompleted(levelNum) }}
                        disabled={canPlay} // Disable button if not playable
                    >
                        {levelNum}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Levels;
