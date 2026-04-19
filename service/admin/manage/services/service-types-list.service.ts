import { serviceClient } from "@/service/base/axios.client";
import type {
  ServiceTypesListQueryParams,
  ServiceTypesListResponse,
} from "@/types/admin/manage/services/service-types-list.types";

export const serviceTypesListService = {
  async getServiceTypes(
    params: ServiceTypesListQueryParams,
  ): Promise<ServiceTypesListResponse> {
    const response = await serviceClient.get<ServiceTypesListResponse>(
      "/service-types",
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
        },
      },
    );

    return response.data;
  },
};
