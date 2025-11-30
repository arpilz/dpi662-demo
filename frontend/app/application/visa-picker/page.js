// step 1: visa picker"use client";
"use client";
import { GovBanner, GridContainer, Grid, Button, SummaryBox, Icon, StepIndicator, StepIndicatorStep } from "@trussworks/react-uswds";
import { useLanguage } from "@/components/LanguageProvider";
import AgencyHeader from "@/components/StateHeader";
import Link from "next/link";
import TitleLanguage from "@/components/TitleLanguage";
import VisaStepIndicator from "@/components/VisaStepIndicator";
import FormSelector from "@/components/FormSelector";

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
          <VisaStepIndicator currentStep={1} steps={steps} />
          </div>

          <Grid row>
            <Grid tablet={{ col: 12 }}>
              
            </Grid>
          </Grid>

          <SummaryBox className="margin-top-4 border-base" style={{ backgroundColor: "#FFFFFF" }}>
          <h2 className="text-3xl font-semibold mb-2">{t("select_type")}</h2>

          <p className="margin-top-0 margin-bottom-3 font-sans-sm">
            {/* Choose the visa category that best matches your travel purpose. */}
            Choose the visa category that best matches your travel purpose.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-black">
            <FormSelector title={t('tourbiz')} description={t('tourbiz_desc')} href="/application/personal-info" icon="/airplane.svg" />
            <FormSelector title={t('student')}description={t('student_desc')} href="/application/personal-info" icon="/mortarboard.svg" />
            <FormSelector title={t('work')} description={t('work_desc')} href="/application/personal-info" icon="/briefcase.svg" />
            <FormSelector title={t('exchange')} description={t('exchange_desc')} href="/application/personal-info" icon="/people.svg" />
            <FormSelector title={t('fiance')} description={t('fiance_desc')} href="/application/personal-info" icon="/heart.svg" />
            <FormSelector title={t('intracomp')} description={t('intracomp_desc')} href="/application/personal-info" icon="/buildings.svg" />
          </div>

          <div className="bg-primary-lighter border border-primary radius-lg padding-2 md:padding-3 margin-top-4">
              <div>
                <p className="margin-top-0 margin-bottom-0 font-sans-sm text-primary-dark">
                  {/* Need help choosing? */}
                  <b>Need help choosing? </b> Visit our <a href="https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html" className="underline">visa wizard tool</a> or contact the nearest U.S. embassy or consulate for guidance.
                </p>
              </div>
          </div>

          
        </SummaryBox>
        <Link href="/"><Button
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
