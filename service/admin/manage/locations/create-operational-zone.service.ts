import { serviceClient } from "@/service/base/axios.client";
import type {
  CreateOperationalZonePayload,
  CreateOperationalZoneResponse,
} from "@/types/admin/manage/locations/create-operational-zone.types";

export const createOperationalZoneService = {
  async createZone(
    payload: CreateOperationalZonePayload,
  ): Promise<CreateOperationalZoneResponse> {
    const response = await serviceClient.post<CreateOperationalZoneResponse>(
      "/operational-zones/create-zone",
      payload,
    );

    return response.data;
  },
};
