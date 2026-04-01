import type { PropertyPostStatus } from "@/types/admin/property-post/property.types";

export type PaginationItem = number | "ellipsis";

export type PropertyActionConfig = {
  label: string;
  variant: "primary" | "secondary";
};

export type PropertyProgressSummary = {
  done: number;
  total: number;
  pendingCount: number;
  label: string;
};

function normalizeCompactNumber(value: number) {
  const fixedValue = value >= 10 ? value.toFixed(1) : value.toFixed(2);

  return fixedValue.replace(/\.00$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
}

function parseServicesProgress(servicesProgress: string) {
  const [doneText = "0", totalText = "0"] = servicesProgress.split("/");

  const done = Number.parseInt(doneText, 10);
  const total = Number.parseInt(totalText, 10);

  return {
    done: Number.isNaN(done) ? 0 : done,
    total: Number.isNaN(total) ? 0 : total,
  };
}

export function buildPropertyDetailsHref(propertyId: string) {
  return `/admin/property-posts/details/${propertyId}`;
}

export function formatCompactBdt(value: number | null) {
  if (value === null) return "Pending";

  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 10000000) {
    return `৳ ${normalizeCompactNumber(value / 10000000)} Cr`;
  }

  if (absoluteValue >= 100000) {
    return `৳ ${normalizeCompactNumber(value / 100000)} Lakh`;
  }

  return `৳ ${new Intl.NumberFormat("en-BD").format(value)}`;
}

export function formatRelativeTime(dateString: string) {
  const timestamp = new Date(dateString).getTime();

  if (Number.isNaN(timestamp)) return "";

  const diffInMinutes = Math.max(
    0,
    Math.floor((Date.now() - timestamp) / (1000 * 60)),
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day ago`;
}

export function getStatusLabel(status: PropertyPostStatus) {
  switch (status) {
    case "PENDING_ADMIN":
      return "Pending Admin";
    case "PENDING_BUYER_REVIEW":
      return "Pending Buyer Review";
    case "PAYMENT_PENDING_REVIEW":
      return "Pending Review";
    case "PARTIAL_SOLD":
      return "Partially Sold";
    default:
      return status
        .toLowerCase()
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
  }
}

export function getStatusMeta(status: PropertyPostStatus) {
  switch (status) {
    case "ACTIVE":
      return "Published:";
    case "SOLD":
    case "PARTIAL_SOLD":
      return "Sold:";
    case "REJECTED":
      return "Rejected:";
    case "PENDING_ADMIN":
    case "PENDING_BUYER_REVIEW":
    case "PAYMENT_PENDING_REVIEW":
    case "QUOTED":
      return "Updated:";
    case "DRAFT":
    default:
      return "Saved:";
  }
}

export function getStatusClasses(status: PropertyPostStatus) {
  switch (status) {
    case "PENDING_ADMIN":
    case "PENDING_BUYER_REVIEW":
    case "PAYMENT_PENDING_REVIEW":
    case "QUOTED":
      return "border-[#FDBA74] bg-[#FFF1E6] text-[#C2410C]";
    case "ACTIVE":
      return "border-[#BBF7D0] bg-[#DCFCE7] text-green";
    case "SOLD":
    case "PARTIAL_SOLD":
      return "border-green bg-green text-white";
    case "REJECTED":
      return "border-[#EF4444] bg-[#EF4444] text-white";
    case "DRAFT":
    default:
      return "border-gray/15 bg-white text-gray";
  }
}

export function getActionConfig(
  status: PropertyPostStatus,
): PropertyActionConfig {
  switch (status) {
    case "PENDING_ADMIN":
    case "PENDING_BUYER_REVIEW":
    case "PAYMENT_PENDING_REVIEW":
    case "QUOTED":
      return {
        label: "Review",
        variant: "primary",
      };

    case "ACTIVE":
      return {
        label: "Active",
        variant: "primary",
      };

    default:
      return {
        label: "View Details",
        variant: "secondary",
      };
  }
}

export function getProgressSummary(
  servicesProgress: string,
): PropertyProgressSummary {
  const { done, total } = parseServicesProgress(servicesProgress);

  const pendingCount = total > done ? total - done : 0;
  const label = total > 0 && done >= total ? "All Clear" : "Progress";

  return {
    done,
    total,
    pendingCount,
    label,
  };
}

export function buildPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage, "ellipsis", totalPages];
}

export function getTableRange(
  currentPage: number,
  pageSize: number,
  rowCount: number,
  total: number,
) {
  if (total === 0 || rowCount === 0) {
    return {
      startIndex: 0,
      endIndex: 0,
    };
  }

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = startIndex + rowCount - 1;

  return {
    startIndex,
    endIndex,
  };
}
