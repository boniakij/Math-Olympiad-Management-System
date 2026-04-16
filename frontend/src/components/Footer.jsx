import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">Ariba Math Olympiad</h4>
            <p className="footer-description">
              Empowering future champions through mathematical excellence and competitive learning.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact Info</h4>
            <ul className="footer-links">
              <li>📍 123 Education Street, Math City, MC 12345</li>
              <li>📧 <a href="mailto:info@aribaMath.org">info@aribaMath.org</a></li>
              <li>📞 +1 (555) 123-4567</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contests">Contests</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">f</a>
              <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
              <a href="#" className="social-icon" aria-label="YouTube">▶</a>
              <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-links-bottom">
            <a href="#">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#">Terms & Conditions</a>
            <span className="separator">|</span>
            <a href="#">Accessibility</a>
          </div>
          <p className="copyright">
            © 2026 Ariba Math Olympiad Organization. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
