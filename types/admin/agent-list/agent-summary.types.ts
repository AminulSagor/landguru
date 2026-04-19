export interface AgentSummaryData {
  totalAgents: number;
  activeAgents: number;
}

export interface AgentSummaryResponse {
  success: boolean;
  data: AgentSummaryData;
}