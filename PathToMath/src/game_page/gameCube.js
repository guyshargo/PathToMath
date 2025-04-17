
const levelHeader = document.getElementById('gameLevelHeader');
const gameHeader = document.getElementById('gameHeader');
const gameOptions = document.getElementById('gameOptions');
const gameAnswer = document.getElementById('gameAnswer');
const game = document.getElementById('game');
const check = document.getElementById('check');

let correctAnswers = 0;
let questions = [];
let questionObject;
let numOfQuestions = 5;
let data = {};
let selected = [];
let tries;
let solve = []

//reset game
function resetGame() {
    gameHeader.innerHTML = "";
    gameAnswer.innerHTML = "";
    gameOptions.innerHTML = "";
    game.classList.remove("hidden");

    let nextBtn = document.getElementById("nextQuestionBtn");
    let endGameBtn = document.getElementById("endGameBtn");

    if (nextBtn) document.body.removeChild(nextBtn);
    if (endGameBtn) game.removeChild(endGameBtn);
}

// function to generate new question with new sum to calculate
function generateQuestion(){
    let sum = Math.floor(Math.random() * 15) + 1;
    let cubesOptions = [];
    cubesOptions = generateCubes(sum);
    let questionText = `${sum}`;
    return {
        question: questionText,
        options: cubesOptions,
        answer: sum
    };
}

//create random dice cubes
function generateCubes(sum){
    let validCubes = false;
    let cubes = [];

    while (!validCubes){
        cubes = [];
        for (let i=0; i < 6; i++){
            cubes.push(Math.floor(Math.random() * 6) + 1);
        }
        validCubes = isCubesValid(cubes,sum);
    }
    return cubes;
}

//check if possible to create sum from given cubes
function isCubesValid(cubesArr, target, index = 0){
    if (target == 0){ 
        return true;
    }
    if (index >= cubesArr.length){
         return false;
    }
    return isCubesValid(cubesArr, target - cubesArr[index], index + 1) || isCubesValid(cubesArr, target, index + 1);
}

// function to find suggested solution. using dynamic programing.
function findSolution(cubes, target) {
    const n = cubes.length;
    const dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(false));
    const parent = Array.from({ length: n + 1 }, () => Array(target + 1).fill(null));
    dp[0][0] = true;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= target; j++) {
            // not taking current cube
            if (dp[i - 1][j]) {
                dp[i][j] = true;
                parent[i][j] = j;
            }
            // take current cube
            const cube = cubes[i - 1];
            if (j >= cube && dp[i - 1][j - cube]) {
                dp[i][j] = true;
                parent[i][j] = j - cube;
            }
        }
    }
    //find reversed sol
    const sol = [];
    let i = n, j = target;
    while (j !== 0) {
        if (parent[i][j] !== j) {
            sol.push(i - 1); 
            j = parent[i][j];
        }
        i--;
    }
    return sol.reverse(); 
}


function renderGame() {
    selected = [];
    gameOptions.innerHTML = '';
    gameAnswer.innerHTML = '';
    let selectedSum = 0;
    tries = 2;
    const resultEl = document.createElement('div');
    resultEl.textContent = ``;


    const checkButton = document.createElement('button');
    checkButton.id = "answer";
    checkButton.classList.add("text-2xl", "bg-pink", "border-4", "border-blue-200",
        "shadow-md", "rounded-lg", "px-8", "py-4", "hover:bg-red-100", "transition");
        checkButton.textContent = "Check";

    questionObject = questions[0];
    gameHeader.innerHTML = questionObject.question;
    for (let i=0; i < questionObject.options.length; i++) {
        addCubesBtnHTML(questionObject.options[i], i);
    }
    checkButton.onclick = function () {
        resultEl.innerHTML = '';
        if (selected.length === 0) {
            alert("No dice was clicked!");
            return;
        }
        selectedSum = 0;
        for (let index of selected) {
            selectedSum += Number(document.getElementById(index).value);
        }
        if (selectedSum == questionObject.answer) { //correct answer
            checkAnswer(selectedSum, checkButton);
        } else {
            tries--;
            if (tries > 0) {
                // Create result message
                resultEl.innerHTML = `Wrong! your sum is ${selectedSum}.<br> You have ${tries} tries left. Try again!`;
                resultEl.classList.add("text-2xl", "mb-4", "font-bold");
                // Insert result message at the TOP of gameAnswer                   
                gameAnswer.insertBefore(resultEl, checkButton);
                selected = [];
    
                // Reset cube button 
                gameOptions.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove("bg-gray-300");
                    btn.classList.add("bg-white");
                });
            } else {
                checkAnswer(selectedSum, checkButton);   
            }
        }
    };
    gameAnswer.appendChild(checkButton);
}

