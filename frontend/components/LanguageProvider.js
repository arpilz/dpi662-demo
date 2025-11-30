"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // restore from localStorage on first client render
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("app_lang");
    if (saved && translations[saved]) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("app_lang", newLang);
    }
  };

  const t = (key) =>
    translations[lang]?.[key] ?? translations.en?.[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
