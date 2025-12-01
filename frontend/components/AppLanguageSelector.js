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
        <option value="fr">Français (French)</option>
        <option value="de">Deutsch (German)</option>
        <option value="ar">العربية (Arabic)</option>
        <option value="hi">हिन्दी (Hindi)</option>
        <option value="bn">বাংলা (Bengali)</option>
        <option value="he">עברית (Hebrew)</option>
        <option value="id">bahasa Indonesia (Indonesian)</option>
        <option value="it">Italiano (Italian)</option>
        <option value="ja">日本語 (Japanese)</option>
        <option value="ko">한국어 (Korean)</option>
        <option value="fa">فارسی (Farsi)</option>
        <option value="th">าษาไทย (Thai)</option>
        <option value="ha">هَرْشٜن هَوْس (Hausa)</option>
        <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
        <option value="pl">Polski (Polish)</option>
        <option value="ru">Русский язык (Russian)</option>
      </select>
    </div>
  );
}
