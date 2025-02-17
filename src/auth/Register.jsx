import { React, useState, useEffect } from "react";
import axios from "axios";
import "../styles/registermodal.css";
import CustomButton from "../reusables/CustomButton";


const RegisterModal = ({ isOpen, onClose }) => {
  const initialData = {
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseColor, setResponseColor] = useState("");

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
  
    console.log("Submitting Data:", JSON.stringify(formData, null, 2)); // Log request payload
  
        try {
          const response = await axios.post("http://localhost:8080/api/member/register", formData, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
      
          // Handle successful registration and catch exception
          setResponseMessage(response.data.regMsg || "Registration successful!");
          setResponseColor("green"); 
        setFormData(initialData);
      } catch (error) {
        console.error("Error Response:", error.response ? error.response.data : error.message);
        setResponseMessage(error.response?.data || "Registration failed.");
        setResponseColor("red");
      }
  setLoading(false);
};

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      document.querySelector(".header")?.classList.add("fixed-header");
    } else {
      document.body.classList.remove("modal-open");
      document.querySelector(".header")?.classList.remove("fixed-header");
    }
    return () => {
      document.body.classList.remove("modal-open");
      document.querySelector(".header")?.classList.remove("fixed-header");
    };
  }, [isOpen]);


  return (
    <>
      {isOpen && <div className="modal-backdrop fade show"></div>} {/* Overlay */}

      <div className={`modal ${isOpen ? "show d-block" : "d-none"}`} role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h1 className="modal-title">Register</h1>
              <button type="button" className="close text-3xl" onClick={onClose}>&#160;
                &times;&#160;
              </button>
            </div>

            {/* Body */}
            {responseMessage && <div style={{ color: responseColor }}>{responseMessage}</div>}

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

                <CustomButton
                  className="btn btn-secondary"
                  type="submit"
                  textContent={loading ? "Registering..." : "Register"}
                  disabled={loading} // Disable button when submitting
                />
              </form>

              {/* Show response message */}
              {/* Show Response Message */}
      
      
              {/* {responseMessage && <p className="text-center mt-3">{responseMessage}</p>} */}
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default RegisterModal;