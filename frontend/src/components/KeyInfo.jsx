import React from 'react';
import '../styles/KeyInfo.css';

const KeyInfo = () => {
  const infoCards = [
    {
      id: 1,
      icon: '❓',
      title: 'What is the Olympiad?',
      description: 'A prestigious mathematical competition that tests creativity, logic, and problem-solving skills beyond the standard curriculum.'
    },
    {
      id: 2,
      icon: '👥',
      title: 'Who Can Participate?',
      description: 'Students from grade 6 to 12 from all educational backgrounds are welcome to challenge themselves.'
    },
    {
      id: 3,
      icon: '⚙️',
      title: 'How It Works',
      description: 'Complete online assessments, receive scores, qualify for advanced rounds, and compete in regional and national championships.'
    },
    {
      id: 4,
      icon: '📅',
      title: 'Important Dates',
      description: 'Registration opens January 1st. Preliminary round: February. Qualifiers announced: March. National round: April.'
    }
  ];

  return (
    <section className="key-info">
      <div className="section-container">
        <h2 className="section-title">Key Information</h2>
        <p className="section-subtitle">Everything you need to know about the Ariba Math Olympiad</p>

        <div className="info-grid">
          {infoCards.map((card) => (
            <div key={card.id} className="info-card">
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyInfo;
