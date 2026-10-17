import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import camping from "@/assets/camping.jpg";
import kinner from "@/assets/kinner.jpg";
import shrikhand from "@/assets/shrikhand.jpg";
import spiti from "@/assets/spiti.jpg";
import ladakh from "@/assets/ladakh.jpg";
import paragliding from "@/assets/paragliding.jpg";
import { REGIONS, TOURS, type Tour } from "@/lib/tours";
import { BRAND, whatsappLink } from "@/lib/brand";
import { ContactForm } from "./ContactForm";
import { Button } from "@/components/ui/button";
import { Reveal, Tilt } from "./motion";

/** Every treks/tours row, grouped by region; opens the trip detail popup. */
export function Journeys({ onOpen }: { onOpen: (t: Tour) => void }) {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("Expeditions");
  const list = TOURS.filter((t) => t.region === region);
  const setOpen = onOpen;
  return (
    <section id="journeys" className="scroll-mt-20 border-y hairline bg-surface">
    <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
      <Reveal><p className="eyebrow">All journeys</p>
      <h2 className="mt-3 font-display text-5xl md:text-6xl">Choose your mountain.</h2></Reveal>
      <div className="mt-10 flex gap-8 overflow-x-auto border-b hairline">
        {REGIONS.map((r) => (
          <Button variant="ghost" key={r} onClick={() => setRegion(r)}
            className={`h-auto rounded-none px-0 -mb-px whitespace-nowrap border-b-2 pb-4 text-sm transition-colors hover:bg-transparent ${region === r ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {r}
          </Button>
        ))}
      </div>
      <ul className="divide-y hairline">
        {list.map((t, i) => (
          <Reveal as="li" key={region + t.id} delay={i * 70}>
            <Button variant="ghost" onClick={() => setOpen(t)} className="package-row group relative grid h-auto whitespace-normal rounded-none w-full grid-cols-[3rem_1fr_auto] items-center gap-4 px-2 py-6 text-left hover:bg-transparent md:px-4 md:grid-cols-[4rem_7rem_1fr_12rem_auto] md:gap-8">
              <span className="font-display text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="package-thumb hidden overflow-hidden rounded-md md:block"><img src={t.image} alt="" loading="lazy" className="aspect-[4/3] w-28 object-cover" /></span>
              <span>
                <span className="package-title block font-display text-2xl md:text-3xl">{t.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground md:hidden">{t.duration}</span>
              </span>
              <span className="hidden text-sm text-muted-foreground md:block">{t.duration}</span>
              <span className="package-arrow flex h-10 w-10 items-center justify-center rounded-full border hairline"><ArrowRight className="h-4 w-4" /></span>
            </Button>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" className="scroll-mt-20 mx-auto max-w-7xl px-5 pb-24 md:px-8">
    <Reveal><p className="eyebrow">Gallery</p>
    <h2 className="mt-3 font-display text-5xl md:text-6xl">Seen from the trail.</h2></Reveal>
    <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
      {[[shrikhand, "md:row-span-2"], [spiti, "md:col-span-2"], [kinner, ""], [ladakh, ""], [camping, "md:col-span-2"], [paragliding, ""]].map(([src, cls], i) => (
        <Reveal key={i} delay={i * 90} className={`group overflow-hidden rounded-md ${cls}`}>
          <Tilt className="h-full"><img src={src} alt="Himalayan journey" loading="lazy" className="ken h-full w-full object-cover" /></Tilt>
        </Reveal>
      ))}
    </div>
  </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-[1fr_1.2fr] md:px-8 md:py-32">
    <Reveal>
      <p className="eyebrow">Contact</p>
      <h2 className="mt-3 font-display text-5xl md:text-6xl">Plan your <em className="text-primary">climb.</em></h2>
      <p className="mt-6 text-muted-foreground">Write to us and your message goes straight to our team's inbox. For the quickest reply, message us on WhatsApp.</p>
      <dl className="mt-10 space-y-6 text-sm">
        <div><dt className="eyebrow">Call / WhatsApp</dt><dd className="mt-1.5 text-lg"><a href={whatsappLink()} target="_blank" rel="noreferrer" className="hover:text-primary">{BRAND.phonePrimary}</a></dd></div>
        <div><dt className="eyebrow">Email</dt><dd className="mt-1.5 break-all"><a href={`mailto:${BRAND.email}`} className="hover:text-primary">{BRAND.email}</a></dd></div>
        <div><dt className="eyebrow">Hours</dt><dd className="mt-1.5">{BRAND.hours}</dd></div>
      </dl>
    </Reveal>
    <Reveal delay={120}><ContactForm /></Reveal>
  </section>
  );
}

/** Page heading with a visible breadcrumb trail for the dedicated section pages. */
export function PageIntro({ crumb, title, children }: { crumb: string; title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8 md:pt-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link><ChevronRight className="h-3 w-3" /><span aria-current="page" className="text-foreground">{crumb}</span>
      </nav>
      <h1 className="mt-6 font-display text-5xl md:text-7xl">{title}</h1>
      {children && <p className="mt-5 max-w-2xl text-muted-foreground">{children}</p>}
    </div>
  );
}

export const SITE_PAGES = [
  { to: "/tours", label: "Treks & Tours" },
  { to: "/about", label: "About Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact Us" },
  { to: "/policies", label: "Policies" },
] as const;
