const btnGridMath = document.getElementById("btnGridMath");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Function to load buttons based on the current user's grade
function loadButtons() {
    if (currentUser) {
        let buttons = [];
        const currentGrade = currentUser.currentGrade;
        // set the buttons according to the grade of the user
        switch (currentGrade) {
            case 6:
            case 5:
                buttons.push("Percentage");
            case 4:
                buttons.push("Division");
            case 3:
                buttons.push("Multiply");
            case 2:
            case 1:
                buttons.push("Subtraction");
                buttons.push("Addition");
                break;
            default:
                break;
        }

        setupButtons(buttons);
    } else {
        alert("No user in the system");
    }
}

// Function to create buttons for each subject and add them to the grid
function setupButtons(buttons) {
    for (let i = buttons.length - 1; i >= 0; i--) {
        let subject = buttons[i];

        let mathButton = document.createElement("button");
        mathButton.classList.add("w-40", "h-40", "flex", "items-center", "justify-center",
            "rounded-2xl", "shadow", "hover:brightness-95", "transition","font-bold", "flex-col");

        mathButton.id = subject;
        const buttonTitle = document.createElement("div")
        buttonTitle.classList.add("text-2xl")
        const signText = document.createElement("div")
        signText.classList.add("text-8xl")
        // Set the default color and sign symbol for each subject
        const config = {
            Addition: {
                color: "yellow",
                signSymbol: "+"
            },
            Subtraction: {
                color: "blue",
                signSymbol: "-"
            },
            Multiply: {
                color: "pink",
                signSymbol: "x"
            },
            Division: {
                color: "green",
                signSymbol: "/"
            },
            Percentage: {
                color: "purple",
                signSymbol: "%"
            }
        };  

        // Set color and sign symbol based on subject
        let color = config[subject].color;
        color = config[subject].color;
        buttonTitle.innerText = subject;
        signText.innerText = config[subject].signSymbol
        mathButton.appendChild(buttonTitle)
        mathButton.appendChild(signText)
        mathButton.classList.add(`bg-${color}-200`, `text-${color}-800`);

        // Set onclick properly with a closure
        mathButton.onclick = () => buttonClick(subject);

        btnGridMath.appendChild(mathButton);
    }
}

// Function to handle button click and redirect to the subject levels page
function buttonClick(subject) {
    localStorage.setItem("Subject", subject);
    window.location.href = "../subject_levels/subjectsLevelsPage.html";
}
// Return button
function returnBtnClicked(){
    window.location.href ="../index.html";
}
// Function to load buttons when the page is loaded
loadButtons();