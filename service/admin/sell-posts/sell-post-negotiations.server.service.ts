import { serviceServer } from "@/service/base/axios.server";
import type {
  SellPostNegotiationsQueryParams,
  SellPostNegotiationsResponse,
} from "@/types/admin/quote-requote/sell-post-negotiations.types";

export const getAdminSellPostNegotiationsServer = async (
  params: SellPostNegotiationsQueryParams,
): Promise<SellPostNegotiationsResponse> => {
  const response = await serviceServer.get<SellPostNegotiationsResponse>(
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
