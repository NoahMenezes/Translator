import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

// Use environment variable for API key in production
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyBXDX0ZHT0tipCLJ75L7ivd2YN-9kZGrsQ';
const MODEL_NAME = 'gemini-2.0-flash';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
    temperature: 0.3, // Lower temperature for more consistent translations
    topP: 0.9,
    topK: 32,
    maxOutputTokens: 2048,
};

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

async function runChat(prompt) {
    try {
        const result = await model.generateContent({
            contents: [{
                role: 'user',
                parts: [{ text: prompt }]
            }],
            generationConfig,
            safetySettings,
        });
        
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error running chat:", error);
        throw new Error("Sorry, something went wrong. Please try again. 😵");
    }
}

function createTranslationPrompt(text, targetLanguage) {
    return `Translate the following text to ${targetLanguage}. 
    - Return only the translated text without any additional text, explanations, or quotes.
    - Preserve any formatting, line breaks, and special characters.
    - If the text contains placeholders like {variable}, keep them exactly as is.

Text to translate: "${text}"`;
}

export const translateText = async (text, targetLanguage) => {
    if (!text?.trim()) return '';
    
    try {
        const prompt = createTranslationPrompt(text, targetLanguage);
        const translatedText = await runChat(prompt);
        
        // Clean up the response
        let cleanText = translatedText.trim();
        
        // Remove any surrounding quotes if present
        if ((cleanText.startsWith('"') && cleanText.endsWith('"')) || 
            (cleanText.startsWith("'") && cleanText.endsWith("'"))) {
            cleanText = cleanText.slice(1, -1);
        }
        
        if (!cleanText) {
            throw new Error('Received empty translation');
        }
        
        return cleanText;
    } catch (error) {
        console.error('Translation error:', error);
        throw new Error(error.message || 'Failed to translate text');
    }
};

export default {
    translateText
};