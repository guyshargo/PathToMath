import {React,use,useEffect} from "react";
import { useState } from "react";
import { useGrade } from "../Main/GradeComponent";
import {useSubject} from "../Main/SubjectComponent";
import Levels from "./Levels";


function GameLevel() {
    const {gameSubject} = useSubject();

     // Handle case where no subject is selected
     if (!gameSubject) {
        return (
            <div className="text-center mt-8">
                <h1 className="text-2xl font-bold">No Subject Selected</h1>
                <p>Please select a subject to start the game.</p>
            </div>
        );
    }
    
    const { level, numOfLevels, subject } = gameSubject; 


    // Save to localStorage when subject or level changes
    useEffect(() => {
        localStorage.setItem("currentSubject", subject);
        localStorage.setItem("currentLevel", level);
    }, [subject, level]);

    return (
            <h1 className="text-4xl font-bold text-center mt-4 mb-2">
                {subject}
                <Levels currentLevel={level} numOfLevels={numOfLevels} />
            </h1>
    );

}

export default GameLevel;
