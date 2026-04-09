import { serviceClient } from "@/service/base/axios.client";
import type {
  UpdateOperationalZonePayload,
  UpdateOperationalZoneResponse,
} from "@/types/admin/manage/locations/update-operational-zone.types";

export const updateOperationalZoneService = {
  async updateZone(
    zoneId: string,
    payload: UpdateOperationalZonePayload,
  ): Promise<UpdateOperationalZoneResponse> {
    const response = await serviceClient.put<UpdateOperationalZoneResponse>(
      `/operational-zones/${zoneId}`,
      payload,
    );

    return response.data;
  },
};
