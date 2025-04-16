const userEmail = "alice@gmail.com";
let userData;
const avatarSrc =  "/src/Images/Avatars/";

//loading user from local storage
document.addEventListener('DOMContentLoaded', () => {
  loadUser();
});
/**
 * loadUser: loading the fake user from the local storage
 * 
 */
function loadUser() {
    userData = JSON.parse(localStorage.getItem("currentUser"));
    if(!userData) return;
    //populating the fields
    populateProfileFields(userData);
}
/**
 * populateProfileFields: polpulating the fields according to the user data
 * @param {*} data 
 */
function populateProfileFields(data) {
  document.getElementById('name').value = data.name;
  document.getElementById('email').value = data.email;
  document.getElementById('password').value = data.password;
  document.getElementById('grades').value = data.currentGrade;
  document.getElementById('AvatarImg').src = data.avatar;
}
/**updateProfile: updating profile according to the values in the form
 * 
 */
function updateProfile() {
  //putting the updated data into a json
  const updatedData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    currentGrade: document.getElementById('grades').value,
    avatar: document.getElementById('AvatarImg').src
  };
  //updating local var
  userData = updatedData;
  //updating the user in the local storage
  localStorage.setItem("currentUser", JSON.stringify(userData));
  //updating selected class
  localStorage.setItem("selectedGrade", updatedData.currentGrade);
    showAlert();
}
/**
 * showAlert(): showing succsses alert after upating the data
 */
function showAlert() {
  //showing alert
    const alert = document.getElementById("profile-alert");
    alert.classList.remove("hidden");
    //adding an event listener to the close btn
    const closeBtn = document.getElementById("close-alert");
    closeBtn.addEventListener('click', () => {
      //hidding alert
      alert.classList.add("hidden");
      //refreshing nav bar

      location.reload();
    });

    //After 3 seconds reload the menu and close the alert
    setTimeout(() => {
      alert.classList.remove("opacity-100");
      alert.classList.add("opacity-0");
      //wait for the alert to fade
      setTimeout(() => {
        location.reload();
      }, 1000); // wait for the fade to complete
    },3000);
  }
//setting the chosen avater's img
function setAvatar(path) {
    document.getElementById('AvatarImg').src = path;
}
/**
 * change avatar: open a div to choose avatar from
 * @param {*} event 
 */
function changeAvatar(event){
    let  container= document.getElementById("chooseAvatar");
    //make the screen darker and show avatar's div
    container.classList.remove('hidden');
    //remove old content from the div
    let avatarsDiv = document.getElementById('AvatarDiv');
    avatarsDiv.innerHTML="";
    //create the title
    const title = document.createElement('h1');
    title.innerHTML = "Choose Avatar:";
    title.className = "text-xl font-extrabold text-center mb-4";
    //add title to the div
    avatarsDiv.appendChild(title);
    //go over 10 avatar images and add them to the div
    for(let i=1;i<=10;i++){
      //create the avatar img and set the src
        let img = document.createElement('img');
        let path = `${avatarSrc}${i}.png`;
        img.src =path ;
        //add design to each img
        img.className = "w-24 h-24 rounded-full cursor-pointer border-4 transition hover:scale-105";
        //if the avatar is the current add blue border around it
        if(userData.avatar == path){
            img.classList.add("border-blue-500");
        }
        else{
            img.classList.add("border-transparent");
        }
        //add an event listener to the img 
    img.addEventListener("click", () => {
        setAvatar(path);
        //set the new avatar and save it to the local storage
        userData.avatar = path;
        localStorage.setItem("currentUser", JSON.stringify(userData));
        //hise the div
        container.classList.add("hidden");
      });
      //add the img to the avatr's div 
      avatarsDiv.appendChild(img);
    }
    
}