import React, { useState, useEffect, useRef } from "react";
import '../assetz/dist/styles.css';
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
      <div className="mx-auto bg-grey-400 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-nav flex justify-between p-4">
          <div className="flex items-center">
            <i className="fas fa-bars pr-2 text-white cursor-pointer"></i>
            <h1 className="text-white p-2">Logo</h1>
          </div>
          <div className="flex items-center relative" ref={dropdownRef}>
            <a href="https://github.com/tailwindadmin/admin" className="text-white p-2 hidden md:block">Home</a>
            <img
              onClick={profileToggle}
              className="h-8 w-8 rounded-full cursor-pointer"
              src="https://avatars0.githubusercontent.com/u/4323180?s=460&v=4"
              alt="Profile"
            />
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
          <aside className="bg-side-nav w-1/6 border-r hidden md:block">
            <ul className="list-reset">
              <SidebarItem icon="fas fa-tachometer-alt" text="Dashboard" link="#" />
              <SidebarItem icon="fab fa-wpforms" text="Forms" link="#" />
              <SidebarItem icon="fas fa-grip-horizontal" text="Buttons" link="#" />
              <SidebarItem icon="fas fa-table" text="Tables" link="#" />
              <SidebarItem icon="fab fa-uikit" text="UI Components" link="#" />
              <SidebarItem icon="fas fa-square-full" text="Modals" link="#" />
            </ul>
          </aside>
  
          {/* Main Content */}
          {/* <main className="bg-white flex-1 p-3 overflow-hidden"> */}
            {/* Stats Section */}
            {/* <StatsSection /> */}
            {/* Cards Section */}
            {/* <TrendingCategories /> */}
            {/* Progress Bar */}
            {/* <ProgressSection /> */}
          {/* </main> */}
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
  
  // const StatsSection = () => (
  //   <div className="flex flex-wrap mx-2">
  //     {statsData.map((item, index) => (
  //       <StatCard key={index} {...item} />
  //     ))}
  //   </div>
  // );
  
  // const StatCard = ({ value, label, bgColor }) => (
  //   <div className={`shadow-lg ${bgColor} border-l-8 mb-2 p-2 md:w-1/4 mx-2`}>
  //     <div className="p-4">
  //       <p className="text-white text-2xl">{value}</p>
  //       <p className="text-white text-lg">{label}</p>
  //     </div>
  //   </div>
  // );
  
  // const statsData = [
  //   { value: "$244", label: "Total Sales", bgColor: "bg-red-vibrant" },
  //   { value: "$199.4", label: "Total Cost", bgColor: "bg-info" },
  //   { value: "900", label: "Total Users", bgColor: "bg-warning" },
  //   { value: "500", label: "Total Products", bgColor: "bg-success" }
  // ];
  
  // const TrendingCategories = () => (
  //   <div className="rounded shadow bg-white mx-2 p-4">
  //     <h2 className="text-xl font-bold border-b pb-2">Trending Categories</h2>
  //     <table className="table-auto w-full mt-2">
  //       <thead className="bg-gray-800 text-white">
  //         <tr>
  //           <th>#</th>
  //           <th>Item</th>
  //           <th>Last</th>
  //           <th>Current</th>
  //           <th>Change</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {categoryData.map((item, index) => (
  //           <CategoryRow key={index} {...item} />
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  
  // const CategoryRow = ({ id, name, last, current, change, color }) => (
  //   <tr>
  //     <td>{id}</td>
  //     <td><button className={`${color} py-1 px-2 rounded-full text-white`}>{name}</button></td>
  //     <td>{last}</td>
  //     <td>{current}</td>
  //     <td className={change > 0 ? "text-green-500" : "text-red-500"}>
  //       <i className={change > 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i>{Math.abs(change)}%
  //     </td>
  //   </tr>
  // );
  
  // const categoryData = [
  //   { id: 1, name: "Twitter", last: 4500, current: 4600, change: 5, color: "bg-blue-500" },
  //   { id: 2, name: "Facebook", last: 10000, current: 3000, change: -65, color: "bg-primary" },
  //   { id: 3, name: "Amazon", last: 10000, current: 3000, change: -65, color: "bg-success" },
  //   { id: 4, name: "Microsoft", last: 10000, current: 3000, change: 65, color: "bg-blue-500" }
  // ];
  
  // const ProgressSection = () => (
  //   <div className="rounded shadow bg-white mx-2 p-4">
  //     <h2 className="text-xl font-bold border-b pb-2">Progress Among Projects</h2>
  //     {progressData.map((item, index) => (
  //       <ProgressBar key={index} {...item} />
  //     ))}
  //   </div>
  // );
  
  // const ProgressBar = ({ percentage, color }) => (
  //   <div className="shadow w-full bg-gray-300 mt-2">
  //     <div className={`${color} text-xs leading-none py-1 text-center text-white`} style={{ width: `${percentage}%` }}>{percentage}%</div>
  //   </div>
  // );
  
  // const progressData = [
  //   { percentage: 45, color: "bg-blue-500" },
  //   { percentage: 55, color: "bg-teal-500" },
  //   { percentage: 65, color: "bg-orange-500" },
  //   { percentage: 75, color: "bg-red-800" }
  // ];
  
  export default HeaderAdminDashboard;