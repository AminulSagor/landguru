import { serviceClient } from "@/service/base/axios.client";

import type {
    AcceptQuotedPricePayloadDto,
    BuyPostDto,
    BuyPostDetailsResponseDto,
    BuyPostListResponseDto,
    DraftEntityResponseDto,
    FetchMyBuyPostsParamsDto,
    FetchMyOfferedPostsParamsDto,
    FetchMySellPostsParamsDto,
    OfferedPostDto,
    OfferedPostDetailsResponseDto,
    OfferedPostListResponseDto,
    PaginationMetaDto,
    PaymentSessionValidationResponseDto,
    QuotePaymentSummaryResponseDto,
    RequoteSellPostPayloadDto,
    RequestSellPostAppointmentPayloadDto,
    SellPostDetailsResponseDto,
    SellPostDto,
    SellPostListResponseDto,
    SslCommerzSessionResponseDto,
    UpdateSellPostPayloadDto,
} from "@/types/post/my/mypost.types";

type NormalizableListResponse<T> = {
    success?: boolean;
    message?: string;
    data?: T[];
    posts?: T[];
    total?: number;
    meta?: PaginationMetaDto;
};

const normalizeListResponse = <T>(
    payload: NormalizableListResponse<T>,
    page: number,
    limit: number,
) => {
    const data = Array.isArray(payload.data)
        ? payload.data
        : Array.isArray(payload.posts)
          ? payload.posts
          : [];

    const total = Number(payload.meta?.total ?? payload.total ?? data.length);
    const safeLimit = Number(payload.meta?.limit ?? limit) || limit;
    const safePage = Number(payload.meta?.page ?? page) || page;
    const totalPages = Number(
        payload.meta?.totalPages ?? Math.max(1, Math.ceil(total / safeLimit)),
    );

    return {
        success: payload.success,
        message: payload.message,
        data,
        total,
        meta: {
            total,
            page: safePage,
            limit: safeLimit,
            totalPages,
        },
    };
};

/* =========================
   My Sell Posts
========================= */

export const fetchMySellPosts = async (params: FetchMySellPostsParamsDto) => {
    const response = await serviceClient.get<NormalizableListResponse<SellPostDto>>(
        "/sell-posts/my-posts",
        {
            params: {
                page: params.page,
                limit: params.limit,
                tab: params.tab,
            },
        },
    );

    console.log("fetchMySellPosts response:", response.data);

    return normalizeListResponse<SellPostDto>(
        response.data,
        params.page,
        params.limit,
    ) satisfies SellPostListResponseDto;
};

export const fetchMyActiveSellPosts = async (params: {
    page: number;
    limit: number;
}) => {
    const response = await serviceClient.get<NormalizableListResponse<SellPostDto>>(
        "/sell-posts/my-posts",
        {
            params: {
                page: params.page,
                limit: params.limit,
                tab: "ACTIVE",
            },
        },
    );

    console.log("fetchMyActiveSellPosts response:", response.data);

    return normalizeListResponse<SellPostDto>(
        response.data,
        params.page,
        params.limit,
    ) satisfies SellPostListResponseDto;
};

export const fetchMySellPostDetails = async (postId: string) => {
    const response = await serviceClient.get<SellPostDetailsResponseDto>(
        `/sell-posts/${postId}`,
    );

    console.log("fetchMySellPostDetails response:", response.data);

    return response.data;
};

export const updateMySellPost = async (
    postId: string,
    payload: UpdateSellPostPayloadDto,
) => {
    const response = await serviceClient.patch<DraftEntityResponseDto>(
        `/sell-posts/${postId}`,
        payload,
    );

    console.log("updateMySellPost response:", response.data);

    return response.data;
};

export const deleteMySellPost = async (postId: string) => {
    const response = await serviceClient.delete(`/sell-posts/${postId}`);

    console.log("deleteMySellPost response:", response.data);

    return response.data;
};

