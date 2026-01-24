import Select, { SingleValue, StylesConfig } from "react-select";
import { MdOutlineArrowDropDown, MdClear } from "react-icons/md";
import {
  Path,
  Control,
  PathValue,
  FieldError,
  FieldValues,
  useController,
} from "react-hook-form";

interface IOption {
  label: string;
  value: string | number;
}

interface HookFormSingleSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  label?: string;
  placeholder?: string;
  options: IOption[];
  disabled?: boolean;
  rules?: object;
  error?: FieldError;
  onChange?: (value: IOption | null) => void;
}

export const HookFormSingleSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  placeholder,
  options,
  disabled = false,
  rules = {},
  error,
  onChange,
}: HookFormSingleSelectProps<TFieldValues>) => {
  const {
    field: { onChange: fieldOnChange, onBlur, value },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  // Clear icon component
  const ClearIndicator = ({ clearValue }: { clearValue: () => void }) => (
    <div
      onClick={clearValue}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        padding: "0 8px",
      }}
    >
      <MdClear size={18} />
    </div>
  );

  const handleChange = (newValue: SingleValue<IOption>) => {
    fieldOnChange(newValue ?? null);
    onChange?.(newValue ?? null);
  };

  return (
    <div className="space-y-1">
      {label && (
        <div>
          {error ? (
            <p className="text-sm font-medium text-red-500">{error.message}</p>
          ) : (
            <p className="text-sm font-medium text-black">
              {label}
              {rules && Object.keys(rules).length > 0 && (
                <span className="text-red-500">*</span>
              )}
            </p>
          )}
        </div>
      )}

      <Select
        isClearable
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
        components={{
          DropdownIndicator: () => <MdOutlineArrowDropDown size={20} />,
          ClearIndicator,
          IndicatorSeparator: () => null,
        }}
        styles={customStyles}
      />
    </div>
  );
};

// ============================
// React Select Custom Styles
// ============================

const customStyles: StylesConfig<IOption, false> = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    minHeight: 50,
    fontSize: 12,
    borderRadius: "0.5rem",
    boxShadow: "none",
    backgroundColor: "#ffffff",
    border: state.isFocused
      ? "1px solid #9CA3AF" // gray-400 focus
      : "1px solid #D1D5DB", // gray-300 normal
    "&:hover": {
      borderColor: "#9CA3AF", // gray-400 hover
    },
    opacity: state.isDisabled ? 0.5 : 1,
    cursor: state.isDisabled ? "not-allowed" : "default",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    fontSize: 12,
  }),
  placeholder: (provided) => ({ ...provided, color: "rgba(0,0,0,0.6)" }),
  singleValue: (provided) => ({ ...provided, color: "rgba(0,0,0,0.9)" }),
  dropdownIndicator: (provided) => ({ ...provided, padding: 4 }),
  clearIndicator: (provided) => ({ ...provided, padding: 4 }),
  indicatorSeparator: () => ({ display: "none" }),
  option: (provided, state) => ({
    ...provided,
    fontSize: 12,
    backgroundColor: state.isSelected ? "rgba(107,114,128,0.05)" : "#ffffff",
    color: "rgba(0,0,0,0.9)",
    cursor: "pointer",
    "&:hover": { backgroundColor: "rgba(107,114,128,0.05)" },
  }),
};
