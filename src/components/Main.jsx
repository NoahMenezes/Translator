import React, { useState } from 'react';
import './Main.css';
import { translateText } from './config/gemini';

const Main = () => {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim() || !selectedLanguage) return;
    
    setIsLoading(true);
    setError('');
    setTranslatedText('');
    
    try {
      const language = languages.find(lang => lang.code === selectedLanguage);
      if (!language) {
        throw new Error('Selected language not found');
      }
      
      console.log(`Translating to ${language.name}...`);
      const prompt = `Translate the following text to ${language.name}: "${inputText}"`;
      const result = await translateText(prompt);
      
      if (!result) {
        throw new Error('No translation returned from API');
      }
      
      // Clean up the response to remove any markdown or extra quotes
      const cleanResult = result.replace(/^"|"$/g, '').trim();
      setTranslatedText(cleanResult);
      console.log('Translation successful');
      
    } catch (err) {
      console.error('Translation error:', err);
      
      let errorMessage = 'Translation failed. ';
      
      if (err.message.includes('API key')) {
        errorMessage += 'Invalid API key. Please check your Gemini API key.';
      } else if (err.message.includes('quota')) {
        errorMessage += 'API quota exceeded. Please check your Google Cloud account.';
      } else if (err.message.includes('network')) {
        errorMessage += 'Network error. Please check your internet connection.';
      } else if (err.message.includes('empty')) {
        errorMessage += 'Received empty response from the translation service.';
      } else {
        errorMessage += err.message || 'Please try again later.';
      }
      
      setError(errorMessage);
      setTranslatedText('');
    } finally {
      setIsLoading(false);
    }
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
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}

      {/* Translation Result - Shows loading or result */}
      <div className="result-section" style={{ display: translatedText || isLoading ? 'block' : 'none' }}>
        <h3>Translation Result</h3>
        <div className="translation-result">
          {isLoading ? (
            <div className="loading-animation">Translating...</div>
          ) : (
            translatedText
          )}
        </div>
        {translatedText && (
          <button 
            className="copy-button"
            onClick={() => {
              navigator.clipboard.writeText(translatedText);
              // Optional: Add a temporary "Copied!" message
              const button = document.querySelector('.copy-button');
              if (button) {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                  button.textContent = originalText;
                }, 2000);
              }
            }}
          >
            Copy to Clipboard
          </button>
        )}
      </div>
    </div>
  )
}

export default Main
