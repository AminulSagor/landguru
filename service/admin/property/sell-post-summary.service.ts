import { serviceServer } from "@/service/base/axios.server";
import type { AdminSellPostSummaryResponse } from "@/types/admin/property-post/sell-post-summary.types";

export const getAdminSellPostSummaryServer =
  async (): Promise<AdminSellPostSummaryResponse> => {
    const response = await serviceServer.get<AdminSellPostSummaryResponse>(
      "/sell-posts/admin/summary",
    );

    return response.data;
  };
