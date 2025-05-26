import React, { useState, useEffect } from "react";
import background from '../../../assets/Images/Background/white_background.png';
import { useNavigate } from 'react-router-dom';
import { useGrade } from '../../Utils/GradeComponent.jsx';
import { useParams } from 'react-router-dom';
import LevelCircle from "./LevelCircle.jsx";




const LevelsPage = () => {
    const { subjectGame } = useParams();
    const { grade } = useGrade();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!subjectGame) {
        return (
                        <div className="text-center mt-8">
                <h1 className="text-2xl font-bold">No Subject Selected</h1>
                <p>Please select a subject to start the game.</p>
            </div>
        )
    }
    // temporary hardcoded values
    const playersLevel = 6
    const numOfLevels = 30
    
    // Fetch players level in specific subject and grade

    return (
        <div className="relative min-h-[100vh] w-full flex flex-col items-center justify-start pt-12 pb-24 px-4 overflow-hidden"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
            <h1 className="text-4xl md:text-5xl font-bold text-[#3B2F2F] mb-10 drop-shadow-sm">
                Choose your level!
            </h1>
            {/* Progress Bar */}
            <div className="w-full max-w-screen-lg px-4 mb-6">
                <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                        className="bg-green-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${((playersLevel - 1) / numOfLevels) * 100}%` }}
                    ></div>
                </div>
                <p className="text-center text-sm mt-2">
                    {Math.round(((playersLevel - 1) / numOfLevels) * 100)}% Complete
                </p>
            </div>
            <LevelCircle currentLevel={playersLevel} numOfLevels={numOfLevels} />
        </div>
    )
}

export default LevelsPage;
