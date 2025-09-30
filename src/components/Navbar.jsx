import React from 'react';
import './Navbar.css';

const Navbar = () => {

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
        
      </div>
    </nav>
  );
};

export default Navbar;
