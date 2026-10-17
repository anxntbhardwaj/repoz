import { ArrowUpRight, Quote, Star } from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { CountUp, Reveal, Tilt } from "./motion";

const REVIEWS: readonly (readonly [string, string])[] = [
  ["Aman Rawat", "Truly professional guides, and the food on the trail was exceptional — warm and plentiful at every camp."],
  ["Neha Bisht", "Campsite transitions were seamless and safety was taken seriously on every steep section."],
  ["Rohit Sharma", "The support team was beautifully coordinated, and the acclimatisation breaks made all the difference."],
  ["Pooja Verma", "Perfectly organised from the first message to the last day. Quick, clear booking communication."],
  ["Vikram Singh", "Smooth transport and a team clearly prepared for emergencies. We felt looked after throughout."],
];

export function Reviews() {
  const root = useRef<HTMLElement>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [carouselRef, carousel] = useEmblaCarousel({ loop: true, align: "center" }, [AutoScroll({ speed: 0.7, startDelay: 0, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false })]);
  const [selected, setSelected] = useState(0);
  const sync = useCallback(() => { if (carousel) setSelected(carousel.selectedScrollSnap()); }, [carousel]);
  useEffect(() => {
    if (!carousel) return;
    const play = () => carousel.plugins()["autoScroll"]?.play();
    play();
    sync(); carousel.on("select", sync);
    carousel.on("pointerUp", play).on("settle", play);
    return () => { carousel.off("select", sync); carousel.off("pointerUp", play); carousel.off("settle", play); };
  }, [carousel, sync]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { setCelebrate(true); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={root} id="reviews" data-celebrate={celebrate || undefined} className="reviews-section relative scroll-mt-24 overflow-hidden border-y hairline bg-surface py-20 md:py-28">
      <div className="review-confetti pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 18 }, (_, i) => <span key={i} className={`gold-spark gold-spark-${i % 6}`}><Star className="h-full w-full fill-current" /></span>)}
      </div>
      <Reveal className="relative mx-auto max-w-7xl px-5 text-center md:px-8">
        <p className="eyebrow">The people. The memories.</p>
        <div className="rating-seal relative mx-auto mt-7 flex h-48 w-48 flex-col items-center justify-center rounded-full border border-rating/40 md:h-56 md:w-56">
          <span className="rating-orbit absolute inset-2 rounded-full border border-dashed border-rating/30" aria-hidden />
          <p className="font-display text-6xl"><CountUp to={5} decimals={1} /></p>
          <div className="gold-stars mt-3 flex gap-1.5 text-rating" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
          <p className="mt-3 text-xs text-muted-foreground">Traveller rated</p>
        </div>
        <h2 className="mt-8 font-display text-4xl md:text-6xl">Big mountains.<br /><span className="text-primary">Even bigger memories.</span></h2>
        <Button asChild variant="outline" className="mt-7 h-12 gap-4 rounded-sm bg-background"><a href={BRAND.googleReviews} target="_blank" rel="noreferrer">Give us a review on Google <ArrowUpRight className="h-4 w-4" /></a></Button>
      </Reveal>
      <div ref={carouselRef} className="review-carousel relative mt-12 overflow-hidden py-6" role="region" aria-roledescription="carousel" aria-label="Traveller reviews">
        <div className="flex touch-pan-y items-stretch">
          {REVIEWS.map(([name, text], i) => (
            <div key={name} className="review-slide min-w-0 shrink-0 px-3" data-selected={i === selected || undefined} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${REVIEWS.length}`}>
              <Tilt max={5} className="h-full">
                <figure className="review-card flex h-full flex-col border hairline bg-card px-7 pb-9 pt-10 text-center">
                  <Quote className="mx-auto h-6 w-6 text-rating/60" strokeWidth={1.5} aria-hidden />
                  <div className="gold-stars mt-5 flex justify-center gap-1 text-rating" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}</div>
                  <blockquote className="mt-6 flex-1 font-display text-lg leading-relaxed">“{text}”</blockquote>
                  <figcaption className="mt-8 flex flex-col items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-sm font-semibold text-primary" aria-hidden>{name.split(" ").map(n => n[0]).join("")}</span><span className="text-sm font-semibold">{name}</span></figcaption>
                </figure>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}