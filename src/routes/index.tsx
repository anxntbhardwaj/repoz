import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";
import { BRAND } from "@/lib/brand";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import shrikhand from "@/assets/shrikhand.jpg";
import { TOURS, type Tour } from "@/lib/tours";
import { ContactSection, GallerySection, Journeys } from "@/components/site/sections";
import { TourDialog } from "@/components/site/TourDialog";
import { Hero } from "@/components/site/Hero";
import { DestinationStrip } from "@/components/site/DestinationStrip";
import { AboutUs } from "@/components/site/AboutUs";
import { Reviews } from "@/components/site/Reviews";
import { Planner } from "@/components/site/Planner";
import { Button } from "@/components/ui/button";
import { Reveal, Tilt } from "@/components/site/motion";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Altitude Climber — Himalayan Treks & Tours | Kullu, Himachal" },
      {
        name: "description",
        content:
          "Shrikhand Mahadev and Kinner Kailash treks, Spiti and Himachal tours led by certified guides. Hidden trails, bigger stories.",
      },
      { property: "og:title", content: "Altitude Climber — Hidden Trails, Bigger Stories" },
      {
        property: "og:description",
        content: "Certified Himalayan trek & tour operator from Kullu, Himachal Pradesh.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:site_name", content: "Altitude Climber" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "TravelAgency",
              "@id": `${SITE_URL}/#org`,
              name: "Altitude Climber",
              url: `${SITE_URL}/`,
              slogan: "Hidden Trails, Bigger Stories",
              telephone: BRAND.phonePrimary,
              email: BRAND.email,
              areaServed: ["Himachal Pradesh", "Spiti Valley", "Kinnaur", "Ladakh"],
              founder: { "@type": "Person", name: BRAND.owner },
              logo: `${SITE_URL}/favicon.png`,
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Village Kalont, P.O. Jaon, Tehsil Nirmand",
                addressLocality: "Kullu",
                postalCode: "172002",
                addressRegion: "Himachal Pradesh",
                addressCountry: "IN",
              },
              sameAs: [BRAND.instagram, BRAND.facebook].filter(Boolean),
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#site`,
              name: "Altitude Climber",
              url: `${SITE_URL}/`,
              publisher: { "@id": `${SITE_URL}/#org` },
            },
            ...[
              ["Treks & Tours", "/tours"],
              ["About Us", "/about"],
              ["Gallery", "/gallery"],
              ["Reviews", "/reviews"],
              ["Contact Us", "/contact"],
            ].map(([name, path]) => ({
              "@type": "SiteNavigationElement",
              name,
              url: `${SITE_URL}${path}`,
            })),
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const PLACES = [
  "Shrikhand Mahadev",
  "Kinnar Kailash",
  "Yulla Kanda",
  "Spiti Valley",
  "Chandratal",
  "Kullu",
  "Manali",
  "Shimla",
  "Key Monastery",
  "Bhimdwari",
  "Parvati Kund",
  "Jaon",
];

function Index() {
  const [open, setOpen] = useState<Tour | null>(null);

  return (
    <>
      <Hero />

      <DestinationStrip places={PLACES} />

      {/* Signature */}
      <section
        id="signature"
        className="scroll-mt-24 mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24"
      >
        <Reveal>
          <p className="eyebrow">Altitude Climber · Signature yatras</p>
          <h2 className="mt-3 font-display text-5xl md:text-7xl">
            Two summits,
            <br />
            <em className="text-primary">one lifetime.</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TOURS.slice(0, 2).map((t, i) => (
            <Reveal key={t.id} delay={i * 180} className={i === 1 ? "md:mt-16" : ""}>
              <Button
                variant="ghost"
                onClick={() => setOpen(t)}
                className="group block h-auto w-full whitespace-normal rounded-none p-0 text-left hover:bg-transparent"
              >
                <Tilt className="overflow-hidden rounded-lg">
                  <img
                    src={t.image}
                    alt={t.title}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="ken aspect-[4/5] w-full object-cover"
                  />
                  <div className="image-scrim absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-on-image md:p-8">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] opacity-80">
                        {t.duration} · {t.altitude}
                      </p>
                      <h3 className="mt-2 font-display text-3xl md:text-4xl">{t.title}</h3>
                    </div>
                    <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </Tilt>
                <p className="mt-5 max-w-lg text-sm text-muted-foreground">{t.summary}</p>
              </Button>
            </Reveal>
          ))}
        </div>
      </section>

      <Journeys onOpen={setOpen} />

      <Planner onOpen={setOpen} />

      <AboutUs />

      <GallerySection />

      <Reviews />

      <ContactSection />

      <TourDialog tour={open} onClose={() => setOpen(null)} />
    </>
  );
}
