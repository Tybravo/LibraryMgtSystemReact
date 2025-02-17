import { React, useState, useEffect } from "react";
import axios from "axios";
import "../styles/loginmodal.css";
import CustomButton from "../reusables/CustomButton";
import LoginPassword from "./LoginPassword"; // Import password modal


const LoginEmail = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseColor, setResponseColor] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Check localStorage and reset if needed
  useEffect(() => {
    if (isOpen) {
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        // Clear stored email to restart login process
        localStorage.removeItem("userEmail");
      }
    }
  }, [isOpen]);

  // Handle input change
  const handleChange = (event) => {
    setFormData({ email: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/member/login-email", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // Store email only if login is successful
      localStorage.setItem("userEmail", formData.email);
      setResponseMessage(response.data.LogMsg || "Email Login successful");
      setResponseColor("green");

      // Open password modal
      setShowPasswordModal(true);
    } catch (error) {
      console.error("Error Response:", error.response ? error.response.data : error.message);
      setResponseMessage(error.response?.data || "Cannot find email.");
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
              <h1 className="modal-title">Login Here</h1>
              <button type="button" className="close text-3xl" onClick={onClose}>&#160;&times;&#160;</button>
            </div>

            {responseMessage && <div style={{ color: responseColor }}>{responseMessage}</div>}

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <CustomButton
                  className="btn btn-secondary"
                  type="submit"
                  textContent={loading ? "Logging in..." : "Next"}
                  disabled={loading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Show LoginPasswordModal when needed */}
      {showPasswordModal && <LoginPassword isOpen={true} onClose={() => setShowPasswordModal(false)} />}
    </>
  );

};

export default LoginEmail;
