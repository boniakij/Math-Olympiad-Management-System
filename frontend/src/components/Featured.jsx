import React from 'react';

const Featured = () => {
  return (
    <section id="featured" className="section" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <h2 className="section-title">Discover More</h2>
        
        <div className="featured-grid">
          {/* Contests col */}
          <div className="featured-col" id="contests">
            <h3 className="featured-col-title">🏆 Contests</h3>
            <div className="item-list">
              <div className="item-card">
                <div className="item-meta">
                  <span className="item-badge">Regional</span>
                  <span>June 15, 2026</span>
                </div>
                <h4 className="item-title">Ariba Summer Math Challenge</h4>
                <a href="#" className="item-link">View Details &rarr;</a>
              </div>
              <div className="item-card">
                <div className="item-meta">
                  <span className="item-badge">Global</span>
                  <span>August 10, 2026</span>
                </div>
                <h4 className="item-title">World Math Olympiad Qualifiers</h4>
                <a href="#" className="item-link">View Details &rarr;</a>
              </div>
            </div>
          </div>

          {/* Resources col */}
          <div className="featured-col" id="resources">
            <h3 className="featured-col-title">📚 Resources</h3>
            <div className="item-list">
              <div className="item-card">
                <h4 className="item-title">Combinatorics Study Guide</h4>
                <a href="#" className="item-link">Download PDF &darr;</a>
              </div>
              <div className="item-card">
                <h4 className="item-title">Past Papers 2020-2025</h4>
                <a href="#" className="item-link">View Archive &rarr;</a>
              </div>
              <div className="item-card">
                <h4 className="item-title">Number Theory Basics</h4>
                <a href="#" className="item-link">Read Online &rarr;</a>
              </div>
            </div>
          </div>

          {/* News col */}
          <div className="featured-col" id="news">
            <h3 className="featured-col-title">📰 News & Updates</h3>
            <div className="item-list">
              <div className="item-card">
                <h4 className="item-title">Registration for 2026 Regionals Open Now!</h4>
                <p className="item-meta">May 1, 2026</p>
              </div>
              <div className="item-card">
                <h4 className="item-title">New Scoring System Introduced</h4>
                <p className="item-meta">April 12, 2026</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Featured;
