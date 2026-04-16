import React from 'react';
import '../styles/CTA.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-background">
        <div className="cta-gradient"></div>
      </div>

      <div className="cta-content">
        <h2 className="cta-title">Ready to Start Your Journey?</h2>
        <p className="cta-subtitle">
          Join thousands of students challenging themselves and achieving excellence
        </p>

        <div className="cta-buttons">
          <button className="btn-primary-large">Register Now</button>
          <button className="btn-secondary-large">Login to Dashboard</button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
