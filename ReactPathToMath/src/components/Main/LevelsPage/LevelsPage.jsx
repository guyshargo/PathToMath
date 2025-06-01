import React, { useState, useEffect } from "react";
import background from '../../../assets/Images/Background/white_background.png';
import { useNavigate } from 'react-router-dom';
import { useGrade } from '../../Utils/GradeComponent.jsx';
import { useParams } from 'react-router-dom';
import LevelCircle from "./LevelCircle.jsx";
import { useUser } from '../../Utils/UserContext.jsx';
import addition from '../../../assets/Images/Math_icon/addition_purple.png';
import subtraction from '../../../assets/Images/Math_icon/minus.png';
import multiplication from '../../../assets/Images/Math_icon/multi.png';
import division from '../../../assets/Images/Math_icon/division1.png';
import percentage from '../../../assets/Images/Math_icon/percentage.png';

const IconMap = {
    Addition: addition,
    Subtraction: subtraction,
    Multiplication: multiplication,
    Division: division,
    Percentage: percentage,
};
const LevelsPage = () => {
    const { subjectGame } = useParams();
    const { user } = useUser();

    if (!subjectGame) {
        return (
            <div className="text-center mt-8">
                <h1 className="text-2xl font-bold">No Subject Selected</h1>
                <p>Please select a subject to start the game.</p>
            </div>
        )
    }

    // Check if the subjectGame exists in the user's gradeLevel
    const playersLevel = user?.gradeLevel[user.grade - 1]?.[subjectGame] + 1 || 1;
    const numOfLevels = 30
    const levelPercentage = ((playersLevel - 1) / numOfLevels) * 100;

    // Fetch players level in specific subject and grade

    return (
        <div className="relative min-h-[100vh] w-full flex flex-col items-center justify-start pt-12 pb-24 px-4 overflow-hidden"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
            <div className="flex items-center gap-4 mb-8">
                <img
                    src={IconMap[subjectGame]}
                    alt={`${subjectGame} icon`}
                    className="w-16 h-16 object-contain drop-shadow-md"
                />
                <h1 className="text-3xl md:text-4xl font-bold text-[#3B2F2F] drop-shadow-sm">
                    {subjectGame} - Choose your level!
                </h1>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-screen-lg px-4 mb-6">
                <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                        className="bg-green-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${levelPercentage}%` }}
                    ></div>
                </div>
                <p className="text-center text-sm mt-2">
                    {Math.round(levelPercentage)}% Complete
                </p>
            </div>
            <LevelCircle currentLevel={playersLevel} numOfLevels={numOfLevels} />
        </div>
    )
}

export default LevelsPage;