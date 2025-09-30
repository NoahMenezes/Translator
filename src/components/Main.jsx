import React, { useState } from 'react';
import './Main.css';

const Main = () => {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const languages = [
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' }
  ];

  const handleTranslate = () => {
    // Here you would typically call a translation API
    setTranslatedText(`[${selectedLanguage.toUpperCase()}] ${inputText}`);
  };

  return (
    <div className="main-container">
      {/* Text Input Section */}
      <div className="input-section">
        <h2>Text to Translate</h2>
        <textarea 
          className="text-input" 
          placeholder="Enter your text here..."
          rows={8}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {/* Language Selection - Only visible when there's input */}
      {inputText && (
        <div className="language-section">
          <h3>Select Target Language</h3>
          <div className="language-grid">
            {languages.map((language) => (
              <label key={language.code} className="language-option">
                <input
                  type="radio"
                  name="language"
                  value={language.code}
                  checked={selectedLanguage === language.code}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                />
                <span className="language-label">
                  {language.flag} {language.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Translate Button - Only visible when a language is selected */}
      {selectedLanguage && (
        <div className="action-section">
          <button 
            className="translate-button"
            onClick={handleTranslate}
            disabled={!inputText.trim()}
          >
            Translate
          </button>
        </div>
      )}

      {/* Translation Result - Only visible after translation */}
      {translatedText && (
        <div className="result-section">
          <h3>Translation Result</h3>
          <div className="translation-result">
            {translatedText}
          </div>
        </div>
      )}
    </div>
  )
}

export default Main
