import { z } from "zod";

export const InteractionResponseSchema = z.object({
  id: z.number(),
  customerId: z.number(),
  customerName: z.string(),
  userId: z.number(),
  userName: z.string(),
  interactionType: z.string(),
  interactionDate: z.string(),
  summary: z.string(),
});

export type InteractionResponseFormData = z.infer<
  typeof InteractionResponseSchema
>;

export const CreateInteractionReqSchema = z.object({
  customerId: z.number(),
  userId: z.number(),
  interactionType: z.string(),
  interactionDate: z.string(),
  summary: z.string(),
});

export type CreateInteractionReqFormData = z.infer<
  typeof CreateInteractionReqSchema
>;
