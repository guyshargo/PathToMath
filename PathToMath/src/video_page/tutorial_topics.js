document.addEventListener('DOMContentLoaded', () => {
    const selectedGrade = parseInt(localStorage.getItem("selectedGrade") || "1");
  
    const topicGradeMap = {
      Addition: 1,
      Substraction: 1,
      Multiplication: 3,
      Division: 4,
      Percentage: 5
    };
  
    const topicColors = {
      Addition: "bg-pink-300",
      Substraction: "bg-yellow-300",
      Multiplication: "bg-green-300",
      Division: "bg-blue-300",
      Percentage: "bg-purple-300"
    };
  
    const emojiMap = {
      Addition: "➕",
      Substraction: "➖",
      Multiplication: "✖️",
      Division: "➗",
      Percentage: "%"
    };
  
    const container = document.getElementById('topicsGrid');
  
    Object.entries(topicGradeMap).forEach(([topic, minGrade]) => {
      if (selectedGrade >= minGrade) {
        const card = document.createElement('button');
        card.innerHTML = `
          <div class="text-5xl mb-2">${emojiMap[topic]}</div>
          <div>${topic}</div>
        `;
        card.className = `
          ${topicColors[topic]} 
          text-white 
          fun-font
          font-extrabold 
          text-xl 
          rounded-2xl 
          shadow-lg 
          w-48 
          h-48
          flex 
          flex-col 
          items-center 
          justify-center 
          transition 
          duration-300 
          transform 
          hover:scale-105 
          hover:shadow-xl
        `;
  
        card.addEventListener('click', () => {
          window.location.href = `/PathToMath/src/video_page/video_page.html#${topic}Videos`;
        });
  
        container.appendChild(card);
      }
    });
  });
  