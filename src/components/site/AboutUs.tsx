import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  HeartPulse,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import guide from "@/assets/guide.jpg.asset.json";
import trail from "@/assets/guide-trail.jpg.asset.json";
import mountains from "@/assets/guide-mountains.jpg.asset.json";
import expedition from "@/assets/guide-expedition.jpg.asset.json";
import certification from "@/assets/certification.png.asset.json";
import { BRAND, whatsappLink } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Reveal, Tilt } from "./motion";

const PHOTOS = [
  { image: trail, alt: "Our head guide taking a break on a Himalayan mountain trail" },
  { image: guide, alt: "Our certified head guide standing on a rocky Himalayan trail" },
  { image: mountains, alt: "Our head guide beside an expedition vehicle in the mountains" },
  { image: expedition, alt: "Our head guide on a high mountain ridge above the clouds" },
];
const VALUES = [
  {
    icon: ShieldCheck,
    title: "Certified & approved",
    description: "Recognised by Himachal Tourism.",
  },
  { icon: Compass, title: "Local guides", description: "Mountain knowledge, rooted in home." },
  { icon: HeartPulse, title: "Safety first", description: "Acclimatisation and prepared crews." },
  { icon: Leaf, title: "Leave No Trace", description: "Every wrapper comes back down." },
];

export function AboutUs() {
  const [carouselRef, carousel] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const sync = useCallback(() => {
    if (carousel) setSelected(carousel.selectedScrollSnap());
  }, [carousel]);
  useEffect(() => {
    if (!carousel) return;
    sync();
    carousel.on("select", sync);
    return () => {
      carousel.off("select", sync);
    };
  }, [carousel, sync]);

  return (
    <section id="about" className="guide-section scroll-mt-24 border-b hairline">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">About us · Altitude Climber</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-6xl">
              The mountains are home.
              <br />
              <span className="text-primary">You’re in good hands.</span>
            </h2>
          </div>
          <span className="guide-section-marker hidden text-sm text-muted-foreground lg:block">
            Kalont · Jaon · Kullu
          </span>
        </Reveal>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="min-w-0">
            <div
              className="relative"
              role="region"
              aria-roledescription="carousel"
              aria-label="Head guide photographs"
            >
              <div ref={carouselRef} className="guide-carousel overflow-hidden rounded-md">
                <div className="flex touch-pan-y">
                  {PHOTOS.map((photo, index) => (
                    <div
                      key={photo.image.url}
                      className="min-w-0 flex-[0_0_100%]"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${index + 1} of ${PHOTOS.length}`}
                    >
                      <Tilt max={2} className="overflow-hidden">
                        <img
                          src={photo.image.url}
                          alt={photo.alt}
                          loading="lazy"
                          className={`guide-photo aspect-[4/5] w-full object-cover ${selected === index ? "guide-photo-selected" : ""}`}
                        />
                      </Tilt>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-xl">Our head guide</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Certified guide · Himalayan trails
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => carousel?.scrollPrev()}
                    aria-label="Previous guide photo"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => carousel?.scrollNext()}
                    aria-label="Next guide photo"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-3" aria-label="Choose a guide photo">
                {PHOTOS.map((photo, index) => (
                  <Button
                    key={photo.image.url}
                    variant="ghost"
                    onClick={() => carousel?.scrollTo(index)}
                    aria-label={`Show guide photo ${index + 1}`}
                    aria-pressed={selected === index}
                    className={`guide-thumbnail h-auto overflow-hidden rounded-sm border-2 p-0 ${selected === index ? "border-primary" : "border-transparent opacity-60"}`}
                  >
                    <img
                      src={photo.image.url}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="min-w-0 lg:pt-4">
            <Reveal delay={100}>
              <p className="eyebrow">Local roots. Real mountain experience.</p>
              <h3 className="mt-4 font-display text-3xl md:text-4xl">
                From the village at the foot of Shrikhand.
              </h3>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                {BRAND.name} is a registered Himalayan tour and adventure operator run by{" "}
                {BRAND.owner} from Kalont, Jaon — the base village of the Shrikhand Mahadev Yatra.
                Our team brings professional mountain experience to treks, camps and road journeys
                across Himachal, Spiti and Ladakh.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Meet the guide who leads the way. From the first trail briefing to the final
                descent, our focus stays on the people making the journey.
              </p>
            </Reveal>
            <Reveal
              delay={260}
              className="guide-certification mt-8 flex items-center gap-5 border-y hairline py-5"
            >
              <img
                src={certification.url}
                alt="Himachal Tourism Certified"
                width={1254}
                height={1254}
                className="h-24 w-24 shrink-0 object-contain md:h-28 md:w-28"
                loading="lazy"
              />
              <div>
                <p className="font-display text-xl">Himachal Tourism certified</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Registered Himalayan trek & tour operator
                </p>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              {VALUES.map(({ icon: Icon, title, description }, index) => (
                <Reveal
                  key={title}
                  delay={100 + index * 100}
                  className="guide-value border-l-2 border-border pl-4"
                >
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <p className="mt-3 font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={300} className="mt-9">
              <Button asChild className="h-12 gap-5 rounded-sm">
                <a
                  href={whatsappLink(
                    "Hi Altitude Climber, I'd like to plan a journey with your team.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Plan with our team <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
