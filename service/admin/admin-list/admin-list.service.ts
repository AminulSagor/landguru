import { serviceClient } from "@/service/base/axios.client";
import type {
  AdminListQueryParams,
  AdminListResponse,
} from "@/types/admin/admin-list/admin-list.types";

export const adminListService = {
  async getAdminList(params: AdminListQueryParams): Promise<AdminListResponse> {
    const response = await serviceClient.get<AdminListResponse>("/admin/list", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        ...(params.search ? { search: params.search } : {}),
        ...(params.zone ? { zone: params.zone } : {}),
        ...(params.isActive !== undefined ? { isActive: params.isActive } : {}),
      },
    });

    return response.data;
  },
};
