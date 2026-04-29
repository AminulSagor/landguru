import { serviceClient } from "@/service/base/axios.client";
import type {
  AdminCreatePayload,
  AdminCreateResponse,
} from "@/types/admin/admin-list/admin-create.types";

export const adminCreateService = {
  async createAdmin(payload: AdminCreatePayload): Promise<AdminCreateResponse> {
    const response = await serviceClient.post<AdminCreateResponse>(
      "/admin/create-admin",
      payload,
    );

    return response.data;
  },
};
