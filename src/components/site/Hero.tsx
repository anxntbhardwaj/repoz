import { ArrowDown, ArrowUpRight, Mountain, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import desktop from "@/assets/desktop.jpg.asset.json";
import mobile from "@/assets/mobile.jpg.asset.json";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { CountUp } from "./motion";
import { TrailParticles } from "./TrailParticles";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, frame = 0;
    const move = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      tx = (event.clientX - box.left) / box.width - 0.5;
      ty = (event.clientY - box.top) / box.height - 0.5;
    };
    const reset = () => { tx = 0; ty = 0; };
    const animate = () => {
      x += (tx - x) * 0.06; y += (ty - y) * 0.06;
      const box = element.getBoundingClientRect();
      element.style.setProperty("--mx", x.toFixed(4));
      element.style.setProperty("--my", y.toFixed(4));
      element.style.setProperty("--sc", Math.min(Math.max(-box.top / box.height, 0), 1).toFixed(4));
      frame = requestAnimationFrame(animate);
    };
    animate();
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerdown", move, { passive: true });
    element.addEventListener("pointercancel", reset);
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointerup", reset);
    return () => {
      cancelAnimationFrame(frame); element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset); element.removeEventListener("pointerup", reset);
      element.removeEventListener("pointerdown", move); element.removeEventListener("pointercancel", reset);
    };
  }, []);

  return (
    <section ref={root} className="hero expedition-hero relative -mt-24 overflow-hidden bg-secondary text-on-image">
      <picture>
        <source media="(max-width: 767px)" srcSet={mobile.url} />
        <img src={desktop.url} alt="A trekker overlooking the blue Himalayan valleys and snow-covered peaks" width={1600} height={639} fetchPriority="high" className="expedition-image absolute inset-0 h-full w-full object-cover" />
      </picture>
      <div className="expedition-scrim absolute inset-0 z-[1]" aria-hidden />
      <TrailParticles host={root} />
      <div className="expedition-coordinate absolute right-8 bottom-44 z-[4] hidden items-center gap-3 lg:flex">
        <MapPin className="h-4 w-4" /><span className="text-xs">Kullu, Himachal Pradesh<br /><span className="opacity-60">Our home. Your starting point.</span></span>
      </div>
      <div className="expedition-content relative z-10 mx-auto flex max-w-7xl flex-col px-5 md:px-8">
        <p className="expedition-enter flex items-center gap-3 text-xs uppercase"><span className="h-px w-9 bg-current" /> Himalayan treks & adventures</p>
        <h1 className="expedition-title mt-5 font-display font-light" aria-label={BRAND.name}>
          <span className="expedition-word block">Altitude</span>
          <span className="expedition-word block">Climber<span className="text-primary">.</span></span>
        </h1>
        <p className="expedition-enter expedition-tagline mt-6 font-display text-xl md:text-2xl">{BRAND.tagline}.</p>
        <p className="expedition-enter mt-4 max-w-[290px] text-sm leading-relaxed text-on-image/80 md:max-w-sm">From the sacred trails of Shrikhand to the wild heart of Spiti. Go beyond with the people who call these mountains home.</p>
        <div className="expedition-enter mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button asChild variant="ghost" className="expedition-cta h-12 gap-6 rounded-sm px-5"><a href="#journeys"><span>Explore journeys</span><ArrowUpRight /></a></Button>
          <Button asChild variant="ghost" className="expedition-secondary h-12 gap-2 rounded-none px-0"><a href="#planner">Plan my trek <ArrowUpRight /></a></Button>
        </div>
      </div>
      <div className="expedition-bottom absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-end gap-5 px-5 pb-7 md:px-8 md:pb-9">
          <dl className="flex min-w-0 gap-7 md:gap-12">
            <div><dt className="text-[10px] uppercase opacity-60">Above the ordinary</dt><dd className="mt-1 font-display text-2xl md:text-3xl"><CountUp to={18500} /> <span className="text-sm">ft</span></dd></div>
            <div><dt className="text-[10px] uppercase opacity-60">Traveller rated</dt><dd className="mt-1 font-display text-2xl md:text-3xl"><CountUp to={5} decimals={1} /> <span className="text-sm">/ 5</span></dd></div>
          </dl>
          <a href="#signature" aria-label="Discover signature treks" className="expedition-scroll grid h-11 w-11 shrink-0 place-items-center border border-on-image/40"><ArrowDown className="h-4 w-4" /></a>
        </div>
        <div className="expedition-locations border-t border-on-image/20 py-3">
          <p className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 text-[10px] uppercase md:px-8"><span>Kullu · Kinnaur · Spiti · Ladakh</span><Mountain className="h-4 w-4 shrink-0" /><span className="hidden sm:block">{BRAND.slogan}</span></p>
        </div>
      </div>
    </section>
  );
}