/* =========================
   My Buy / Wanted Posts
========================= */

export const fetchMyBuyPosts = async (params: FetchMyBuyPostsParamsDto) => {
    const response = await serviceClient.get<NormalizableListResponse<BuyPostDto>>(
        "/buy-posts/my-posts",
        {
            params: {
                page: params.page,
                limit: params.limit,
                tab: params.tab,
            },
        },
    );

    console.log("fetchMyBuyPosts response:", response.data);

    return normalizeListResponse<BuyPostDto>(
        response.data,
        params.page,
        params.limit,
    ) satisfies BuyPostListResponseDto;
};

export const fetchMyBuyPostDetails = async (postId: string) => {
    const response = await serviceClient.get<BuyPostDetailsResponseDto>(
        `/buy-posts/my-posts/${postId}`,
    );

    console.log("fetchMyBuyPostDetails response:", response.data);

    return response.data;
};

/* =========================
   My Offered Posts
========================= */

export const fetchMyOfferedPosts = async (
    params: FetchMyOfferedPostsParamsDto,
) => {
    const response = await serviceClient.get<NormalizableListResponse<OfferedPostDto>>(
        "/buy-posts/offer-posts/my-posts/offered",
        {
            params: {
                page: params.page,
                limit: params.limit,
                filter: params.filter ?? "ALL",
            },
        },
    );

    console.log("fetchMyOfferedPosts response:", response.data);

    return normalizeListResponse<OfferedPostDto>(
        response.data,
        params.page,
        params.limit,
    ) satisfies OfferedPostListResponseDto;
};

export const fetchMyOfferedPostDetails = async (offerId: string) => {
    const response = await serviceClient.get<OfferedPostDetailsResponseDto>(
        `/buy-posts/my-posts/${offerId}`,
    );

    console.log("fetchMyOfferedPostDetails response:", response.data);

    return response.data;
};

/* =========================
   Sell Post Quote / Admin Quotation
========================= */

export const fetchQuotePaymentSummary = async (postId: string) => {
    const response = await serviceClient.get<QuotePaymentSummaryResponseDto>(
        `/sell-posts/${postId}/quote-payment-summary`,
    );

    console.log("fetchQuotePaymentSummary response:", response.data);

    return response.data;
};

export const requoteSellPost = async (
    postId: string,
    payload: RequoteSellPostPayloadDto,
) => {
    const response = await serviceClient.post<DraftEntityResponseDto>(
        `/sell-posts/${postId}/requote`,
        payload,
    );

    console.log("requoteSellPost response:", response.data);

    return response.data;
};

export const acceptQuotedPrice = async (
    postId: string,
    payload: AcceptQuotedPricePayloadDto,
) => {
    const response = await serviceClient.post<DraftEntityResponseDto>(
        `/sell-posts/${postId}/accept-quote`,
        payload,
    );

    console.log("acceptQuotedPrice response:", response.data);

    return response.data;
};

/* =========================
   Sell Post Appointment
========================= */

export const requestMySellPostAppointment = async (
    payload: RequestSellPostAppointmentPayloadDto,
) => {
    const response = await serviceClient.post(
        "/sell-posts/appointments/request",
        payload,
    );

    console.log("requestMySellPostAppointment response:", response.data);

    return response.data;
};

/* =========================
   SSLCommerz Quote Payment
========================= */

export const createQuotePaymentSession = async (postId: string) => {
    const response = await serviceClient.post<SslCommerzSessionResponseDto>(
        `/sell-posts/${postId}/quote-payment/session`,
    );

    console.log("createQuotePaymentSession response:", response.data);

    return response.data;
};

export const validateQuotePaymentSession = async (postId: string) => {
    const response =
        await serviceClient.get<PaymentSessionValidationResponseDto>(
            `/sell-posts/${postId}/quote-payment/session`,
        );

    console.log("validateQuotePaymentSession response:", response.data);

    return response.data;
};