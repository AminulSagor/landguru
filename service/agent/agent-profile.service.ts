import { serviceClient } from "@/service/base/axios.client";

export type AgentProfile = {
  agentId?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  photoUrl?: string;
  agentType?: string;
  isVerified?: boolean;
  agentIdDisplay?: string;
  stats?: {
    totalTaskCompleted?: number;
    totalEarned?: number;
  };
  assignedLocation?: string;
  services?: string[];
  personalDetails?: {
    fullName?: string;
    phone?: string;
    email?: string;
    division?: string;
    district?: string;
    upazila?: string;
    unionOrCityCorp?: string;
    wardNo?: string;
    postalCode?: string | null;
    fullAddress?: string;
  };
  verificationDocs?: any;
  bankInfo?: {
    bankName?: string;
    bankAccountNo?: string;
    bankSwiftCode?: string;
    bankRoutingNo?: string;
  };
};

export const agentProfileService = {
  async getProfile(): Promise<AgentProfile> {
    const res = await serviceClient.get<AgentProfile>("/agents/profile");
    return res.data;
  },

  async updateProfile(body: Record<string, any>) {
    const res = await serviceClient.patch("/agents/profile", body);
    return res.data;
  },

  async updatePhoto(photoUrl: string) {
    const res = await serviceClient.patch("/agents/profile", {
      photoUrl,
    });
    return res.data;
  },
};
