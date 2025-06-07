export const generateRandomGame = (subjectGame) => {
    const gameArray = [
        "OptionsGame",
        "RaceGame", 
        "WordGame"
    ];

    if (subjectGame === "Addition") {
        gameArray.push("GameCube");
    }

    const randomIndex = Math.floor(Math.random() * gameArray.length);
    return gameArray[randomIndex];
};
