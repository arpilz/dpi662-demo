// src/components/form-fields/DateField.js
"use client";

import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Label,
  TextInput,
  ErrorMessage,
} from "@trussworks/react-uswds";
import { useLanguage } from "@/components/LanguageProvider";

export function DateField({
  id,
  name,
  label,
  required = false,
  value = "",
  error,
  hint,
  className = "",
  onChange,
  placeholder,
  ...rest
}) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
   const { t } = useLanguage();

  const showError = Boolean(error);

  const validationStatus = showError
    ? "error"
    : value
    ? "success"
    : undefined;

  // Sync incoming value (YYYY-MM-DD) into fields
  useEffect(() => {
    if (typeof value !== "string" || !value) {
      setMonth("");
      setDay("");
      setYear("");
      return;
    }

    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      setYear(match[1]);
      setMonth(match[2]);
      setDay(match[3]);
    }
  }, [value]);

  const emitIfComplete = (nextMonth, nextDay, nextYear) => {
    if (!onChange) return;

    // Not complete => treat as empty for form value
    if (
      nextMonth.length !== 2 ||
      nextDay.length !== 2 ||
      nextYear.length !== 4
    ) {
      onChange("");
      return;
    }

    const mNum = parseInt(nextMonth, 10);
    const dNum = parseInt(nextDay, 10);
    const yNum = parseInt(nextYear, 10);

    // Basic range checks
    if (
      Number.isNaN(mNum) ||
      Number.isNaN(dNum) ||
      Number.isNaN(yNum) ||
      mNum < 1 ||
      mNum > 12 ||
      dNum < 1 ||
      dNum > 31 ||
      yNum < 1000 // avoid obviously invalid years like 0000
    ) {
      onChange("");
      return;
    }

    const iso = `${nextYear}-${nextMonth}-${nextDay}`;

    // Calendar-accurate validity check
    const testDate = new Date(`${iso}T00:00:00`);
    const isValid =
      !Number.isNaN(testDate.getTime()) &&
      testDate.getUTCFullYear().toString().padStart(4, "0") === nextYear &&
      (testDate.getUTCMonth() + 1).toString().padStart(2, "0") === nextMonth &&
      testDate.getUTCDate().toString().padStart(2, "0") === nextDay;

    onChange(isValid ? iso : "");
  };

  const handleMonthChange = (e) => {
    let next = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMonth(next);
    emitIfComplete(next, day, year);
  };

  const handleDayChange = (e) => {
    let next = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDay(next);
    emitIfComplete(month, next, year);
  };

  const handleYearChange = (e) => {
    let next = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYear(next);
    emitIfComplete(month, day, next);
  };

  return (
    <FormGroup
      error={showError}
      className={`mt-4 w-full ${className}`}
    >
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </Label>

      {hint && (
        <p className="usa-hint text-xs text-gray-600">{hint}</p>
      )}

      <div className="grid grid-cols-3 gap-2">
        <div>
          <span className="block text-xs text-gray-700 mb-1">{t("month")}</span>
          <TextInput
            id={`${id}-month`}
            name={`${name || id}-month`}
            type="text"
            inputMode="numeric"
            value={month}
            onChange={handleMonthChange}
            required={required}
            placeholder={t("month").charAt(0) + t("month").charAt(0)}
            validationStatus={validationStatus}
            className="w-full rounded-md!"
            aria-label={`${label} month`}
            {...rest}
          />
        </div>

        <div>
          <span className="block text-xs text-gray-700 mb-1">{t("day")}</span>
          <TextInput
            id={`${id}-day`}
            name={`${name || id}-day`}
            type="text"
            inputMode="numeric"
            value={day}
            onChange={handleDayChange}
            required={required}
            placeholder={t("day").charAt(0) + t("day").charAt(0)}
            validationStatus={validationStatus}
            className="w-full rounded-md!"
            aria-label={`${label} day`}
            {...rest}
          />
        </div>

        <div>
          <span className="block text-xs text-gray-700 mb-1">{t("year")}</span>
          <TextInput
            id={`${id}-year`}
            name={`${name || id}-year`}
            type="text"
            inputMode="numeric"
            value={year}
            onChange={handleYearChange}
            required={required}
            placeholder={t("year").charAt(0) + t("year").charAt(0) + t("year").charAt(0) + t("year").charAt(0)}
            validationStatus={validationStatus}
            className="w-full rounded-md!"
            aria-label={`${label} year`}
            {...rest}
          />
        </div>
      </div>

      {showError && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  );
}
