import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext.js';

export default function ThemeProvider({ children }) {
  
  const [brand, setBrand] = useState(() => {
    const saved = localStorage.getItem('app_brand') || 'foxconn';
    if (saved === 'nvidia') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return saved;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app_lang') || 'vi';
  });

  // When changing brand (foxconn / nvidia) -> save to localStorage, attach data-brand and dark class to html tag
  useEffect(() => {
    localStorage.setItem('app_brand', brand);
    document.documentElement.setAttribute('data-brand', brand);
    if (brand === 'nvidia') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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

