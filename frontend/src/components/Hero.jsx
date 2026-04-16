import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <img src="/logo.png" alt="Logo watermark" className="hero-logo-bg" />
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Empowering Future Champions Through Olympiads</h1>
          <p className="hero-subtitle">
            Join the most prestigious mathematical competition and showcase your brilliance on a global stage.
          </p>
          <div className="hero-actions">
            <button className="btn btn-accent">Join Now</button>
            <button className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>Explore Contests</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
