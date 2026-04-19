import type {
  BuyRequestDetailApiResponse,
  BuyRequestDetailData,
} from "@/types/admin/buy-requests/buy-request-detail.types";
import { serviceClient } from "@/service/base/axios.client";

function mapStatusLabel(status: string): string {
  if (status === "PENDING_ADMIN") {
    return "Pending";
  }

  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export const buyRequestDetailService = {
  async getBuyRequestDetail(postId: string): Promise<BuyRequestDetailData> {
    const response = await serviceClient.get<BuyRequestDetailApiResponse>(
      `/buy-posts/admin/post/${postId}`,
    );

    const { buyer, post } = response.data;

    return {
      id: post.id,
      title: post.title,
      status: post.status,
      statusLabel: mapStatusLabel(post.status),
      description: post.description,
      locationLine: post.address,
      tags: [
        {
          icon: "home",
          label: post.propertyType,
        },
        {
          icon: "ruler",
          label: post.distanceFromRoad,
        },
        {
          icon: "ruler",
          label: post.propertySize,
        },
        {
          icon: "wallet",
          label: post.priceRange,
          strong: post.priceRange,
        },
      ],
      user: {
        id: buyer.id,
        avatarUrl: buyer.image,
        name: buyer.name,
        phone: buyer.phone,
        verified: buyer.isVerified,
        nidVerified: buyer.isNIDVerified,
      },
      rejectionReason: post.rejectionReason,
      addressObject: post.fullAddressObject,
    };
  },
};
