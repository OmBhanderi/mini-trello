import { z } from "zod";

export const createBoardSchema = z.object({
  title: z.string().min(2),

  description: z
    .string()
    .min(5, "Description too short")
    .max(500, "Description too long")
    .optional(),
});


export type createBoardDto = z.infer<typeof createBoardSchema>