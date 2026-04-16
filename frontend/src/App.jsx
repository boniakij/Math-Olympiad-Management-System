import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import KeyInfo from './components/KeyInfo';
import Featured from './components/Featured';
import CTA from './components/CTA';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <KeyInfo />
        <Featured />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
