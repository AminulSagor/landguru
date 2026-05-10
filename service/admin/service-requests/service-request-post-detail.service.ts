import { serviceClient } from "@/service/base/axios.client";
import type { PropertyPostItem } from "@/types/admin/property-post/property.types";

export const serviceRequestPostDetailService = {
  async getPostDetail(postId: string): Promise<PropertyPostItem> {
    const response = await serviceClient.get<PropertyPostItem>(`/sell-posts/${postId}`);

    return response.data;
  },
};
