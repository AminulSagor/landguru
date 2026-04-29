import { serviceClient } from "@/service/base/axios.client";
import type {
  UpdateAdminStatusPayload,
  UpdateAdminStatusResponse,
} from "@/types/admin/admin-list/admin-status.types";

export const adminStatusService = {
  async updateAdminStatus(
    adminId: string,
    payload: UpdateAdminStatusPayload,
  ): Promise<UpdateAdminStatusResponse> {
    const response = await serviceClient.patch<UpdateAdminStatusResponse>(
      `/admin/${adminId}/status`,
      payload,
    );

    return response.data;
  },
};
