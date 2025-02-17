import { useEffect, useRef } from "react";
import axios from "axios";


const TIMEOUT_DURATION = 5 * 60 * 1000; // 30 minutes in milliseconds

const SessionTimeout = () => {
  const timeoutRef = useRef(null);

  // Function to handle session timeout
  const handleSessionTimeout = async () => {
    try {
      const storedSession = localStorage.getItem("sessionStatus") === "true";

      if (!storedSession) {
        console.warn("No active session. Skipping session timeout API call.");
        return;
      }

      const response = await axios.patch("http://localhost:8080/api/member/session-timeout",
        {}, // No request body needed
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensures session cookie is sent
        }
      );

      console.log("Session timed out. Status updated:", response.data);

      // Clear session data
      localStorage.clear();
      sessionStorage.clear();
      clearSessionCookies();

      // Redirect to login page
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to update session status:", error.response?.data || error.message);
    }
  };

  // Function to reset the timeout timer on user activity
  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleSessionTimeout, TIMEOUT_DURATION);
  };

  // Function to clear session cookies
  const clearSessionCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
  };

  // Attach event listeners globally
  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // Start the timer


    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return null; // No UI component needed
};

export default SessionTimeout;
