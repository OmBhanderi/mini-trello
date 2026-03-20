import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(2),
});


export type CreateWorkspaceDto = z.infer<typeof createWorkspaceSchema>
