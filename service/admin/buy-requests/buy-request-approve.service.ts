import { serviceClient } from "@/service/base/axios.client";
import type { BuyRequestApproveResponse } from "@/types/admin/buy-requests/buy-request-approve.types";

export const buyRequestApproveService = {
  async approveBuyRequest(postId: string): Promise<BuyRequestApproveResponse> {
    const response = await serviceClient.post<BuyRequestApproveResponse>(
      `/buy-posts/admin/post/${postId}/approve`,
    );

    return response.data;
  },
};
