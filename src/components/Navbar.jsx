import React, { useRef, useEffect } from 'react';
import './Navbar.css';
import { useTheme } from '../context/ThemeContext';
import { THEMES } from '../context/ThemeContext';
import { FiSun, FiMoon, FiDroplet, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const { currentTheme, changeTheme, toggleDropdown, isOpen, themes } = useTheme();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleDropdown]);

  const getThemeIcon = (theme) => {
    switch(theme) {
      case 'dark':
        return <FiMoon className="theme-icon" />;
      case 'light':
        return <FiSun className="theme-icon" />;
      default:
        return <FiDroplet className="theme-icon" style={{ color: `var(--primary-color)` }} />;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <div className="logo-icon">
            🦜
          </div>
          <span className="logo-text">PollyGlot</span>
        </div>
        <div className="navbar-tagline">
          Perfect Translation Every Time
        </div>
        <div className="theme-picker" ref={dropdownRef}>
          <button 
            className="theme-toggle"
            onClick={toggleDropdown}
            aria-label="Change theme"
            aria-expanded={isOpen}
          >
            {getThemeIcon(currentTheme)}
            <FiChevronDown className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="theme-dropdown">
              {themes.map((theme) => (
                <button
                  key={theme}
                  className={`theme-option ${currentTheme === theme ? 'active' : ''}`}
                  onClick={() => changeTheme(theme)}
                  style={{
                    '--theme-color': THEMES[theme].primary,
                    '--theme-bg': THEMES[theme].light,
                    '--theme-dark': THEMES[theme].dark
                  }}
                >
                  <span className="theme-color" style={{ backgroundColor: THEMES[theme].primary }} />
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
