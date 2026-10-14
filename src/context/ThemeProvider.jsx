import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext.js';

export default function ThemeProvider({ children }) {
  
  const [brand, setBrand] = useState(() => {
    return localStorage.getItem('app_brand') || 'foxconn';
  });

  
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app_lang') || 'vi';
  });

  // When changing brand (foxconn / nvidia) -> save to localStorage and attach data-brand to html tag
  useEffect(() => {
    localStorage.setItem('app_brand', brand);
    document.documentElement.setAttribute('data-brand', brand);
  }, [brand]);


  useEffect(() => {
    localStorage.setItem('app_lang', language);
  }, [language]);

  return (
    <ThemeContext.Provider
      value={{
        brand,
        setBrand,
        language,
        setLanguage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

