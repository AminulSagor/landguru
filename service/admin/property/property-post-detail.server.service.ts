import { serviceServer } from "@/service/base/axios.server";
import type { PropertyPostItem } from "@/types/admin/property-post/property.types";

export const getAdminPropertyPostDetailServer = async (
  postId: string,
): Promise<PropertyPostItem> => {
  const response = await serviceServer.get<PropertyPostItem>(
    `/sell-posts/${postId}`,
  );

  return response.data;
};
