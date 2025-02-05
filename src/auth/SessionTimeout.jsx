import { useEffect, useRef } from "react";

const SessionTimeout = ({ onLogout }) => {
  const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
  const timeoutRef = useRef(null);

  // Function to clear session and logout user
  const handleSessionTimeout = () => {
    onLogout(); // Call logout function
  };

  // Function to reset the timeout when user is active
  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleSessionTimeout, TIMEOUT_DURATION);
  };

  useEffect(() => {
    // User activity listeners
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // Initialize the timer

    return () => {
      // Cleanup on unmount
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return null;
};

export default SessionTimeout;
