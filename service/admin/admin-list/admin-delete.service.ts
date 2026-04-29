import { serviceClient } from "@/service/base/axios.client";
import type { DeleteAdminResponse } from "@/types/admin/admin-list/admin-delete.types";

export const adminDeleteService = {
  async deleteAdmin(adminId: string): Promise<DeleteAdminResponse> {
    const response = await serviceClient.delete<DeleteAdminResponse>(
      `/admin/${adminId}`,
    );

    return response.data;
  },
};
