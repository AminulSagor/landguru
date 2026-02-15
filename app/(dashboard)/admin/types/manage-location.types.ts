export type LocationPath = {
  division: string;
  district: string;
};

export type ManageZoneRow = {
  id: string;
  zoneName: string;
  parent: LocationPath; // Dhaka Division > Dhaka District
  createdAt: string; // Oct 24, 2023
  isActive: boolean;
  thanaOrArea?: string;
};
