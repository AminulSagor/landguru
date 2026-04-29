import { serviceServer } from "@/service/base/axios.server";

export type AdminDetailsDto = {
  id: string;
  fullName?: string;
  name?: string;
  email?: string | null;
  phone?: string | null;
  photoUrl?: string | null;
  role?: string;
  isVerified?: boolean;
  isActive?: boolean;
  assignedLocation?: string | null;
  workforceSupervision?: {
    totalAgents?: number;
    activeAgents?: number;
    inactiveAgents?: number;
  };
  createdAt?: string;
};

export type AgentDto = {
  id: string;
  name?: string;
  email?: string | null;
  phone?: string | null;
  role?: string | null;
  image?: string | null;
  status?: string | null;
  currentActiveJobs?: number;
  tasksCompleted?: number;
  earnings?: number | string | null;
};

export type DashboardSummaryDto = {
  inventory?: { totalSold?: number; activeLive?: number };
  transactionVolume?: { totalSalesVolume?: number; totalVolume?: number; totalBuysVolume?: number };
  serviceStatus?: { avgTurnaroundHours?: string; serviceProvided?: number; ongoingService?: number };
  revenue?: { feesCollection?: number; comparisonRating?: number };
};

export type LeaderDto = {
  id: string;
  name?: string;
  photoUrl?: string | null;
  propertiesSold?: number;
  totalVolume?: number;
  properties?: number;
  spent?: number;
};

export type RecentActivityDto = {
  id: string;
  title?: string;
  message?: string;
  type?: string;
  isRead?: boolean;
  createdAt?: string;
};

export const adminDetailsService = {
  async getAdminDetailsServer(adminId: string): Promise<AdminDetailsDto | null> {
    const response = await serviceServer.get(`/admin/${adminId}/details`);
    return response.data?.data ?? null;
  },

  async getAdminAgentsServer(
    adminId: string,
    page = 1,
    limit = 10,
    role?: string,
    search?: string,
  ): Promise<{ rows: AgentDto[]; meta?: any }> {
    const resp = await serviceServer.get(`/admin/${adminId}/agents`, {
      params: { page, limit, role, search },
    });
    const rows: AgentDto[] = resp.data?.data ?? [];
    const meta = resp.data?.meta;
    return { rows, meta };
  },

  async getDashboardSummaryServer(adminId: string): Promise<DashboardSummaryDto | null> {
    const resp = await serviceServer.get(`/admin/${adminId}/dashboard-summary`);
    return resp.data?.data ?? null;
  },

  async getTopSellersServer(adminId: string, page = 1, limit = 10): Promise<LeaderDto[]> {
    const resp = await serviceServer.get(`/admin/${adminId}/top-sellers`, {
      params: { page, limit },
    });
    return resp.data?.data ?? [];
  },

  async getTopBuyersServer(adminId: string, page = 1, limit = 10): Promise<LeaderDto[]> {
    const resp = await serviceServer.get(`/admin/${adminId}/top-buyers`, {
      params: { page, limit },
    });
    return resp.data?.data ?? [];
  },

  async getRecentActivityServer(adminId: string, page = 1, limit = 10): Promise<RecentActivityDto[]> {
    const resp = await serviceServer.get(`/admin/${adminId}/recent-activity`, {
      params: { page, limit },
    });
    return resp.data?.data ?? [];
  },
};
