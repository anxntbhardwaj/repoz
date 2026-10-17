import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageIntro } from "@/components/site/sections";
import { AboutUs } from "@/components/site/AboutUs";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () =>
    pageHead(
      "/about",
      "About Us — Certified Himalayan Guides | Altitude Climber",
      "Meet Altitude Climber, a Himachal Tourism certified trek and tour team from Kullu led by head guide Rakesh Kumar.",
      "About Us",
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro crumb="About Us" title="About us">
        Meet Altitude Climber, a Himachal Tourism certified trek and tour team from Kullu led by
        head guide Rakesh Kumar.
      </PageIntro>
      <AboutUs />
    </>
  );
}
