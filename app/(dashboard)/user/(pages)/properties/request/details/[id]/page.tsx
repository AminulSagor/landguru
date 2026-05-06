import RequestPropertyDetailsView from "@/app/(dashboard)/user/(pages)/properties/_components/RequestPropertyDetailsView";
import { notFound } from "next/navigation";
import { serviceServer } from "@/service/base/axios.server";
import type {
  AddressParts,
  BuyPostListItem,
} from "@/types/post/buy/wanted-needs.types";
import type { PropertyRequestPropertyType } from "@/app/(dashboard)/user/types/property-request";


type PageProps = {
  params: Promise<{ id: string }>;
};

export type PropertyRequestDetails = {
  id: string; // "BUY-1042"
  title: string;
  status: "Active" | "Closed" | "Pending";

  postedBy: string;
  postedAgo: string;
  verified?: boolean;

  location: string;
  propertyType: PropertyRequestPropertyType;

  requiredLandSize: string;
  requiredPlotSize: string;

  distanceFromRoad: string;

  budgetMin: number;
  budgetMax: number;

  description: string; // ✅ needed for details page
};

const normalizeAddressValue = (value?: string | null) => {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "";

  const lowered = trimmed.toLowerCase();
  if (lowered === "n/a" || lowered === "na" || lowered === "none") {
    return "";
  }

  return trimmed;
};

const formatAddressParts = (parts?: AddressParts | null) => {
  if (!parts) return "";

  const ward = normalizeAddressValue(parts.wardNo);

  const segments = [
    ward ? `Ward ${ward}` : "",
    normalizeAddressValue(parts.unionOrCityCorp),
    normalizeAddressValue(parts.upazila),
    normalizeAddressValue(parts.district),
    normalizeAddressValue(parts.division),
    normalizeAddressValue(parts.postalCode),
  ].filter((value) => value && String(value).trim().length > 0);

  return segments.join(", ");
};

const resolveLocation = (item: BuyPostListItem) => {
  const address = item.address;

  if (typeof address === "string") {
    return address;
  }

  if (address && typeof address === "object") {
    return formatAddressParts(address);
  }

  return "";
};

const formatTimeAgo = (iso?: string) => {
  if (!iso) return "";

  const timestamp = new Date(iso).getTime();
  if (Number.isNaN(timestamp)) return "";

  const diffMs = Math.max(Date.now() - timestamp, 0);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 60) return `${diffMinutes || 1}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const formatMinSize = (value?: number | null, unit?: string | null) => {
  if (!Number.isFinite(value)) return "N/A";
  const unitText = unit ? ` ${unit}` : "";
  return `Min ${value}${unitText}`;
};

const formatDistanceRange = (min?: number | null, max?: number | null) => {
  const hasMin = Number.isFinite(min);
  const hasMax = Number.isFinite(max);

  if (hasMin && hasMax) return `${min}m-${max}m`;
  if (hasMin) return `>= ${min}m`;
  if (hasMax) return `<= ${max}m`;
  return "N/A";
};

const mapStatusLabel = (status?: string | null) => {
  if (!status) return "Pending";
  if (status === "ACTIVE") return "Active";
  if (status === "ARCHIVED") return "Closed";
  if (status === "REJECTED") return "Closed";
  return "Pending";
};

const resolveBuyerName = (item: BuyPostListItem) => {
  return item.buyer?.fullName || item.buyer?.name || item.buyer?.id || "Unknown";
};

const mapWantedDetails = (item: BuyPostListItem): PropertyRequestDetails => {
  const resolvedId = item.id || "";

  return {
    id: resolvedId,
    title: item.title ?? "Untitled request",
    status: mapStatusLabel(item.status),
    postedBy: resolveBuyerName(item),
    postedAgo: formatTimeAgo(item.updatedAt || item.createdAt) || "Just now",
    verified: item.buyer?.isVerified ?? false,
    location: resolveLocation(item) || "Not specified",
    propertyType: (item.propertyType ?? "Plain Land") as PropertyRequestPropertyType,
    requiredLandSize: formatMinSize(item.landSizeMin, item.landSizeUnit),
    requiredPlotSize: formatMinSize(item.plotSizeMin, item.plotSizeUnit),
    distanceFromRoad: formatDistanceRange(
      item.roadDistanceMin,
      item.roadDistanceMax,
    ),
    budgetMin: Number.isFinite(item.budgetMin) ? Number(item.budgetMin) : 0,
    budgetMax: Number.isFinite(item.budgetMax) ? Number(item.budgetMax) : 0,
    description: item.description ?? "",
  };
};

const fetchWantedPostDetail = async (
  id: string,
): Promise<BuyPostListItem | null> => {
  const response = await serviceServer.get<
    BuyPostListItem | { data?: BuyPostListItem | null }
  >(`/buy-posts/${id}`);

  const payload = response.data as
    | BuyPostListItem
    | { data?: BuyPostListItem | null };

  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data ?? null;
  }

  return (payload as BuyPostListItem) ?? null;
};

export default async function RequestDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const wantedItem = await fetchWantedPostDetail(id);

  if (!wantedItem) {
    notFound();
  }

  const request = mapWantedDetails(wantedItem);

  return <RequestPropertyDetailsView request={request} />;
}