// create cubes objects on screen
function addCubesBtnHTML(cube,idx) {
    const button = document.createElement('button');
    button.id = idx;
    button.value = cube; 
    button.classList.add(
        "bg-white", "border-4", "border-blue-300", "shadow-lg",
        "rounded-xl", "w-24", "h-24", "flex", "items-center", "justify-center",
        "hover:bg-blue-100", "transition", "duration-300", "ease-in-out"
    );
    const img = document.createElement('img');
    img.src = `/PathToMath/src/game_page/diceImage/${cube}.png`; // load image by value of given cube
    img.alt = `${cube}.png`;
    img.classList.add( "w-16", "h-16");
    button.appendChild(img);

    // highlight selected cubes
    button.onclick = function () {
        const cubeValue = button.id;
        const index = selected.indexOf(cubeValue);
        // if user select or deselect option
        if (index == -1) {
            selected.push(cubeValue);
            button.classList.remove("bg-white");
            button.classList.add("bg-gray-300");
        } else {
            selected.splice(index, 1);
            button.classList.remove("bg-gray-300");
            button.classList.add("bg-white");
        }
    };
    gameOptions.appendChild(button);
}

// functiopn to check if user answer is correct
function checkAnswer(sumAnswer, button) {
    let answerText = "";
    let color = "";
    if (sumAnswer == questionObject.answer) {
        answerText = "Correct!";
        color = "green";
        correctAnswers += 1;
    } else {
        answerText = `Wrong! your sum is ${sumAnswer}, you are out of tries.`;
        color = "red";
        //suggest solution when player failed
        solve = findSolution(questionObject.options,questionObject.answer);
        solve.forEach(idx => {
            const cubeBtn = document.getElementById(idx);
            cubeBtn.classList.remove("bg-white", "bg-gray-300");
            cubeBtn.classList.add("bg-green-300");
        });
    }

    // Create result message
    const resultEl = document.createElement('div');
    resultEl.textContent = answerText;
    resultEl.classList.add("text-2xl", "mb-4", "font-bold");

    // Insert result message at the TOP of gameAnswer
    gameAnswer.insertBefore(resultEl, button);

    // Disable check button + cubes
    button.disabled = true;
    button.classList.add("opacity-50", "cursor-not-allowed");
    gameOptions.querySelectorAll('button').forEach(btn => btn.disabled = true);

    // Create Next button
    const nextBtn = document.createElement('button');
    nextBtn.id = "nextQuestionBtn";
    nextBtn.onclick = () => nextQuestionClicked();
    nextBtn.classList.add(`border-${color}-300`);
    nextBtn.classList.add("rounded-lg","border-4","bg-gray-100", "text-black","justify-center",
        "font-bold", "px-6", "py-3", "rounded", "shadow", "hover:bg-gray-200", "transition");
    nextBtn.textContent = "Next Question";
    //show next question button instead "check" button
    gameAnswer.replaceChild(nextBtn,button);
}

// function for load next question
function nextQuestionClicked() {
    questions.splice(0, 1);
    resetGame();
    
    if (questions.length >= 1) {
        renderGame();
    } else {
        game.classList.add("hidden");

        let endGameBtn = document.createElement("button");
        endGameBtn.id = "endGameBtn";
        endGameBtn.classList.add("text-3xl", "bg-white", "border-4", "border-blue-200",
            "shadow-md", "rounded-lg", "px-8", "py-5", "hover:bg-blue-300", "transition","justify-center");
        //finish level and moving forword to next level
        if (correctAnswers >= 4) {
            levelHeader.textContent = `Great! You answered ${correctAnswers} / ${numOfQuestions} Correct Answers.`;
            data.finished = true;
            localStorage.setItem("finishedGame", JSON.stringify(data));
            localStorage.removeItem("game");

            endGameBtn.onclick = function () {
                window.location.href = "../subject_levels/subjectsLevelsPage.html";
            };
            endGameBtn.textContent = "Next Level";

        } else {
            levelHeader.textContent = `Oh no! You answered ${correctAnswers} / ${numOfQuestions} Correct Answers.`;
            endGameBtn.onclick = function () {
                correctAnswers = 0;
                questions = [];
                selected = [];
                loadGame();
            };

            endGameBtn.textContent = "Try Again?";
        }
        gameAnswer.appendChild(endGameBtn);
        
        
    }
}
// load game
function loadGame() {
    resetGame();
    createGame();
    renderGame();
}

// function to create game
function createGame(){
    levelHeader.textContent = "Cube Addition";
    questions = [];
    while (questions.length < numOfQuestions){
        const question = generateQuestion();
        questions.push(question);
    }
}

function returnBtnClicked() {
    window.location.href = "../subject_levels/subjectsLevelsPage.html";
}

loadGame();
