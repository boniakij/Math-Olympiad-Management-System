import React from 'react';

const Mission = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-subtitle">
          Dedicated to pushing the boundaries of mathematical excellence and nurturing young minds to become the innovators of tomorrow.
        </p>

        <div className="mission-grid">
          <div className="mission-image">
             <img src="/logo.png" alt="Mission Illustration" />
          </div>
          <div className="mission-content">
            <p>
              The Ariba Math Olympiad Organization believes that mathematics is the foundation of the future. We provide a competitive yet collaborative environment for students to accelerate their learning.
            </p>
            
            <div className="mission-points">
              <div className="mission-point">
                <div className="mission-point-icon">🧠</div>
                Skill Development
              </div>
              <div className="mission-point">
                <div className="mission-point-icon">🏆</div>
                Competitive Learning
              </div>
              <div className="mission-point">
                <div className="mission-point-icon">🌍</div>
                Global Participation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
