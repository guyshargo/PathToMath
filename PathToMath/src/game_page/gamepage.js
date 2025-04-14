const container = document.getElementById('gameContainer');
const levelHeader = document.getElementById('gameLevelHeader');
const gameHeader = document.getElementById('gameHeader');
const gameOptions = document.getElementById('gameOptions');
const gameAnswer = document.getElementById('gameAnswer');

let correctAnswers = 0;
let questions = [];
let questionObject;
let numOfQuestions = 5;

function resetGame() {
    gameHeader.innerHTML = "";
    gameAnswer.innerHTML = "";
    gameOptions.innerHTML = "";
    let nextBtn = document.getElementById("nextQuestionBtn");
    document.body.removeChild(nextBtn);
}

function generateVariable(level) {
    let mathLevel = Math.floor(level / 10) + 1;
    return Math.floor(Math.random() * (10 * mathLevel));
}

function generateOption(subject, level, answer) {
    let mathLevel = Math.floor(level / 10) + 1;
    let minBorder;
    let maxBorder;

    switch (subject) {
        case "Addition":
        case "Substraction":
            minBorder = answer - mathLevel;
            maxBorder = answer + mathLevel;
            break;
        case "Multiply":
            minBorder = answer - 2 * mathLevel;
            maxBorder = answer + 2 * mathLevel;
            break;
        case "Division":
        case "Percentage":
            minBorder = answer - 5 * mathLevel;
            maxBorder = answer + 5 * mathLevel;
            break;
    }

    let option = (Math.random() * (maxBorder - minBorder) + minBorder);

    if (subject === "Division" || subject === "Percentage") {
        return parseFloat(option.toFixed(2));
    } else {
        return Math.round(option);
    }

}

function makeQuestion(subject, level) {
    let var1 = generateVariable(level);
    let var2 = generateVariable(level);
    let answer;
    let mathAction;
    let options = [];

    if ((subject === "Division" || subject === "Percentage") && var2 === 0) {
        var2 = 1;
    }

    switch (subject) {
        case "Addition":
            mathAction = "+";
            answer = var1 + var2;
            break;
        case "Substraction":
            mathAction = "-";
            answer = var1 - var2;
            break;
        case "Multiply":
            mathAction = "X";
            answer = var1 * var2;
            break;
        case "Division":
            mathAction = "/";
            answer = var1 / var2;
            answer = parseFloat(answer.toFixed(2));
            break;
        case "Percentage":
            mathAction = "%";
            answer = (var1 / var2) * 100;
            answer = parseFloat(answer.toFixed(2));
            break;
        default:
            return null;
    }

    while (options.length < 3) {
        let fakeAnswer = generateOption(subject, level, answer);

        if (options.indexOf(fakeAnswer) == -1 && fakeAnswer != answer) {
            options.push(fakeAnswer);
        }
    }
    let insertIndex = Math.floor(Math.random() * options.length + 1);
    options.splice(insertIndex, 0, answer);

    return {
        question: `What's ${var1} ${mathAction} ${var2} ?`,
        answer,
        options
    }
}

function createGame(data) {
    if (data.subject && data.level) {
        levelHeader.textContent = data.subject + " : Level " + data.level;

        for (let i = 0; i < numOfQuestions; i++) {
            let question = makeQuestion(data.subject, data.level);
            questions.push(question);
        }
    }
}

function loadGameLevel() {
    //const gameData = localStorage.getItem('game');
    //const data = JSON.parse(gameData);

    const data = {
        subject: "Addition",
        level: 20
    }

    if (data) {
        createGame(data);
    }
    else {
        levelHeader.textContent = "Undefined Level";
        gameHeader.innerHTML = "Undefined";
    }
    renderGame();
}

function renderGame() {
    questionObject = questions[0];
    gameHeader.innerHTML = questionObject.question;
    for (let option of questionObject.options) {
        addOptionHTML(option);
    }
}


function addOptionHTML(option) {
    const button = document.createElement('button');
    button.id = option;

    button.classList.add("text-3xl", "bg-white", "border-4", "border-blue-200",
        "shadow-md", "rounded-lg", "px-8", "py-5", "hover:bg-blue-300", "transition");

    button.textContent = option;
    button.onclick = function () {
        optionClicked(button.id, button);
    };
    gameOptions.appendChild(button);
}

function optionClicked(answer, button) {
    let answerLabel = document.createElement("label");
    let answerText = "";
    let answerColor = "";
    answerLabel.classList.add("text-4xl");

    if (answer == questionObject.answer) {
        answerText = "Correct!"
        answerColor = "green";
        correctAnswers += 1;
    }
    else {
        answerText = "Wrong!"
        answerColor = "red";
    }

    answerLabel.innerHTML = answerText;
    answerLabel.classList.add(`text-${answerColor}-600`);
    gameAnswer.innerHTML = "";
    gameAnswer.appendChild(answerLabel);

    button.classList.remove("border-blue-200", "bg-white", "hover:bg-blue-300");
    button.classList.add(`border-${answerColor}-600`, `bg-${answerColor}-200`);

    let nextButton = document.createElement("button");
    nextButton.id = "nextQuestionBtn";
    nextButton.onclick = function () {
        nextQuestionClicked();
    };
    nextButton.classList.add("absolute", "bottom-6", "right-6", "bg-gray-100", "text-black",
        "font-bold", "px-6", "py-3", "rounded", "shadow", "hover:bg-gray-200", "transition");
    nextButton.textContent = "Next Question";

    document.body.appendChild(nextButton);
    gameOptions.querySelectorAll("button").forEach(childBtn => {
        if (childBtn !== button) {
            childBtn.classList.add("opacity-50");
        }
        childBtn.disabled = true;
        childBtn.classList.add("cursor-not-allowed");
    });
}

function nextQuestionClicked() {
    questions.splice(0, 1);
    resetGame();

    if (questions.length > 1) {
        renderGame();
    }
    else {
        levelHeader.textContent = `You finished ${correctAnswers} / ${numOfQuestions} Correct Answers`;
    }
}

loadGameLevel();