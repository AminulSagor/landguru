import { serviceClient } from "@/service/base/axios.client";
import { PaymentSessionValidationResponse, SslCommerzSessionResponse } from "@/types/payment/payment.types";


export const createSslCommerzSession = async (postId: string) => {
  const response = await serviceClient.post<SslCommerzSessionResponse>(
    `/sell-posts/${postId}/quote-payment/session`,
  );

  return response.data;
};

export const validatePaymentSession = async (postId: string) => {
  const response = await serviceClient.get<PaymentSessionValidationResponse>(
    `/sell-posts/${postId}/quote-payment/session`,
  );

  return response.data;
};


// use in the page to redirect to the payment gateway in new tab
// export const openPaymentGatewayInNewTab = (gatewayUrl: string) => {
//   if (!gatewayUrl?.trim()) return;

//   window.open(gatewayUrl, "_blank", "noopener,noreferrer");
// };

