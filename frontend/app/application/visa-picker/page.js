// step 1: visa picker"use client";
"use client";
import { GovBanner, GridContainer, Grid, Button, SummaryBox, Icon } from "@trussworks/react-uswds";
import { useLanguage } from "@/components/LanguageProvider";
import AgencyHeader from "@/components/StateHeader";
import Link from "next/link";
import TitleLanguage from "@/components/TitleLanguage";

export default function HomePage() {
  const handleStart = () => {
    window.location.href = "/application/start"; // adjust later
  };

  const { t } = useLanguage();

  return (
    <>
      <TitleLanguage />
      <GovBanner />
      <AgencyHeader />

      <main className="usa-section">
        <GridContainer className="usa-prose max-w-4xl">
          <Grid row>
            <Grid tablet={{ col: 12 }}>
              <h2 className="text-3xl font-semibold mb-2">{t("app_heading")}</h2>
              <p className="text-gray-700 mb-6">
                This application allows you to apply for tourist, business, student, and work visas.
              </p>
            </Grid>
          </Grid>

        </GridContainer>
      </main>
    </>
  );
}
