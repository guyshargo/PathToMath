document.addEventListener('DOMContentLoaded', () => {
  const videoContainer = document.getElementById('videoContainer');
  const selectedGrade = parseInt(localStorage.getItem("selectedGrade") || "1");

  const gradeVideos = {
    1: {
      Addition: "https://www.youtube.com/embed/VScM8Z8Jls0",
      Substraction: "https://www.youtube.com/embed/W9WZIGV5I9Y"
    },
    2: {
      Addition: "https://www.youtube.com/embed/8jOzhiACB68",
      Substraction: "https://www.youtube.com/embed/gRjS5rY7z3I"
    },
    3: {
      Addition: "https://www.youtube.com/embed/H4Z0S9ZbC0g",
      Substraction: "https://www.youtube.com/embed/fVNj8RcfB_Y",
      Multiplication: "https://www.youtube.com/embed/1F2bTzvVnjg"
    },
    4: {
      Addition: "https://www.youtube.com/embed/B1kMu9fqY5k",
      Substraction: "https://www.youtube.com/embed/qwJp2wCB9i8",
      Multiplication: "https://www.youtube.com/embed/2vH0k6Bhzlo",
      Division: "https://www.youtube.com/embed/N6DSjfYdYBE"
    },
    5: {
      Addition: "https://www.youtube.com/embed/v2fCp1w06zI",
      Substraction: "https://www.youtube.com/embed/NpULleQdXq8",
      Multiplication: "https://www.youtube.com/embed/KQZiwXGmZHg",
      Division: "https://www.youtube.com/embed/q1SE5g1bUac",
      Percentage: "https://www.youtube.com/embed/j9YpkHxvUnk"
    },
    6: {
      Addition: "https://www.youtube.com/embed/32cv3soZt_w",
      Substraction: "https://www.youtube.com/embed/oqS5O8F1VnY",
      Multiplication: "https://www.youtube.com/embed/NhlvHMzv7hA",
      Division: "https://www.youtube.com/embed/jKiPYLq8Fhs",
      Percentage: "https://www.youtube.com/embed/MEy1JHOPt1s"
    }
  };

  // Helper to extract topic from hash
  function getTopicFromHash() {
    const hash = window.location.hash; // e.g., #AdditionVideos
    if (!hash) return null;
    const match = hash.match(/#([A-Za-z]+)Videos/);
    return match ? match[1] : null; // e.g., "Addition"
  }

  function renderVideo(topic, videoUrl) {
    const title = document.createElement('h2');
    title.textContent = `${topic} - Grade ${selectedGrade}`;
    title.className = "text-2xl font-bold";

    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.className = "w-full max-w-3xl aspect-video rounded-xl shadow-xl";
    iframe.setAttribute("allowfullscreen", "");

    videoContainer.appendChild(title);
    videoContainer.appendChild(iframe);
  }

  // Load the video
  const topic = getTopicFromHash();

  if (!topic) {
    videoContainer.innerHTML = `<p class="text-lg text-red-600">No topic selected. Please choose a video topic from the menu.</p>`;
    return;
  }

  const videoUrl = gradeVideos[selectedGrade]?.[topic];

  if (videoUrl) {
    renderVideo(topic, videoUrl);
  } else {
    videoContainer.innerHTML = `<p class="text-lg text-red-600">No video found for topic <strong>${topic}</strong> in grade <strong>${selectedGrade}</strong>.</p>`;
  }
});
