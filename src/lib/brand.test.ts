import { describe, expect, it } from "vitest";
import { BRAND, whatsappLink } from "./brand";

describe("official company contacts", () => {
  it("names Rakesh Kumar as the owner", () => {
    expect(BRAND.owner).toBe("Rakesh Kumar");
  });
  it("links to the supplied Google review page", () => {
    expect(BRAND.googleReviews).toBe("https://g.page/r/CbthFu0w1xz4EBM/review");
  });
  it("uses the official team email", () => {
    expect(BRAND.email).toBe("altitudeclimber.team@gmail.com");
  });
  it("uses only the official phone", () => {
    expect(BRAND.phonePrimary).toBe("+91 88940 97718");
    expect("phonesAlt" in BRAND).toBe(false);
  });
  it("sends WhatsApp enquiries to the official number", () => {
    expect(whatsappLink()).toBe("https://wa.me/918894097718");
  });
});
