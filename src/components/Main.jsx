import React from 'react';
import './Main.css';

const Main = () => {
  return (
    <div className="main-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">AI Translator</h1>
        <p className="hero-subtitle">Instant translation powered by artificial intelligence</p>
      </div>

      {/* Translator Interface */}
      <div className="translator-interface">
        <div className="translator-grid">
          {/* Input Section */}
          <div className="input-container">
            <div className="textarea-wrapper">
              <textarea 
                className="translator-textarea input-textarea" 
                placeholder="Enter text to translate..."
                rows="8"
              />
              <div className="textarea-label">Source Text</div>
            </div>
          </div>

          {/* Control Center */}
          <div className="control-center">
            <div className="language-selector">
              <select className="language-dropdown">
                <option value="">Select Language</option>
                <option value="es">🇪🇸 Spanish</option>
                <option value="fr">🇫🇷 French</option>
                <option value="de">🇩🇪 German</option>
                <option value="it">🇮🇹 Italian</option>
                <option value="pt">🇵🇹 Portuguese</option>
                <option value="ru">🇷🇺 Russian</option>
                <option value="ja">🇯🇵 Japanese</option>
                <option value="ko">🇰🇷 Korean</option>
                <option value="zh">🇨🇳 Chinese</option>
                <option value="ar">🇸🇦 Arabic</option>
                <option value="hi">🇮🇳 Hindi</option>
              </select>
            </div>
            
            <button type="button" className="translate-btn">
              <span className="btn-icon">⚡</span>
              Translate Now
            </button>
          </div>

          {/* Output Section */}
          <div className="output-container">
            <div className="textarea-wrapper">
              <textarea 
                className="translator-textarea output-textarea" 
                placeholder="Translation will appear here..."
                readOnly
                rows="8"
              />
              <div className="textarea-label">Translation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Lightning Fast</h3>
          <p>Instant translations in milliseconds</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>High Accuracy</h3>
          <p>AI-powered precision translation</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>100+ Languages</h3>
          <p>Support for global communication</p>
        </div>
      </div>
    </div>
  )
}

export default Main
