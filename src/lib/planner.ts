import { z } from "zod";

export const INTERESTS = [
  "Pilgrimage",
  "High summits",
  "Camping",
  "Culture & villages",
  "Photography",
  "Road trips",
  "Lakes & deserts",
  "Paragliding",
] as const;
export const FITNESS = ["Beginner", "Moderate", "Fit", "Experienced trekker"] as const;

export const planSchema = z.object({
  dates: z.string().trim().min(2, "When would you like to travel?").max(80),
  fitness: z.enum(FITNESS),
  budget: z.coerce.number().min(1000, "Enter a budget of at least ₹1,000").max(1_000_000),
  group: z.coerce.number().int().min(1).max(60),
  interests: z.array(z.enum(INTERESTS)).max(8),
  notes: z.string().trim().max(400).optional().default(""),
});

export type PlanInput = z.infer<typeof planSchema>;
export type PlanResult = {
  tourId: string;
  headline: string;
  why: string;
  itinerary: { day?: number | undefined; title: string; detail: string }[];
  tips: string[];
};
