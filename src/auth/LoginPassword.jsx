import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "../styles/loginmodal.css";
import CustomButton from "../reusables/CustomButton";


const LoginPassword = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseColor, setResponseColor] = useState("");

  // Initialize navigate function
  const navigate = useNavigate();

  // Fetch stored email when modal opens
  useEffect(() => {
    if (isOpen) {
      const storedEmail = localStorage.getItem("userEmail") || "";
      setFormData({ email: storedEmail, password: "" });
    }
  }, [isOpen]);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/member/login-password", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // Store session details in localStorage
      localStorage.setItem("sessionStatus", response.data.sessionStatus);
      localStorage.setItem("accessLevel", response.data.accessLevel);
      localStorage.setItem("email", response.data.sessionEmail); 

      // Only remove 'userEmail' after storing 'email'
      if (localStorage.getItem("email")) {
        localStorage.removeItem("userEmail"); 
      }

      //onClose();
      // Redirect to App.jsx
      // navigate("/"); 
      window.location.href = "/";

    } catch (error) {
      console.error("Error Response:", error.response ? error.response.data : error.message);
      setResponseMessage(error.response?.data || "Invalid password.");
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
              <h4 className="modal-title">Enter Password</h4>
              <button type="button" className="close text-3xl" onClick={onClose}>&#160;&times;&#160;</button>
            </div>

            {responseMessage && <div style={{ color: responseColor, textAlign: "center" }}>{responseMessage}</div>}

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  readOnly // Prevent user from modifying email
                />
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <CustomButton
                  className="btn btn-secondary"
                  type="submit"
                  textContent={loading ? "Logging in..." : "Submit"}
                  disabled={loading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPassword;
