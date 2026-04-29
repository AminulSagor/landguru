import { serviceClient } from "@/service/base/axios.client";
import type {
  UpdateAdminPayload,
  UpdateAdminResponse,
} from "@/types/admin/admin-list/admin-update.types";

export const adminUpdateService = {
  async updateAdmin(
    adminId: string,
    payload: UpdateAdminPayload,
  ): Promise<UpdateAdminResponse> {
    const response = await serviceClient.patch<UpdateAdminResponse>(
      `/admin/${adminId}`,
      payload,
    );

    return response.data;
  },
};
