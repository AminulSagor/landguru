import type { PropertyListing } from "@/types/property/property.listing";
import type { PropertyRequest } from "@/app/(dashboard)/user/types/property-request";
import type { PropertyFiltersState } from "@/types/property/property-filters.types";

type Range = { min: number; max: number };

const toNumber = (value: string) => {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
};

const normalizeType = (value: string | null | undefined) =>
  (value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

const getPriceRange = (filters: PropertyFiltersState): Range => {
  const hasMinInput = filters.minPrice.trim().length > 0;
  const hasMaxInput = filters.maxPrice.trim().length > 0;

  const minFromInput = toNumber(filters.minPrice);
  const maxFromInput = toNumber(filters.maxPrice);

  const min = hasMinInput ? minFromInput : filters.priceRange[0] * 100000;
  const max = hasMaxInput ? maxFromInput : filters.priceRange[1] * 100000;

  return { min, max };
};

const matchesPropertyType = (filterType: string, itemType?: string | null) => {
  if (!filterType) return true;
  if (!itemType) return false;

  const normalizedFilter = normalizeType(filterType);
  const normalizedItem = normalizeType(itemType);

  if (!normalizedFilter || normalizedFilter === "all") return true;

  if (normalizedFilter === normalizedItem) return true;

  if (normalizedFilter === "plainland" && normalizedItem === "plot") {
    return true;
  }

  return false;
};

export const applyPropertyFiltersToListings = (
  items: PropertyListing[],
  filters: PropertyFiltersState,
) => {
  const { min, max } = getPriceRange(filters);

  return (items ?? []).filter((item) => {
    const itemType = "propertyType" in item ? item.propertyType : item.tag;
    const itemPrice = "price" in item ? item.price : 0;

    const typeOk = matchesPropertyType(filters.propertyType, itemType);
    const priceOk = itemPrice >= min && itemPrice <= max;

    return typeOk && priceOk;
  });
};

export const applyPropertyFiltersToRequests = (
  items: PropertyRequest[],
  filters: PropertyFiltersState,
) => {
  const { min, max } = getPriceRange(filters);

  return (items ?? []).filter((item) => {
    const typeOk = matchesPropertyType(filters.propertyType, item.propertyType);
    const budgetOk = item.budgetMax >= min && item.budgetMin <= max;

    return typeOk && budgetOk;
  });
};
