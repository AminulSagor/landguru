import { serviceClient } from "@/service/base/axios.client";
import type { ServiceTypeItem } from "@/types/admin/manage/services/service-types-list.types";

export const serviceTypesActiveService = {
  async getActiveServiceTypes(): Promise<ServiceTypeItem[]> {
    const response = await serviceClient.get<{ success: boolean; data: ServiceTypeItem[] }>(
      "/service-types/active",
    );

    return response.data.data;
  },
};
