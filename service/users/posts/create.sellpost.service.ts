import type {
    createSellPostStepOnePayload,
    createSellPostStepTwoPayload,
    createSellPostStepThreePayload,
} from "@/types/post/sell/sellpost.payload.types";
import type {
    createSellpostStepOneResponse,
    createSellpostStepTwoResponse,
    createSellpostStepThreeResponse,
    submitForReviewResponse,
} from "@/types/post/sell/sellpost.response.types";
import { serviceClient } from "../../base/axios.client";

export const createSellPostStepOne = async (
    payload: createSellPostStepOnePayload,
): Promise<createSellpostStepOneResponse> => {
    const response = await serviceClient.post<createSellpostStepOneResponse>(
        "/sell-posts/draft",
        payload,
    );
    console.log("Create Sell Post Step One Response:", response.data);
    return response.data;
};

export const updateSellPostStepOne = async (params: {
    postId: string;
    payload: createSellPostStepOnePayload;
}): Promise<createSellpostStepOneResponse> => {
    const response = await serviceClient.patch<createSellpostStepOneResponse>(
        `/sell-posts/draft/${params.postId}`,
        params.payload,
        {
            params: { step: 1 },
        },
    );
    console.log("Update Sell Post Step One Response:", response.data);
    return response.data;
};

export const updateSellPostStepTwo = async (params: {
    postId: string;
    payload: createSellPostStepTwoPayload;
}): Promise<createSellpostStepTwoResponse> => {
    const response = await serviceClient.patch<createSellpostStepTwoResponse>(
        `/sell-posts/draft/${params.postId}`,
        params.payload,
        {
            params: { step: 2 },
        },
    );
    console.log("Update Sell Post Step Two Response:", response.data);
    return response.data;
};

export const updateSellPostStepThree = async (params: {
    postId: string;
    payload: createSellPostStepThreePayload;
}): Promise<createSellpostStepThreeResponse> => {
    const response = await serviceClient.patch<createSellpostStepThreeResponse>(
        `/sell-posts/draft/${params.postId}`,
        params.payload,
        {
            params: { step: 3 },
        },
    );
    console.log("Update Sell Post Step Three Response:", response.data);
    return response.data;
};

export const submitForReview = async (postId: string): Promise<submitForReviewResponse> => {
    const response = await serviceClient.post<submitForReviewResponse>(
        `/sell-posts/${postId}/submit`
    );
    console.log("Submit For Review Response:", response.data);
    return response.data;
};