const gridHeader = document.getElementById('gridHeader');
const levelGrid = document.getElementById('levelGrid');

let user = JSON.parse(localStorage.getItem('currentUser'));
let numOfLevels = 30;
let data;

function makeLevel(level) {
    let color = "";
    let fontColor = "";
    let disable = false;

    if (level <= data.finishedLevel) {
        color = "#A9F98C";
        fontColor = "black";
    }
    else if (level == data.finishedLevel + 1) {
        color = "#FFB35C";
        fontColor = "black";
    }
    else {
        color = "#D3D3D3";
        fontColor = "#9D9D9D";
        disable = true;
    }

    return { level: level, color: color, fontColor: fontColor, disable: disable };
}

function loadSubjectLevels() {
    const gameSubject = localStorage.getItem("Subject");
    const currentGrade = user.currentGrade;
    const finishedGame = localStorage.getItem("finishedGame");
    const finishData = JSON.parse(finishedGame);

    if (finishData) {
        localStorage.removeItem("finishedGame");

        const levelForSubject = user.gradeLevel[currentGrade - 1][`${gameSubject}`];
        if (levelForSubject < Number(finishData.level)) {
            user.gradeLevel[currentGrade - 1][`${gameSubject}`] = Number(finishData.level);
            localStorage.setItem("currentUser", JSON.stringify(user));
        }
    }

    data = {
        subject: gameSubject,
        finishedLevel: user.gradeLevel[currentGrade - 1][`${gameSubject}`]
    }

    if (data) {
        let grid = createGrid(data);

        if (grid) {
            renderHeader();
            renderGrid(grid);
        }
    }
    else {
        gridHeader.textContent = "Undefined subject";
    }

}

function renderHeader() {
    const progressBar = document.getElementById("progressBar");
    progressBar.value = data.finishedLevel;
    progressBar.max = numOfLevels;
}

function createGrid(data) {
    let grid = [];

    if (data.subject) {
        let mathAction;

        switch (data.subject) {
            case "Addition":
                mathAction = "+";
                break;
            case "Subtraction":
                mathAction = "-";
                break;
            case "Multiply":
                mathAction = "X";
                break;
            case "Division":
                mathAction = "/";
                break;
            case "Percentage":
                mathAction = "%";
                break;
            default:
                return null;
        }

        gridHeader.textContent = `${data.subject} ${mathAction}`;

        for (let i = 1; i <= numOfLevels; i++) {
            let gridLevelObject = makeLevel(i);
            grid.push(gridLevelObject);
        }
    }

    return grid;
}

function renderGrid(grid) {
    for (let levelObj of grid) {
        let levelBtn = document.createElement("button");
        levelBtn.classList.add("levelButton", "w-24", "h-24", "md:w-32", "md:h-32", "xl:h-48", "xl:w-48");

        if (levelObj.disable) {
            levelBtn.classList.add("cursor-not-allowed");
        }
        else {
            levelBtn.onclick = function () {
                let finished = false;
                if (Number.parseInt(levelBtn.id) <= data.finishedLevel) {
                    finished = true;
                }

                localStorage.setItem("game", JSON.stringify({
                    subject: data.subject,
                    level: levelBtn.id,
                    finished: finished
                }));

                if (levelBtn.id % 3 == 0 && data.subject == "Addition") {
                    window.location.href = "../game_page/gameCube.html";
                }
                else {
                    window.location.href = "../game_page/gamepage.html";
                }
            }
        }

        levelBtn.style.backgroundColor = levelObj.color;
        levelBtn.style.color = levelObj.fontColor;
        levelBtn.textContent = `Level ${levelObj.level}`;
        levelBtn.id = `${levelObj.level}`;

        levelBtn.addEventListener("mouseenter", () => {
            levelBtn.style.borderColor = "#000000";
            levelBtn.style.border = "15px solid";
        });
        levelBtn.addEventListener("mouseleave", () => {
            levelBtn.style.border = "0px solid";
        });
        levelGrid.appendChild(levelBtn);
    }
}

loadSubjectLevels();