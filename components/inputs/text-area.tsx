"use client";

import {
  useController,
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { ChangeEvent } from "react";

interface HookFormTextareaInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  className?: string;
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
    <div className="space-y-1">
      {label && (
        <p className="text-base font-medium pb-1">
          {label}
          {rules?.required && <span className="text-red-500 ml-1">*</span>}
        </p>
      )}

      <textarea
        {...field}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        className={`
          w-full border border-gray/30 rounded-lg outline-none
          px-3 py-2 bg-secondary/10
          focus-visible:ring-1 focus:ring-gray/40
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className ?? ""}
        `}
      />

      {error && <p className="text-red-400 text-sm">{error.message}</p>}
    </div>
  );
};
