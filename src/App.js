// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';

// Theme colors configuration
export const THEMES = {
  light: {
    name: 'Light',
    className: 'theme-light'
  },
  dark: {
    name: 'Dark',
    className: 'theme-dark'
  },
  blue: {
    name: 'Blue',
    className: 'theme-blue'
  },
  red: {
    name: 'Red',
    className: 'theme-red'
  },
  green: {
    name: 'Green',
    className: 'theme-green'
  },
  yellow: {
    name: 'Yellow',
    className: 'theme-yellow'
  },
  orange: {
    name: 'Orange',
    className: 'theme-orange'
  },
  purple: {
    name: 'Purple',
    className: 'theme-purple'
  }
};

function App() {
  const [theme, setTheme] = useState('light');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Set theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    setIsDarkMode(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Apply theme class to document element
  useEffect(() => {
    document.documentElement.className = '';
    document.documentElement.classList.add(THEMES[theme]?.className || 'theme-light');
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    setIsDarkMode(newTheme === 'dark');
    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`App ${theme}`}>
      <Navbar 
        currentTheme={isDarkMode ? 'dark' : 'light'}
        onThemeChange={toggleTheme}
        onChangeTheme={changeTheme}
      />
      <Main />
    </div>
  );
}

export default App;
