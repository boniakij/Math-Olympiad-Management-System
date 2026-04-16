import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="gradient-1"></div>
        <div className="gradient-2"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Empowering Future Champions Through Olympiads
          </h1>
          <p className="hero-tagline">
            Discover your potential, compete with the best, and achieve extraordinary success in mathematical excellence
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Join Now</button>
            <button className="btn-secondary">Explore Contests</button>
          </div>
        </div>

        <div className="hero-illustration">
          <div className="illustration-placeholder">
            🏆
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
