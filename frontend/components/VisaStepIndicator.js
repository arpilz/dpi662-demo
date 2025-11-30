"use client";

export default function VisaStepIndicator({
  currentStep = 1,
  steps,
  className,
}) {
  const totalSteps = steps.length;
  const safeCurrentStep = Math.min(Math.max(currentStep, 1), totalSteps);
  const currentLabel = steps[safeCurrentStep - 1]?.label || "";

  return (
    <section className={className} style={{ background: "transparent" }}>
      <div className="w-full bg-transparent h-auto pt-3 md:pt-6! md:pl-3!">
        <div
          className="usa-step-indicator usa-step-indicator--counters mx-auto"
          aria-label="progress"
          style={{ background: "transparent" }}
        >
          <ol className="usa-step-indicator__segments">
            {steps.map((step, index) => {
              const position = index + 1;

              let segmentClass = "usa-step-indicator__segment";
              let ariaCurrent = false;
              let srText = "";

              if (position < safeCurrentStep) {
                segmentClass += " usa-step-indicator__segment--complete";
                srText = "completed";
              } else if (position === safeCurrentStep) {
                segmentClass += " usa-step-indicator__segment--current";
                ariaCurrent = true;
              } else {
                srText = "not completed";
              }

              return (
                <li
                  key={step.id}
                  className={segmentClass}
                  {...(ariaCurrent ? { "aria-current": "true" } : {})}
                >
                  <span className="usa-step-indicator__segment-label md:whitespace-nowrap!">
                    {step.label}{" "}
                    {srText && <span className="usa-sr-only">{srText}</span>}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* mobile-only header */}
          <div className="usa-step-indicator__header block md:hidden!">
            <h4 className="usa-step-indicator__heading">
              <span className="usa-step-indicator__heading-counter">
                <span className="usa-sr-only">Step</span>
                <span className="usa-step-indicator__current-step">
                  {safeCurrentStep}
                </span>
                <span className="usa-step-indicator__total-steps">
                  {" "}
                  of {totalSteps}
                </span>
              </span>
              <span className="usa-step-indicator__heading-text">
                {currentLabel}
              </span>
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
