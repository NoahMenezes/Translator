import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FiSun, FiMoon, FiMenu, FiX, FiGlobe, FiDroplet } from 'react-icons/fi';
import { THEMES } from '../App';

const Navbar = ({ onThemeChange, currentTheme, onChangeTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (e) => {
    setCurrentLanguage(e.target.value);
    // You can add language change logic here
  };

  const [showThemePicker, setShowThemePicker] = useState(false);
  

  const handleThemeSelect = (theme) => {
    onChangeTheme(theme);
    setShowThemePicker(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <a href="#home" className="navbar-logo">
          <div className="logo-icon">
            🌐
          </div>
          <span className="logo-text">PollyGlot</span>
        </a>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          

          

          
          
          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={onThemeChange}
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
          >
            {currentTheme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;