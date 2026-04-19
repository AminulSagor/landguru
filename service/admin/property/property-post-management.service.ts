import { serviceClient } from "@/service/base/axios.client";
import type {
  PropertyPostItem,
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
  ): Promise<PropertyPostItem> {
    const response = await serviceClient.put<PropertyPostItem>(
      `/property-services/mgt/${postId}/reorganize-documents`,
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
};
