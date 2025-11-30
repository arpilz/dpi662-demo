"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function TitleLanguage({ defaultTitle }) {
  const { t } = useLanguage();

  useEffect(() => {
    // fallback to defaultTitle if you want
    document.title = t("page_title") || defaultTitle || document.title;
  }, [t]);

  return null; // renders nothing, just side-effect
}
