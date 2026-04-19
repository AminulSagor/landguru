import { serviceClient } from "@/service/base/axios.client";
import type {
  BuyRequestApiTab,
  BuyRequestListApiItem,
  BuyRequestListApiResponse,
  BuyRequestListItem,
  BuyRequestListResponse,
  BuyRequestsListQueryParams,
  BuyRequestStatus,
  BuyRequestTabKey,
} from "@/types/admin/buy-requests/buy-requests-list.types";

function mapStatusLabel(status: BuyRequestStatus): string {
  if (status === "PENDING_ADMIN") {
    return "Pending";
  }

  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function mapItem(item: BuyRequestListApiItem): BuyRequestListItem {
  return {
    id: item.post.id,
    title: item.post.title,
    status: item.post.status,
    statusLabel: mapStatusLabel(item.post.status),
    createdAgo: null,
    description: item.post.description,
    locationLine: item.post.address,
    tags: [
      {
        icon: "home",
        label: item.post.propertyType,
      },
      {
        icon: "ruler",
        label: item.post.distanceFromRoad,
      },
      {
        icon: "ruler",
        label: item.post.propertySize,
      },
      {
        icon: "wallet",
        label: item.post.priceRange,
        strong: item.post.priceRange,
      },
    ],
    user: {
      id: item.buyer.id,
      avatarUrl: item.buyer.image,
      name: item.buyer.name,
      phone: item.buyer.phone,
      verified: item.buyer.isVerified,
    },
  };
}

export function mapTabKeyToApiTab(tab: BuyRequestTabKey): BuyRequestApiTab {
  if (tab === "active_listings") {
    return "ACTIVE";
  }

  if (tab === "archived") {
    return "ARCHIVED";
  }

  return "PENDING";
}

export const buyRequestsListService = {
  async getBuyRequests(
    params: BuyRequestsListQueryParams,
  ): Promise<BuyRequestListResponse> {
    const response = await serviceClient.get<BuyRequestListApiResponse>(
      "/buy-posts/admin/list",
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          tab: params.tab ?? "PENDING",
        },
      },
    );

    return {
      ...response.data,
      data: response.data.data.map(mapItem),
    };
  },
};
