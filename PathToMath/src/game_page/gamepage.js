const levelHeader = document.getElementById('gameLevelHeader');
const gameHeader = document.getElementById('gameHeader');
const gameOptions = document.getElementById('gameOptions');
const gameAnswer = document.getElementById('gameAnswer');
const game = document.getElementById('game');
const returnBtn = document.getElementById("returnBtn");

let correctAnswers = 0;
let questions = [];
let questionObject;
let numOfQuestions = 5;
let data;

/**
 * Resets the game interface by clearing all game content and removing any buttons.
 */
function resetGame() {
    gameHeader.innerHTML = "";
    gameAnswer.innerHTML = "";
    gameOptions.innerHTML = "";

    let nextBtn = document.getElementById("nextQuestionBtn");
    let endContainer = document.getElementById("endContainer");
    if (nextBtn) document.body.removeChild(nextBtn);
    if (endContainer) game.removeChild(endContainer);

    game.style.backgroundColor = "white";
}

/**
 * Generates a random number based on the game level.
 * @param {number} level - The current game level used to adjust the difficulty.
 * @returns {number} A random integer within the appropriate range for the level.
 */
function generateVariable(level) {
    let mathLevel = Math.floor(level / 10) + 1;
    let min = 1 + (mathLevel - 1) * 5;
    let max = 10 * mathLevel;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates an incorrect option for the multiple-choice answers.
 * @param {string} subject - The math subject.
 * @param {number} level - The current difficulty level.
 * @param {number} answer - The correct answer to base the fake option around.
 * @returns {number} A random number that is close to the actual answer.
 */
function generateOption(subject, level, answer) {
    let mathLevel = Math.floor(level / 10) + 1;
    let offset = Math.max(2, mathLevel * 2);
    let minBorder;
    let maxBorder;

    minBorder = answer - offset;
    maxBorder = answer + offset;

    let option = (Math.random() * (maxBorder - minBorder) + minBorder);

    return Math.round(option);
}

/**
 * Creates a math question object with variables, an answer, and options.
 * @param {string} subject - The type of math problem.
 * @param {number} level - The game level to determine difficulty.
 * @returns {Object} A question object containing a question string, correct answer, and options array.
 */
function makeQuestion(subject, level) {
    let var1 = generateVariable(level);
    let var2 = generateVariable(level);
    let answer;
    let mathAction;
    let options = [];

    switch (subject) {
        case "Addition":
            mathAction = "+";
            answer = var1 + var2;
            break;

        case "Subtraction":
            mathAction = "-";
            answer = var1 - var2;
            break;

        case "Multiply":
            mathAction = "X";
            answer = var1 * var2;
            break;

        case "Division":
            mathAction = "/";
            var2 = generateVariable(level);
            let quotient = generateVariable(level);
            var1 = var2 * quotient;
            answer = quotient;
            break;

        case "Percentage":
            mathAction = "%";
            var2 = generateVariable(level);
            const simplePercents = [5, 10, 20];
            let chosenPercent = simplePercents[Math.floor(Math.random() * simplePercents.length)];
            let attemptCount = 0;

            while (chosenPercent === 5 && var2 < 20 && attemptCount < 10) {
                var2 = generateVariable(level);
                attemptCount++;
            }

            if (attemptCount >= 10) {
                var2 = Math.max(var2, 20);
            }

            var1 = Math.round((chosenPercent / 100) * var2);
            answer = parseFloat(((var1 / var2) * 100).toFixed(2));

            if (answer === 0) {
                var2 = generateVariable(level);
                var1 = Math.round((chosenPercent / 100) * var2);
                answer = parseFloat(((var1 / var2) * 100).toFixed(2));
            }
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

    let questionText;
    if (subject === "Percentage") {
        questionText = `What percent is ${var1} of ${var2}?`;
    } else {
        questionText = `What's ${var1} ${mathAction} ${var2}?`;
    }

    return {
        question: questionText,
        var1,
        var2,
        answer,
        options
    }
}

/**
 * Initializes the game with a set number of questions based on the subject and level.
 * Ensures no duplicate questions are included.
 * @param {Object} data - The game configuration containing `subject` and `level` keys.
 */
function createGame(data) {
    if (data.subject && data.level) {
        levelHeader.textContent = `${data.subject} - Level ${data.level}`;

        while (questions.length < numOfQuestions) {
            let question = makeQuestion(data.subject, data.level);
            let isDuplicate = false;

            for (let existing of questions) {
                const isSameOrder = question.var1 === existing.var1 && question.var2 === existing.var2;
                const isReversedOrder = question.var1 === existing.var2 && question.var2 === existing.var1;

                if (data.subject === "Addition" || data.subject === "Multiply") {
                    if (isSameOrder || isReversedOrder) {
                        isDuplicate = true;
                        break;
                    }
                } else {
                    if (isSameOrder) {
                        isDuplicate = true;
                        break;
                    }
                }
            }

            if (!isDuplicate) {
                questions.push(question);
            }
        }
    }
}


/**
 * Loads the game level configuration and starts generating the game.
 */
function loadGameLevel() {
    const dailyData = localStorage.getItem('dailyQuiz');
    data = JSON.parse(dailyData);

    if (data) {
        data.daily = true;
        createGame(data);
        renderGame();
    }
    else {
        const gameData = localStorage.getItem('game');
        data = JSON.parse(gameData);

        if (data) {
            data.daily = false;
            createGame(data);
            renderGame();
        }
        else {
            levelHeader.textContent = "Undefined Level";
            gameHeader.innerHTML = "Undefined";
        }
    }
}

/**
 * Renders the current question and its options onto the page.
 */
function renderGame() {
    questionObject = questions[0];
    gameHeader.innerHTML = questionObject.question;
    for (let option of questionObject.options) {
        addOptionHTML(option);
    }
}

/**
 * Creates and appends a button for a given answer option.
 * @param {number|string} option - The value to be displayed on the button and used for answer checking.
 */
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

/**
 * Handles what happens when a user selects an answer.
 * @param {string|number} answer - The selected answer's value (button ID).
 * @param {HTMLElement} button - The button element that was clicked.
 */
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

        gameOptions.childNodes.forEach(child => {
            if (child.id == questionObject.answer) {
                child.classList.remove("border-blue-200", "bg-white", "hover:bg-blue-300");
                child.classList.add(`border-green-600`, `bg-green-200`);
            }
        });
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

/**
 * Handles the transition to the next question or ends the game if no questions are left.
 */
function nextQuestionClicked() {
    questions.splice(0, 1);
    resetGame();

    if (questions.length >= 1) {
        renderGame();
    }
    else {
        game.appendChild(generateEnd());
    }
}


function generateEnd() {
    const endContainer = document.createElement("div");
    let endGameBtn = document.createElement("button");
    let endImg = document.createElement("img");
    let color = "";

    endContainer.id = "endContainer";
    endContainer.classList.add("flex", "flex-col", "items-center", "justify-center", "gap-4");
    endImg.classList.add("h-60","w-auto","max-w-full","object-contain");
    endGameBtn.classList.add("text-3xl",  "border-4", "shadow-md", "rounded-lg", "px-8", "py-5",  "transition");

    if (correctAnswers >= 4) {
        data.finished = true;
        color = "green";
        game.style.backgroundColor = "#D6F6D5";
        
        levelHeader.textContent = `Great! You answered ${correctAnswers} / ${numOfQuestions} Correct Answers.`;
        gameHeader.textContent ="Continue to the next level!";
        endImg.src = "/src/Images/success.png";

        endGameBtn.onclick = function () {
            if (data.daily) {
                localStorage.removeItem("dailyQuiz");
            }
            else {
                localStorage.removeItem("game");
            }
            returnBtn.click();
        };

        if (data.daily) {
            endGameBtn.textContent = "Back to Main";
        }
        else {
            localStorage.setItem("finishedGame", JSON.stringify(data));
            endGameBtn.textContent = "Complete";
        }

    }
    else {
        color = "red";
        game.style.backgroundColor = "#ffd3d3";

        levelHeader.textContent = `Oh no! You answered ${correctAnswers} / ${numOfQuestions} Correct Answers.`;
        gameHeader.textContent ="Try Again?";
        endImg.src = "/src/Images/failure.png";

        endGameBtn.onclick = function () {
            correctAnswers = 0;
            resetGame();
            loadGameLevel();
        };
        endGameBtn.textContent = "Again!";
    }

    endGameBtn.classList.add(`bg-${color}-100`,`border-${color}-200`, `hover:bg-${color}-300`);

    endContainer.appendChild(endImg);
    endContainer.appendChild(endGameBtn);
    return endContainer;
}

function returnBtnClicked(){
    history.back();
}

function dailyQuizDone() {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayIndex = new Date().getDay();
    const todayName = dayNames[todayIndex];

    localStorage.setItem(todayName, data.finished);
}

loadGameLevel();