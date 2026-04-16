import React from 'react';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <h2 className="cta-title">Ready to Start Your Journey?</h2>
        <div className="cta-actions">
          <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Register Now</button>
          <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Login</button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
