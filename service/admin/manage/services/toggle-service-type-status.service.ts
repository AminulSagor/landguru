import { serviceClient } from "@/service/base/axios.client";
import type {
  ToggleServiceTypeStatusPayload,
  ToggleServiceTypeStatusResponse,
} from "@/types/admin/manage/services/toggle-service-type-status.types";

export const toggleServiceTypeStatusService = {
  async toggleServiceTypeStatus(
    serviceTypeId: string,
    payload: ToggleServiceTypeStatusPayload,
  ): Promise<ToggleServiceTypeStatusResponse> {
    const response = await serviceClient.patch<ToggleServiceTypeStatusResponse>(
      `/service-types/${serviceTypeId}/status`,
      payload,
    );

    return response.data;
  },
};
