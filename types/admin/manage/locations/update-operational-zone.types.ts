import { OperationalZoneItem } from "./operational-zones-list.types";

export interface UpdateOperationalZonePayload {
  zoneName: string;
  isActive: boolean;
}

export interface UpdateOperationalZoneResponse {
  success: boolean;
  message: string;
  zone: OperationalZoneItem;
}
