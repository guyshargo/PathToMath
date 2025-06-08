import React from "react";

function darkenHexColor(hex, amount = 0.2) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.floor(r * (1 - amount));
    g = Math.floor(g * (1 - amount));
    b = Math.floor(b * (1 - amount));

    return `rgb(${r}, ${g}, ${b})`;
}

const ShadowedTitle = ({ text, shadowColor = "#000000" }) => {
    const darkerColor = darkenHexColor(shadowColor);

    return (
        <div className="relative w-fit leading-none z-0">
            <h1
                className="text-3xl md:text-5xl font-bold absolute top-[3px] left-[4px] whitespace-nowrap"
                style={{ color: darkerColor}}
            >
                {text}
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold text-white whitespace-nowrap relative">
                {text}
            </h1>
        </div>
    );
};

export default ShadowedTitle;
