import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ChevronRight, Minus } from "lucide-react";
import { TOURS } from "@/lib/tours";
import { SITE_URL, pageHead } from "@/lib/seo";
import { BRAND } from "@/lib/brand";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Reveal } from "@/components/site/motion";

export const Route = createFileRoute("/tours/$id")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const tour = TOURS.find((t) => t.id === params.id);
    if (!tour) throw notFound();
    return { id: tour.id };
  },
  head: ({ params }) => {
    const tour = TOURS.find((t) => t.id === params.id);
    if (!tour) return { meta: [{ title: "Trip not found — Altitude Climber" }, { name: "robots", content: "noindex" }] };
    const path = `/tours/${tour.id}`;
    const base = pageHead(path, `${tour.title} — ${tour.duration.replace(" · suggested", "")} | Altitude Climber`, tour.summary.slice(0, 158), tour.title);
    const trip = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: tour.title,
      description: tour.summary,
      url: `${SITE_URL}${path}`,
      touristType: tour.region === "Expeditions" ? "Trekkers and pilgrims" : "Travellers",
      provider: { "@type": "TravelAgency", name: BRAND.name, url: `${SITE_URL}/`, telephone: BRAND.phonePrimary },
      itinerary: { "@type": "ItemList", itemListElement: tour.stops.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, description: s.detail })) },
    };
    const crumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Treks & Tours", item: `${SITE_URL}/tours` },
        { "@type": "ListItem", position: 3, name: tour.title, item: `${SITE_URL}${path}` },
      ],
    };
    return { ...base, meta: [...base.meta, { property: "og:type", content: "article" }], scripts: [{ type: "application/ld+json", children: JSON.stringify(crumbs) }, { type: "application/ld+json", children: JSON.stringify(trip) }] };
  },
  component: TourPage,
});

function List({ title, items, icon = "check" }: { title: string; items?: string[] | undefined; icon?: "check" | "minus" }) {
  if (!items?.length) return null;
  const Icon = icon === "check" ? Check : Minus;
  return (
    <Reveal as="section" className="border-t hairline py-10">
      <h2 className="font-display text-3xl">{title}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((i) => <li key={i} className="flex gap-3 text-sm text-muted-foreground"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{i}</li>)}
      </ul>
    </Reveal>
  );
}

function TourPage() {
  const { id } = Route.useLoaderData();
  const tour = TOURS.find((t) => t.id === id)!;
  const facts = [["Duration", tour.duration], ["Max altitude", tour.altitude], ["Difficulty", tour.difficulty], ["Base", tour.baseCamp], ["Distance", tour.distance]].filter(([, v]) => v) as [string, string][];
  return (
    <article>
      <div className="relative h-[52vh] min-h-80 overflow-hidden">
        <img src={tour.image} alt={tour.title} className="ken h-full w-full object-cover" width={1280} height={960} />
        <div className="image-scrim absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-10 text-on-image md:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs opacity-80">
            <Link to="/">Home</Link><ChevronRight className="h-3 w-3" /><Link to="/tours">Treks &amp; Tours</Link><ChevronRight className="h-3 w-3" /><span aria-current="page">{tour.title}</span>
          </nav>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">{tour.title}</h1>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-[1fr_24rem]">
        <div className="min-w-0">
          <p className="text-lg text-muted-foreground">{tour.summary}</p>
          {tour.suggested && <p className="mt-4 text-sm text-primary">Suggested itinerary — final route, stays and services are confirmed by our team before booking.</p>}
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {facts.map(([k, v]) => <div key={k}><dt className="eyebrow">{k}</dt><dd className="mt-1.5 text-sm">{v}</dd></div>)}
          </dl>
          <Reveal as="section" className="mt-12 border-t hairline py-10">
            <h2 className="font-display text-3xl">Itinerary</h2>
            <ol className="mt-6 space-y-6">
              {tour.stops.map((s, i) => (
                <li key={i} className="grid grid-cols-[4rem_1fr] gap-4">
                  <span className="font-display text-sm text-primary">{s.day ? `Day ${s.day}` : String(i + 1).padStart(2, "0")}</span>
                  <div><h3 className="font-display text-xl">{s.title}</h3><p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
                    {[s.distance, s.altitude, s.stay, s.meals].some(Boolean) && <p className="mt-2 text-xs text-muted-foreground">{[s.distance, s.altitude, s.stay && `Stay: ${s.stay}`, s.meals && `Meals: ${s.meals}`].filter(Boolean).join(" · ")}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <List title="Highlights" items={tour.highlights} />
          <List title="Inclusions" items={tour.inclusions} />
          <List title="Exclusions" items={tour.exclusions} icon="minus" />
          <List title="Getting there" items={tour.access} />
          <List title="Trail rules" items={tour.rules} />
          <List title="What to pack" items={tour.packing} />
          <p className="border-t hairline pt-8 text-sm text-muted-foreground">Read our <Link to="/policies" className="text-primary underline-offset-4 hover:underline">booking and cancellation policy</Link> or see <Link to="/tours" className="text-primary underline-offset-4 hover:underline">all treks and tours</Link>.</p>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border hairline bg-surface p-6">
            <h2 className="font-display text-2xl">Request your quote</h2>
            <p className="mt-2 text-xs text-muted-foreground">Prices and availability are confirmed by our team.</p>
            <div className="mt-6"><QuoteForm tour={tour.title} /></div>
          </div>
        </aside>
      </div>
    </article>
  );
}
