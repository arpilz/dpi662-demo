// step 5: review
"use client";
import { GovBanner, GridContainer, Grid, Button, SummaryBox, Icon, StepIndicator, StepIndicatorStep } from "@trussworks/react-uswds";
import { useLanguage } from "@/components/LanguageProvider";
import AgencyHeader from "@/components/StateHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TitleLanguage from "@/components/TitleLanguage";
import VisaStepIndicator from "@/components/VisaStepIndicator";
import ReviewBox from "@/components/ReviewBox";
import { useState } from "react";
import { useFormData } from "@/app/formsaver";

export default function ReviewPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { formData, setField } = useFormData();

  const [affirmed, setAffirmed] = useState(false);

  const personalInfoFields = [
    { label: "full_name", value: formData.firstName + " " + formData.lastName },
    { label: "dob", value: formData.dateOfBirth || "10/01/2000" },
    { label: "nationality", value: formData.nationality },
    { label: "ppn", value: formData.passportNumber },
    { label: "email", value: formData.email },
    { label: "phone_number", value: formData.phoneNumber },
  ];

  const travelDetailFields = [
    { label: "purpose_of_travel", value: formData.purposeOfTravel },
    { label: "travel_dates", value: (formData.arrivalDate + " - " + formData.departureDate === " - ") ? "12/15/2025 - 11/11/2026" : formData.arrivalDate + " - " + formData.departureDate },
    { label: "us_address", value: formData.addressStay },
  ];

  const docuFields = [
    { label: "pphoto", value: formData.passportBioFileName },
    { label: "ppbio", value: formData.passportPhotoFileName },
    { label: "travel_purpose", value: formData.purposeDocFileName },
    { label: "findoc", value: formData.finDocFileName },
  ];


  
  const steps = [
    { id: "visa_type", label: t("visa_type") },
    { id: "personal", label: t("personal") },
    { id: "travel_details", label: t("travel_details") },
    { id: "documents", label: t("documents") },
    { id: "review",  label: t("review") },
  ];

  const handleSubmit = () => {
    if (!affirmed) {
      alert("You must affirm before submitting.");
      return;
    }
    router.push("/application/complete");
  };


  return (
    <>
    
      <TitleLanguage />
      <GovBanner />
      <AgencyHeader />
      <main className="usa-section">
        <GridContainer className="usa-prose max-w-4xl">
          <div className="bg-primary-lighter border-[3px] border-primary radius-lg padding-2 padding-bottom-1 md:padding-4! ">
          <VisaStepIndicator currentStep={5} steps={steps} />
          </div>

          <SummaryBox className="margin-top-4 border-base" style={{ backgroundColor: "#FFFFFF" }}>
            <h2 className="text-3xl font-semibold mb-2">{t("review_title")}</h2>
  
            <p className="margin-top-0 margin-bottom-3 font-sans-sm">
              {t('review_subtitle')}
            </p>

            <ReviewBox
              title={t('visa_type')}
              fields={[{label: "", value: formData.visaType }]}
              editHref="/application/visa-picker"
            />

            <ReviewBox
              title={t('personal')}
              fields={personalInfoFields}
              editHref="/application/personal-info"
            />

            <ReviewBox
              title={t('travel_details')}
              fields={travelDetailFields}
              editHref="/application/travel-details"
            />

            <ReviewBox
              title={t('documents')}
              fields={docuFields}
              editHref="/application/supporting-documents"
            />
          

          <div className="bg-primary-lighter border-[3px] border-primary radius-lg padding-2 md:padding-3 margin-bottom-4">
            <div className="display-flex flex-align-start">
              <input
                type="checkbox"
                id="affirmationCheck"
                className="margin-right-1 margin-top-1"
                checked={affirmed}
                onChange={(e) => setAffirmed(e.target.checked)}
              />
              <label htmlFor="affirmationCheck">
                {t("affirmation")}
              </label>
            </div>

          </div>

          <div className="mt-6 flex w-full justify-between items-center">
              <Link href="/application/supporting-documents">
                <Button
                  type="button"
                  outline
                  className="my-2"
                >
                  {t("back")}
                </Button>
              </Link>

            <div className="flex justify-end w-full">
            <Button type="button" className="my-2 mx-0!" onClick={handleSubmit}>
              {t("submit")}
            </Button>
              </div>
            </div>
          </SummaryBox>
        </GridContainer>
      </main>
    </>
  );
}