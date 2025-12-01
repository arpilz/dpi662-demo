"use client";

import { GovBanner, GridContainer, Button, Form, Label, Select, Alert, FormGroup, ErrorMessage } from "@trussworks/react-uswds";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import AgencyHeader from "@/components/StateHeader";
import TitleLanguage from "@/components/TitleLanguage";
import { TextField } from "@/components/form-fields/TextField";
import { useFormData } from "@/app/formsaver";

export default function ResumeApplicationPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { formData, setField, setAll } = useFormData();

  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    if (!data.passportNumber.trim())
      newErrors.passportNumber = t('access_code_error');
    else if (!/^[A-Za-z0-9]{6}$/.test(data.passportNumber.trim()))
      newErrors.passportNumber =
        t('access_code_error');

    if (!data.email.trim()) newErrors.email = t('email_error');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      newErrors.email = t('email_error');

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // pushes sample data through for the purposes of the demo
    setAll({
        // visa type
        visaType: t("student"),
        // personal info
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "07/05/1985",
        nationality: t("Canada"),
        passportNumber: "P123456AA",
        email: "johndoe@example.com",
        phoneNumber: "+1 (888) 601-1616",
        // travel details
        purposeOfTravel: t("Education/Study"),
        arrivalDate: "03/07/2026",
        departureDate: "12/20/2027",
        addressStay: "1 Oxford St., Cambridge, MA, 02138",
        // supporting documents
        passportBioFileName: "doe_passport.pdf",
        passportPhotoFileName: "doe_pp_photo.png",
        finDocFileName: "doe_bank.pdf",
        purposeDocFileName: "doe_support.pdf",})
    router.push("/application/review");
  };

  return (
    <>
      <TitleLanguage />
      <GovBanner />
      <AgencyHeader />

      <main className="usa-section">
        <GridContainer className="usa-prose max-w-2xl md:px-60!">

          <div className="w-full mx-auto p-6 bg-white rounded-xl border border-gray-200">
            <h2 className="text-3xl font-semibold mb-2">
              {t("resume_app")}
            </h2>

            <p className="text-xs text-gray-500">
                  <span className="text-red-600">*</span> {t('req_field')}
           </p>

            <Form onSubmit={handleSubmit} noValidate className="w-full max-w-none!">
            
            <TextField
                  id="email"
                  name="email"
                  label={t("email")}
                  type="email"
                  placeholder={t("email_p")}
                  required
                  value={formData.email}
                  error={errors.email}
                  onChange={(value) => setField("email", value)}
                  className="w-full"
                  validationStatus={errors.email ? "error" : undefined}
            />
    

              {/* access code */}
              <TextField
                id="passport-number"
                name="passportNumber"
                label={t("access_code")}
                placeholder={t("access_code_p")}
                required
                value={formData.passportNumber}
                error={errors.passportNumber}
                onChange={(value) => setField("passportNumber", value)}
                className="w-full"
                validationStatus={errors.passportNumber ? "error" : undefined}
                hint={t("access_code_hint")}
              />
              
            

            <div className="mt-6 width-full">
                <Button type="submit" className="my-2 mx-0! width-full">
                  {t('login')}
                </Button>
            </div>


            </Form>
          </div>

          
        </GridContainer>
      </main>
    </>
  );
}
