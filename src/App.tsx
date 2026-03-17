import React, { useEffect, useState } from 'react';
import './Style/App.css';
import { BrowserRouter } from 'react-router-dom';
import HeaderNav from './components/HeaderNav';
import Products from './components/Products';
import WebglCanvas from './components/WebglCanvas';
import Footer from './components/Footer';
import GsapAnimations from './utils/gsapAnimations'
import ProductDetail from './components/ProductDetail';
import ProductCompactments from './components/ProductCompactments';
import LoadingOverlay from './components/LoadingOverlay';

function App() {
  const [activeProductIndex, setActiveProductIndex] = useState<number>(0);

  // 🌙 Theme state
  const [theme, setTheme] = useState<string>('light');

  // Existing animation logic
  useEffect(() => {
    const animation = new GsapAnimations();

    const getIndex = () => {
      const indexDetails = animation.products.getActiveProductIndex();
      if (indexDetails.animateDirection === 'Forward') setActiveProductIndex(indexDetails.index + 1);
      if (indexDetails.animateDirection === 'Backward') setActiveProductIndex(indexDetails.index - 1);
      if (indexDetails.animateDirection === 'None') setActiveProductIndex(indexDetails.index);
    }

    window.addEventListener('click', getIndex);

    return () => {
      window.removeEventListener('click', getIndex);
      animation?.dispose();
    }
  }, [])

  // 🌙 Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // 🌙 Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="app_wrapper">

        {/* 🌙 Theme Toggle Button */}
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{
              padding: '8px 12px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              background: theme === 'light' ? '#111' : '#fff',
              color: theme === 'light' ? '#fff' : '#111'
            }}
          >
            {theme === 'light' ? '🌙 Dark' : '☀ Light'}
          </button>
        </div>

        <div className="app_outer">
          <div className="app">
            <HeaderNav />

            <main>
              <Products activeProductIndex={activeProductIndex} />
              <ProductDetail activeProductIndex={activeProductIndex} />
              <ProductCompactments activeProductIndex={activeProductIndex} />
            </main>

            <Footer />
          </div>

          <div className="gradient_background_innerWrapper">
            <div role={'presentation'} className="gradient_background_inner" />
            <div role={'presentation'} className="gradient_background_inner sec" />
          </div>

          <WebglCanvas />
        </div>

        <div role={'presentation'} className="gradient_background_outer" />

        <div className='credits'>
          <span className='designer'>
            <small>Designed by</small>
            <a>MonkHarshu</a>
          </span>

          <span className='dev'>
            <span>Built with ❤️ by</span>
            <a href="https://www.linkedin.com/in/adeyanju-adeyemi-88b058235/">
              Harshvardhan Bhosale
            </a>
          </span>
        </div>

        <LoadingOverlay />
      </div>
    </BrowserRouter>
  );
}

export default App;
