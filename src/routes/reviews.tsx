import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageIntro } from "@/components/site/sections";
import { Reviews } from "@/components/site/Reviews";

export const Route = createFileRoute("/reviews")({
  staticData: { sitemap: true },
  head: () => pageHead("/reviews", "Reviews — 5-Star Traveller Ratings | Altitude Climber", "Read what trekkers say about Altitude Climber guides, camps, food and safety, and leave your own Google review.", "Reviews"),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro crumb="Reviews" title="Reviews">Read what trekkers say about Altitude Climber guides, camps, food and safety, and leave your own Google review.</PageIntro>
      <Reviews />
    </>
  );
}
