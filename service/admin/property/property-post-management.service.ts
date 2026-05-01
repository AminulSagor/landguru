import { serviceClient } from "@/service/base/axios.client";
import type {
  PropertyPostItem,
  ReorganizePropertyDocumentsResponse,
  ReorganizePropertyDocumentsPayload,
  UpdateOwnershipHistoryPayload,
  UpdatePropertyStatusPayload,
  UpdateRiskChecklistPayload,
} from "@/types/admin/property-post/property.types";

export const propertyPostManagementService = {
  async updatePropertyStatus(
    postId: string,
    payload: UpdatePropertyStatusPayload,
  ): Promise<PropertyPostItem> {
    const response = await serviceClient.patch<PropertyPostItem>(
      `/property-services/mgt/${postId}/status`,
      payload,
    );

    return response.data;
  },

  async reorganizePropertyDocuments(
    postId: string,
    payload: ReorganizePropertyDocumentsPayload,
  ): Promise<ReorganizePropertyDocumentsResponse> {
    const response = await serviceClient.put<ReorganizePropertyDocumentsResponse>(
      `/property-services/mgt/${postId}/documents`,
      payload,
    );

    return response.data;
  },

  async updateOwnershipHistory(
    postId: string,
    payload: UpdateOwnershipHistoryPayload,
  ): Promise<PropertyPostItem> {
    const response = await serviceClient.put<PropertyPostItem>(
      `/property-services/mgt/${postId}/ownership-history`,
      payload,
    );

    return response.data;
  },

  async updateRiskChecklist(
    postId: string,
    payload: UpdateRiskChecklistPayload,
  ): Promise<PropertyPostItem> {
    const response = await serviceClient.put<PropertyPostItem>(
      `/property-services/mgt/${postId}/risk-checklist`,
      payload,
    );

    return response.data;
  },

  async getPotentialBuyers(postId: string) : Promise<any> {
    const response = await serviceClient.get(`/sell-posts/appointments/admin/${postId}/potential-buyers`);
    console.log(response.data);
    return response.data;
  }
};
