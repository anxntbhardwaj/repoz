import { useState } from "react";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { buildQuoteMessage, isBeforeToday, quoteSchema, type QuoteInput } from "@/lib/quote";
import { sendToOwner } from "@/lib/mail";
import { whatsappLink } from "@/lib/brand";
import { WhatsAppIcon } from "./icons";
import { Button } from "@/components/ui/button";

export const fieldCls =
  "w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring";
export const labelCls = "mb-1.5 block text-xs font-medium text-muted-foreground";

function F({ name, label, errors, children }: { name: string; label: string; errors: Record<string, string>; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
      {errors[name] && <span className="field-error mt-1 block text-xs text-destructive">{errors[name]}</span>}
    </label>
  );
}

export function QuoteForm({ tour }: { tour: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [message, setMessage] = useState("");
  const [mailOk, setMailOk] = useState(true);
  const [budgetType, setBudgetType] = useState<QuoteInput["budgetType"]>("per-person");
  const [date, setDate] = useState<Date>();
  const [pickerOpen, setPickerOpen] = useState(false);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = quoteSchema.safeParse({ ...raw, budgetType });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    if (isBeforeToday(parsed.data.date)) { setErrors({ date: "Choose today or a future date" }); return; }
    setErrors({});
    setState("sending");
    const text = buildQuoteMessage(tour, parsed.data);
    setMessage(text);
    try {
      await sendToOwner(`Quote request — ${tour} (${parsed.data.group} pax)`, {
        Tour: tour, ...parsed.data, Message: text,
      } as unknown as Record<string, string>);
      setMailOk(true);
    } catch {
      setMailOk(false);
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="quote-done rounded-lg border hairline bg-surface p-6">
        <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground"><Check className="h-5 w-5" /></span>
        <h4 className="mt-4 font-display text-2xl">{mailOk ? "Your request is on its way." : "Almost there."}</h4>
        <p className="mt-2 text-sm text-muted-foreground">
          {mailOk
            ? "We've emailed your details to our team. Send it on WhatsApp too for the quickest reply."
            : "We couldn't send the email just now — send your request on WhatsApp instead."}
        </p>
        <pre className="mt-5 max-h-56 overflow-auto whitespace-pre-wrap rounded-md bg-background p-4 text-xs leading-relaxed text-muted-foreground">{message}</pre>
        <Button asChild className="mt-5 h-auto min-h-12 w-full whitespace-normal rounded-sm px-5 py-3.5"><a href={whatsappLink(message)} target="_blank" rel="noreferrer">
          <WhatsAppIcon className="h-4 w-4" /> Open WhatsApp with this message
        </a></Button>
        <Button variant="ghost" onClick={() => setState("idle")} className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground">Edit details</Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="quote-form grid gap-4 sm:grid-cols-2" noValidate>
      <F errors={errors} name="name" label="Full name *"><input name="name" className={fieldCls} placeholder="Your name" /></F>
      <F errors={errors} name="phone" label="Phone number *"><input name="phone" type="tel" className={fieldCls} placeholder="+91 98765 43210" /></F>
      <F errors={errors} name="email" label="Email address *"><input name="email" type="email" className={fieldCls} placeholder="you@example.com" /></F>
      <div>
        <span className={labelCls}>Preferred date *</span>
        <input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger asChild>
            <button type="button" className={`date-trigger flex items-center justify-between text-left ${fieldCls} ${date ? "" : "text-muted-foreground/70"}`}>
              {date ? format(date, "dd MMM yyyy") : "Pick a date"}
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="date-popover w-auto p-0" align="start">
            <Calendar mode="single" selected={date} defaultMonth={date ?? today}
              onSelect={(d) => { setDate(d); setPickerOpen(false); setErrors(({ date: _omit, ...rest }) => rest); }}
              disabled={{ before: today }} initialFocus className="pointer-events-auto p-3" />
          </PopoverContent>
        </Popover>
        {errors["date"] && <span className="field-error mt-1 block text-xs text-destructive">{errors["date"]}</span>}
      </div>
      <F errors={errors} name="days" label="How many days? *"><input name="days" className={fieldCls} placeholder="e.g. 7 days" /></F>
      <F errors={errors} name="group" label="Group members *"><input name="group" type="number" min={1} defaultValue={2} className={fieldCls} /></F>
      <div>
        <span className={labelCls}>Budget type *</span>
        <div className="grid grid-cols-2 rounded-md border border-input p-1">
          {(["per-person", "total"] as const).map((t) => (
            <Button variant="ghost" type="button" key={t} onClick={() => setBudgetType(t)} aria-pressed={budgetType === t}
              className={`rounded-sm px-2 py-2 text-sm ${budgetType === t ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {t === "per-person" ? "Per person" : "Total group"}
            </Button>
          ))}
        </div>
      </div>
      <F errors={errors} name="budget" label="Approx. budget (INR) *"><input name="budget" type="number" min={1} className={fieldCls} placeholder="20000" /></F>
      <div className="sm:col-span-2">
        <F errors={errors} name="notes" label="Special requirements (optional)">
          <textarea name="notes" rows={3} className={fieldCls} placeholder="Dietary needs, photography guide, medical or altitude concerns…" />
        </F>
      </div>
      <Button disabled={state === "sending"}
        className="h-12 rounded-sm px-6 text-sm font-semibold sm:col-span-2">
        {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} Get my quote
      </Button>
    </form>
  );
}
