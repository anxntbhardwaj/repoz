import { describe, expect, it } from "vitest";
import { buildQuoteMessage, quoteSchema } from "./quote";

const base = {
  name: "Riya",
  phone: "+91 98765 43210",
  email: "riya@example.com",
  date: "2026-07-14",
  days: "7 Days",
  group: "4",
  budgetType: "per-person",
  budget: "20000",
};

describe("quote message", () => {
  it("names the tour and group size", () => {
    const q = quoteSchema.parse(base);
    expect(buildQuoteMessage("Kinner Kailash Trek", q)).toContain(
      "quote for the *Kinner Kailash Trek* for 4 travellers",
    );
  });

  it("multiplies a per-person budget across the group", () => {
    const q = quoteSchema.parse(base);
    expect(buildQuoteMessage("X", q)).toContain("₹20,000 per person (approx. ₹80,000 for the group)");
  });

  it("formats the date as dd-mm-yyyy", () => {
    const q = quoteSchema.parse(base);
    expect(buildQuoteMessage("X", q)).toContain("Preferred date: 14-07-2026");
  });

  it("rejects a missing email", () => {
    expect(quoteSchema.safeParse({ ...base, email: "" }).success).toBe(false);
  });
});

import { isBeforeToday } from "./quote";
describe("preferred date", () => {
  const today = new Date(2026, 9, 17);
  it("rejects dates before today", () => { expect(isBeforeToday("2026-10-16", today)).toBe(true); });
  it("allows today", () => { expect(isBeforeToday("2026-10-17", today)).toBe(false); });
});
