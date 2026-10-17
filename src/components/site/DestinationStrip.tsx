import { useEffect, useRef } from "react";

/**
 * Continuously drifting destination strip. Driven by requestAnimationFrame so it
 * keeps moving on every device and browser setting; it pauses only while the tab is hidden.
 */
export function DestinationStrip({ places, speed = 48 }: { places: string[]; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let offset = 0;
    let last = performance.now();
    let frame = 0;
    let boost = 1;
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const half = el.scrollWidth / 2;
      boost += (1 - boost) * 0.04;
      offset += (speed * boost * dt) / 1000;
      if (half > 0 && offset >= half) offset -= half;
      el.style.transform = `translate3d(${-offset}px,0,0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const nudge = () => {
      boost = 4;
    };
    const parent = el.parentElement;
    parent?.addEventListener("pointerdown", nudge);
    parent?.addEventListener("pointerenter", nudge);
    return () => {
      cancelAnimationFrame(frame);
      parent?.removeEventListener("pointerdown", nudge);
      parent?.removeEventListener("pointerenter", nudge);
    };
  }, [speed]);

  return (
    <div className="marquee-wrap overflow-hidden border-b hairline py-4">
      <div ref={track} className="destination-strip flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {places.map((p) => (
              <span
                key={p}
                className="destination-word flex items-center gap-10 pr-10 font-display text-xl italic text-muted-foreground md:text-3xl"
              >
                {p}
                <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
