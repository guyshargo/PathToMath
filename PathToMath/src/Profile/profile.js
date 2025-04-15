const userEmail = "alice@gmail.com";
let userData;
const avatarSrc =  "/PathToMath/src/Images/Avatars/";


document.addEventListener('DOMContentLoaded', () => {
  loadUser();
});

function loadUser() {
    userData = JSON.parse(localStorage.getItem("currentUser"));
    if(!userData) return;
    populateProfileFields(userData);
}

function populateProfileFields(data) {
  document.getElementById('name').value = data.name;
  document.getElementById('email').value = data.email;
  document.getElementById('password').value = data.password;
  document.getElementById('grades').value = data.currentGrade;
  document.getElementById('AvatarImg').src = data.avatar;
}

function updateProfile() {
  const updatedData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    currentGrade: document.getElementById('grades').value,
    avatar: document.getElementById('AvatarImg').src
  };
  userData = updatedData;
  localStorage.setItem("currentUser", JSON.stringify(userData));
  localStorage.setItem("selectedGrade", updatedData.currentGrade);
    showAlert();
}
function showAlert() {
    const alert = document.getElementById("profile-alert");
    alert.classList.remove("hidden");
    const closeBtn = document.getElementById("close-alert");
    closeBtn.addEventListener('click', () => {
      alert.classList.add("hidden");
      location.reload();
    });
  }
function setAvatar(path) {
    document.getElementById('AvatarImg').src = path;
}
function changeAvatar(event){
    let  container= document.getElementById("chooseAvatar");
    container.classList.remove('hidden');
    let avatarsDiv = document.getElementById('AvatarDiv');
    avatarsDiv.innerHTML="";
    const title = document.createElement('h1');
    title.innerHTML = "Choose Avatar:";
    title.className = "text-xl font-extrabold text-center mb-4";
    avatarsDiv.appendChild(title);
    for(let i=1;i<=10;i++){
        let img = document.createElement('img');
        let path = `${avatarSrc}${i}.png`;
        console.log(path);
        img.src =path ;
        img.className = "w-24 h-24 rounded-full cursor-pointer border-4 transition hover:scale-105";
        if(userData.avatar == path){
            img.classList.add("border-blue-500");
        }
        else{
            img.classList.add("border-transparent");
        }
    img.addEventListener("click", () => {
        setAvatar(path);
        userData.avatar = path;
        localStorage.setItem("currentUser", JSON.stringify(userData));
        container.classList.add("hidden");
      });
  
      avatarsDiv.appendChild(img);
    }
    
}