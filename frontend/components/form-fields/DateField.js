import {
  FormGroup,
  Label,
  ErrorMessage,
  DatePicker,
} from "@trussworks/react-uswds";

export function DateField({
  id,
  name,
  label,
  required = false,
  value,
  error,
  hint,
  onChange, // (value: string) => void
  minDate,
  maxDate,
  placeholder,
  className = "",      // wrapper classes
  inputClassName = "", // datepicker/input classes
  ...rest
}) {
  const showError = Boolean(error);
  const validationStatus = showError
    ? "error"
    : value
    ? "success"
    : undefined;

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

      {/* DatePicker is mostly uncontrolled; we capture its value via onChange */}
      <DatePicker
        id={id}
        name={name}
        defaultValue={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        validationStatus={validationStatus}
        placeholder={placeholder}
        className={`w-full rounded-md! ${inputClassName}`}
        {...rest}
      />

      {showError && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  );
}
