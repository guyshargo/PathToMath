document.addEventListener('DOMContentLoaded', () => {
  const videoContainer = document.getElementById('videoContainer');
  const selectedGrade = parseInt(localStorage.getItem("selectedGrade") || "1");

  // Grade → Topic → Array of Videos
  const gradeVideos = {
    1: {
      Addition: [
        "https://www.youtube.com/embed/tVHOBVAFjUw?si=PcjsE07zTVVC2ALN",
        "https://www.youtube.com/embed/VScM8Z8Jls0?si=k5eZOMZNGpDEHrQV",
        "https://www.youtube.com/embed/uQiUTFO78Jk?si=YyrqMqSToPj5ktBD"
      ],
      Substraction: [ 
        "https://www.youtube.com/embed/YLPbduEc4sA?si=jfF_ilJdY497LKlQ",
        "https://www.youtube.com/embed/ZygCUtAUWJA?si=EKKD_-wD-Kn44jYp",
        "https://www.youtube.com/embed/1DsR14RMONc?si=OS2ICU15NssvrkAb"
      ]
    },
    2: {
      Addition: [
        "https://www.youtube.com/embed/KgZIXq04ee8?si=KekP8NLry8Ptsixd",
        "https://www.youtube.com/embed/Q9sLfMrH8_w?si=RcCA0j1XoKnYzRGw",
        "https://www.youtube.com/embed/OB6DUaiGLiA?si=__AnXXCq7AMA3zSF"
      ],
      Substraction: [
        "https://www.youtube.com/embed/qKxQ33KcRWQ?si=faMQIStJXGaA0kQG",
        "https://www.youtube.com/embed/ySkjVZ0ym7k?si=T-qTP-dU6UzSnQYh", 
        "https://www.youtube.com/embed/tr7HwZirgHw?si=QWAIWCriVN5_MjOT"
      ]
    },
    3: {
      Addition: [
        "https://www.youtube.com/embed/1Al2Fc3wOIQ?si=9MCh9MSfBQEhLKUD",
        "https://www.youtube.com/embed/wBhwDtn5Xeg?si=qQo2Q0eKZPVsLg1i",
        "https://www.youtube.com/embed/icyEBL9bzAc?si=edHMPtsUJsBDeYKl"
      ],
      Substraction: [
        "https://www.youtube.com/embed/8_X680JiWDc?si=2JD32PYLvniHm1VD",
        "https://www.youtube.com/embed/489srqkdgMQ?si=ZPLsByDGqq87Gudq", 
        "https://www.youtube.com/embed/qKxQ33KcRWQ?si=SUITSXw5GVm4c9DE"
      ],
      Multiplication: [
        "https://www.youtube.com/embed/uup7IC7c1V8?si=vGZv1QpqL6qNAMG9",
        "https://www.youtube.com/embed/MeidqzJNA2o?si=a8hvNcJSx0CwqVrK",
        "https://www.youtube.com/embed/eW2dRLyoyds?si=VRwMfjY4rqi4Malu"
      ]
    },
    4: {
      Addition: [
        "https://www.youtube.com/embed/cE-yrJv4TEs?si=TT5MN7tIWcYW0N-A", 
        "https://www.youtube.com/embed/mAvuom42NyY?si=NrExPb2rpxZJHl58",
        "https://www.youtube.com/embed/1Al2Fc3wOIQ?si=jlhUIz7zkPaev4DM",
      ],
      Substraction: [
        "https://www.youtube.com/embed/cLHu-zuTPk8?si=7yB7OtwuT4UGygco",
        "https://www.youtube.com/embed/tfcZqajFSU8?si=HCmjQ5jC0gX_WK-o", 
        "https://www.youtube.com/embed/489srqkdgMQ?si=1VIl1bceG934eq3r"
      ],
      Multiplication: [
        "https://www.youtube.com/embed/6owKqFWej-w?si=yo1ROo2ik0O9RPo3",
        "https://www.youtube.com/embed/9dYXfZZsbzc?si=m-AMnVz8VTK0hjB0",
        "https://www.youtube.com/embed/-aNSUlo5sSA?si=b9VJ_0zXjIrMF8R4"
      ],
      Division: [
        "https://www.youtube.com/embed/2-sP854NMLw?si=t45NIy_mPJ4T1Oaj",
        "https://www.youtube.com/embed/oF2fITujB4c?si=1Ng2nhTR-Yv4Mszb",
        "https://www.youtube.com/embed/irfMCIgFJZY?si=oij4skaICms56cpk"
      ]
    },
    5: {
      Addition: [
        "https://www.youtube.com/embed/v2fCp1w06zI"
      ],
      Substraction: [
        "https://www.youtube.com/embed/NpULleQdXq8"
      ],
      Multiplication: [
        "https://www.youtube.com/embed/KQZiwXGmZHg"
      ],
      Division: [
        "https://www.youtube.com/embed/q1SE5g1bUac"
      ],
      Percentage: [
        "https://www.youtube.com/embed/j9YpkHxvUnk"
      ]
    },
    6: {
      Addition: [
        "https://www.youtube.com/embed/32cv3soZt_w"
      ],
      Substraction: [
        "https://www.youtube.com/embed/oqS5O8F1VnY"
      ],
      Multiplication: [
        "https://www.youtube.com/embed/NhlvHMzv7hA"
      ],
      Division: [
        "https://www.youtube.com/embed/jKiPYLq8Fhs"
      ],
      Percentage: [
        "https://www.youtube.com/embed/MEy1JHOPt1s"
      ]
    }
  };

  function getTopicFromHash() {
    const hash = window.location.hash;
    if (!hash) return null;
    const match = hash.match(/#([A-Za-z]+)/);
    return match ? match[1].replace("Videos", "") : null;
  }

  function renderVideo(topic, videoUrls) {
    const title = document.createElement('h2');
    title.textContent = ` Lets Learn ${topic}`;
    title.className = "text-2xl font-bold mb-6 w-full text-center";
    videoContainer.innerHTML = "";
    videoContainer.appendChild(title);
  
    videoUrls.forEach(url => {
      const wrapper = document.createElement('div');
      wrapper.style.width = "560px";
      wrapper.style.height = "315px";
      wrapper.className = "rounded-xl shadow-lg overflow-hidden";

      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.width = "560";
      iframe.height = "315";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.setAttribute("allowfullscreen", "");

      wrapper.appendChild(iframe);
      videoContainer.appendChild(wrapper);

    });
  }
  

  const topic = getTopicFromHash();
  const videoUrls = gradeVideos[selectedGrade]?.[topic];

  if (videoUrls && videoUrls.length > 0) {
    renderVideo(topic, videoUrls);
  } else {
    videoContainer.innerHTML = `<p class="text-lg text-red-600">No video found for topic <strong>${topic}</strong> in grade <strong>${selectedGrade}</strong>.</p>`;
  }
});
