export type ServiceTypeIconKey =
  | "icon-doc-check"
  | "icon-map"
  | "icon-ruler"
  | "icon-doc-pen"
  | "icon-folder"
  | "icon-badge-check"
  | "icon-file-up"
  | "icon-shield"
  | "icon-package"
  | "icon-man"
  | (string & {});

export type ServiceTypeBadgeColor =
  | "purple"
  | "orange"
  | "teal"
  | "green"
  | "red"
  | "blue"
  | "indigo"
  | (string & {});

export interface ServiceTypeItem {
  id: string;
  serviceKey: string;
  name: string;
  description: string;
  isMandatory: boolean;
  icon: ServiceTypeIconKey;
  badgeColor: ServiceTypeBadgeColor;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceTypesListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ServiceTypesListResponse {
  success: boolean;
  data: ServiceTypeItem[];
  meta: ServiceTypesListMeta;
}

export interface ServiceTypesListQueryParams {
  page?: number;
  limit?: number;
}
