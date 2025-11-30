// step 2: personal info
"use client";
import { GovBanner, GridContainer, Grid, Button, SummaryBox, Icon, StepIndicator, StepIndicatorStep } from "@trussworks/react-uswds";
import { useLanguage } from "@/components/LanguageProvider";
import AgencyHeader from "@/components/StateHeader";
import Link from "next/link";
import TitleLanguage from "@/components/TitleLanguage";
import VisaStepIndicator from "@/components/VisaStepIndicator";

export default function VisaPickerPage() {

  const { t } = useLanguage();
  
  const steps = [
    { id: "visa_type", label: t("visa_type") },
    { id: "personal", label: t("personal") },
    { id: "travel_details", label: t("travel_details") },
    { id: "documents", label: t("documents") },
    { id: "review",  label: t("review") },
  ];

  return (
    <>
    
      <TitleLanguage />
      <GovBanner />
      <AgencyHeader />
      <main className="usa-section">
        <GridContainer className="usa-prose max-w-4xl">
          <div className="bg-primary-lighter border-[3px] border-primary radius-lg padding-2 padding-bottom-1 md:padding-4! ">
          <VisaStepIndicator currentStep={2} steps={steps} />
          </div>

          <Grid row>
            <Grid tablet={{ col: 12 }}>
              
            </Grid>
          </Grid>
        <Link href="/application/visa-picker"><Button
              type="button"
              outline
              className="width-full max-w-md margin-y-2"
            >
              {/* go back */}
              {t("back")}
            </Button></Link>
        </GridContainer>
      </main>
    </>
  );
}