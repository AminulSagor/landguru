import { BD_LOCATIONS } from "@/bd-location-data";

export type BdLocation = {
  zila: string;
  thanas: string[];
};



export type DivisionKey =
  | "Barishal"
  | "Chattogram"
  | "Dhaka"
  | "Khulna"
  | "Mymensingh"
  | "Rajshahi"
  | "Rangpur"
  | "Sylhet";

export type Option = { label: string; value: string };

// --------------------------------------------
// 1) Division list (small, safe to generate)
// --------------------------------------------
export const DIVISIONS: DivisionKey[] = [
  "Barishal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet",
];

export const DIVISION_OPTIONS: Option[] = DIVISIONS.map((d) => ({
  label: d,
  value: d,
}));

// --------------------------------------------
// 2) IMPORTANT: zila -> division mapping
// (one-time constant; needed for dependent selects)
// --------------------------------------------
export const ZILA_TO_DIVISION: Record<string, DivisionKey> = {
  // Barishal
  Barguna: "Barishal",
  Barishal: "Barishal",
  Bhola: "Barishal",
  Jhalokati: "Barishal",
  Patuakhali: "Barishal",
  Pirojpur: "Barishal",

  // Chattogram
  Bandarban: "Chattogram",
  Brahmanbaria: "Chattogram",
  Chandpur: "Chattogram",
  Chattogram: "Chattogram",
  Cumilla: "Chattogram",
  "Cox's Bazar": "Chattogram",
  Feni: "Chattogram",
  Khagrachhari: "Chattogram",
  Lakshmipur: "Chattogram",
  Noakhali: "Chattogram",
  Rangamati: "Chattogram",

  // Dhaka
  Dhaka: "Dhaka",
  Faridpur: "Dhaka",
  Gazipur: "Dhaka",
  Gopalganj: "Dhaka",
  Kishoreganj: "Dhaka",
  Madaripur: "Dhaka",
  Manikganj: "Dhaka",
  Munshiganj: "Dhaka",
  Narayanganj: "Dhaka",
  Narsingdi: "Dhaka",
  Rajbari: "Dhaka",
  Shariatpur: "Dhaka",
  Tangail: "Dhaka",

  // Khulna
  Bagerhat: "Khulna",
  Chuadanga: "Khulna",
  Jashore: "Khulna",
  Jhenaidah: "Khulna",
  Khulna: "Khulna",
  Kushtia: "Khulna",
  Magura: "Khulna",
  Meherpur: "Khulna",
  Narail: "Khulna",
  Satkhira: "Khulna",

  // Mymensingh
  Jamalpur: "Mymensingh",
  Mymensingh: "Mymensingh",
  Netrokona: "Mymensingh",
  Sherpur: "Mymensingh",

  // Rajshahi
  Bogra: "Rajshahi", // (Bogura)
  Joypurhat: "Rajshahi",
  Naogaon: "Rajshahi",
  Natore: "Rajshahi",
  Chapainawabganj: "Rajshahi",
  Pabna: "Rajshahi",
  Rajshahi: "Rajshahi",
  Sirajganj: "Rajshahi",

  // Rangpur
  Dinajpur: "Rangpur",
  Gaibandha: "Rangpur",
  Kurigram: "Rangpur",
  Lalmonirhat: "Rangpur",
  Nilphamari: "Rangpur",
  Panchagarh: "Rangpur",
  Rangpur: "Rangpur",
  Thakurgaon: "Rangpur",

  // Sylhet
  Habiganj: "Sylhet",
  Moulvibazar: "Sylhet",
  Sunamganj: "Sylhet",
  Sylhet: "Sylhet",
};

// --------------------------------------------
// 3) Helpers to produce options for selects
// --------------------------------------------
export const toOptions = (items: string[]): Option[] =>
  items.map((x) => ({ label: x, value: x }));

export const getDistrictOptionsByDivision = (division: DivisionKey | null): Option[] => {
  if (!division) return [];
  const zilaList = BD_LOCATIONS
    .map((x) => x.zila)
    .filter((zila) => ZILA_TO_DIVISION[zila] === division)
    .sort((a, b) => a.localeCompare(b));

  return toOptions(zilaList);
};

export const getUpazilaOptionsByDistrict = (district: string | null): Option[] => {
  if (!district) return [];
  const found = BD_LOCATIONS.find((x) => x.zila === district);
  if (!found) return [];
  return toOptions(found.thanas);
};
