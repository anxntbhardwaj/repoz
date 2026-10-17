import { createFileRoute, Link } from "@tanstack/react-router";
import { TOURS } from "@/lib/tours";
import { useState } from "react";
import type { Tour } from "@/lib/tours";
import { pageHead } from "@/lib/seo";
import { Journeys, PageIntro } from "@/components/site/sections";
import { TourDialog } from "@/components/site/TourDialog";

export const Route = createFileRoute("/tours/")({
  staticData: { sitemap: true },
  head: () => pageHead("/tours", "Treks & Tours in Himachal — Altitude Climber", "Shrikhand Mahadev, Kinnar Kailash and Yulla Kanda treks plus Shimla, Manali, Spiti and Kinnaur tours led by certified Kullu guides.", "Treks & Tours"),
  component: ToursPage,
});

function ToursPage() {
  const [open, setOpen] = useState<Tour | null>(null);
  return (
    <>
      <PageIntro crumb="Treks & Tours" title="Treks & tours">Himalayan pilgrim treks and Himachal road journeys, each with its full route, inclusions and a quote form.</PageIntro>
      <div className="mt-12"><Journeys onOpen={setOpen} /></div>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8" aria-labelledby="trip-pages">
        <h2 id="trip-pages" className="font-display text-3xl">Full trip pages</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOURS.map((t) => <li key={t.id}><Link to="/tours/$id" params={{ id: t.id }} className="interaction-control flex justify-between border-b hairline py-3 text-sm hover:text-primary">{t.title}<span className="text-muted-foreground">{t.duration.replace(" · suggested", "")}</span></Link></li>)}
        </ul>
      </section>
      <TourDialog tour={open} onClose={() => setOpen(null)} />
    </>
  );
}
