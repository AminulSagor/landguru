export type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data: T;
};

export type SslCommerzSession = {
  gatewayUrl?: string;
  gateway_url?: string;
  GatewayPageURL?: string;
  redirectUrl?: string;

  paymentId?: string;
  payment_id?: string;

  sessionId?: string;
  session_id?: string;
  sessionKey?: string;

  tranId?: string;
  tran_id?: string;

  status?: string;
};

export type SslCommerzSessionResponse = ApiResponse<SslCommerzSession>;

export type PaymentSessionValidation = {
  status: string;
  paymentId?: string;
  tranId?: string;
};

export type PaymentSessionValidationResponse =
  ApiResponse<PaymentSessionValidation>;

export type PaymentGatewayStatus = "success" | "failed" | "cancelled";

export type PaymentGatewayResult = {
  status: PaymentGatewayStatus;
  redirectedUrl?: string;
};