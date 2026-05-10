import { z } from "zod";

export const agentLoginSchema = z.object({
  phone: z.string().min(8, { message: "Phone is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type AgentLoginInput = z.infer<typeof agentLoginSchema>;
