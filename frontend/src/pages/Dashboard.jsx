import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');

    if (!userData || !token) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div className="section" style={{textAlign: 'center'}}>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="section" style={{ backgroundColor: 'var(--bg-color)', minHeight: 'calc(100vh - 80px)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Dashboard</h1>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </div>
          
          <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <h2>Welcome, {user.name}!</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
              Your account is currently pending approval. We will notify you once an administrator reviews your application.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
