import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <span className="logo-icon">📐</span>
          <span className="logo-text">Ariba Olympiad</span>
        </a>

        <button className="hamburger" onClick={toggleMenu}>
          <span className={mobileMenuOpen ? 'open' : ''}></span>
          <span className={mobileMenuOpen ? 'open' : ''}></span>
          <span className={mobileMenuOpen ? 'open' : ''}></span>
        </button>
        
        <ul className={`navbar-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
          <li><a href="#contests" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contests</a></li>
          <li><a href="#resources" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Resources</a></li>
          <li><a href="#news" className="nav-link" onClick={() => setMobileMenuOpen(false)}>News</a></li>
          <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
        </ul>

        <div className="nav-buttons">
          <button className="btn-login">Login</button>
          <button className="btn-register">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
        </div>

        <button className="mobile-menu-btn">
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
