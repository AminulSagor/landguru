import { serviceClient } from "@/service/base/axios.client";
import type {
  SellPostNegotiationCounterPayload,
  SellPostNegotiationSuccessResponse,
  SellPostNegotiationsQueryParams,
  SellPostNegotiationsResponse,
} from "@/types/admin/quote-requote/sell-post-negotiations.types";

export const getAdminSellPostNegotiations = async (
  params: SellPostNegotiationsQueryParams,
): Promise<SellPostNegotiationsResponse> => {
  const response = await serviceClient.get<SellPostNegotiationsResponse>(
    "/sell-posts/admin/negotiations",
    {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        tab: params.tab ?? "ADMIN_TO_RESPOND",
      },
    },
  );

  return response.data;
};

export const counterAdminSellPostNegotiation = async (
  negotiationId: string,
  payload: SellPostNegotiationCounterPayload,
): Promise<SellPostNegotiationSuccessResponse> => {
  const response = await serviceClient.post<SellPostNegotiationSuccessResponse>(
    `/sell-posts/admin/negotiations/${negotiationId}/counter`,
    payload,
  );

  return response.data;
};

export const rejectAdminSellPostNegotiation = async (
  negotiationId: string,
): Promise<SellPostNegotiationSuccessResponse> => {
  const response = await serviceClient.post<SellPostNegotiationSuccessResponse>(
    `/sell-posts/admin/negotiations/${negotiationId}/reject`,
  );

  return response.data;
};
