
const subjectLabels = ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Percentage'];

document.addEventListener('DOMContentLoaded', () => {
    //regular computer sized container
    const dynamicMenuContainer = document.getElementById('dynamic-menu-container');
    //mobile container
    const mobilecontainer = document.getElementById('mobile-menu');
    //mobile menu btn
    const mobileBtn = document.getElementById('mobile-menu-button');
    //header
    const header = document.getElementById('header');
    //selected grade from the user or defualt 1
    const selectedGrade = parseInt(localStorage.getItem("selectedGrade") || "1");
/**Dynamic Menu Data JSON */
const menuData = [
    {
        //Math Problems page
        label: 'Math Problems', // Main menu item
        link: '#home',
        //SubMenu: Math subjects
        submenu: [
            { label: 'Addition', link: '/src/subject_levels/subjectsLevelsPage.html' , class: "Addition"},
            { label: 'Subtraction', link: '/src/subject_levels/subjectsLevelsPage.html',class: "Subtraction"},
            { label: 'Multiplication', link: '/src/subject_levels/subjectsLevelsPage.html',class: "Multiplication"},
            { label: 'Division', link: '/src/subject_levels/subjectsLevelsPage.html',class: "Division"},
            { label: 'Percentage', link: '/src/subject_levels/subjectsLevelsPage.html',class: "Percentage"}
        ],
        class: "MathProblems"
    },
    {
        //Tutorial Videos Page
        label: 'Tutorial Videos',
        link: '#videos',
        //Tutorial Videos Subjects
        submenu:[
            { label: 'Addition', link: '#add' , class: "Addition"},
            { label: 'Subtraction', link: '#sub',class: "Subtraction"},
            { label: 'Multiplication', link: '#mult',class: "Multiplication"},
            { label: 'Division', link: '#div',class: "Division"},
            { label: 'Percentage', link: '#prec',class: "Percentage"}
        ],
        class:"TutorialVideos"
    },
    {
        //Profile Page
        label: 'Profile',
        link: '/src/Profile/profile.html',
        class: "Profile"
    }
];
//Topic's Grade Limit
const topicGrade = {
    "Addition": 1,
    "Substraction": 1,    
    "Multiplication": 3,      
    "Division": 4,
    "Percentage": 5         
  };

/**
 * createMenuItem: creating a list and adding a menu item onto the list with a link and submenu
 * @param {*} item 
 * @returns listItem
 */
function createMenuItem(item) {

    //creating list item
    const listItem = document.createElement('li');
    //relative position to the menu 
    listItem.classList.add('menu-item', 'relative',"md:flex"); 
    const link = document.createElement('a'); // Create a link element for the menu item
    link.href = item.link || '#'; // Use '#' as default link if none provided
    link.textContent = item.label; // Set the text content to the label of the menu item
    //adding design to the link
    link.classList.add('block', 'py-2', 'px-4', 'text-gray-800', 'hover:underline', 'transition', 'duration-200', 'ease-in-out');
    //if header's class name is equal to the current item label mark it- current page
    if (item.class && header.classList.contains(item.class)) {
        listItem.classList.add("active-regular-menu");
    }

    //add onclick to the link

    link.addEventListener('click', (e) => {
        if (subjectLabels.includes(item.label)) {
          localStorage.setItem("Subject", item.label);
        }
        if (item.onClick) {
          item.onClick(e); // pass the event
        }
      });
    listItem.appendChild(link); // Append the link to the list item
    // Check if the item has a submenu
    // If it does, create a nested unordered list for the submenu items
    // and append it to the list item
    if (item.submenu) {
        //if a subject has a submenu
        listItem.classList.add('has-submenu');
        //create an unordered list
        const submenuUl = document.createElement('ul'); 
        //add design and list location on screen - bellow the main subject           
        submenuUl.classList.add('dynamic-submenu','hidden', 'absolute', 'top-full', 'bg-white', 'shadow-md', 'rounded-md', 'z-10');
        //create a menu item and aff it to the submenu list
        item.submenu.forEach(subItem => {
            //check if the items should be displayed according to the class
            if(shouldDisplayItem(subItem,topicGrade,selectedGrade)){
            submenuUl.appendChild(createMenuItem(subItem));
            }
        });
        listItem.appendChild(submenuUl);
    }

    return listItem;
}

/**
 * renderMenu: renders the given menu data by using createMenu Item and adds it to the container
 * @param {*} data 
 * @param {*} container 
 */
function renderMenu(data, container) {
    //creating menu unordered list
    const menuUl = document.createElement('ul');
    menuUl.classList.add('md:flex', 'space-x-4'); 
    data.forEach(item => {
        //checking if a subject fits to the grade
        if(shouldDisplayItem(item,topicGrade,selectedGrade)){
            menuUl.appendChild(createMenuItem(item));

        }
    });
    container.appendChild(menuUl);
}
/** renderMobileMenu: renders a mobile menu, creating a horizontal menu for better mobile ui
 * 
 * @param {*} data 
 * @param {*} container 
 */
function renderMobileMenu(data, container) {
    //creating the unordered menu list
    const menuUl = document.createElement('ul');
    data.forEach(item => {
        //checks if the item should be displayed according to the grade
        if(shouldDisplayItem(item,topicGrade,selectedGrade)){
        //creating list item including the link and design
        const listItem = document.createElement('li');
        listItem.classList.add("mobile-item");
        const link = document.createElement('a');
        link.href = item.link || '#';
        //added the label
        link.textContent = item.label;
        link.classList.add('block', 'py-3', 'px-6', 'text-white', 'hover:bg-indigo-700', 'transition', 'duration-200', 'ease-in-out');
        //add event listener
        if (listItem.onClick) {
            link.addEventListener('click', item.onClick);
        }
       //adding the link to the list item
        listItem.appendChild(link);
        //checking if the current list item in the current page and marks it
        if(header.className==item.class){
            listItem.classList.add("active-mobile-menu")
            listItem.classList.add('bg-indigo-800');
        }
        //checking if an item has asub menu
        if (item.submenu) {
            listItem.classList.add('has-submenu');
            //creating the submenu list
            const submenuUl = document.createElement('ul');
            submenuUl.classList.add("mobile-menu-sub",'hidden');
            submenuUl.classList.add('ml-4');
            //for each submenu item check if it fits the grade
            item.submenu.forEach(subItem => {
                if(shouldDisplayItem(subItem,topicGrade,selectedGrade)){
                //creating a list item
                const subListItem = document.createElement('li');
                const subLink = document.createElement('a');
                subLink.href = subItem.link || '#';
                subLink.textContent = subItem.label;
                //adding the tailwind class design
                subLink.classList.add(
                    'block',
                    'py-2',
                    'px-8',
                    'text-indigo-200',
                    'hover:bg-indigo-600', 
                    'transition',
                    'duration-200',
                    'ease-in-out',
                    'text-sm'
                  );
                //appending the subLink
                subLink.addEventListener('click', (e) => {
                    if (subjectLabels.includes(subItem.label)) {
                      localStorage.setItem("Subject", subItem.label);
                    }
                  
                    if (subItem.onClick) {
                      subLink.onClick(e); // if you ever define it
                    }
                  });
                subListItem.appendChild(subLink);
                //adding to the submenu
                submenuUl.appendChild(subListItem);
                }
            });
            //adding the submenu to its subject
            listItem.appendChild(submenuUl);
            }
     
        menuUl.appendChild(listItem);  
     }
    });
    container.appendChild(menuUl);
}
/**
 * shouldDisplayItem: checking if a subject fits to the grade
 * @param {*} item 
 * @param {*} topicGrade 
 * @param {*} selectedGrade 
 * @returns 
 */
function shouldDisplayItem(item, topicGrade, selectedGrade) {
      return topicGrade[item.label] == null || topicGrade[item.label] <= selectedGrade;
  }
//render desktop menu
renderMenu(menuData, dynamicMenuContainer);

//render mobile menu
renderMobileMenu(menuData, mobilecontainer);
    // Toggle mobile menu
    if (mobileBtn && mobilecontainer) {
        mobileBtn.addEventListener('click', () => {
            mobilecontainer.classList.toggle('hidden');
        });
    }
});

