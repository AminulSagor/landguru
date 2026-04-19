import { serviceClient } from "@/service/base/axios.client";
import type {
  PropertyPostItem,
  ReviewPropertyPostPayload,
} from "@/types/admin/property-post/property.types";

export const propertyPostReviewService = {
  async reviewPropertyPost(
    postId: string,
    payload: ReviewPropertyPostPayload,
  ): Promise<PropertyPostItem> {
    const response = await serviceClient.post<PropertyPostItem>(
      `/sell-posts/admin/post/${postId}/review`,
      payload,
    );

    return response.data;
  },
};
