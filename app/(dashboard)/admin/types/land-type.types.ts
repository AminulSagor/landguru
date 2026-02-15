export type LandTypeIconKey =
  | "tractor"
  | "mountain"
  | "waves"
  | "building"
  | "house"
  | "store";

export type BadgeColorKey =
  | "blue"
  | "green"
  | "orange"
  | "purple"
  | "red"
  | "teal"
  | "gray";

export type LandTypeRow = {
  id: string;
  typeName: string;
  subtitle: string; // Farming & Cultivation
  createdAt: string; // Oct 24, 2023
  isActive: boolean;
  icon: LandTypeIconKey;
  badgeColor: BadgeColorKey;
  description?: string;
};
