export interface OperationalZone {
  id: string;
  zoneName: string;
  division: string;
  district: string;
  thana: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OperationalZonesResponse {
  success: boolean;
  zones: OperationalZone[];
}
