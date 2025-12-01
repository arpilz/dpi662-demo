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

export default function PersonalInfoPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { formData, setField } = useFormData();

  const steps = [
    { id: "visa_type", label: t("visa_type") },
    { id: "personal", label: t("personal") },
    { id: "travel_details", label: t("travel_details") },
    { id: "documents", label: t("documents") },
    { id: "review", label: t("review") },
  ];

  const nationalities = [
    "",
    "Argentina",
    "Australia",
    "Brazil",
    "Canada",
    "China",
    "Colombia",
    "France",
    "Germany",
    "India",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Mexico",
    "Netherlands",
    "Philippines",
    "Saudi Arabia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "United Arab Emirates",
    "United Kingdom",
    "Other",
];


  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setFieldWithSave = (field, value) => {
    setField((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitted(false);
  };

  const validate = (data) => {
    const newErrors = {};

    if (!data.firstName.trim()) newErrors.firstName = t('first_name_error');
    if (!data.lastName.trim()) newErrors.lastName = t('last_name_error');

    if (!data.dateOfBirth) {
      newErrors.dateOfBirth = t('dob_empty');
    } else {
      const parsed = new Date(data.dateOfBirth);
      const today = new Date();

      if (Number.isNaN(parsed.getTime()))
        newErrors.dateOfBirth = t('dob_ndate');
      else if (parsed > today)
        newErrors.dateOfBirth =t('dob_future');
    }

    if (!data.nationality)
      newErrors.nationality = t('nationality_error');

    if (!data.passportNumber.trim())
      newErrors.passportNumber = t('ppn_error');
    else if (!/^[A-Za-z0-9]{6,20}$/.test(data.passportNumber.trim()))
      newErrors.passportNumber =
        t('ppn_len_error');

    if (!data.email.trim()) newErrors.email = t('email_error');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      newErrors.email = t('email_error');

    const digits = data.phoneNumber.replace(/\D/g, "");
    if (!data.phoneNumber.trim() || digits.length < 7)
      newErrors.phoneNumber = t('phone_error');

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
    router.push("/application/travel-details");
  };

  return (
    <>
      <TitleLanguage />
      <GovBanner />
      <AgencyHeader />

      <main className="usa-section">
        <GridContainer className="usa-prose max-w-4xl">
          <div className="bg-primary-lighter border-[3px] border-primary radius-lg p-4">
            <VisaStepIndicator currentStep={2} steps={steps} />
          </div>

          <div className="w-full mx-auto p-6 bg-white rounded-xl border border-gray-200">
            <h2 className="text-3xl font-semibold mb-2">
              {t("personal_title")}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {t("personal_subtitle")}
            </p>
            <p className="text-xs text-gray-500">
                  <span className="text-red-600">*</span> {t('req_field')}
           </p>

            <Form onSubmit={handleSubmit} noValidate className="w-full max-w-none!">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4! w-full">
                <TextField
                  id="first-name"
                  name="firstName"
                  label={t("first_name")}
                  placeholder={t("first_name_p")}
                  required
                  value={formData.firstName}
                  error={errors.firstName}
                  onChange={(value) => setField("firstName", value)}
                  className="w-full"
                  validationStatus={errors.firstName ? "error" : undefined}
                />

                <TextField
                  id="last-name"
                  name="lastName"
                  label={t("last_name")}
                  placeholder = {t("last_name_p")}
                  required
                  value={formData.lastName}
                  error={errors.lastName}
                  onChange={(value) => setField("lastName", value)}
                  className="w-full"
                  validationStatus={errors.lastName ? "error" : undefined}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4! w-full">
                {/* Date of Birth */}
                <DateField
                  id="date-of-birth"
                  name="dateOfBirth"
                  label={t("dob")}
                  required
                  value={formData.dateOfBirth}
                  error={errors.dateOfBirth}
                  onChange={(value) =>{console.log("DOB from DatePicker:", value); setField("dateOfBirth", value)}}
                  className="w-full rounded-md!"
                  validationStatus={errors.dateOfBirth ? "error" : undefined}
                  placeholder={t("dob_p")}
                />

                {/* Nationality */}
                <FormGroup
                  error={Boolean(errors.nationality)}
                  className="w-full"
                >
                  <Label htmlFor="nationality">
                    {t("nationality")} <span className="text-red-600">*</span>
                  </Label>
                  <span className="block text-xs text-white mb-1">{t("nationality")}</span>
                  <Select
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    required
                    onChange={(e) => setField("nationality", t(e.target.value))}
                    className="w-full rounded-md!"
                    validationStatus={
                      errors.nationality ? "error" : undefined
                    }
                  >
                    <option value="" disabled>
                      {t("nationality_p")}
                    </option>
                    {nationalities
                      .filter(Boolean)
                      .map((nation) => (
                        <option key={nation} value={nation}>
                          {t(nation)}
                        </option>
                      ))}
                  </Select>
                  {errors.nationality && (
                    <ErrorMessage>{errors.nationality}</ErrorMessage>
                  )}
                </FormGroup>
              </div>

              {/* Passport number */}
              <TextField
                id="passport-number"
                name="passportNumber"
                label={t("ppn")}
                placeholder={t("ppn_p")}
                required
                value={formData.passportNumber}
                error={errors.passportNumber}
                onChange={(value) => setField("passportNumber", value)}
                className="w-full"
                validationStatus={errors.passportNumber ? "error" : undefined}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4! w-full">
                {/* Email */}
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

                {/* Phone Number */}
                <TextField
                  id="phone-number"
                  name="phoneNumber"
                  label={t("phone_number")}
                  placeholder={t("phone_number_p")}
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  error={errors.phoneNumber}
                  onChange={(value) => setField("phoneNumber", value)}
                  className="w-full"
                  validationStatus={errors.phoneNumber ? "error" : undefined}
                />
              </div>
              
              
            <div className="mt-6 flex w-full justify-between items-center">
              <Link href="/application/visa-picker">
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
                  {t('continue_button')}
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
