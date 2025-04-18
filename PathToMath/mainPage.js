//Default User
const userEmail = "alice@gmail.com";
let userData = null;
document.addEventListener('DOMContentLoaded', async () => {
  //if the user exists in local storage load from there
  if (localStorage.getItem("currentUser") != undefined || localStorage.getItem("currentUser") != null) {
    userData = JSON.parse(localStorage.getItem("currentUser"));
  } else {
    userData = await loadFakeUser();
    if (!userData) alert("Problem with fetching user");
  }

  //onload fill days and load fake user data
  FillDailyChallenge();

  //populate the data
  const savedGrade = userData.currentGrade;
  document.getElementById("grades").value = savedGrade;
  document.getElementById("grades-mobile").value = savedGrade;
  document.getElementById("AvatarImg").setAttribute("src", userData.avatar);
  document.getElementById("grades-mobile").value = savedGrade;
  document.getElementById("AvatarImg").setAttribute("src", userData.avatar);

  //load badges achivments
  loadBadges();

  //Adding an event listener to detect grade changes and updating it in the local storage
  document.getElementById("grades").addEventListener("change", (e) => {
    setSelectedGrade(e.target.value);
  });

  //Adding an event listener to detect grade changes and updating it in the local storage *** for mobile
  document.getElementById("grades-mobile").addEventListener("change", (e) => {
    setSelectedGrade(e.target.value);
  });
});

//set selected grade in local storage
function setSelectedGrade(grade) {
  localStorage.setItem("selectedGrade", grade);
  userData.currentGrade = parseInt(grade);
  localStorage.setItem("currentUser", JSON.stringify(userData));
  location.reload();
}

/**
 * loadFakeUser: Loads fake user from json file
 * @returns user
 */
async function loadFakeUser() {
  try {
    //wait for fetch
    const response = await fetch('/src/Utils/Users.JSON');
    //wait for json response
    const users = await response.json();
    //get user from json respose according to mail
    const user = users[userEmail];
    //if user isnt undefind
    if (user) {
      //save to local storage
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("selectedGrade", user.currentGrade);
      //return the user
      return user;
    } else {
      console.error("User not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
/**
 * loadBadges: loading the completed badges and setting the progress bar
 */
function loadBadges() {
  //gettting the badge's circle
  const circles = document.querySelectorAll('.circle');
  //badge progress bar
  const badgebar = document.getElementById("badges-bar");
  //badge precentege 
  const badgetext = document.getElementById("badges-text");
  //amount of badges overall
  const maxBadges = 5;
  let badgeCount = 0;
  //go over each circle and check if its completed
  circles.forEach(circle => {
    const badgeValue = circle.getAttribute("value");
    if (userData.badges[userData.currentGrade - 1].includes(badgeValue)) {
      badgeCount += 1;
      circle.classList.add("circleGolden");
    }
    badgebar.value = badgeCount;
    //get bar precentage
    const percentage = Math.round((badgeCount / maxBadges) * 100);
    badgetext.innerHTML = `${percentage}% completed keep going!`;
  });
}
/**
 * FillDailyChallenge: add the completed and the current day challenge
 */
function FillDailyChallenge() {
  //days array
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //get current day 0-6
  const todayIndex = new Date().getDay();
  //
  const todayName = dayNames[todayIndex];
  //for each day div
  document.querySelectorAll('.days').forEach(dayEl => {
    //get day's value: name of the day
    const dayVal = dayEl.getAttribute('value');
    //the day's circle
    const dayCircle = dayEl.querySelector('.day');
    //and today bubble
    const bubble = dayEl.querySelector('.today-marker');

    if (!dayVal || !dayCircle) return;

    // Reset all progress on Sunday
    if (todayName === "Sunday") {
      localStorage.removeItem(dayVal);
      dayCircle.classList.remove('completed');
    }

    // If completed day (save in localStorage)
    if (localStorage.getItem(dayVal) !== null) {
      dayCircle.classList.add('completed');
    }
    // If today then show bubble + mark as active
    if (dayVal === todayName) {
      const currentDate = new Date().toISOString().split('T')[0];
      userData.lastDailyCompleted = currentDate;

      //if not already compeleted
      if (!localStorage.getItem(dayVal)) {
        bubble.classList.remove('hidden');
        dayCircle.classList.add('active');
        return;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const quizBtn = document.getElementById("dailyQuizBtn");
  quizBtn.onclick = dailyQuiz;
});

document.addEventListener("DOMContentLoaded", () => {
  const problemButton = document.getElementById("problemButton");
  problemButton.onclick = problemButtonClick;
});

function dailyQuiz() {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayIndex = new Date().getDay();
  const todayName = dayNames[todayIndex];

  let finishedDaily = localStorage.getItem(todayName);

  if (!finishedDaily) {
    if (userData && userData.currentGrade) {
      const currentGrade = userData.currentGrade;

      let options = [];
      switch (currentGrade) {
        case 5:
          options.push("Percentage");
        case 4:
          options.push("Division");
        case 3:
          options.push("Multiply");
        case 2:
        case 1:
          options.push("Subtraction");
          options.push("Addition");
          break;
        default:
          break;
      }
      let randIndex = Math.floor(Math.random() * options.length);
      let randSubject = options[randIndex];
      let randLevel = Math.floor(Math.random() * 30 + 1);

      localStorage.setItem("dailyQuiz", JSON.stringify({ subject: randSubject, level: randLevel, finished: false }));
      window.location.href = "../src/game_page/gamepage.html";
    }
  }
  else {
    alert("Already finished the daily quiz");
  }
}

function problemButtonClick() {
  window.location.href = "/src/math_subjects/mathSubjectsPage.html";
}