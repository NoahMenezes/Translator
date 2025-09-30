import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  red: {
    primary: '#dc2626',
    secondary: '#fecaca',
    dark: '#7f1d1d',
    light: '#fef2f2'
  },
  blue: {
    primary: '#2563eb',
    secondary: '#bfdbfe',
    dark: '#1e3a8a',
    light: '#eff6ff'
  },
  green: {
    primary: '#16a34a',
    secondary: '#bbf7d0',
    dark: '#14532d',
    light: '#f0fdf4'
  },
  yellow: {
    primary: '#ca8a04',
    secondary: '#fef08a',
    dark: '#713f12',
    light: '#fefce8'
  },
  orange: {
    primary: '#ea580c',
    secondary: '#fed7aa',
    dark: '#7c2d12',
    light: '#fff7ed'
  },
  dark: {
    primary: '#9333ea',
    secondary: '#c4b5fd',
    dark: '#1e1b4b',
    light: '#1f2937'
  },
  light: {
    primary: '#2563eb',
    secondary: '#bfdbfe',
    dark: '#1e3a8a',
    light: '#ffffff'
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', THEMES[theme].primary);
    document.documentElement.style.setProperty('--secondary-color', THEMES[theme].secondary);
    document.documentElement.style.setProperty('--dark-color', THEMES[theme].dark);
    document.documentElement.style.setProperty('--light-color', THEMES[theme].light);
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeContext.Provider value={{ 
      currentTheme: theme,
      changeTheme,
      toggleDropdown,
      isOpen,
      themes: Object.keys(THEMES)
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
