import { z } from "zod";

export const leadSchema = z.object({
  locale: z.enum(["es", "en"]),
  name: z.string().min(2).max(120),
  company: z.string().max(120).optional().or(z.literal("")),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  service_interest: z.string().max(120).optional().or(z.literal("")),
  budget_range: z.string().max(80).optional().or(z.literal("")),
  timeline: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
  source: z.string().max(80).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
