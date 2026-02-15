export type ServiceIconKey =
  | "doc-check"
  | "map"
  | "ruler"
  | "doc-pen"
  | "folder"
  | "badge-check"
  | "file-up"
  | "shield"
  | "package";

export type BadgeColorKey =
  | "purple"
  | "orange"
  | "teal"
  | "green"
  | "red"
  | "blue"
  | "indigo";

export type ManageServiceType = {
  id: string;
  name: string;
  description: string;
  createdAt: string; // "20 Jan, 2026"
  isActive: boolean;
  icon: ServiceIconKey;
  badgeColor: BadgeColorKey;
  isMandatory: boolean;
};
