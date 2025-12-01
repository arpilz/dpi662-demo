// step 3: travel details
"use client";
import { GovBanner, GridContainer, Button, Form, Label, Select, Alert, FormGroup, ErrorMessage } from "@trussworks/react-uswds";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import AgencyHeader from "@/components/StateHeader";
import TitleLanguage from "@/components/TitleLanguage";
import VisaStepIndicator from "@/components/VisaStepIndicator";
import { TextField } from "@/components/form-fields/TextField";
import { DateField } from "@/components/form-fields/DateField";
import { useFormData } from "@/app/formsaver";

export default function TravelDetailsPage() {

  const { t } = useLanguage();
  const router = useRouter();
  const { formData, setField } = useFormData();
  
  const steps = [
    { id: "visa_type", label: t("visa_type") },
    { id: "personal", label: t("personal") },
    { id: "travel_details", label: t("travel_details") },
    { id: "documents", label: t("documents") },
    { id: "review",  label: t("review") },
  ];

    const purposes = [
    "",
    "Tourism",
    "Visiting Family or Friends",
    "Business Meeting/Conference",
    "Employment",
    "Medical Treatment",
    "Education/Study",
    "Other",
  ];


      const [errors, setErrors] = useState({});
      const [submitted, setSubmitted] = useState(false);
    
      const validate = (data) => {
        const newErrors = {};
    
        if (!data.addressStay.trim()) newErrors.addressStay = t('address_stay_error');
    
        if (!data.arrivalDate) {
          newErrors.arrivalDate = t('doa_error1');
        } else {
          const parsed = new Date(data.arrivalDate);
          const today = new Date();
    
          if (Number.isNaN(parsed.getTime()))
            newErrors.arrivalDate = t('dob_ndate');
          else if (parsed < today)
            newErrors.arrivalDate = t('doa_error2');
        }

        if (!data.departureDate) {
          newErrors.departureDate = t('dod_error1');
        } else {
          const parsed = new Date(data.departureDate);
          const today = new Date();
    
          if (Number.isNaN(parsed.getTime()))
            newErrors.departureDate = t('dob_ndate');
          else if (parsed < today)
            newErrors.departureDate = t('dod_error2');
        }
    
        if (!data.purposeOfTravel)
          newErrors.purposeOfTravel = t('purpose_of_travel_error');

    
        return newErrors;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
    
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setSubmitted(false);
          return;
        }
    
        console.log("Validated form data:", formData);
        setSubmitted(true);
    
        router.push("/application/supporting-documents");
      };

  return (
    <>
    
      <TitleLanguage />
      <GovBanner />
      <AgencyHeader />
      <main className="usa-section">
        <GridContainer className="usa-prose max-w-4xl">
          <div className="bg-primary-lighter border-[3px] border-primary radius-lg padding-2 padding-bottom-1 md:padding-4! ">
          <VisaStepIndicator currentStep={3} steps={steps} />
          </div>

           <div className="w-full mx-auto p-6 bg-white rounded-xl border border-gray-200">
            <h2 className="text-3xl font-semibold mb-2">
              {t("travel_title")}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {t("travel_subtitle")}
            </p>
            <p className="text-xs text-gray-500">
                  <span className="text-red-600">*</span> {t('req_field')}
           </p>

            <Form onSubmit={handleSubmit} noValidate className="w-full max-w-none!">

              <FormGroup
                  error={Boolean(errors.purposeOfTravel)}
                  className="w-full"
                >
                  <Label htmlFor="purposeOfTravel">
                    {t('purpose_of_travel')} <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    id="purposeOfTravel"
                    name="purposeOfTravel"
                    value={formData.purposeOfTravel}
                    required
                    onChange={(e) => setField("purposeOfTravel", e.target.value)}
                    className="w-full rounded-md!"
                    validationStatus={
                      errors.purposeOfTravel ? "error" : undefined
                    }
                  >
                    <option value="" disabled>
                      {t('purpose_of_travel_p')}
                    </option>
                    {purposes
                      .filter(Boolean)
                      .map((nation) => (
                        <option key={nation} value={nation}>
                          {t(nation)}
                        </option>
                      ))}
                  </Select>
                  {errors.purposeOfTravel && (
                    <ErrorMessage>{errors.purposeOfTravel}</ErrorMessage>
                  )}
                </FormGroup>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4! w-full">
                  {/* arrival date */}
                  <DateField
                  id="arrivalDate"
                  name="arrivalDate"
                  label={t('arrival_date')}
                  required
                  value={formData.arrivalDate}
                  error={errors.arrivalDate}
                  onChange={(value) => setField("arrivalDate", value)}
                  className="w-full rounded-md!"
                  validationStatus={errors.arrivalDate ? "error" : undefined}
                  placeholder={t("dob_p")}
                  minDate={new Date().toISOString().split("T")[0]}
                />

                {/* departure date */}
                <DateField
                  id="departureDate"
                  name="departureDate"
                  label={t('departure_date')}
                  required
                  value={formData.departureDate}
                  error={errors.departureDate}
                  onChange={(value) => setField("departureDate", value)}
                  className="w-full rounded-md!"
                  validationStatus={errors.departureDate ? "error" : undefined}
                  placeholder={t("dob_p")}
                  minDate={new Date().toISOString().split("T")[0]}
                />
              </div>

              <TextField
                id="addressStay"
                name="addressStay"
                label={t('address_stay')}
                required
                value={formData.addressStay}
                error={errors.addressStay}
                onChange={(value) => setField("addressStay", value)}
                className="w-full"
                validationStatus={errors.addressStay ? "error" : undefined}
                hint={t('address_hint')}
              />
              
              
              
            <div className="mt-6 flex w-full justify-between items-center">
              <Link href="/application/personal-info">
                <Button
                  type="button"
                  outline
                  className="my-2"
                >
                  {t("back")}
                </Button>
              </Link>

              <div className="flex justify-end w-full">
                <Button type="submit" className="my-2 mx-0!">
                  {t("continue_button")}
                </Button>
              </div>
            </div>


            </Form>
          </div>
        </GridContainer>
      </main>
    </>
  );
}