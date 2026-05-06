"use client";

import React from "react";
import {
  DEFAULT_PROPERTY_FILTERS,
  PropertyFiltersState,
} from "@/types/property/property-filters.types";

type PropertyFiltersContextValue = {
  filters: PropertyFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<PropertyFiltersState>>;
  updateFilters: (next: Partial<PropertyFiltersState>) => void;
  resetFilters: () => void;
  filtersApplied: boolean;
};

const PropertyFiltersContext = React.createContext<PropertyFiltersContextValue | null>(
  null,
);

export function PropertyFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = React.useState<PropertyFiltersState>(
    DEFAULT_PROPERTY_FILTERS,
  );
  const [filtersApplied, setFiltersApplied] = React.useState(false);

  const updateFilters = React.useCallback(
    (next: Partial<PropertyFiltersState>) => {
      setFilters((prev) => ({ ...prev, ...next }));
      setFiltersApplied(true);
    },
    [],
  );

  const resetFilters = React.useCallback(() => {
    setFilters(DEFAULT_PROPERTY_FILTERS);
    setFiltersApplied(false);
  }, []);

  const value = React.useMemo(
    () => ({ filters, setFilters, updateFilters, resetFilters, filtersApplied }),
    [filters, updateFilters, resetFilters, filtersApplied],
  );

  return (
    <PropertyFiltersContext.Provider value={value}>
      {children}
    </PropertyFiltersContext.Provider>
  );
}

export function usePropertyFilters() {
  const ctx = React.useContext(PropertyFiltersContext);
  if (!ctx) {
    throw new Error("usePropertyFilters must be used within PropertyFiltersProvider");
  }
  return ctx;
}
