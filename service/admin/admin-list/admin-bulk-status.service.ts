import { serviceClient } from "@/service/base/axios.client";
import type {
  AdminBulkStatusPayload,
  AdminBulkStatusResponse,
} from "@/types/admin/admin-list/admin-bulk-status.types";

export const adminBulkStatusService = {
  async updateBulkStatus(
    payload: AdminBulkStatusPayload,
  ): Promise<AdminBulkStatusResponse> {
    const response = await serviceClient.patch<AdminBulkStatusResponse>(
      "/admin/bulk-status",
      payload,
    );

    return response.data;
  },
};
