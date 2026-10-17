import { expect, it } from "vitest";
import { SOCIAL_INTERVAL_MS, socialPromptIndex } from "./social-prompts";
it("shows the next follow prompt every 30 seconds", () => {
  expect(SOCIAL_INTERVAL_MS).toBe(30000);
});
it("alternates Instagram and Facebook", () => {
  expect([0, 1, 2, 3].map(socialPromptIndex)).toEqual([0, 1, 0, 1]);
});
