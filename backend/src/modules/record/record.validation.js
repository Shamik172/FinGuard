import { z } from "zod";

export const recordSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(2),
  date: z.string(),
  note: z.string().optional(),
});