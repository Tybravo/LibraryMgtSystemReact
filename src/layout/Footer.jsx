import { React, useState} from "react";
import "../styles/loginmodal.css";
import CustomButton from "../reusables/CustomButton";


const Footer= () => {
const initialData = {
  email: "",
};

const [formData, setFormData] = useState(initialData);
const [loading, setLoading] = useState(false);
  

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
  }
  

//function Footer() {
  return (
    <footer id="footer" className="footer position-relative light-background">
      {/* Footer Top Section */}
      <div className="container footer-top">
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="index.html" className="logo d-flex align-items-center">
              <span className="sitename">Library MGTS</span>
            </a>
            <div className="footer-contact pt-3">
              <p>No.312 Sabo Street</p>
              <p>Yaba, Lagos 100213</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>+234 802 740 8404</span>
              </p>
              <p>
                <strong>Email:</strong> <span>twinebravo@gmail.com</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#"> Book Lending</a></li>
              <li><a href="#">Reference Services</a></li>
              <li><a href="#">Digital Resources</a></li>
              <li><a href="#">Community Programs</a></li>
              <li><a href="#">Special Collections</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
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
                <CustomButton
                  className="btn btn-secondary"
                  // style={{ marginTop: "-90px" }} 
                  type="submit"
                  textContent={loading ? "Login in..." : "Login"}
                  disabled={loading} // Disable button when submitting
                />
              </form>
          </div>

        </div>
      </div>

      {/* Copyright Section */}
      <div className="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span> <strong className="px-1 sitename">Skygital Group</strong> 
          <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );

}

export default Footer;
