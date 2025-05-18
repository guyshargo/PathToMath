import React from 'react'
import DynamicMenu from './DynamicMenu'
import { useLoginStatus } from '../Utils/LoginStatusComponent';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import logo from '../../assets/Images/logo.png'
import starIcon from '../../assets/Images/star.png'
import MathProbLogo from '../../assets/Images/MathProblemsLogo.png'
import ProfileIcon from '../../assets/Images/profile.png'
import LoginIcon from '../../assets/Images/login.png'
import LogoutIcon from '../../assets/Images/logout.png'
import TutorialVideosIcon from '../../assets/Images/helpVideos.png'

function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  const { isLoggedIn } = useLoginStatus();

  // Main menu item
  const menuData = [
    {
      //Home page
      label: 'Home',
      link: '/',
      icon: starIcon,
      colorClass: "bg-blue-700 hover:bg-blue-600",
      submenuColor: "hover:bg-blue-500",
      className: "Home"
    },
    {
      //Math Problems page
      label: 'Math Problems',
      link: '/subjects',
      icon: MathProbLogo,
      colorClass: "bg-orange-500 hover:bg-orange-600",
      submenuColor: "hover:bg-orange-400",
      submenu: [
        { label: 'Addition', link: '/subjects', class: "Addition" },
        { label: 'Subtraction', link: '/subjects', class: "Subtraction" },
        { label: 'Multiply', link: '/subjects', class: "Multiply" },
        { label: 'Division', link: '/subjects', class: "Division" },
        { label: 'Percentage', link: '/subjects', class: "Percentage" }
      ],
      className: "MathProblems"
    },
    {
      label: 'Tutorial Videos',
      link: '/videos',
      icon: TutorialVideosIcon,
      colorClass: "bg-red-500 hover:bg-red-600",
      submenuColor: "hover:bg-red-400",
      submenu: [
        { label: 'Addition', link: '/videos' },
        { label: 'Subtraction', link: '/videos' },
        { label: 'Multiply', link: '/videos' },
        { label: 'Division', link: '/videos' },
        { label: 'Percentage', link: '/videos' }
      ],
      class: "TutorialVideos"
    },
    {
      //Profile Page
      label: 'Profile',
      link: '/profile',
      icon: ProfileIcon,
      colorClass: "bg-green-500 hover:bg-green-600",
      submenuColor: "hover:bg-green-400",
      class: "Profile",
    },
  ];

  // Add Login or Logout dynamically
  if (isLoggedIn) {
    menuData.push({
      label: 'Logout',
      link: '/',
      colorClass: 'bg-purple-500 hover:bg-purple-600',
      icon: LogoutIcon
    });
  } else {
    menuData.push({
      label: 'Login',
      link: '/login',
      colorClass: 'bg-purple-500 hover:bg-purple-600',
      icon: LoginIcon
    });
  }
  return (
    <header className="flex flex-col xl:flex-row items-start xl:items-center z-30 justify-between w-full py-6 px-6 md:px-20 bg-blue-400 drop-shadow-md playful-font relative">
      <div className="flex justify-between items-center w-full xl:w-auto">
        <Link to="/" className="hover:scale-105 transition-all">
          <img src={logo} alt="Logo" className="  w-60 rounded-2xl" />
        </Link>
        <button className="xl:hidden text-3xl text-white cursor-pointer" onClick={toggleMobileMenu}>
          {/* simple hamburger menu for mobile view */}
          {isMobileOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden xl:block">
        <DynamicMenu items={menuData} isMobile={false} />
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="w-full mt-4 xl:hidden">
          <DynamicMenu items={menuData} isMobile={true} />
        </div>
      )}
    </header>
  );
}
export default Header;