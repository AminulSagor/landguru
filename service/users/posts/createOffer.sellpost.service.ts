import { serviceClient } from "@/service/base/axios.client";
import type {
    CreateOfferDraftStep1Request,
    DraftEntityResponse,
    UpdateOfferDraftStep2Request,
} from "@/types/post/buy/wanted-needs.types";

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