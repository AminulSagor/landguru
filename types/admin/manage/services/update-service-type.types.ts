import type { ServiceTypeBadgeColor, ServiceTypeIconKey, ServiceTypeItem } from "@/types/admin/manage/services/service-types-list.types";

export interface UpdateServiceTypePayload {
  name: string;
  isMandatory: boolean;
  description: string;
  icon: ServiceTypeIconKey;
  badgeColor: ServiceTypeBadgeColor;
}

export interface UpdateServiceTypeResponse {
  success: boolean;
  message: string;
  data: ServiceTypeItem;
}
