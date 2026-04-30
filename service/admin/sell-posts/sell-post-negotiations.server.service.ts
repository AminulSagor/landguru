import { serviceServer } from "@/service/base/axios.server";
import type {
  SellPostNegotiationsQueryParams,
  SellPostNegotiationsResponse,
} from "@/types/admin/quote-requote/sell-post-negotiations.types";
import {
  mapSellPostNegotiationsResponse,
  type SellPostNegotiationsApiResponse,
} from "@/service/admin/sell-posts/sell-post-negotiations.mapper";

export const getAdminSellPostNegotiationsServer = async (
  params: SellPostNegotiationsQueryParams,
): Promise<SellPostNegotiationsResponse> => {
  const response = await serviceServer.get<SellPostNegotiationsApiResponse>(
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
