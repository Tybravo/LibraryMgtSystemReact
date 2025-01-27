import React, { useState, useEffect } from "react";
import heroBg from "/assets/img/herobg.jpg";
import about1 from "/assets/img/about1.jpg";


function Home() {  
  return (
    <div>

      {/* Hero Section */}
      <section id="hero" className="hero section dark-background">
        <img src={heroBg} alt="Hero Background" data-aos="fade-in" />
        <div className="container">
          <h2 data-aos="fade-up" data-aos-delay="100">Read Today,<br />Lead Forever</h2>
          <p data-aos="fade-up" data-aos-delay="200">Readers are leaders rated bravo!</p>
          <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
            <a href="#" className="btn-get-started">Get Started</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
              <img src={about1} className="img-fluid" alt="About Section" />
            </div>
            <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-up" data-aos-delay="200">
              <h3>Unleash Your Imagination, and Discover Great Books</h3>
              <p className="fst-italic">
                Dive into a Universe of Knowledge and Adventure, to Discover, Borrow, and Buy Your Next Favorite Book.
              </p>
              <ul>
                <li><i className="bi bi-check-circle"></i> <span>Explore a vast collection of books available to buy or borrow.</span></li>
                <li><i className="bi bi-check-circle"></i> <span>Experience the joy of reading with our user-friendly platform.</span></li>
                <li><i className="bi bi-check-circle"></i> <span>Join a community of book lovers and share your passion for discovery...</span></li>
              </ul>
              <a href="#" className="read-more"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}

export default Home;