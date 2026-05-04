import { serviceClient } from "@/service/base/axios.client";
import { SellPostListingResponse } from "@/types/property/property.listing";
import { PropertyDetails } from "@/types/property/property.details";

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
    //console.log("Fetched property details:", response.data);
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

