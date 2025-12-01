"use client";

import { useState, useRef } from "react";
import { Label, Button } from "@trussworks/react-uswds";
import { useLanguage } from "@/components/LanguageProvider";

export default function FileUploadCard({
  id,
  label,
  hint,
  required = false,
  accept,
  onFileChange,
  existingFileName, 
}) {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const { t } = useLanguage();

  // consider either a file name or an actual file sufficient
  const hasFile = !!file || !!existingFileName;

  const handleChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return; // keep same file if change file is canceled
    const selected = files[0];
    setFile(selected);
    if (onFileChange) onFileChange(selected);
  };

  const handleRemove = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    if (onFileChange) onFileChange(null); // parent will clear stored name
  };

  const openFileDialog = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div
      className={[
        "rounded-lg border px-5 pb-4 mb-4 transition-colors w-full",
      ].join(" ")}
    >
      {/* header */}
      <div className="flex justify-between mb-3">
        <div>
          <Label htmlFor={id} className="text-base font-bold! text-black!  mt-0">
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </Label>
          {hint && (
            <p className="usa-hint text-sm mt-1 text-black!">
              {hint}
            </p>
          )}
        </div>
      </div>

      {/* hidden native input */}
      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />

      <Button
        type="button"
        size="small"
        onClick={openFileDialog}
        className="inline-flex items-center gap-2 font-semibold!"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 16V4m0 0L7 9m5-5 5 5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="3" y="16" width="18" height="4" rx="1" />
        </svg>

        Choose file
      </Button>

      {/* Filename + Remove */}
      {hasFile && (
        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm text-gray-800 break-all">
            {file ? file.name : existingFileName /* show saved name if no file */}
          </span>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-600 text-sm hover:underline hover:cursor-pointer"
          >
            {t('remove')}
          </button>
        </div>
      )}
    </div>
  );
}
