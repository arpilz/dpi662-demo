// components/AgencyHeader.js
"use client";

import { useLanguage } from "@/components/LanguageProvider";
import AppLanguageSelector from "@/components/AppLanguageSelector";

export default function AgencyHeader({
  sealSrc = "/dpt_logo.svg",
}) {
  const { t } = useLanguage();

  return (
    <div className="bg-[#112E51] text-white py-4">
      <div className="grid-container">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center">

          {/* always row */}
          <div className="flex flex-row items-center gap-4">
            
            {/* state dept logo */}
            <img
              src={sealSrc}
              alt="Agency seal"
              style={{ width: "89px", height: "89px" }}
              className="shrink-0"
            />

            {/* text */}
            <div className="flex flex-col">
              <h1 className="margin-top-0 margin-bottom-1 font-sans-lg font-bold text-white">
                {t("header_title")}
              </h1>
              <p className="margin-0 font-sans-sm">
                {t("header_subtitle")}
              </p>
            </div>

          </div>

          {/* Language selector */}
          <div className="mt-3 md:mt-0">
            <AppLanguageSelector />
          </div>

        </div>

      </div>
    </div>
  );
}
