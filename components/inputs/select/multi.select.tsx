import Select, { MultiValue, StylesConfig } from "react-select";
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

interface HookFormMultiSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  label?: string;
  placeholder?: string;
  options: IOption[];
  disabled?: boolean;
  rules?: object;
  error?: FieldError;
  onChange?: (value: IOption[]) => void;
}

export const HookFormMultiSelect = <TFieldValues extends FieldValues>({
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
}: HookFormMultiSelectProps<TFieldValues>) => {
  const {
    field: { onChange: fieldOnChange, onBlur, value },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const ClearIndicator = ({ clearValue }: { clearValue: () => void }) => (
    <div onClick={clearValue} className="flex items-center cursor-pointer px-2">
      <MdClear size={18} />
    </div>
  );

  const handleChange = (newValue: MultiValue<IOption>) => {
    const selected = Array.from(newValue ?? []);
    fieldOnChange(selected);
    onChange?.(selected);
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
                <span className="text-primary">*</span>
              )}
            </p>
          )}
        </div>
      )}

      <Select
        isMulti
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

const customStyles: StylesConfig<IOption, true> = {
  control: (provided) => ({
    ...provided,
    fontSize: 12,
    minWidth: "100%",
    minHeight: 50,
    background: "var(--color-white)",
    border: 0,
    boxShadow: "none",
    borderRadius: "12px",
    padding: "0px 8px 0px 6px",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "var(--color-black)",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "var(--color-black)",
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 4,
  }),

  clearIndicator: (provided) => ({
    ...provided,
    padding: 4,
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--color-white)",
    borderRadius: "12px",
    border: 0,
    fontSize: "12px",
    overflow: "hidden",
  }),

  menuList: (provided) => ({
    ...provided,
    padding: 0,
    fontSize: "12px",
  }),

  option: (provided, state) => ({
    ...provided,
    fontSize: "12px",
    backgroundColor: state.isSelected ? "var(--color-primary)" : "transparent",
    color: state.isSelected ? "var(--color-white)" : "var(--color-black)",
    "&:hover": {
      backgroundColor: "var(--color-primary)",
      color: "var(--color-white)",
    },
  }),

  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "var(--color-primary)",
    color: "var(--color-white)",
    borderRadius: "6px",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: "var(--color-white)",
    fontSize: "12px",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: "var(--color-white)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--color-black)",
      color: "var(--color-white)",
    },
  }),
};
