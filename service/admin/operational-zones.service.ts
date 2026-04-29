import { serviceClient } from "@/service/base/axios.client";
import type { OperationalZonesResponse } from "@/types/operational-zones/operational-zone.types";

export const operationalZonesService = {
  async getAllZones(): Promise<OperationalZonesResponse> {
    const response = await serviceClient.get<OperationalZonesResponse>(
      "/operational-zones/all-zones",
    );

    return response.data;
  },
};
