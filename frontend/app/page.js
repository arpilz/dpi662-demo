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

  {/* to allow for language selection */}
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
                {/* what this portal does */}
                {t("app_desc")}
              </p>
            </Grid>
          </Grid>

          <div className="bg-primary-lighter border-[3px] border-primary radius-lg padding-2 md:padding-3 margin-bottom-4">
            <div className="display-flex flex-align-start">

              {/* time info */}
              <div
                className="bg-primary text-white display-flex flex-align-center flex-justify-center radius-lg margin-right-3"
                style={{ width: "56px", height: "56px" }}
              >
                {/* clock icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  className="usa-icon w-10 h-10"
                  focusable="false"
                  role="img"
                  aria-hidden="true"
                >
                  <path d="m22 5.72-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39 6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a9 9 0 0 0 0-18zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
                </svg>
              </div>


              <div>
                <p className="margin-top-0 margin-bottom-0 font-sans-md text-primary-dark">
                  {/* estimated time for completion */}
                  {t("est_time")}
                </p>

                <p className="margin-y-0 font-sans-lg text-primary-dark font-bold">
                  {/*90 minutes */}
                  {t("n_mins")}
                </p>

                <p className="margin-top-0 margin-bottom-1 font-sans-xs text-primary">
                  {/* you can save your work and return at any time */}
                  {t("save_prog")}
                </p>
              </div>

            </div>
          </div>

          <SummaryBox className="margin-top-4 border-base" style={{ backgroundColor: "#FFFFFF" }}>
          <h2 className="margin-top-0 margin-bottom-1 font-sans-lg font-semibold">
            {/* what you need */}
            {t("what_you_need")}
          </h2>

          <p className="margin-top-0 margin-bottom-3 font-sans-sm">
            {/* please ensure the following documents are available */}
            {t("need_docs")}
          </p>

          <Grid row gap="md">

            {/* valid passport with at least 6 months until expiry */}
            <Grid tablet={{ col: 6 }} className="margin-bottom-2 display-flex">
              <div className="bg-base-lighter radius-lg padding-2 display-flex flex-align-center flex-1 gap-1">
                <Icon.CheckCircle
                  className="text-primary margin-right-1 font-sans-lg"
                  aria-hidden="true"
                />
                <span className="font-sans-sm">
                  {t("valid_passport")}
                </span>
              </div>
            </Grid>

            {/* passport-sized photograph */}
            <Grid tablet={{ col: 6 }} className="margin-bottom-2 display-flex">
              <div className="bg-base-lighter radius-lg padding-2 display-flex flex-align-center flex-1 gap-1">
                <Icon.CheckCircle
                  className="text-primary margin-right-1 font-sans-lg"
                  aria-hidden="true"
                />
                <span className="font-sans-sm">
                  {t("recent_photo")}
                </span>
              </div>
            </Grid>

            {/* travel itinerary + accomodation details */}
            <Grid tablet={{ col: 6 }} className="margin-bottom-2 display-flex">
              <div className="bg-base-lighter radius-lg padding-2 display-flex flex-align-center flex-1 gap-1">
                <Icon.CheckCircle
                  className="text-primary margin-right-1 font-sans-lg"
                  aria-hidden="true"
                />
                <span className="font-sans-sm">
                  {t("travel_itinerary")}
                </span>
              </div>
            </Grid>

            {/* financial documents */}
            <Grid tablet={{ col: 6 }} className="margin-bottom-2 display-flex">
              <div className="bg-base-lighter radius-lg padding-2 display-flex flex-align-center flex-1 gap-1">
                <Icon.CheckCircle
                  className="text-primary margin-right-1 font-sans-lg"
                  aria-hidden="true"
                />
                <span className="font-sans-sm">
                  {t("financial_documents")}
                </span>
              </div>
            </Grid>

            {/* other supporting documents */}
            <Grid tablet={{ col: 6 }} className="margin-bottom-2 display-flex">
              <div className="bg-base-lighter radius-lg padding-2 display-flex flex-align-center flex-1 gap-1">
                <Icon.CheckCircle
                  className="text-primary margin-right-1 font-sans-lg"
                  aria-hidden="true"
                />
                <span className="font-sans-sm">
                  {t("other_documents")}
                </span>
              </div>
            </Grid>

            {/* employment/educational verification documents */}
            <Grid tablet={{ col: 6 }} className="margin-bottom-2 display-flex">
              <div className="bg-base-lighter radius-lg padding-2 display-flex flex-align-center flex-1 gap-1">
                <Icon.CheckCircle
                  className="text-primary margin-right-1 font-sans-lg"
                  aria-hidden="true"
                />
                <span className="font-sans-sm">
                  {t("employment_documents")}
                </span>
              </div>
            </Grid>

          </Grid>
        </SummaryBox>

          <section className="mt-6 border-t pt-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {/* ready to start your application? */}
                {t("ready")}
              </h3>
              <p className="text-gray-700">
                {/* when ready, continue */}
                {t("continue")}
              </p>
            </div>

            <div className="margin-top-4">
            <Link href="/application/visa-picker"><Button
              type="button"
              className="width-full margin-bottom-2"
            >
              {/* start new application */}
              {t("start")}
            </Button></Link>
            
            <Link href="/application/resume"><Button
              type="button"
              outline
              className="width-full"
            >
              {/* retrieve existing application */}
              {t("retrieve")}
            </Button></Link>
        </div>

          </section>
        </GridContainer>
      </main>
    </>
  );
}
