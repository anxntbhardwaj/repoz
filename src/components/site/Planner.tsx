import { ArrowRight, Compass } from "lucide-react";
import { useState } from "react";
import { FITNESS, INTERESTS, planSchema, type PlanResult } from "@/lib/planner";
import { matchTrip } from "@/lib/trip-matcher";
import { Button } from "@/components/ui/button";
import { TOURS, type Tour } from "@/lib/tours";
import { fieldCls, labelCls } from "./QuoteForm";
import { Reveal, Tilt } from "./motion";

export function Planner({ onOpen }: { onOpen: (t: Tour) => void }) {
  const [fitness, setFitness] = useState<(typeof FITNESS)[number]>("Moderate");
  const [interests, setInterests] = useState<string[]>(["Camping"]);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<PlanResult | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = planSchema.safeParse({ ...raw, fitness, interests });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your details"); return; }
    setError("");
    const result = matchTrip(parsed.data, TOURS);
    if (result) setPlan(result);
    else setError("No suitable journey found. Please contact our team.");
  }

  const tour = plan ? TOURS.find((t) => t.id === plan.tourId) : undefined;

  return (
    <section id="planner" className="scroll-mt-20 relative overflow-hidden border-y hairline bg-surface">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <p className="eyebrow flex items-center gap-2"><Compass className="h-3.5 w-3.5 text-primary" /> Find your journey</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Find the trail<br /><em className="text-primary">meant for you.</em></h2>
          <p className="mt-6 max-w-md text-muted-foreground">Tell us when you're free, how fit you feel and what moves you. Find a journey from our catalogue. Our team will confirm dates, prices and the final route.</p>

          <form onSubmit={submit} className="mt-10 grid gap-5 sm:grid-cols-2" noValidate>
            <label><span className={labelCls}>Travel dates</span><input name="dates" className={fieldCls} placeholder="e.g. 10–17 July 2026" /></label>
            <label><span className={labelCls}>Group size</span><input name="group" type="number" min={1} defaultValue={2} className={fieldCls} /></label>
            <label className="sm:col-span-2"><span className={labelCls}>Budget per person (INR)</span><input name="budget" type="number" min={1000} defaultValue={20000} className={fieldCls} /></label>
            <div className="sm:col-span-2">
              <span className={labelCls}>Fitness level</span>
              <div className="grid grid-cols-2 gap-1 rounded-md border border-input p-1 sm:grid-cols-4">
                {FITNESS.map((f) => (
                  <Button variant="ghost" type="button" key={f} onClick={() => setFitness(f)}
                    className={`rounded-sm px-2 py-2.5 text-xs transition-all duration-300 active:scale-95 ${fitness === f ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>{f}</Button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <span className={labelCls}>Interests</span>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => {
                  const on = interests.includes(i);
                  return (
                    <Button variant="ghost" type="button" key={i} onClick={() => setInterests((s) => (on ? s.filter((x) => x !== i) : [...s, i]))}
                      className={`rounded-md border px-3 py-2 text-xs transition-all duration-300 active:scale-95 ${on ? "border-primary bg-primary text-primary-foreground" : "border-input text-muted-foreground hover:border-foreground hover:text-foreground"}`}>{i}</Button>
                  );
                })}
              </div>
            </div>
            <label className="sm:col-span-2"><span className={labelCls}>Anything else? (optional)</span><input name="notes" className={fieldCls} placeholder="First Himalayan trip, travelling with parents…" /></label>
            <div className="sm:col-span-2">
              <Button type="submit" className="h-12 gap-3 rounded-sm px-6">
                <Compass className="h-4 w-4" /> Find my journey
              </Button>
              {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            </div>
          </form>
        </Reveal>

        <div className="relative min-h-[420px]">
          {!plan && (
            <div className="flex h-full min-h-[420px] items-center justify-center border-y hairline p-10 text-center">
              <p className="max-w-xs font-display text-2xl italic text-muted-foreground">
                Your next chapter starts in the mountains.
              </p>
            </div>
          )}
          {plan && tour && (
            <div key={plan.headline} className="plan-in">
              <Tilt className="overflow-hidden rounded-lg">
                <img src={tour.image} alt={tour.title} className="seq-img aspect-[16/9] w-full object-cover" />
                <div className="image-scrim absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-on-image">
                  <p className="text-xs uppercase tracking-[0.22em] opacity-80">Recommended · {tour.duration}</p>
                  <h3 className="mt-2 font-display text-3xl md:text-4xl">{tour.title}</h3>
                </div>
              </Tilt>
              <p className="seq mt-6 font-display text-2xl italic" style={{ animationDelay: "250ms" }}>{plan.headline}</p>
              <p className="seq mt-3 text-sm text-muted-foreground" style={{ animationDelay: "400ms" }}>{plan.why}</p>
              {tour.suggested && <p className="mt-5 text-sm text-muted-foreground">Suggested itinerary — our team will confirm the final route before booking.</p>}
              <ol className="mt-8 border-l hairline pl-6">
                {plan.itinerary.map((d, i) => (
                  <li key={i} className="seq relative pb-6" style={{ animationDelay: `${550 + i * 110}ms` }}>
                    <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                    <p className="eyebrow">{d.day ? `Day ${String(d.day).padStart(2, "0")}` : `Stop ${String(i + 1).padStart(2, "0")}`}</p>
                    <p className="mt-1 font-display text-lg">{d.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{d.detail}</p>
                  </li>
                ))}
              </ol>
              {plan.tips.length > 0 && (
                <ul className="seq mt-2 space-y-2 rounded-md bg-background p-5 text-sm" style={{ animationDelay: `${650 + plan.itinerary.length * 110}ms` }}>
                  {plan.tips.map((t) => <li key={t} className="flex gap-3"><span className="mt-2 h-1 w-3 shrink-0 bg-primary" />{t}</li>)}
                </ul>
              )}
              <Button variant="ghost" onClick={() => onOpen(tour)} className="seq group mt-6 h-auto max-w-full whitespace-normal px-0 text-left gap-2 text-sm font-semibold text-primary"
                style={{ animationDelay: `${750 + plan.itinerary.length * 110}ms` }}>
                See full journey &amp; get a quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
