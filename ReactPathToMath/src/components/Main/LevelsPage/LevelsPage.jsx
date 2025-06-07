import React, { useEffect, useState } from "react";
import background from '../../../assets/Images/nature2.png'
import { useNavigate, useParams } from 'react-router-dom';
import LevelCircle from "./LevelCircle.jsx";
import addition from '../../../assets/Images/Math_icon/addition_purple.png';
import subtraction from '../../../assets/Images/Math_icon/minus.png';
import multiplication from '../../../assets/Images/Math_icon/multi.png';
import division from '../../../assets/Images/Math_icon/division1.png';
import percentage from '../../../assets/Images/Math_icon/percentage.png';
import SubjectCircle from "../HomePage/SubjectCircle.jsx";
import { useGrade } from '../../Utils/GradeComponent';
import { useUser } from "../../Utils/UserContext";
import ShadowedTitle from "../../Utils/ShadowedTitle.jsx";
import ButtonComponent from '../../Utils/Button.jsx'

const subjectsData = {
    Addition: {
        icon: addition,
        color: '#E0BBE4',
    },
    Subtraction: {
        icon: subtraction,
        color: '#FFABAB',
    },
    Multiplication: {
        icon: multiplication,
        color: '#B5EAD7',
    },
    Division: {
        icon: division,
        color: '#C7CEEA',
    },
    Percentage: {
        icon: percentage,
        color: '#FFDAC1',
    },
};

const LevelsPage = () => {
    const { subjectGame } = useParams();
    const { grade } = useGrade();
    const { user } = useUser();
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setPopup(!user);
    }, [user]);

    if (!subjectGame) {
        return (
            <div className="text-center mt-8">
                <h1 className="text-2xl font-bold">No Subject Selected</h1>
                <p>Please select a subject to start the game.</p>
            </div>
        )
    }
    // Check if the subjectGame exists in the user's gradeLevel
    const playersLevel = user?.gradeLevel[grade - 1]?.[subjectGame] + 1 || 1;
    const numOfLevels = 30
    const levelPercentage = ((playersLevel - 1) / numOfLevels) * 100;

    // Handle the popup click
    const handlePopupClick = (outsideClick) => {
        if (outsideClick) setPopup(false);
    }

    // Popup component
    const PopUp = () => {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray/10 backdrop-blur-sm" onClick={() => handlePopupClick(true)}>
                <div
                    className="bg-white p-5 rounded-xl shadow-lg text-center"
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePopupClick(false);
                    }}
                >
                    {/* Close button */}
                    <div className="flex justify-end w-full">
                        <button className="bg-red-500 text-white rounded px-2 hover:bg-red-400 transition-all duration-300" onClick={() => handlePopupClick(true)}>X</button>
                    </div>

                    {/* Popup content */}
                    <div className="flex flex-col items-center justify-center p-4">
                        <h2 className="text-xl font-bold mb-4">For more levels, please sign up to account!</h2>

                        {/* Sign up button */}
                        <div className="flex justify-center gap-4">
                            <ButtonComponent
                                label="Sign up"
                                bgColor="bg-orange-500"
                                onClick={() => navigate('/signup')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative playful-font min-h-[100vh] w-full flex flex-col items-center justify-start pt-7 px-4 overflow-hidden"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-6">
                    <SubjectCircle
                        imageSrc={subjectsData[subjectGame]?.icon}
                        title={subjectGame}
                        variant="circle"
                        circleColor={subjectsData[subjectGame]?.color || "#D3D3D3"}
                        size={150}
                        clickable={false}
                    />
                    <ShadowedTitle
                        text="In Each Level a Random Game Awaits You!"
                        shadowColor={subjectsData[subjectGame]?.color}
                    />
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-screen-lg px-4 mb-6">
                <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                        className="bg-green-400 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${levelPercentage}%` }}
                    ></div>
                </div>
                <p className="text-center text-sm mt-2 text-gray-800 mb-4">
                    {Math.round(levelPercentage)}% Complete
                </p>
            </div>
            <LevelCircle currentLevel={playersLevel} numOfLevels={numOfLevels} grade={grade} />

            {/* Popup */}
            {popup && <PopUp />}
        </div>
    )
}

export default LevelsPage;