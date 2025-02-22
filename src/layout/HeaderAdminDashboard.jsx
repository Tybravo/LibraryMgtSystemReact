import React, { useState, useEffect, useRef } from "react";
import '../assetz/dist/styles.css';
import '../assetz/dist/all.css';    
import AOS from "aos";

const HeaderAdminDashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(true); // State for sidebar menu
  const dropdownRef = useRef(null);

  const profileToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
     console.log("Menu icon clicked!"); // Debug log
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mx-auto bg-grey-400 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-nav flex justify-between p-4">
        <div className="flex items-center">
          <i 
            className="fas fa-bars pr-2 text-white cursor-pointer" 
            onClick={toggleMenu}
          ></i>
          <h1 className="text-white p-2">Dashboard</h1>
        </div>
        <div className="flex items-center relative" ref={dropdownRef}>
          <a href="https://github.com/tailwindadmin/admin" className="text-white p-2 hidden md:block">Home</a>
          
          <a onClick={profileToggle} className="text-white p-2 cursor-pointer hidden md:block">Michael Bravo</a>
          {isDropdownOpen && (
            <div className="absolute top-12 right-1 w-48 bg-white shadow-md rounded">
              <ul className="list-reset">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">My Account</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Notifications</a></li>
                <li><hr className="border-t border-gray-300" /></li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`bg-side-nav w-1/6 border-r ${isMenuOpen ? "block" : "hidden"}`}>
         <ul className="list-reset">
            <SidebarItem icon="fas fa-tachometer-alt" text="Dashboard" link="#" />
            <SidebarItem icon="fab fa-wpforms" text="Add Book" link="#" />
            <SidebarItem icon="fas fa-grip-horizontal" text="Shelve " link="#" />
            <SidebarItem icon="fas fa-table" text="View Book" link="#" />
            <SidebarItem icon="fab fa-uikit" text="Update Book" link="#" />
            <SidebarItem icon="fas fa-square-full" text="Delete Book" link="#" />
          </ul>
        </aside>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, link }) => (
  <li className="py-3 px-2 border-b border-light-border">
    <a href={link} className="text-sm text-nav-item no-underline flex items-center">
      <i className={`${icon} mx-2`}></i> {text}
    </a>
  </li>
);

export default HeaderAdminDashboard;
