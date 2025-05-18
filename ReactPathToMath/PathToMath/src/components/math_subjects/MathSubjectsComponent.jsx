import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGrade } from '../Main/GradeComponent';
import SubjectBtn from "./subjectBtn";

function MathSubjectsComponent() {

    const { grade } = useGrade() 


    // Define button configurations
    const buttonConfigs = [
        { class: "Addition", color: "yellow", signSymbol: "+" },
        { class: "Subtraction", color: "blue", signSymbol: "-" },
        { class: "Multiplication", color: "pink", signSymbol: "x" },
        { class: "Division", color: "green", signSymbol: "/" },
        { class: "Percentage", color: "purple", signSymbol: "%" }
    ];

    const buttons = buttonConfigs.slice(0, grade);
    return (
        <div className="flex flex-wrap gap-6 justify-center items-center mt-8 py-10">
            {buttons.map((subject) => (
                <SubjectBtn key = {subject.class} math_btn={subject}/>
            ))}
        </div>
    );

}

export default MathSubjectsComponent;