import React from "react";
import { useNavigate } from "react-router-dom";
import { useSubject } from "../Main/SubjectComponent";
function SubjectBtn({ math_btn }) {
    if (!math_btn) {
        console.error("math_btn is undefined");
        return null;
    }
    const { selectSubject } = useSubject();
    const navigate = useNavigate();
    const handleClick = (selectedSubject) => {
        selectSubject(selectedSubject);
        localStorage.setItem("currentSubject", selectedSubject);
        navigate("/gameLevel");
    }
    // Use a fixed set of background colors to ensure Tailwind picks them up
    const color_bg = {
        yellow: "bg-yellow-300 hover:bg-yellow-400",
        blue: "bg-blue-300 hover:bg-blue-400",
        pink: "bg-pink-300 hover:bg-pink-400",
        green: "bg-green-300 hover:bg-green-400",
        purple: "bg-purple-300 hover:bg-purple-400"
    };
    const color_txt = {
        yellow: "text-yellow-800",
        blue: "text-blue-800",
        pink: "text-pink-800",
        green: "text-green-800",
        purple: "text-purple-800"
    };

    const color_background = color_bg[math_btn.color] || "bg-gray-100";
    const color_text = color_txt[math_btn.color] || "text-gray-800";
    return (
        <button
            className={`${color_background} ${color_text} font-bold py-6 px-4 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 w-44 h-44 transition-all duration-300 hover:scale-105 hover:animate-softBounce`}
            onClick={() => handleClick(math_btn.class)}
        >
            <span className="text-5xl">{math_btn.signSymbol}</span>
            <span className="text-lg">{math_btn.class}</span>
        </button>
    );
}

export default SubjectBtn;
