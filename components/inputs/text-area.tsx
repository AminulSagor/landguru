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

interface HookFormTextareaInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  label?: string | ReactNode;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;

  /** wrapper */
  className?: string;

  /** textarea element */
  inputClassName?: string;

  onChange?: (value: string) => void;
}

export const HookFormTextareaInput = <TFieldValues extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  placeholder = "",
  disabled = false,
  rows = 4,
  rules,
  className,
  inputClassName,
  onChange,
}: HookFormTextareaInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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

      <textarea
        {...field}
        value={field.value ?? ""}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        className={[
          "w-full border border-gray-300 rounded-lg outline-none bg-white",
          "px-3 py-2",
          "focus:border-gray-400 focus:ring-0",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          inputClassName ?? "",
        ].join(" ")}
      />

      {error && (
        <p className="text-sm font-medium text-red-500">{error.message}</p>
      )}
    </div>
  );
};
