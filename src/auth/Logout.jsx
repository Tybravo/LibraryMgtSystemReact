import { React, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import CustomButton from "../reusables/CustomButton";


const LogoutModal = ({ isOpen, onClose }) => {

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseColor, setResponseColor] = useState("");

  const navigate = useNavigate();

  // Function to clear session cookies
  const clearSessionCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });
  };

  // Handle logout action
const handleLogout = async () => {
  setLoading(true);
  setResponseMessage("");

  const userEmail = localStorage.getItem("email"); // Get the user email from local storage


  try {
    // Step 1: Call the logout API
    const response = await axios.post("http://localhost:8080/api/member/logout", {}, {
      withCredentials: true, // Ensures cookies are included in the request
    });

    // Step 2: Call the API to update session status in the database
    if (userEmail) {
      await axios.post("http://localhost:8080/api/member/update-session-status", { email: userEmail }, {
        withCredentials: true,
      });
    }
    else {
      console.error("No email found in local storage");
    }

    // Logout successful, clear session data
    setResponseMessage(response.data.logoutMsg || "Logout successful");
    setResponseColor("green");
    
    // Clear session-related storage and cookies
    localStorage.removeItem("userEmail"); // Clear stored email
    localStorage.removeItem("email"); // Clear session email
    localStorage.removeItem("accessLevel"); //Clear access level
    localStorage.removeItem("sessionStatus"); //Clear session status
    sessionStorage.clear(); // Clear session storage
    clearSessionCookies(); // Clear cookies (including JSESSIONID)

    window.location.href = "/";
  } catch (error) {
    const errorMessage = error.response?.data || "Logout failed. Try again.";
    console.error("Logout Error:", errorMessage);

    if (errorMessage === "No active session found for the user.") {
      // Clear session-related storage and cookies if session is not active
      localStorage.removeItem("userEmail");
      localStorage.removeItem("email");
      localStorage.removeItem("accessLevel");
      localStorage.removeItem("sessionStatus");
      sessionStorage.clear();
      clearSessionCookies();

      // Redirect to index page
      window.location.href = "/";
    } 
    else {
      setResponseMessage(errorMessage);
      setResponseColor("red");
    }
  }
  setLoading(false);
};


  return (
    <>
      {isOpen && <div className="modal-backdrop fade show"></div>}
      <div className={`modal ${isOpen ? "show d-block" : "d-none"}`} role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">Logout</h1>
              <button type="button" className="close text-3xl" onClick={onClose}>&#160;&times;&#160;</button>
            </div>

            <div className="modal-body text-center">
              <p>Do you really want to logout?</p>
              {responseMessage && <div style={{ color: responseColor }}>{responseMessage}</div>}

              <div className="d-flex justify-content-center gap-2 mt-3">
                <CustomButton
                  className="btn btn-danger"
                  textContent={loading ? "Ongoing..." : "Yes"}
                  onClick={handleLogout}
                  disabled={loading}
                />
                <CustomButton
                  className="btn btn-secondary"
                  textContent="No"
                  onClick={onClose}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );

};

export default LogoutModal;
