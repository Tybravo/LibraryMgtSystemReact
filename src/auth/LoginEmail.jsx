import { React, useState, useEffect } from "react";
import "../styles/loginmodal.css";
import CustomButton from "../reusables/CustomButton";


const LoginEmailModal = ({ isOpen, onClose }) => {
  const initialData = {
    email: "",
  };
  const [formData, setFormData] = useState(initialData);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Data:", formData);
    onClose(); // Close modal after submission
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      document.querySelector(".header").classList.add("fixed-header");
    } else {
      document.body.classList.remove("modal-open");
      document.querySelector(".header").classList.remove("fixed-header");
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.querySelector(".header").classList.remove("fixed-header");
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
              <h4 className="modal-title">Login Email</h4>
              <button type="button" className="close" onClick={onClose}>&#160;
              &times;&#160;
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <CustomButton className="btn btn-secondary" type="submit" textContent="Login"/>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LoginEmailModal;
