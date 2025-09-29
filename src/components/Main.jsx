import React from 'react';
import './Main.css';

const Main = () => {
  return (
    <div className="main-container">
      <div className="translator-section">
        <h1>AI Translator</h1>
        <p>Translate text between languages using AI</p>
        
        <div className="translator-form">
          <div className="input-section">
            <textarea 
              className="translator-input" 
              placeholder="Enter text to translate..." 
              style={{height: '120px'}}
            />
          </div>
          
          <div className="language-selector">
            <p>Select target language:</p>
            <select className="language-dropdown">
              <option value="">Choose a language</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
          
          <button type="button" className="translate-btn">
            Translate
          </button>
          
          <div className="output-section">
            <textarea 
              className="translator-output" 
              placeholder="Translation will appear here..." 
              readOnly
              style={{height: '120px'}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
