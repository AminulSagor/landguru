import { serviceClient } from "@/service/base/axios.client";
import type { DeleteServiceTypeResponse } from "@/types/admin/manage/services/delete-service-type.types";

export const deleteServiceTypeService = {
  async deleteServiceType(serviceTypeId: string): Promise<DeleteServiceTypeResponse> {
    const response = await serviceClient.delete<DeleteServiceTypeResponse>(
      `/service-types/${serviceTypeId}`,
    );

    return response.data;
  },
};
