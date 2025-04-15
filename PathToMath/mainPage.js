document.addEventListener('DOMContentLoaded', () => {
  FillDailyChallenge();
  //set savedSelected Grade
  const savedGrade = localStorage.getItem("selectedGrade") || "1";
  document.getElementById("grades").value = savedGrade;
  document.getElementById("grades-mobile").value = savedGrade;

    //Adding an event listener to detect grade changes and updating it in the local storage
  document.getElementById("grades").addEventListener("change", (e) => {
    setSelectedGrade(e.target.value);
  });
    //Adding an event listener to detect grade changes and updating it in the local storage *** for mobile
  document.getElementById("grades-mobile").addEventListener("change", (e) => {
    setSelectedGrade(e.target.value);
  });
  function setSelectedGrade(grade) {
    localStorage.setItem("selectedGrade", grade);
    console.log("Grade changed to:", grade);
    location.reload(); 
  }

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

      // If completed day (saved in localStorage)
      if (localStorage.getItem(dayVal) !== null) {
        dayCircle.classList.add('completed');
      }

      // If today → show bubble + mark as active
      if (dayVal === todayName) {
        if (bubble) bubble.classList.remove('hidden');
        dayCircle.classList.add('active');
      }
    });
  }
});
