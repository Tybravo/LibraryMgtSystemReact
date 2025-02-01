import React, { useState, useEffect, useRef } from "react";
import '../assetz/dist/styles.css';  // Adjust path based on folder structure
import '../assetz/dist/all.css';    
import AOS from "aos";


const HeaderAdminDashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const profileToggle = () => {
    setDropdownOpen(!isDropdownOpen);
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
        <div>

        <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <meta name="keywords" content="tailwind,tailwindcss,tailwind css,css,starter template,free template,admin templates, admin template, admin dashboard, free tailwind templates, tailwind example"/>
         <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i,700,700i" rel="stylesheet"/>
        <title>Dashboard | Library MGT</title>
        </head>

    {/* Container */}
    <div className="mx-auto bg-grey-400">
    {/* Screen */}
    <div className="min-h-screen flex flex-col">

    <header className="bg-nav">
            <div className="flex justify-between">
                <div className="p-1 mx-3 inline-flex items-center">
                    <i className="fas fa-bars pr-2 text-white" onclick="sidebarToggle()"></i>
                    <h1 className="text-white p-2">Logo</h1>
            </div>
            <div className="p-1 flex flex-row items-center relative" ref={dropdownRef}>
                <a href="https://github.com/tailwindadmin/admin"
                  className="text-white p-2 mr-2 no-underline hidden md:block lg:block">
                  Github</a>

                <img
                  onClick={profileToggle}
                  className="inline-block h-8 w-8 rounded-full cursor-pointer"
                  src="https://avatars0.githubusercontent.com/u/4323180?s=460&v=4"
                  alt="Profile" />
                <a href="#"
                  onClick={profileToggle}
                  className="text-white p-2 no-underline hidden md:block lg:block cursor-pointer">
                  Adam Wathan</a>

                {isDropdownOpen && (
                  <div className="rounded shadow-md bg-white absolute top-12 right-1 w-48">
                    <ul className="list-reset">
                      <li>
                        <a href="#" className="no-underline px-4 py-2 block text-black hover:bg-gray-200">
                          My account
                        </a>
                      </li>
                      <li>
                        <a href="#" className="no-underline px-4 py-2 block text-black hover:bg-gray-200">
                          Notifications
                        </a>
                      </li>
                      <li>
                        <hr className="border-t mx-2 border-gray-300" />
                      </li>
                    </ul>
                  </div>
                )}

              </div>
            </div>
      </header>
    </div>
  </div>

        
  </div>
  );
}

export default HeaderAdminDashboard
