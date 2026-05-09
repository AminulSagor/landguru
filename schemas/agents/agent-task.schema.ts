import { z } from "zod";

export const workLogItemSchema = z.object({
  title: z.string().optional(),
  fileUrls: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
});

export const rawDocumentsSchema = z.object({
  deedFiles: z.array(z.string()).optional(),
  khatianFiles: z.array(z.string()).optional(),
  otherFiles: z.array(z.string()).optional(),
});

export const propertySchema = z.object({
  propertyType: z.string().optional(),
  totalPlotSize: z.number().optional(),
  sellableAmount: z.number().optional(),
  sellableUnit: z.string().optional(),
  roadDistanceMin: z.number().optional(),
  roadDistanceMax: z.number().optional(),
  locationText: z.string().optional(),
});

export const agentTaskDetailsSchema = z.object({
  assignmentId: z.string(),
  status: z.string().optional(),
  task: z
    .object({
      serviceKey: z.string().optional(),
      serviceName: z.string().optional(),
      postedAt: z.string().optional(),
      acceptBefore: z.string().optional(),
    })
    .optional(),
  client: z
    .object({
      name: z.string().optional(),
      photoUrl: z.string().optional(),
      verificationStatus: z.string().optional(),
    })
    .optional(),
  property: propertySchema.optional(),
  photos: z.array(z.string()).optional(),
  rawDocuments: rawDocumentsSchema.optional(),
  taskStatus: z.string().optional(),
  appointment: z
    .object({
      isAppointmentScheduled: z.boolean().optional(),
      appointmentTitle: z.string().optional(),
      appointmentDate: z.string().optional(),
      appointmentStatus: z.string().optional(),
      canReschedule: z.boolean().optional(),
    })
    .optional(),
  workLog: z
    .object({
      data: z.array(workLogItemSchema).optional(),
      meta: z.any().optional(),
    })
    .optional(),
  serviceFee: z.number().optional(),
});

export type AgentTaskDetails = z.infer<typeof agentTaskDetailsSchema>;
export type WorkLogItem = z.infer<typeof workLogItemSchema>;
