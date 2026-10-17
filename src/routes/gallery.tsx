import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageIntro } from "@/components/site/sections";
import { GallerySection } from "@/components/site/sections";

export const Route = createFileRoute("/gallery")({
  staticData: { sitemap: true },
  head: () =>
    pageHead(
      "/gallery",
      "Gallery — Himalayan Trek Photos | Altitude Climber",
      "Photos from Shrikhand Mahadev, Kinnar Kailash, Spiti and our camps across Himachal Pradesh.",
      "Gallery",
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro crumb="Gallery" title="Gallery">
        Photos from Shrikhand Mahadev, Kinnar Kailash, Spiti and our camps across Himachal Pradesh.
      </PageIntro>
      <GallerySection />
    </>
  );
}
