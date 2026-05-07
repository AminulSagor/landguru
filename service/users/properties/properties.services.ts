import { serviceClient } from "@/service/base/axios.client";
import { SellPostListingResponse } from "@/types/property/property.listing";
import { PropertyDetails } from "@/types/property/property.details";
import type {
    BuyPostListItem,
    CreateOfferDraftStep1Request,
    DraftEntityResponse,
    MakeOfferFromExistingRequest,
    MyPostResponseDto,
    MyOfferListItem,
    PaginatedResponse,
    PaginationParams,
    PresignUploadRequest,
    PresignUploadResponse,
    UpdateOfferDraftStep2Request,
} from "@/types/post/buy/wanted-needs.types";

// type SellPostListingResponse = {
//   posts: PropertyListing[];
//   total: number;
// };

export const fetchSellPostListings = async (params: {
    page: number;
    limit: number;
}) => {
    const response = await serviceClient.get<SellPostListingResponse>(
        "/sell-posts/all",
        {
            params: {
                page: params.page,
                limit: params.limit,
            },
        },
    );
    return response.data;
};

export const fetchSellPostDetails = async (postId: string) => {
    const response = await serviceClient.get<PropertyDetails>(
        `/sell-posts/${postId}`,
    );
    console.log("Fetched property details:", response.data);
    return response.data;
};

type AppointmentRequestPayload = {
    sellPostId: string;
    buyerName: string;
    buyerPhone: string;
    buyerAddress: string;
};

export const requestSellPostAppointment = async (
    payload: AppointmentRequestPayload,
) => {
    const response = await serviceClient.post(
        "/sell-posts/appointments/request",
        payload,
    );
    return response.data;
};

export const fetchWantedPosts = async (params: PaginationParams) => {
    const response = await serviceClient.get<PaginatedResponse<BuyPostListItem>>(
        "/buy-posts/all",
        {
            params: {
                page: params.page,
                limit: params.limit,
            },
        },
    );
    console.log("Fetched wanted posts:", response.data);
    return response.data;
};

export const fetchMyOfferPosts = async (params: PaginationParams) => {
    const response = await serviceClient.get<PaginatedResponse<MyOfferListItem>>(
        "/buy-posts/offers/my-offers",
        {
            params: {
                page: params.page,
                limit: params.limit,
            },
        },
    );
    console.log("Fetched my offer posts:", response.data);
    return response.data;
};

type MySellPostsResponse =
    | {
          posts?: MyPostResponseDto[];
          total?: number;
      }
    | PaginatedResponse<MyPostResponseDto>;

export const fetchMyActiveSellPosts = async (params: PaginationParams) => {
    const response = await serviceClient.get<MySellPostsResponse>(
        "/sell-posts/my-posts",
        {
            params: {
                page: params.page,
                limit: params.limit,
                tab: "ACTIVE",
            },
        },
    );

    const payload = response.data as MySellPostsResponse;

    if (payload && typeof payload === "object" && "posts" in payload) {
        const posts = payload.posts ?? [];
        return {
            posts,
            total: Number(payload.total ?? posts.length ?? 0),
        };
    }

    const data = (payload as PaginatedResponse<MyPostResponseDto>)?.data ?? [];
    const metaTotal = (payload as PaginatedResponse<MyPostResponseDto>)?.meta?.total;

    return {
        posts: data,
        total: Number(metaTotal ?? data.length ?? 0),
    };
};

export const makeOfferFromExisting = async (
    buyPostId: string,
    payload: MakeOfferFromExistingRequest,
) => {
    await serviceClient.post(`/buy-posts/${buyPostId}/offer/existing`, payload);
    console.log("Offer made from existing post:", payload);
};

export const createOfferDraftStep1 = async (
    buyPostId: string,
    payload: CreateOfferDraftStep1Request,
) => {
    const response = await serviceClient.post<DraftEntityResponse>(
        `/buy-posts/${buyPostId}/offer/new/draft`,
        payload,
    );

    return response.data;
};

export const updateOfferDraftStep2 = async (
    offerId: string,
    payload: UpdateOfferDraftStep2Request,
) => {
    const response = await serviceClient.patch<DraftEntityResponse>(
        `/buy-posts/offer/new/draft/${offerId}`,
        payload,
    );
    console.log("Offer draft updated with photos:", offerId, payload.photos);
    return response.data;
};

export const submitOfferDraft = async (offerId: string) => {
    await serviceClient.post(`/buy-posts/offer/new/${offerId}/submit`);
    console.log("Offer draft submitted:", offerId);
};

export const requestPresignedUpload = async (payload: PresignUploadRequest) => {
    const response = await serviceClient.post<PresignUploadResponse>(
        "/s3/presign-put",
        payload,
    );
    console.log("Received presigned upload response:", response.data);
    return response.data;
};



