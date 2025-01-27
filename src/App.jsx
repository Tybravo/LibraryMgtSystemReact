import React, { useState, useEffect } from "react";
import axios from "axios";

import './App.css'
import Header from "./layout/Header";
import Router from "./layout/Router";
import Footer from './layout/Footer';

import HeaderMember from "./layout/HeaderMember";
import RouterMember from "./layout/RouterMember";
import HeaderAdmin from "./layout/HeaderAdmin";
import RouterAdmin from "./layout/RouterAdmin";

const App = () => {
  const [user, setUser] = useState(null);

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


  return (
    <>
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
