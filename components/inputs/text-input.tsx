"use client";

import {
  useController,
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { ChangeEvent, ReactNode } from "react";

interface HookFormTextInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  label?: string | ReactNode;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel";
  disabled?: boolean;

  /** wrapper */
  className?: string;

  /** input element */
  inputClassName?: string;

  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  onChange?: (value: string) => void;

  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const HookFormTextInput = <TFieldValues extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  placeholder = "",
  type = "text",
  disabled = false,
  className,
  inputClassName,
  rules,
  onChange,
  startAdornment,
  endAdornment,
}: HookFormTextInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    field.onChange(value);
    onChange?.(value);
  };

  return (
    <div className={`space-y-1 ${className ?? ""}`}>
      {label && (
        <p className="text-sm font-medium text-black">
          {label}
          {rules?.required && <span className="text-red-500 ml-1">*</span>}
        </p>
      )}

      <div className="relative">
        {startAdornment && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {startAdornment}
          </div>
        )}

        {endAdornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endAdornment}
          </div>
        )}

        <input
          {...field}
          type={type}
          value={field.value ?? ""}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          className={[
            "w-full border border-gray-300 rounded-lg outline-none bg-white",
            "px-3 py-2",
            "focus:border-gray-400 focus:ring-0",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            startAdornment ? "pl-20" : "",
            endAdornment ? "pr-12" : "",
            inputClassName ?? "",
          ].join(" ")}
        />
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error.message}</p>}
    </div>
  );
};
