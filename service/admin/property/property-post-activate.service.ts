import { serviceClient } from "@/service/base/axios.client";
import type { ActivatePropertyPostResponse } from "@/types/admin/property-post/property.types";

export const propertyPostActivateService = {
  async activatePropertyPost(
    postId: string,
  ): Promise<ActivatePropertyPostResponse> {
    const response = await serviceClient.patch<ActivatePropertyPostResponse>(
      `/sell-posts/admin/post/${postId}/activate`,
    );

    return response.data;
  },
};
