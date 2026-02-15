import { ManageZoneRow } from "@/app/(dashboard)/admin/types/manage-location.types";

export const demoZones: ManageZoneRow[] = [
  {
    id: "z-1",
    zoneName: "Uttara",
    parent: { division: "Dhaka Division", district: "Dhaka District" },
    createdAt: "Oct 24, 2023",
    isActive: true,
    thanaOrArea: "Uttara",
  },
  {
    id: "z-2",
    zoneName: "Banani",
    parent: { division: "Dhaka Division", district: "Dhaka District" },
    createdAt: "Oct 22, 2023",
    isActive: true,
    thanaOrArea: "Banani",
  },
  {
    id: "z-3",
    zoneName: "Purbachal",
    parent: { division: "Dhaka Division", district: "Narayanganj District" },
    createdAt: "Oct 20, 2023",
    isActive: true,
    thanaOrArea: "Purbachal",
  },
  {
    id: "z-4",
    zoneName: "Sadar",
    parent: { division: "Sylhet Division", district: "Sylhet District" },
    createdAt: "Oct 15, 2023",
    isActive: true,
    thanaOrArea: "Sadar",
  },
  {
    id: "z-5",
    zoneName: "Agrabad",
    parent: { division: "Chittagong Division", district: "Chittagong District" },
    createdAt: "Sep 30, 2023",
    isActive: false,
    thanaOrArea: "Agrabad",
  },
];

export const demoDivisions = [
  "Dhaka Division",
  "Chittagong Division",
  "Sylhet Division",
];

export const demoDistrictsByDivision: Record<string, string[]> = {
  "Dhaka Division": ["Dhaka District", "Narayanganj District"],
  "Chittagong Division": ["Chittagong District"],
  "Sylhet Division": ["Sylhet District"],
};
