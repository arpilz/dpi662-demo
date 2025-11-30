"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FormDataContext = createContext(null);

const STORAGE_KEY = "visa-application-data";

const defaultData = {
    // personal info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    email: "",
    phoneNumber: "",
    // travel details
    purposeOfTravel: "",
    arrivalDate: "",
    departureDate: "",
    addressStay: "",
  
};

export function FormDataProvider({ children }) {
  const [formData, setFormData] = useState(defaultData);

  // Load from localStorage on first mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Error parsing saved form data", e);
      }
    }
  }, []);

  // Save whenever formData changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const value = {
    formData,
    setField,
    resetForm: () => setFormData(defaultData),
  };

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
}

export function useFormData() {
  const ctx = useContext(FormDataContext);
  if (!ctx) {
    throw new Error("useFormData must be used inside FormDataProvider");
  }
  return ctx;
}
