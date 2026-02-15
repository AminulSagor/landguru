export type ResetStat = {
  id: string;
  title: string;
  value: number;
  status?: "critical" | "ok" | "info";
};

export type ResetRequest = {
  id: string;
  name: string;
  adminId: string;
  avatar: string;
  time: string;
  phone: string;
  email: string;
  zone: string;
  actionRequired?: boolean;
};
