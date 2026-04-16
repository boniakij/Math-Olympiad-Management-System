import React from 'react';
import '../styles/Mission.css';

const Mission = () => {
  const highlights = [
    {
      id: 1,
      icon: '🧠',
      title: 'Skill Development',
      description: 'Develop critical thinking and advanced problem-solving abilities'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Competitive Learning',
      description: 'Challenge yourself in a supportive competitive environment'
    },
    {
      id: 3,
      icon: '🌍',
      title: 'Global Participation',
      description: 'Connect with talented mathematicians from around the world'
    }
  ];

  return (
    <section className="mission" id="about">
      <div className="section-container">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-subtitle">Nurturing mathematical excellence and fostering a community of lifelong learners</p>

        <div className="mission-content">
          <div className="mission-text">
            <p className="mission-description">
              Ariba Math Olympiad Organization is dedicated to inspiring and developing exceptional mathematical talent. We believe in the power of challenging problems to unlock human potential and create pathways to success in STEM fields.
            </p>
            <p className="mission-description">
              Through rigorous yet enjoyable competitions, we cultivate a culture of curiosity, perseverance, and intellectual growth among students worldwide.
            </p>
          </div>

          <div className="mission-illustration">
            <div className="illustration-icon">📚</div>
          </div>
        </div>

        <div className="highlights">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="highlight-card">
              <div className="highlight-icon">{highlight.icon}</div>
              <h3 className="highlight-title">{highlight.title}</h3>
              <p className="highlight-description">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
