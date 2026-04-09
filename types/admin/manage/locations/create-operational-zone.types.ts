import { OperationalZoneItem } from "./operational-zones-list.types";

export interface CreateOperationalZonePayload {
  zoneName: string;
  division: string;
  district: string;
  thana: string;
}

export interface CreateOperationalZoneResponse {
  success: boolean;
  message: string;
  zone: OperationalZoneItem;
}
