import { z } from "zod";

export const BUFFER_DAY_FEE_INR = 2000;

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{8,16}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  date: z.string().min(1, "Choose a preferred date"),
  days: z.string().trim().min(1, "How many days?").max(30),
  group: z.coerce.number().int().min(1, "At least 1 traveller").max(60),
  budgetType: z.enum(["per-person", "total"]),
  budget: z.coerce.number().min(1, "Enter an approximate budget").max(10_000_000),
  notes: z.string().trim().max(800).optional().default(""),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}-${m}-${y}` : iso;
}

export function buildQuoteMessage(tour: string, q: QuoteInput) {
  const budgetLine =
    q.budgetType === "per-person"
      ? `${inr(q.budget)} per person (approx. ${inr(q.budget * q.group)} for the group)`
      : `${inr(q.budget)} total for the group`;
  const lines = [
    `Hello Altitude Climber,`,
    ``,
    `I'd like a quote for the *${tour}* for ${q.group} ${q.group === 1 ? "traveller" : "travellers"}.`,
    ``,
    `Name: ${q.name}`,
    `Phone: ${q.phone}`,
    `Email: ${q.email}`,
    `Preferred date: ${formatDate(q.date)}`,
    `Trip length: ${q.days}`,
    `Group size: ${q.group}`,
    `Budget: ${budgetLine}`,
  ];
  if (q.notes) lines.push(`Special requirements: ${q.notes}`);
  lines.push(``, `Looking forward to hearing from you.`);
  return lines.join("\n");
}

/** True when an ISO yyyy-mm-dd date falls before the given day (default today, local time). */
export function isBeforeToday(iso: string, today = new Date()) {
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return true;
  return new Date(y, m - 1, d) < t;
}
