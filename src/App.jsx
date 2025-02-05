import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";

import './App.css'
import Header from "./layout/Header";
import Router from "./layout/Router";
import Footer from './layout/Footer';

import HeaderMember from "./layout/HeaderMember";
import RouterMember from "./layout/RouterMember";
import HeaderAdmin from "./layout/HeaderAdmin";
import RouterAdmin from "./layout/RouterAdmin";
import HeaderAdminDashboard from "./layout/HeaderAdminDashboard";

import SessionTimeout from "./auth/SessionTimeout";


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
      });
    }, []);

  useEffect(() => {
    const storedSession = localStorage.getItem("sessionStatus") === "true";
    const storedAccessLevel = Number(localStorage.getItem("accessLevel"));
    const storedEmail = localStorage.getItem("email");

    if (storedSession && storedEmail) {
      setUser({ sessionStatus: storedSession, accessLevel: storedAccessLevel });
    } else {
      const fetchSessionData = async () => {
        try {
          const response = await axios.post("http://localhost:8080/api/member/login-password", {
            email: storedEmail,
          });

          setUser(response.data);

          // Store session data in localStorage
          localStorage.setItem("sessionStatus", response.data.sessionStatus);
          localStorage.setItem("accessLevel", response.data.accessLevel);
        } catch (error) {
          console.error("Session verification failed", error);
          localStorage.removeItem("sessionStatus");
          localStorage.removeItem("accessLevel");
        }
      };

      fetchSessionData();
    }
  }, []);

// Logout function that clears everything (localStorage, sessionStorage, cookies)
const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  clearSessionCookies();
  window.location.href = "/"; // Redirect to home page
};

// Function to clear cookies
const clearSessionCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
};


  return (
    <>
     {/* Include SessionTimeout to monitor user activity */}
     {user?.sessionStatus && <SessionTimeout onLogout={handleLogout} />}

      {user?.sessionStatus ? (
        user.accessLevel === 10 ? (
          <>
            <HeaderMember />
            <RouterMember />
            <Footer />
          </>
        ) : user.accessLevel === 20 ? (
          <>
            <HeaderAdmin />
            <HeaderAdminDashboard/>
            <RouterAdmin />
            <Footer />
          </>
        ) : (
          <>
            <Header />
            <Router />
            <Footer />
          </>
        )
      ) : (
        <>
          <Header />
          <Router />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
