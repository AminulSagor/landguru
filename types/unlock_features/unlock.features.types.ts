export type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data: T;
};

export type UnlockPaymentMethod = {
  code: string;
  name: string;
};

export type UnlockFeaturesSummary = {
  userId: string;
  isLimited: boolean;
  unlockFeaturesAmount: number;
  paymentMethods: UnlockPaymentMethod[];
};

export type UnlockFeaturesSummaryResponse =
  ApiResponse<UnlockFeaturesSummary>;

export type ConfirmUnlockFeaturesPayload = {
  tranId: string;
};

export type UnlockFeaturesAccess = {
  id: string;
  userId: string;
  isLimited: boolean;
};

export type UnlockFeaturesAccessResponse =
  ApiResponse<UnlockFeaturesAccess>;