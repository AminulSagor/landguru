import { z } from "zod";

export const addWorkLogSchema = z
  .object({
    remark: z.string().max(2000).optional(),
    fileUrls: z.array(z.string().url()).optional(),
  })
  .refine(
    (val) => (val.remark && val.remark.trim().length > 0) || (val.fileUrls && val.fileUrls.length > 0),
    {
      message: "Provide a remark or at least one file URL",
      path: ["remark", "fileUrls"],
    },
  );

export type AddWorkLog = z.infer<typeof addWorkLogSchema>;
