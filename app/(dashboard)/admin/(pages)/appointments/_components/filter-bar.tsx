interface FilterBarProps {
  status: string;
  onStatusChange: (value: string) => void;
  statusOptions: string[];
  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
  propertyTypeOptions: string[];
  location: string;
  onLocationChange: (value: string) => void;
  locationOptions: string[];
  onReset: () => void;
}

const FilterBar = ({
  status,
  onStatusChange,
  statusOptions,
  propertyType,
  onPropertyTypeChange,
  propertyTypeOptions,
  location,
  onLocationChange,
  locationOptions,
  onReset,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col gap-3 border-b border-gray/20 bg-secondary/40 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <h2 className="text-sm text-gray">Quick Filters :</h2>

        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect
            label="Property Type"
            value={propertyType}
            options={propertyTypeOptions}
            onChange={onPropertyTypeChange}
            allLabel="All"
          />

          <FilterSelect
            label="Location"
            value={location}
            options={locationOptions}
            onChange={onLocationChange}
            allLabel="All Cities"
          />

          <FilterSelect
            label="Status"
            value={status}
            options={statusOptions}
            onChange={onStatusChange}
            allLabel="Any"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-fit rounded-full border border-gray/20 px-3 py-1 text-sm font-medium text-gray hover:bg-white"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;

function FilterSelect({
  label,
  value,
  options,
  onChange,
  allLabel,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  allLabel: string;
}) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-gray/20 bg-white px-3 py-1.5 text-sm text-gray">
      <span>{label}:</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent text-primary outline-none"
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
