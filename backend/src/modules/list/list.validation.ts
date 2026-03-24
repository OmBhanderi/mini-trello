import { z } from "zod";

export const createListSchema = z.object({
  title: z.string().min(2).max(150),
});

export const updateListOrderSchema = z.object({
    id : z.string(),
    prevId : z.string().nullable(),
    nextId : z.string().nullable(),
})

export type createListDto = z.infer<typeof createListSchema>
export type updateListOrderDto = z.infer<typeof updateListOrderSchema>