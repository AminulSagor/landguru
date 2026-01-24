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
  type?: "text" | "password" | "email";
  disabled?: boolean;
  className?: string;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  onChange?: (value: string) => void;
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
  rules,
  onChange,
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
    <div className="space-y-1">
      {label && (
        <p className="text-sm font-medium text-black">
          {label}
          {rules?.required && <span className="text-red-500 ml-1">*</span>}
        </p>
      )}

      <input
        {...field}
        type={type}
        value={field.value ?? ""}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        className={`
    w-full
    border border-gray-300
    rounded-lg
    outline-none
    px-3 py-2
    bg-white
    focus:border-gray-400 focus:ring-0
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className ?? ""}
  `}
      />

      {error && (
        <p className="text-sm font-medium text-red-500">{error.message}</p>
      )}
    </div>
  );
};
