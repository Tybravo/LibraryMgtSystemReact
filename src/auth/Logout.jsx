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

    try {
      const response = await axios.post("http://localhost:8080/api/member/logout", {}, {
        withCredentials: true, // Ensures cookies are included in the request
      });

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
      console.error("Logout Error:", error.response ? error.response.data : error.message);
      setResponseMessage(error.response?.data || "Logout failed. Try again.");
      setResponseColor("red");
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
