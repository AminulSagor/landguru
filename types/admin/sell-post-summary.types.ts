export type AdminSellPostSummaryStats = {
  pendingReview: number;
  pendingAssignAgents: number;
  activePosts: number;
  rejectedPosts: number;
  soldPosts: number;
};

export type AdminSellPostSummaryResponse = {
  success: boolean;
  stats: AdminSellPostSummaryStats;
};