import { z } from "zod";

export const agentTaskItemSchema = z.object({
  assignmentId: z.string(),
  serviceName: z.string().optional(),
  createdAt: z.string().optional(),
  clientName: z.string().optional(),
  clientPhoto: z.string().optional(),
  location: z.string().optional(),
  acceptDeadline: z.string().optional(),
  assignedAt: z.string().optional(),
});

export const agentTasksResponseSchema = z.object({
  data: z.array(agentTaskItemSchema),
  meta: z
    .object({
      total: z.number().optional(),
      page: z.number().optional(),
      limit: z.number().optional(),
      totalPages: z.number().optional(),
    })
    .optional(),
});

export const todayScheduleItemSchema = z.object({
  assignmentId: z.string().optional(),
  time: z.string().optional(),
  title: z.string().optional(),
  serviceId: z.string().optional(),
  sellPostId: z.string().optional(),
  clientName: z.string().optional(),
  clientPhoto: z.string().optional(),
  location: z.string().optional(),
});

export const todayScheduleSchema = z.object({
  success: z.boolean().optional(),
  data: z.array(todayScheduleItemSchema),
});

export const assignedLocationSchema = z.object({
  success: z.boolean().optional(),
  data: z.object({
    assignedLocation: z.string().optional(),
  }),
});

export const statsSchema = z.object({
  success: z.boolean().optional(),
  data: z.object({
    summary: z
      .object({
        newRequests: z.number().optional(),
        activeJobs: z.number().optional(),
        doneThisMonth: z.number().optional(),
        currentMonthName: z.string().optional(),
      })
      .optional(),
  }),
});

export type AgentTaskItem = z.infer<typeof agentTaskItemSchema>;
export type TodayScheduleItem = z.infer<typeof todayScheduleItemSchema>;
