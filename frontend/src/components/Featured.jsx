import React, { useState } from 'react';
import '../styles/Featured.css';

const Featured = () => {
  const [activeTab, setActiveTab] = useState('contests');

  const contests = [
    {
      id: 1,
      name: 'Spring Olympiad 2026',
      date: 'February 15, 2026',
      level: 'All Levels',
      status: 'Upcoming'
    },
    {
      id: 2,
      name: 'Junior Regional Round',
      date: 'March 10, 2026',
      level: 'Grades 6-8',
      status: 'Upcoming'
    },
    {
      id: 3,
      name: 'Senior Championship',
      date: 'April 20, 2026',
      level: 'Grades 9-12',
      status: 'Registering'
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Olympiad Problem-Solving Guide',
      type: 'PDF Guide',
      icon: '📖'
    },
    {
      id: 2,
      title: 'Number Theory Essentials',
      type: 'Video Course',
      icon: '🎥'
    },
    {
      id: 3,
      title: 'Geometry Practice Problems',
      type: 'Interactive Module',
      icon: '✏️'
    }
  ];

  const news = [
    {
      id: 1,
      title: '2025 National Winners Announced',
      date: 'April 5, 2026',
      excerpt: 'Celebrate the exceptional achievements of our national championship winners...'
    },
    {
      id: 2,
      title: 'New Study Materials Released',
      date: 'March 28, 2026',
      excerpt: 'Check out our newly updated problem sets and video tutorials...'
    },
    {
      id: 3,
      title: 'Success Story: From Participant to Scholar',
      date: 'March 15, 2026',
      excerpt: 'Read about how Olympiad experience shaped a student\'s academic journey...'
    }
  ];

  return (
    <section className="featured">
      <div className="section-container">
        <h2 className="section-title">Featured Content</h2>

        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'contests' ? 'active' : ''}`}
            onClick={() => setActiveTab('contests')}
          >
            🏆 Contests
          </button>
          <button
            className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            📚 Resources
          </button>
          <button
            className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            📰 News & Updates
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'contests' && (
            <div className="contests-list">
              {contests.map((contest) => (
                <div key={contest.id} className="contest-card">
                  <div className="contest-info">
                    <h3 className="contest-name">{contest.name}</h3>
                    <p className="contest-meta">
                      <span className="contest-date">📅 {contest.date}</span>
                      <span className="contest-level">📊 {contest.level}</span>
                    </p>
                    <span className={`contest-status ${contest.status.toLowerCase()}`}>
                      {contest.status}
                    </span>
                  </div>
                  <button className="btn-small">View Details →</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="resources-grid">
              {resources.map((resource) => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-icon">{resource.icon}</div>
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-type">{resource.type}</p>
                  <button className="btn-small">Access Resource →</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="news-list">
              {news.map((item) => (
                <div key={item.id} className="news-card">
                  <div className="news-header">
                    <h3 className="news-title">{item.title}</h3>
                    <span className="news-date">{item.date}</span>
                  </div>
                  <p className="news-excerpt">{item.excerpt}</p>
                  <button className="btn-small">Read More →</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Featured;
