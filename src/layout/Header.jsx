import React, { useState, useEffect } from "react";
import RegisterModal from "../Auth/Register";
import LoginEmailModal from "../auth/LoginEmail";
import AOS from "aos"; 

function Header() {
  const [modalType, setModalType] = useState(null); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("mobile-nav-active");
    } else {
      document.body.classList.remove("mobile-nav-active");
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Function to open modals based on type
  const openModal = (type) => {
    setModalType(type); 
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalType(null);  // Close modal by resetting type
  };

  
  return (
    <div>
      {/* Header Section */}
      <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="#" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">Library MGTS</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Books</a></li>
              <li className="dropdown">
                <a href="#" onClick={toggleProfileDropdown}>
                  <span>Profile</span>
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul className={isProfileDropdownOpen ? "dropdown-active" : ""}>
                  <li> 
                    <a href="#" onClick={() => openModal("login")}> Login</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => openModal("register")}> Register</a>
                  </li>
                </ul>
              </li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
            
            {/* Render the appropriate modal based on modalType */}
            {modalType === "register" && <RegisterModal isOpen={true} onClose={closeModal} />}
            {modalType === "login" && <LoginEmailModal isOpen={true} onClose={closeModal} />}
            </nav>
          
          <i className="mobile-nav-toggle d-xl-none bi bi-list" onClick={toggleMobileMenu}></i>
          <a className="btn-getstarted" href="#">Get Started</a>
        </div>
      </header>

    </div>
  );
}

export default Header;