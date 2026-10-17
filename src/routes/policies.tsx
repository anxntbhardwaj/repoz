import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/policies")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — Altitude Climber" },
      { name: "description", content: "Booking, cancellation, refund, weather and trail safety rules for Altitude Climber treks and tours." },
      { property: "og:title", content: "Refund & Cancellation Policy — Altitude Climber" },
      { property: "og:description", content: "Booking, cancellation, weather and safety rules for our Himalayan treks." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: `${SITE_URL}/policies` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/policies` }],
  }),
  component: Policies,
});

const SECTIONS: [string, string[]][] = [
  ["Booking & payment", [
    "A non-refundable token deposit secures your departure, campsite and porter allocation.",
    "100% of the package must be cleared on Day 1, before leaving base camp.",
    "Share your payment confirmation on WhatsApp or email with your booking reference — your confirmation follows within 2 hours.",
  ]],
  ["Cancellation & refunds", [
    "Cancelled 30 days or more before departure: 50% of the package cost is refunded.",
    "Cancelled less than 30 days before departure: no refund.",
    "No-shows and partial trail abandonment are not refunded or adjusted.",
    "If you turn back midway — due to stamina, altitude sickness or choice — no partial refund is given, and extra descent, guiding or stay costs are borne by you.",
  ]],
  ["Weather & force majeure", [
    "The head guide may alter, shorten or cancel a route on-site due to cloudbursts, landslides, snowstorms, floods or government closures.",
    "Each extra day spent waiting out weather is charged at ₹2,000 per person, settled before the final drop-off.",
  ]],
  ["Health, safety & conduct", [
    "Treks reach up to 18,500 ft over boulder fields and snow bridges — strong fitness is essential.",
    "Participants must be free of serious respiratory, blood-pressure and heart conditions, and acknowledge a liability waiver.",
    "Under-18s must travel with a legal guardian.",
    "Dhotis, saris and loose formal wear are not allowed on trail.",
    "Rigid high-ankle trekking boots are mandatory; trainers, sandals or street shoes mean disqualification at the base check post.",
    "Leave No Trace: all personal trash is carried back to base camp.",
  ]],
];

function Policies() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 md:py-28">
      <p className="eyebrow">Policies</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Refund &amp; cancellation</h1>
      <p className="mt-6 text-muted-foreground">Please read these before booking. They exist to keep every group safe on some of India's hardest trails.</p>
      {SECTIONS.map(([title, items]) => (
        <div key={title} className="mt-14 border-t hairline pt-8">
          <h2 className="font-display text-2xl">{title}</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {items.map((i) => <li key={i} className="flex gap-3"><span className="mt-2 h-1 w-3 shrink-0 bg-primary" />{i}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}
