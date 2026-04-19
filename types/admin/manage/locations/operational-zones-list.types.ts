export interface OperationalZoneItem {
  id: string;
  zoneName: string;
  division: string;
  district: string;
  thana: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OperationalZonesListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OperationalZonesListResponse {
  success: boolean;
  zones: OperationalZoneItem[];
  meta: OperationalZonesListMeta;
}

export interface OperationalZonesListApiResponse {
  success: boolean;
  zones: OperationalZoneItem[];
  meta?: Partial<OperationalZonesListMeta>;
}

export interface OperationalZonesListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}
