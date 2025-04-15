//Default User

const userEmail = "alice@gmail.com";
let userData;
document.addEventListener('DOMContentLoaded', () => {
  FillDailyChallenge();
  if (localStorage.getItem("currentUser")!=undefined||localStorage.getItem("currentUser")!=null) {
    userData = JSON.parse(localStorage.getItem("currentUser"));
  } else {
    loadFakeUser(); // only fetch if no local data
  }
  const savedGrade = userData.currentGrade;
  document.getElementById("grades").value = savedGrade;
  document.getElementById("grades-mobile").value = savedGrade;
  document.getElementById("AvatarImg").setAttribute("src", userData.avatar);    //Adding an event listener to detect grade changes and updating it in the local storage
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


//Load Fake User
function loadFakeUser() {
  fetch('./src/Utils/Users.JSON')
.then(response => response.json())
.then(users => {
   userData = users[userEmail];
  if (userData) {
    // Store the full user data in localStorage
    localStorage.setItem("currentUser", JSON.stringify(userData));

    // Save selected Grade
    localStorage.setItem("selectedGrade", userData.currentGrade);
    console.log("User data loaded into localStorage:", userData);
  } else {
    console.error("User not found.");
  }
})
.catch(error => {
  console.error("Error fetching user data:", error);
});
}

//Fill the daily challange
function FillDailyChallenge() {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayIndex = new Date().getDay();
  const todayName = dayNames[todayIndex];

  document.querySelectorAll('.days').forEach(dayEl => {
    const dayVal = dayEl.getAttribute('value');
    const dayCircle = dayEl.querySelector('.day');
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
      //if not already compeleted
      if(!localStorage.getItem(dayVal)){
        bubble.classList.remove('hidden');
        dayCircle.classList.add('active');
        return;
      } 
    }
  });
}
