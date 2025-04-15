
document.addEventListener('DOMContentLoaded', () => {
    const dynamicMenuContainer = document.getElementById('dynamic-menu-container');
    const mobilecontainer = document.getElementById('mobile-menu');
    const mobileBtn = document.getElementById('mobile-menu-button');
    const header = document.getElementById('header');
    const selectedGrade = parseInt(localStorage.getItem("selectedGrade") || "1");

const menuData = [
    {
        label: 'Math Problems', // Main menu item
        link: '#home',
        submenu: [
            { label: 'Addition', link: '#PlusProblems'},
            { label: 'Subtraction', link: '#Minus'},
            { label: 'Multiplication', link: '#Multiply'},
            { label: 'Division', link: '#Divide'},
            { label: 'Percentage', link: '#Precentage'}
        ],
        class: "MathProblems"
    },
    {
        label: 'Tutorial Videos',
        link: '#videos',
        submenu:[
            { label: 'Addition', link: '#AddingVideos'},
            { label: 'Substraction', link: '#SubstractionVideos'},
            { label: 'Multiplication', link: '#MultipicationVideos'},
            { label: 'Division', link: '#DivisionVideos'},
            { label: 'Percentage', link: '#PercentageVideos'}
        ],
        class:"TutorialVideos"
    },
    {
        label: 'Profile',
        link: '#Profile',
        class: "Profile"

    },
    {
        label: 'Login',
        link: '#Login',
        loginStatus: false,
        class: "Login"

    },
    {
        label: 'Logout',
        link: '#Logout',
        loginStatus: false,
        class: "Logout"
    }
];
const topicGrade = {
    "Addition": 1,
    "Substraction": 1,    
    "Multiplication": 3,      
    "Division": 4,
    "Percentage": 5         
  };

function createMenuItem(item) {

    const listItem = document.createElement('li');
    listItem.classList.add('menu-item', 'relative',"md:flex"); 
    // 'relative' for submenu positioning
    // Add classes for styling and layout
    // You can customize the classes based on your design requirements
    // and the framework you are using (e.g., Tailwind CSS, Bootstrap, etc.)
    const link = document.createElement('a'); // Create a link element for the menu item
    link.href = item.link || '#'; // Use '#' as default link if none provided
    link.textContent = item.label; // Set the text content to the label of the menu item
    link.classList.add('block', 'py-2', 'px-4', 'text-gray-800', 'hover:underline', 'transition', 'duration-200', 'ease-in-out');
    if(header.className==item.class){
        listItem.classList.add("active-regular-menu")
    }
    if (item.onClick) {
        link.addEventListener('click', item.onClick);
    }
    listItem.appendChild(link); // Append the link to the list item
    // Check if the item has a submenu
    // If it does, create a nested unordered list for the submenu items
    // and append it to the list item

    if (item.submenu) {
        listItem.classList.add('has-submenu');
        const submenuUl = document.createElement('ul');            
        submenuUl.classList.add('dynamic-submenu','hidden', 'absolute', 'top-full', 'bg-white', 'shadow-md', 'rounded-md', 'z-10');
        item.submenu.forEach(subItem => {
            if(shouldDisplayItem(subItem,topicGrade,selectedGrade)){
            submenuUl.appendChild(createMenuItem(subItem));
            }
        });
        listItem.appendChild(submenuUl);
    }

    return listItem;
}

// this function is used to render the menu items in a horizontal layout
// using Tailwind CSS classes for styling and layout
function renderMenu(data, container) {
    const menuUl = document.createElement('ul');
    menuUl.classList.add('md:flex', 'space-x-4'); 
    data.forEach(item => {
        if(shouldDisplayItem(item,topicGrade,selectedGrade)){
            menuUl.appendChild(createMenuItem(item));

        }
    });
    container.appendChild(menuUl);
}

function renderMobileMenu(data, container) {
    const menuUl = document.createElement('ul');
    data.forEach(item => {
        if(shouldDisplayItem(item,topicGrade,selectedGrade)){
        const listItem = document.createElement('li');
        listItem.classList.add("mobile-item");
        const link = document.createElement('a');
        link.href = item.link || '#';
        link.textContent = item.label;
        link.classList.add('block', 'py-3', 'px-6', 'text-white', 'hover:bg-indigo-700', 'transition', 'duration-200', 'ease-in-out');
        listItem.appendChild(link);
        if(header.className==item.class){
            listItem.classList.add("active-mobile-menu")
            listItem.classList.add('bg-indigo-800');
        }
        if (item.submenu) {
            listItem.classList.add('has-submenu');
            const submenuUl = document.createElement('ul');
            submenuUl.classList.add("mobile-menu-sub",'hidden');
            submenuUl.classList.add('ml-4');
            item.submenu.forEach(subItem => {
                if(shouldDisplayItem(subItem,topicGrade,selectedGrade)){
                const subListItem = document.createElement('li');
                const subLink = document.createElement('a');
                subLink.href = subItem.link || '#';
                subLink.textContent = subItem.label;
                subLink.classList.add(
                    'block',
                    'py-2',
                    'px-8',
                    'text-indigo-200',
                    'hover:bg-indigo-600', // lighter
                    'transition',
                    'duration-200',
                    'ease-in-out',
                    'text-sm'
                  );
                subListItem.appendChild(subLink);
                submenuUl.appendChild(subListItem);
                }
            });
            listItem.appendChild(submenuUl);
            }
     
        menuUl.appendChild(listItem);  
     }
    });
    container.appendChild(menuUl);
}
function shouldDisplayItem(item, topicGrade, selectedGrade) {
    const showLog =
      (item.label !== "Login" && item.label !== "Logout") ||
      (item.label === "Login" && !item.loginStatus) ||
      (item.label === "Logout" && item.loginStatus);
    const showByGrade =
      topicGrade[item.label] == null || topicGrade[item.label] <= selectedGrade;
  
    return showLog && showByGrade;
  }

renderMenu(menuData, dynamicMenuContainer);


renderMobileMenu(menuData, mobilecontainer);
    // Toggle mobile menu
    if (mobileBtn && mobilecontainer) {
        mobileBtn.addEventListener('click', () => {
            mobilecontainer.classList.toggle('hidden');
        });
    }
});

