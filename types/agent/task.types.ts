export type UiRawDoc = { name: string; size?: string; url?: string };

export type UiWorkLogEntry = {
  title: string;
  fileUrls?: string[];
  createdAt: string;
};

export type UiTaskDetails = {
  id: string;
  title: string;
  code: string;
  serviceKey?: string;

  stage: "pending_accepting" | "active" | "submitted" | "completed";
  statusLabel?: string;
  acceptBefore?: string;
  postedAgo: string;
  updatedAgo?: string;

  clientName: string;
  verified: boolean;
  avatarUrl?: string;

  propertyType: string;
  plotSize: string;
  plotSizeValue?: number;
  sellableLand: string;
  sellableLandValue?: number;
  landUnit?: string;
  roadDistance: string;
  location: string;

  photos: string[];
  morePhotosCount: number;

  rawDocs: UiRawDoc[];

  serviceFee: number;
  appointment?: {
    isScheduled: boolean;
    appointmentTitle?: string;
    appointmentDate?: string;
    appointmentTime?: string;
  };
  workLog?: UiWorkLogEntry[];
};
