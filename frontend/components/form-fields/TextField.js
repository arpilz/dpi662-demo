import {
  FormGroup,
  Label,
  TextInput,
  ErrorMessage,
} from "@trussworks/react-uswds";

export function TextField({
  id,
  name,
  label,
  required = false,
  type = "text",
  value,
  error,
  hint,
  onChange,
  placeholder,
  className = "",      // wrapper classes
  inputClassName = "", // input classes
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
      className={`mt-4 w-full rounded-md! ${className}`}
    >
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </Label>

      {hint && (
        <p className="usa-hint text-xs text-gray-600">{hint}</p>
      )}

      <TextInput
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange && onChange(e.target.value)}
        validationStatus={validationStatus}
        placeholder={placeholder}
        className={`w-full rounded-md! ${inputClassName}`}
        {...rest}
      />

      {showError && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  );
}
