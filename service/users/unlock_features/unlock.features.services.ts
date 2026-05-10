import { serviceClient } from "@/service/base/axios.client";
import { ConfirmUnlockFeaturesPayload, UnlockFeaturesAccessResponse, UnlockFeaturesSummaryResponse } from "@/types/unlock_features/unlock.features.types";
import { PaymentSessionValidationResponse, SslCommerzSessionResponse } from "@/types/payment/payment.types";
export const getUnlockFeaturesSummary = async () => {
  const response = await serviceClient.get<UnlockFeaturesSummaryResponse>(
    "/users/me/unlock-features-summary",
  );

  return response.data;
};

export const createUnlockFeaturesSession = async () => {
  const response = await serviceClient.post<SslCommerzSessionResponse>(
    "/users/me/unlock-features/session",
  );

  return response.data;
};

export const getPaymentStatus = async (tranId: string) => {
  const response = await serviceClient.get<PaymentSessionValidationResponse>(
    `/payments/${tranId}/status`,
  );

  return response.data;
};

export const confirmUnlockFeatures = async (
  payload: ConfirmUnlockFeaturesPayload,
) => {
  const response = await serviceClient.post<UnlockFeaturesAccessResponse>(
    "/users/me/unlock-features/confirm",
    payload,
  );

  return response.data;
};