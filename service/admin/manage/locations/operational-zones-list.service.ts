import { serviceClient } from "@/service/base/axios.client";
import type {
  OperationalZonesListApiResponse,
  OperationalZonesListQueryParams,
  OperationalZonesListResponse,
} from "@/types/admin/manage/locations/operational-zones-list.types";

export const operationalZonesListService = {
  async getOperationalZones(
    params: OperationalZonesListQueryParams,
  ): Promise<OperationalZonesListResponse> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    const response = await serviceClient.get<OperationalZonesListApiResponse>(
      "/operational-zones/all-zones",
      {
        params: {
          page,
          limit,
          ...(params.search ? { search: params.search } : {}),
        },
      },
    );

    const zones = response.data.zones ?? [];
    const meta = response.data.meta;

    return {
      success: response.data.success,
      zones,
      meta: {
        total: Number(meta?.total ?? zones.length),
        page: Number(meta?.page ?? page),
        limit: Number(meta?.limit ?? limit),
        totalPages: Number(
          meta?.totalPages ?? Math.max(1, Math.ceil((meta?.total ?? zones.length) / limit)),
        ),
      },
    };
  },
};
