import AsyncSelect from "react-select/async";
import {
  useController,
  Control,
  FieldError,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import {
  StylesConfig,
  ClearIndicatorProps,
  SingleValue,
} from "react-select";
import { MdOutlineArrowDropDown, MdClear } from "react-icons/md";

interface IOption {
  label: string;
  value: string | number;
}

interface HookFormAsyncSingleSelectProps<
  TFieldValues extends FieldValues
> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: object;
  error?: FieldError;
  onChange?: (value: IOption | null) => void;
  loadOptions: (
    inputValue: string,
    callback: (options: IOption[]) => void
  ) => void;
}

export const HookFormAsyncSingleSelect = <
  TFieldValues extends FieldValues
>({
  name,
  control,
  defaultValue,
  label,
  placeholder = "Select...",
  disabled = false,
  rules = {},
  error,
  onChange,
  loadOptions,
}: HookFormAsyncSingleSelectProps<TFieldValues>) => {
  const {
    field: { onChange: fieldOnChange, value },
  } = useController<TFieldValues>({
    name,
    control,
    rules,
    defaultValue,
  });

  const ClearIndicator = ({
    clearValue,
  }: ClearIndicatorProps<IOption, false>) => (
    <div
      onClick={clearValue}
      className="flex items-center cursor-pointer px-2"
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
            <p className="text-sm font-medium text-red-500">
              {error.message}
            </p>
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

      <AsyncSelect<IOption, false>
        isClearable
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        value={value}
        isDisabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        loadingMessage={() => "Searching..."}
        components={{
          DropdownIndicator: () => (
            <MdOutlineArrowDropDown size={20} />
          ),
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
    backgroundColor: state.isSelected
      ? "var(--color-primary)"
      : "transparent",
    color: state.isSelected
      ? "var(--color-white)"
      : "var(--color-black)",
    "&:hover": {
      backgroundColor: "var(--color-primary)",
      color: "var(--color-white)",
    },
  }),
};
