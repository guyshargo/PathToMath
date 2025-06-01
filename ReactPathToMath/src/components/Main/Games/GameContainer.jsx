import React, { useState } from 'react';
import ButtonComponent from '../../Utils/Button';
import { useNavigate } from 'react-router-dom';
import GameCube from './GameCube';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
/**
 * Game Container Component
 * @param {Object} props - The component props
 * @param {string} props.gameName - The name of the game
 * @param {string} props.gameSubject - The subject of the game
 * @param {string} props.gameLevel - The level of the game
 * @param {React.ReactNode} props.children - The children of the component
 * @returns {React.ReactNode} The rendered component
 */
function GameContainer({ gameName, gameSubject, children }) {
    const navigate = useNavigate();
    const { level } = useParams();
    const gameLevel = Number(level);

    const title = gameName + " - " + gameSubject + " - " + gameLevel;
    /**
     * Handles the return button click event
     */
    const handleReturn = () => {
        navigate('/subjects');
    };

    return (
        <div className="bg-blue-50 font-sans antialiased min-h-screen">
            {/* Game Header */}
            <h1 className="text-5xl font-bold p-3">{title}</h1>

            {/* Game Container */}
            <div className="text-center space-y-6 scale-110">
                {children}
            </div>
            <h1>
                {gameLevel}
            </h1>

            {/* Return Button */}
            <div className="flex w-full items-left p-4">
                <ButtonComponent
                    label="Return"
                    onClick={handleReturn}
                    bgColor="bg-blue-500"
                    textColor="text-white"
                    size="md"
                />
            </div>
        </div>
    );
  
}

export default GameContainer;
