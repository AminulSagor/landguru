import { serviceClient } from "@/service/base/axios.client";
import type {
  SellPostNegotiationCounterPayload,
  SellPostNegotiationReviewDetailsResponse,
  SellPostNegotiationSuccessResponse,
  SellPostNegotiationsQueryParams,
  SellPostNegotiationsResponse,
} from "@/types/admin/quote-requote/sell-post-negotiations.types";
import {
  mapSellPostNegotiationsResponse,
  type SellPostNegotiationsApiResponse,
} from "@/service/admin/sell-posts/sell-post-negotiations.mapper";

export const getAdminSellPostNegotiations = async (
  params: SellPostNegotiationsQueryParams,
): Promise<SellPostNegotiationsResponse> => {
  const response = await serviceClient.get<SellPostNegotiationsApiResponse>(
    "/sell-posts/admin/negotiations",
    {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        tab: params.tab ?? "ADMIN_TO_RESPOND",
      },
    },
  );

  return mapSellPostNegotiationsResponse(response.data);
};

export const getAdminSellPostNegotiationReviewDetails = async (
  negotiationId: string,
): Promise<SellPostNegotiationReviewDetailsResponse> => {
  const response =
    await serviceClient.get<SellPostNegotiationReviewDetailsResponse>(
      `/sell-posts/admin/negotiations/${negotiationId}/review`,
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
