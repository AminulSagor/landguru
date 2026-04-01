import axios from "axios";

import type {
  PropertyPostItem,
  PropertyPostStatus,
} from "@/types/admin/property-post/property.types";

export const PAGE_SIZE = 8;
export const SEARCH_DEBOUNCE_MS = 350;

export type FilterOption = {
  label: string;
  value: string;
};

export const STATUS_OPTIONS: FilterOption[] = [
  { label: "All", value: "" },
  { label: "Draft", value: "DRAFT" },
  { label: "Pending Admin", value: "PENDING_ADMIN" },
  { label: "Pending Buyer Review", value: "PENDING_BUYER_REVIEW" },
  { label: "Quoted", value: "QUOTED" },
  { label: "Payment Pending Review", value: "PAYMENT_PENDING_REVIEW" },
  { label: "Active", value: "ACTIVE" },
  { label: "Sold", value: "SOLD" },
  { label: "Partial Sold", value: "PARTIAL_SOLD" },
  { label: "Rejected", value: "REJECTED" },
];

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function humanizeServiceKey(serviceKey: string) {
  return serviceKey
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getServiceTypeNames(item: PropertyPostItem) {
  const uniqueMap = new Map<string, string>();

  item.serviceAssignments.forEach((assignment) => {
    const rawValue =
      assignment.serviceName?.trim() ||
      humanizeServiceKey(assignment.serviceKey);

    if (!rawValue) return;

    const normalized = normalizeText(rawValue);

    if (!uniqueMap.has(normalized)) {
      uniqueMap.set(normalized, rawValue);
    }
  });

  return Array.from(uniqueMap.values());
}

export function buildOptions(values: string[]): FilterOption[] {
  const uniqueMap = new Map<string, string>();

  values.forEach((value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    const normalized = normalizeText(trimmedValue);

    if (!uniqueMap.has(normalized)) {
      uniqueMap.set(normalized, trimmedValue);
    }
  });

  const options = Array.from(uniqueMap.values())
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({
      label: value,
      value,
    }));

  return [{ label: "All", value: "" }, ...options];
}

export function matchesSearch(item: PropertyPostItem, search: string) {
  const normalizedSearch = normalizeText(search);

  if (!normalizedSearch) return true;

  const searchableText = [
    item.id,
    item.title,
    item.description,
    item.propertyType,
    item.seller.name,
    item.seller.phone,
    item.seller.id,
    String(item.askingPrice),
    item.validatedPrice !== null ? String(item.validatedPrice) : "",
    String(item.sellableAmount),
    item.sellableUnit,
    String(item.plotSize),
    item.plotUnit,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedSearch);
}

export function matchesServiceType(
  item: PropertyPostItem,
  selectedServiceType: string,
) {
  if (!selectedServiceType) return true;

  const normalizedSelectedValue = normalizeText(selectedServiceType);

  return getServiceTypeNames(item).some(
    (serviceTypeName) =>
      normalizeText(serviceTypeName) === normalizedSelectedValue,
  );
}

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      (typeof error.response?.data?.message === "string" &&
        error.response.data.message) ||
      "Failed to load property posts."
    );
  }

  return "Failed to load property posts.";
}

export function castPropertyPostStatus(value: string) {
  return value as PropertyPostStatus | "";
}
