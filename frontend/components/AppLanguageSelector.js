"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function AppLanguageSelector() {
  const { lang, changeLanguage } = useLanguage();

  const handleChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="usa-language-container">
      <label className="usa-sr-only" htmlFor="lang-select">
        Language
      </label>
      <select
        id="lang-select"
        className="usa-select usa-select--small w-auto"
        value={lang}
        style={{ width: "auto" }}
        onChange={handleChange}
      >
        <option value="en">English</option>
        <option value="es">Español (Spanish)</option>
        <option value="cn">中文 (Chinese)</option>
      </select>
    </div>
  );
}
