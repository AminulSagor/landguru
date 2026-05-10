import type { createBuyPostDraftPayload } from "@/types/post/buy/buypost.payload.types";
import type {
	BuyPostDetailsResponse,
	BuyPostDraftResponse,
} from "@/types/post/buy/buypost.response.types";
import { serviceClient } from "@/service/base/axios.client";

export const createBuyPostDraft = async (
	payload: createBuyPostDraftPayload,
): Promise<BuyPostDraftResponse> => {
	const response = await serviceClient.post<BuyPostDraftResponse>(
		"/buy-posts/draft",
		payload,
	);
	console.log("Create Buy Post Draft Response:", response.data);
	return response.data;
};

export const updateBuyPostDraft = async (params: {
	postId: string;
	payload: createBuyPostDraftPayload;
}): Promise<BuyPostDraftResponse> => {
	const response = await serviceClient.patch<BuyPostDraftResponse>(
		`/buy-posts/${params.postId}`,
		params.payload,
	);
	console.log("Update Buy Post Draft Response:", response.data);
	return response.data;
};

export const getBuyPostDraftDetails = async (
	postId: string,
): Promise<BuyPostDetailsResponse> => {
	const response = await serviceClient.get<BuyPostDetailsResponse>(
		`/buy-posts/${postId}`,
	);
	console.log("Get Buy Post Draft Details Response:", response.data);
	return response.data;
};

export const submitBuyPostDraft = async (postId: string): Promise<void> => {
	await serviceClient.post(`/buy-posts/${postId}/submit`);
	console.log("Submit Buy Post Draft Response:", postId);
};
