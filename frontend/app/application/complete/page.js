// step 6 i guess? completed application
"use client";
import { GovBanner, GridContainer, Grid, Button, SummaryBox, Icon, StepIndicator, StepIndicatorStep } from "@trussworks/react-uswds";
import { useLanguage } from "@/components/LanguageProvider";
import AgencyHeader from "@/components/StateHeader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TitleLanguage from "@/components/TitleLanguage";
import VisaStepIndicator from "@/components/VisaStepIndicator";
import ReviewBox from "@/components/ReviewBox";
import { useState } from "react";
import { useFormData } from "@/app/formsaver";

export default function CompletedPage() {
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
              <h2 className="text-3xl font-semibold mb-2">
                {t("success_title")}</h2>
              <p className="text-gray-700 mb-6">
                {t("success_subtitle")}
              </p>
            </Grid>
          </Grid>
        
            <div className="bg-primary-lighter border-[3px] border-primary radius-lg padding-2 md:padding-3 margin-bottom-4">
            <div className="display-flex flex-align-center flex-col">
                <p className="margin-top-0 margin-bottom-0 font-sans-md font-semibold font-lg text-primary-dark">
                  {t("app_num")}
                </p>

                <p className="margin-y-0 font-sans-xl text-primary-dark font-bold">US-VISA-TSTO3Q3UR</p>

                <p className="margin-top-0 margin-bottom-1 font-sans-xs text-center">
                  {t("save_num")}
                </p>

            </div>
          </div>

            <SummaryBox className="margin-top-4 border-base" style={{ backgroundColor: "#FFFFFF" }}>
                <h2 className="margin-top-0 margin-bottom-1 font-sans-lg font-semibold">
                {/* Next Steps */}
                {t("next_steps")}
                </h2>

            <div className="bg-primary-lighter border border-primary radius-lg padding-2 md:padding-3 margin-bottom-2">
            <div className="display-flex flex-align-start">
              {/* email info */}
              <div className="text-white display-flex flex-justify-center radius-lg margin-right-3" style={{  height: "50px" }}>
                {/* svg */}
                <Image src="/envelope.svg" alt="" width={32} height={32} className="h-16 w-16 md:h-8 md:w-8"/>
              </div>
              <div>
                <p className="margin-y-0 font-sans-md text-primary-dark font-semibold">
                  {/* header text - check ur email */}
                  {t("check_email")}
                </p>
                <p className="margin-top-0 margin-bottom-1 font-sans-xs text-primary">
                  {/* more info */}
                  {t("email_desc")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-lighter border border-primary radius-lg padding-2 md:padding-3 margin-bottom-0">
            <div className="display-flex flex-align-start">
              {/* schedule interview */}
              <div className="text-white display-flex flex-justify-center radius-lg margin-right-3" style={{  height: "50px" }}>
                {/* svg */}
                <Image src="/calendar.svg" alt="" width={32} height={32} className="h-16 w-16 md:h-8 md:w-8" />
              </div>
              <div>
                <p className="margin-y-0 font-sans-md text-primary-dark font-semibold">
                  {/* header text - schedule an interview */}
                  {t("schedule_interview")}
                </p>
                <p className="margin-top-0 margin-bottom-1 font-sans-xs text-primary">
                  {/* more info on that */}
                  {t("sched_desc")}
                </p>
              </div>
            </div>
          </div>

          

        </SummaryBox>
        </GridContainer>
      </main>
    </>
  );
}