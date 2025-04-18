const btnGridMath = document.getElementById("btnGridMath");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function loadButtons() {
    if (currentUser) {
        let buttons = [];
        const currentGrade = currentUser.currentGrade;
        switch (currentGrade) {
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

function setupButtons(buttons) {
    for (let i = buttons.length - 1; i >= 0; i--) {
        let subject = buttons[i];

        let mathButton = document.createElement("button");
        mathButton.classList.add("w-40", "h-40", "flex", "items-center", "justify-center", "text-6xl",
            "rounded-2xl", "shadow", "hover:brightness-95", "transition");

        mathButton.id = subject;
        mathButton.textContent = subject;

        let color = "";
        switch (subject) {
            case "Addition":
                color = "yellow";
                break;
            case "Subtraction":
                color = "red";
                break;
            case "Multiply":
                color = "pink";
                break;
            case "Division":
                color = "green";
                break;
            case "Percentage":
                color = "purple";
                break;
            default:
                break;
        }

        mathButton.classList.add(`bg-${color}-200`, `text-${color}-800`);

        // Set onclick properly with a closure
        mathButton.onclick = () => buttonClick(subject);

        btnGridMath.appendChild(mathButton);
    }
}

function buttonClick(subject) {
    localStorage.setItem("Subject", subject);
    window.location.href = "../subject_levels/subjectsLevelsPage.html";
}

loadButtons();