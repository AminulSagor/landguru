import { serviceClient } from "@/service/base/axios.client";
import type {
  UpdateServiceTypePayload,
  UpdateServiceTypeResponse,
} from "@/types/admin/manage/services/update-service-type.types";

export const updateServiceTypeService = {
  async updateServiceType(
    serviceTypeId: string,
    payload: UpdateServiceTypePayload,
  ): Promise<UpdateServiceTypeResponse> {
    const response = await serviceClient.patch<UpdateServiceTypeResponse>(
      `/service-types/${serviceTypeId}`,
      payload,
    );

    return response.data;
  },
};
