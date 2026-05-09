import { serviceClient } from "@/service/base/axios.client";
import {
  RequestItem,
  ScheduleItem,
  StatItem,
} from "@/app/(dashboard)/agent/dummy-data/moc-agent-home";
import {
  agentTasksResponseSchema,
  todayScheduleSchema,
  assignedLocationSchema,
  statsSchema,
} from "@/schemas/agents/agent-dashboard.schema";

export type AgentTasksMeta = {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
};

export const agentDashboardService = {
  async getAgentTasks(tab = "NEW", limit = 5): Promise<{ items: RequestItem[]; meta: AgentTasksMeta | null }>{
    const res = await serviceClient.get("/agents/agent-task", { params: { tab, limit } });
    const payload = res.data;

    const parsed = agentTasksResponseSchema.safeParse(payload);
    const rawItems = parsed.success ? parsed.data.data : payload?.data ?? [];
    const meta = parsed.success ? parsed.data.meta ?? null : payload?.meta ?? null;

    const items: RequestItem[] = rawItems.map((it: any) => ({
      id: it.assignmentId ?? "",
      badge: tab === "NEW" ? "NEW REQUEST" : "REQUEST",
      title: it.serviceName ?? "",
      code: it.assignmentId ? `#${String(it.assignmentId).slice(0, 8)}` : "",
      assignedAgo: it.assignedAt ?? it.createdAt ?? "",
      address: it.location ?? "",
      acceptBefore: it.acceptDeadline ? `Accept Before: ${it.acceptDeadline}` : "",
    }));

    return { items, meta };
  },

  async getTodaySchedule(): Promise<ScheduleItem[]> {
    const res = await serviceClient.get("/agents/dashboard/today-schedule");
    const payload = res.data;
    const parsed = todayScheduleSchema.safeParse(payload);
    const raw = parsed.success ? parsed.data.data : payload?.data ?? [];

    const items: ScheduleItem[] = raw.map((it: any) => ({
      time: it.time ?? "",
      title: it.title ?? "",
      code: it.sellPostId ? `#${String(it.sellPostId)}` : it.serviceId ? `#${String(it.serviceId)}` : "",
      client: it.clientName ?? "",
      address: it.location ?? "",
      assignmentId: it.assignmentId ?? undefined,
      clientPhoto: it.clientPhoto ?? undefined,
    }));

    const parseTimeToMinutes = (t?: string) => {
      if (!t) return 0;
      // expect formats like "10:00 AM" or "4:30 PM"
      const parts = t.trim().split(" ");
      if (parts.length === 0) return 0;
      const timePart = parts[0];
      const ampm = parts[1]?.toUpperCase?.() ?? "";
      const [hhStr, mmStr] = timePart.split(":");
      let hh = Number.parseInt(hhStr || "0", 10) || 0;
      const mm = Number.parseInt(mmStr || "0", 10) || 0;
      if (ampm === "PM" && hh !== 12) hh += 12;
      if (ampm === "AM" && hh === 12) hh = 0;
      return hh * 60 + mm;
    };

    items.sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));

    return items;
  },

  async getAssignedLocation(): Promise<string> {
    const res = await serviceClient.get("/agents/assigned-location");
    const payload = res.data;
    const parsed = assignedLocationSchema.safeParse(payload);
    if (parsed.success) return parsed.data.data.assignedLocation ?? "";
    return payload?.data?.assignedLocation ?? "";
  },

  async getStats(): Promise<StatItem[]> {
    const res = await serviceClient.get("/agents/stats");
    const payload = res.data;
    const parsed = statsSchema.safeParse(payload);
    const summary = parsed.success ? parsed.data.data.summary ?? {} : payload?.data?.summary ?? {};

    const stats: StatItem[] = [
      { type: "new", title: "NEW", value: summary.newRequests ?? 0, subtitle: "Requests" },
      { type: "active", title: "ACTIVE", value: summary.activeJobs ?? 0, subtitle: "Jobs" },
      { type: "done", title: "DONE", value: summary.doneThisMonth ?? 0, subtitle: `In ${summary.currentMonthName ?? ""}` },
    ];

    return stats;
  },
};

export default agentDashboardService;
