// step 4: supporting documents
"use client";
import { GovBanner, GridContainer, Grid, Button, SummaryBox, Icon, StepIndicator, StepIndicatorStep } from "@trussworks/react-uswds";
import { useLanguage } from "@/components/LanguageProvider";
import AgencyHeader from "@/components/StateHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TitleLanguage from "@/components/TitleLanguage";
import VisaStepIndicator from "@/components/VisaStepIndicator";
import { useState } from "react";
import FileUploadCard from "@/components/form-fields/FileUpload";
import { useFormData } from "@/app/formsaver";

export default function SupportingDocumentsPage() {

  const { t } = useLanguage();
  const router = useRouter();
  const { formData, setField } = useFormData();

  const [bioPageFile, setBioPageFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [purposeFile, setPurposeFile] = useState(null);
  const [financialFile, setFinancialFile] = useState(null);
  
  const steps = [
    { id: "visa_type", label: t("visa_type") },
    { id: "personal", label: t("personal") },
    { id: "travel_details", label: t("travel_details") },
    { id: "documents", label: t("documents") },
    { id: "review",  label: t("review") },
  ];
  

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/application/review");
  };

  const handleBioFileChange = (file) => {
    setBioPageFile(file || null);
    setField("passportBioFileName", file ? file.name : "");
  };

  const handlePhotoFileChange = (file) => {
    setPhotoFile(file || null);
    setField("passportPhotoFileName", file ? file.name : "");
  };

  const handleFinFileChange = (file) => {
    setFinancialFile(file || null);
    setField("finDocFileName", file ? file.name : "");
  };

  const handlePurposeFileChange = (file) => {
    setPurposeFile(file || null);
    setField("purposeDocFileName", file ? file.name : "");
  };

  // for the purposes of the demo as long as the name or file exists it's fine (so we can load back and forth)
  const hasBioFile = !!bioPageFile || !!formData.passportBioFileName;
  const hasPhotoFile = !!photoFile || !!formData.passportPhotoFileName;
  const hasFinFile = !!financialFile || !!formData.finDocFileName;
  const hasSupportFile = !!purposeFile || !!formData.purposeDocFileName;
  return (
    <>
    
      <TitleLanguage />
      <GovBanner />
      <AgencyHeader />
      <main className="usa-section">
        <GridContainer className="usa-prose max-w-4xl">
          <div className="bg-primary-lighter border-[3px] border-primary radius-lg padding-2 padding-bottom-1 md:padding-4! ">
          <VisaStepIndicator currentStep={4} steps={steps} />
          </div>

          <SummaryBox className="margin-top-4 border-base" style={{ backgroundColor: "#FFFFFF" }}>
            <h2 className="text-3xl font-semibold mb-2">{t("documents_title")}</h2>
  
            <p className="margin-top-0 margin-bottom-3 font-sans-sm">
              {t('documents_subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="w-full mx-auto space-y-4">
            <FileUploadCard
              id="passport-photo"
              label={t('pphoto')}
              hint={t('pphoto_hint')}
              required
              accept="image/*,application/pdf"
              existingFileName={formData.passportPhotoFileName}
              onFileChange={handlePhotoFileChange}
            />

            <FileUploadCard
              id="passport-bio"
              label={t('ppbio')}
              hint={t('ppbio_hint')}
              required
              accept="image/*,application/pdf"
              existingFileName={formData.passportBioFileName}
              onFileChange={handleBioFileChange}
            />

            <FileUploadCard
              id="travel-purpose"
              label={t('travel_purpose')}
              hint={t('travel_purpose_hint')}
              required
              accept="image/*,application/pdf"
              existingFileName={formData.purposeDocFileName}
              onFileChange={handlePurposeFileChange}
            />

            <FileUploadCard
              id="financial-docs"
              label={t('findoc')}
              hint={t('findoc_hint')}
              required
              accept="image/*,application/pdf"
              existingFileName={formData.finDocFileName}
              onFileChange={handleFinFileChange}
            />



            <div className="mt-6 flex w-full justify-between items-center">
              <Link href="/application/travel-details">
                <Button
                  type="button"
                  outline
                  className="my-2"
                >
                  {t("back")}
                </Button>
              </Link>

              <div className="flex justify-end w-full">
              <button
              type="submit"
              className="usa-button mt-4"
              disabled={!hasBioFile || !hasPhotoFile || !hasFinFile || !hasSupportFile}
            >
              {t("continue_button")}
            </button>
              </div>
            </div>
            </form>  
          </SummaryBox>
        </GridContainer>
      </main>
    </>
  );
}