import { serviceClient } from "@/service/base/axios.client";
import type {
  PropertyPostsListQueryParams,
  PropertyPostsListResponse,
} from "@/types/admin/property-post/property.types";

export const propertyPostsService = {
  async getAdminPropertyPosts(
    params: PropertyPostsListQueryParams,
  ): Promise<PropertyPostsListResponse> {
    const response = await serviceClient.get<PropertyPostsListResponse>(
      "/sell-posts/admin/list",
      {
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 8,
          ...(params.status ? { status: params.status } : {}),
          ...(params.propertyType ? { propertyType: params.propertyType } : {}),
          ...(params.serviceType ? { serviceType: params.serviceType } : {}),
          ...(params.search ? { search: params.search } : {}),
        },
      },
    );

    return response.data;
  },
};
