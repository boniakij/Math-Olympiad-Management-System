import React from 'react';

const KeyInfo = () => {
  const cards = [
    {
      icon: '🏛️',
      title: 'What is the Olympiad?',
      desc: 'An annual competition consisting of rigorous mathematical challenges designed to test logical thinking.'
    },
    {
      icon: '🎓',
      title: 'Who can participate?',
      desc: 'Students from middle school to high school all across the globe are welcome to join our contests.'
    },
    {
      icon: '⚙️',
      title: 'How it works',
      desc: 'Register online, access preparatory resources, and participate in regional, national, and global phases.'
    },
    {
      icon: '📅',
      title: 'Important dates',
      desc: 'Registration opens in May. The primary qualification round takes place in August.'
    }
  ];

  return (
    <section className="section key-info-section">
      <div className="container">
        <h2 className="section-title">Everything You Need to Know</h2>
        
        <div className="info-grid">
          {cards.map((card, idx) => (
            <div className="info-card" key={idx}>
              <div className="info-icon">{card.icon}</div>
              <h3 className="info-title">{card.title}</h3>
              <p className="info-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyInfo;
