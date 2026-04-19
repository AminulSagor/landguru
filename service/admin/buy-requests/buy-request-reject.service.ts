import { serviceClient } from "@/service/base/axios.client";
import type {
  BuyRequestRejectPayload,
  BuyRequestRejectResponse,
} from "@/types/admin/buy-requests/buy-request-reject.types";

export const buyRequestRejectService = {
  async rejectBuyRequest(
    postId: string,
    payload: BuyRequestRejectPayload,
  ): Promise<BuyRequestRejectResponse> {
    const response = await serviceClient.post<BuyRequestRejectResponse>(
      `/buy-posts/admin/post/${postId}/reject`,
      payload,
    );

    return response.data;
  },
};
