import type { ServiceTypeBadgeColor, ServiceTypeIconKey, ServiceTypeItem } from "@/types/admin/manage/services/service-types-list.types";

export interface CreateServiceTypePayload {
  name: string;
  isMandatory: boolean;
  description: string;
  icon: ServiceTypeIconKey;
  badgeColor: ServiceTypeBadgeColor;
}

export interface CreateServiceTypeResponse {
  success: boolean;
  message: string;
  data: ServiceTypeItem;
}
