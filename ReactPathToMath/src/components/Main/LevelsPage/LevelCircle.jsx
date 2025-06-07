import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { generateRandomGame } from '../Games/generateRandomGame';
const LevelCircle = ({ currentLevel, numOfLevels, grade }) => {
    const navigate = useNavigate();
    const { subjectGame } = useParams();

    const levels = [];
    for (let i = 1; i <= numOfLevels; i++) {
        if (i < currentLevel) {
            levels.push({ levelNum: i, color: "bg-green-400", canPlay: true });
        } else if (i === currentLevel) {
            levels.push({ levelNum: i, color: "bg-orange-400", canPlay: true });
        } else {
            levels.push({ levelNum: i, color: "bg-red-300", canPlay: false });
        }
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 w-full max-w-screen-lg p-1">
            {levels.map(({ levelNum, color, canPlay }, index) => (
                <button
                    key={`level-${levelNum}-${index}`} // Ensure the key is unique
                    className={`
                        ${color}
                        ${canPlay ? 'cursor-pointer' : ''}
                        text-white text-2xl font-bold py-4 px-4 rounded-4xl shadow-md
                        flex items-center justify-center
                        transition-transform duration-200
                        ${canPlay ? 'hover:scale-105 hover:animate-pulse' : ''}
                    `}
                    title={!canPlay ? "Level Locked" : ""}
                    disabled={!canPlay}
                    onClick={() => {
                        const random = generateRandomGame(subjectGame);
                        navigate(`/${random}/${subjectGame}/${grade}/${levelNum}`);

                    }}
                >
                    {levelNum}
                </button>
            ))}
        </div>
    );
}

export default LevelCircle;