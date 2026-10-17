import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Check, Minus, Mountain, Route, Tent, X, Clock, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Tour } from "@/lib/tours";
import { Button } from "@/components/ui/button";
import { SplitText } from "./motion";
import { QuoteForm } from "./QuoteForm";

function Itinerary({ stops }: { stops: Tour["stops"] }) {
  return <ol className="ml-2 border-l hairline pl-7">{stops.map((s, i) => (
    <li key={i} className="relative pb-8 last:pb-0">
      <span className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full bg-primary" />
      <p className="eyebrow">{s.day ? `Day ${String(s.day).padStart(2, "0")}` : `Stop ${i + 1}`}</p>
      <h4 className="mt-2 font-display text-xl">{s.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
      {(s.distance || s.altitude || s.stay || s.meals) && <p className="mt-2 text-xs text-muted-foreground">{[s.distance, s.altitude, s.stay && `Stay: ${s.stay}`, s.meals && `Meals: ${s.meals}`].filter(Boolean).join(" · ")}</p>}
    </li>
  ))}</ol>;
}

function Block({ id, title, children, delay = 0 }: { id: string; title: string; children: React.ReactNode; delay?: number }) {
  return (
    <section id={id} className="cine-step border-t hairline py-10 first:border-t-0 first:pt-0" style={{ animationDelay: `${delay}ms` }}>
      <h3 className="mb-6 font-display text-3xl">{title}</h3>
      {children}
    </section>
  );
}

const List = ({ items, icon: I }: { items: string[]; icon: typeof Check }) => (
  <ul className="space-y-2.5">
    {items.map((x) => (
      <li key={x} className="flex gap-3 text-sm"><I className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />{x}</li>
    ))}
  </ul>
);

export function TourDialog({ tour, onClose }: { tour: Tour | null; onClose: () => void }) {
  const [retained, setRetained] = useState<Tour | null>(tour);
  const [step, setStep] = useState("itinerary");
  const [leaving, setLeaving] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    if (tour) { setRetained(tour); setStep("itinerary"); setLeaving(false); }
    return () => clearTimeout(timer.current);
  }, [tour]);
  const shown = tour ?? retained;
  const sections = shown ? [
    ["itinerary", "Itinerary"], ["highlights", "Highlights"],
    ...(shown.inclusions ? [["inclusions", "Inclusions"]] : []),
    ...(shown.access ? [["access", "Getting there"]] : []),
    ...(shown.rules ? [["rules", "Trail rules"]] : []),
    ...(shown.packing ? [["packing", "Packing"]] : []),
    ["quote", "Get a quote"],
  ] : [];
  const next = sections[sections.findIndex(([id]) => id === step) + 1];
  const jump = (id: string) => {
    if (id === step || leaving) return;
    setLeaving(true);
    timer.current = setTimeout(() => {
      setStep(id); setLeaving(false);
      scroller.current?.scrollTo({ top: 0, behavior: "instant" });
    }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220);
  };

  return (
    <Dialog.Root open={!!tour} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="cine-overlay fixed inset-0 z-50 bg-overlay backdrop-blur-md" />
        <Dialog.Content className="fixed inset-2 z-50 grid overflow-hidden cine-panel rounded-lg bg-background shadow-2xl outline-none md:inset-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {shown && (
            <>
              <aside className="cine-media relative hidden overflow-hidden lg:block"
                onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5)); e.currentTarget.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5)); }}
                onTouchMove={(e) => { const t = e.touches[0]; if (!t) return; const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--px", String((t.clientX - r.left) / r.width - 0.5)); e.currentTarget.style.setProperty("--py", String((t.clientY - r.top) / r.height - 0.5)); }}
                onPointerLeave={(e) => { e.currentTarget.style.setProperty("--px", "0"); e.currentTarget.style.setProperty("--py", "0"); }}>
                <img src={shown.image} alt={shown.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="image-scrim absolute inset-0" />
                <div className="cine-lines pointer-events-none absolute inset-0" aria-hidden>
                  {[22, 48, 74].map((t, i) => <span key={t} style={{ top: `${t}%`, animationDelay: `${300 + i * 120}ms` }} />)}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-10 text-on-image">
                  <p className="cine-step text-xs uppercase tracking-[0.24em] opacity-80" style={{ animationDelay: "500ms" }}>{shown.region}</p>
                  <Dialog.Title className="mt-3 font-display text-5xl leading-[1.02]"><SplitText text={shown.title} delay={600} /></Dialog.Title>
                  <dl className="cine-step mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm" style={{ animationDelay: "1100ms" }}>
                    {[[Clock, "Duration", shown.duration], [Mountain, "Max altitude", shown.altitude], [Route, "Difficulty", shown.difficulty], [MapPin, "Base camp", shown.baseCamp]]
                      .filter(([, , v]) => v)
                      .map(([I, k, v]) => {
                        const Icon = I as typeof Clock;
                        return (
                          <div key={k as string}>
                            <dt className="flex items-center gap-1.5 text-xs opacity-70"><Icon className="h-3.5 w-3.5" />{k as string}</dt>
                            <dd className="mt-1">{v as string}</dd>
                          </div>
                        );
                      })}
                  </dl>
                </div>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-col">
                <div className="cine-step flex h-16 min-w-0 shrink-0 items-center justify-between gap-4 border-b hairline px-4 md:px-6" style={{ animationDelay: "350ms" }}>
                  <nav className="flex min-w-0 gap-6 overflow-x-auto text-sm">
                    {sections.map(([id, label]) => (
                      <Button variant="ghost" key={id} onClick={() => jump(id ?? "")} aria-current={step === id ? "step" : undefined} className={`h-9 rounded-none px-0 hover:bg-transparent ${step === id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>{label}</Button>
                    ))}
                  </nav>
                  <Dialog.Close asChild><Button variant="outline" size="icon" aria-label="Close" className="shrink-0">
                    <X className="h-4 w-4" />
                  </Button></Dialog.Close>
                </div>
                <div ref={scroller} className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 md:px-12 md:py-10">
                  <Dialog.Title className="sr-only">{shown.title}</Dialog.Title>
                  <Dialog.Description className="sr-only">{shown.summary}</Dialog.Description>
                  <div key={step} className="trip-step" data-leaving={leaving || undefined}>
                    <p className="mb-5 text-xs text-muted-foreground lg:hidden">{shown.title} · {shown.duration}</p>
                    {step === "itinerary" && <Block id="itinerary" title="Itinerary">
                      {shown.suggested && <p className="mb-6 border-l-2 border-primary pl-4 text-sm text-muted-foreground">Suggested itinerary — final route, stays and services are confirmed by our team before booking.</p>}
                      <Itinerary stops={shown.stops} />
                    </Block>}
                    {step === "highlights" && <Block id="highlights" title="Highlights"><List items={shown.highlights} icon={Check} /></Block>}
                    {step === "inclusions" && <Block id="inclusions" title="Inclusions"><List items={shown.inclusions ?? []} icon={Check} />
                      {shown.exclusions && <><h4 className="mb-4 mt-8 font-display text-xl">Not included</h4><List items={shown.exclusions} icon={Minus} /></>}
                    </Block>}
                    {step === "access" && <Block id="access" title="Getting there"><List items={shown.access ?? []} icon={Route} /></Block>}
                    {step === "rules" && <Block id="rules" title="Trail rules"><List items={shown.rules ?? []} icon={Mountain} /></Block>}
                    {step === "packing" && <Block id="packing" title="Packing list"><List items={shown.packing ?? []} icon={Tent} /></Block>}
                    {step === "quote" && <Block id="quote" title="Request your quote"><QuoteForm tour={shown.title} /></Block>}
                    <div className="mt-8 flex flex-wrap justify-end gap-3 border-t hairline pt-6">
                      {next ? <Button className="h-12 gap-4 rounded-sm" onClick={() => jump(next[0] ?? "quote")}>View {next[1]?.toLowerCase()}<ArrowRight className="h-4 w-4" /></Button>
                        : <Dialog.Close asChild><Button variant="outline" className="h-12 rounded-sm">Close journey</Button></Dialog.Close>}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
