import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-col">
            <div className="footer-brand">
              <img src="/logo.png" alt="Logo" />
              Ariba Math Olympiad
            </div>
            <div className="footer-info">
              <p>123 Math Avenue, Education City</p>
              <p>hello@aribamath.org</p>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-btn">f</a>
              <a href="#" className="social-btn">in</a>
              <a href="#" className="social-btn">yh</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">FAQ</a>
              <a href="#">Support</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Navigation</h4>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#contests">Contests</a>
              <a href="#resources">Resources</a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ariba Math Olympiad Organization. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
