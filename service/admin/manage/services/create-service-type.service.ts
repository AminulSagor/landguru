import { serviceClient } from "@/service/base/axios.client";
import type {
  CreateServiceTypePayload,
  CreateServiceTypeResponse,
} from "@/types/admin/manage/services/create-service-type.types";

export const createServiceTypeService = {
  async createServiceType(
    payload: CreateServiceTypePayload,
  ): Promise<CreateServiceTypeResponse> {
    const response = await serviceClient.post<CreateServiceTypeResponse>(
      "/service-types",
      payload,
    );

    return response.data;
  },
};
