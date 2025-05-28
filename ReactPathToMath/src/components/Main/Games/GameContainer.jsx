import React from 'react';
import ButtonComponent from '../../Utils/Button';
import { useNavigate } from 'react-router-dom';
import TitleImg from '../../../assets/Images/CompetitionGame/RaceGameTitle.png'
import BackgroundImg from '../../../assets/Images/nature2.png'

/**
 * Game Container Component
 * @param {Object} props - The component props
 * @param {string} props.gameName - The name of the game
 * @param {string} props.gameSubject - The subject of the game
 * @param {string} props.gameLevel - The level of the game
 * @param {React.ReactNode} props.children - The children of the component
 * @returns {React.ReactNode} The rendered component
 */
function GameContainer({ gameName, gameSubject, gameLevel, children }) {
    const navigate = useNavigate();

    /**
     * Handles the return button click event
     */
    const handleReturn = () => {
        navigate('/subjects');
    };

    return (
        <div
            className="h-full font-sans playful-font antialiased flex flex-col"
            style={{
                backgroundImage: `url(${BackgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Game Header */}
            <div className="text-center p-8">
                {/* Main game name with race flag */}
                <h1 className="text-6xl font-extrabold text-black flex justify-center items-center space-x-3 select-none">
                    <span>{gameName}</span>
                    <img src={TitleImg} alt="Race Game Title" className="w-30 h-auto" />
                </h1>

                {/* Subject and Level badges */}
                <div className="flex justify-center space-x-4">
                    <span className="bg-yellow-300 text-yellow-900 font-semibold px-4 py-1 rounded-full shadow-md select-none">
                        {gameSubject}
                    </span>
                    <span className="bg-green-300 text-green-900 font-semibold px-4 py-1 rounded-full shadow-md select-none">
                        {gameLevel}
                    </span>
                </div>
            </div>

            {/* Game Container */}
            <div className="flex-grow text-center text-black space-y-6 scale-110 p-6 mx-auto max-w-6xl w-full bg-white rounded-lg shadow-lg mt-8">
                {children}
            </div>

            {/* Return Button */}
            <div className="flex justify-start w-full p-6">
                <ButtonComponent
                    label="Return"
                    onClick={handleReturn}
                    bgColor="bg-blue-400 hover:bg-blue-700"
                    textColor="text-white"
                    size="md"
                />
            </div>
        </div>
    );
}

export default GameContainer;
