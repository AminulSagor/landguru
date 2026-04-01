"use client";

import { Search, ChevronDown } from "lucide-react";

type FilterOption = {
  label: string;
  value: string;
};

type PropertyFiltersBarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;

  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
  propertyTypeOptions: FilterOption[];

  serviceType: string;
  onServiceTypeChange: (value: string) => void;
  serviceTypeOptions: FilterOption[];

  status: string;
  onStatusChange: (value: string) => void;
  statusOptions: FilterOption[];
};

type FilterSelectBoxProps = {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
};

function FilterSelectBox({
  label,
  value,
  options,
  onChange,
}: FilterSelectBoxProps) {
  return (
    <div className="relative flex h-11 min-w-[190px] items-center rounded-xl border border-gray/15 bg-white px-4 pr-10">
      <span className="shrink-0 text-sm font-medium text-gray">{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none bg-transparent pl-1 text-sm font-semibold text-primary outline-none"
      >
        {options.map((option) => (
          <option
            key={`${label}-${option.value || "all"}`}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray"
      />
    </div>
  );
}

export default function PropertyFiltersBar({
  searchValue,
  onSearchChange,
  propertyType,
  onPropertyTypeChange,
  propertyTypeOptions,
  serviceType,
  onServiceTypeChange,
  serviceTypeOptions,
  status,
  onStatusChange,
  statusOptions,
}: PropertyFiltersBarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-[360px]">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray"
        />

        <input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by Plot #, User Name, or Price"
          className="h-11 w-full rounded-xl border border-gray/15 bg-white pl-11 pr-4 text-sm font-medium text-gray outline-none placeholder:text-gray"
        />
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:justify-end">
        <FilterSelectBox
          label="Property Type:"
          value={propertyType}
          options={propertyTypeOptions}
          onChange={onPropertyTypeChange}
        />

        <FilterSelectBox
          label="Service Type:"
          value={serviceType}
          options={serviceTypeOptions}
          onChange={onServiceTypeChange}
        />

        <FilterSelectBox
          label="Status:"
          value={status}
          options={statusOptions}
          onChange={onStatusChange}
        />
      </div>
    </div>
  );
}
