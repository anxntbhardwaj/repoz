import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageIntro } from "@/components/site/sections";
import { ContactSection } from "@/components/site/sections";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => pageHead("/contact", "Contact Us — Book a Trek | Altitude Climber", "Call or WhatsApp +91 88940 97718 or email altitudeclimber.team@gmail.com to plan your Himalayan trek or tour.", "Contact Us"),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro crumb="Contact Us" title="Contact us">Call or WhatsApp +91 88940 97718 or email altitudeclimber.team@gmail.com to plan your Himalayan trek or tour.</PageIntro>
      <ContactSection />
    </>
  );
}
