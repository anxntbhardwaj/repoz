import { useState } from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { sendToOwner } from "@/lib/mail";
import { fieldCls, labelCls } from "./QuoteForm";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().max(20).optional().default(""),
  message: z.string().trim().min(5, "Tell us a little more").max(1500),
});

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setState("sending");
    try {
      await sendToOwner(`New enquiry from ${parsed.data.name}`, parsed.data);
      form.reset();
      setState("done");
    } catch {
      setState("error");
    }
  }

  const err = (k: string) =>
    errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>;

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <label>
        <span className={labelCls}>Name *</span>
        <input name="name" className={fieldCls} />
        {err("name")}
      </label>
      <label>
        <span className={labelCls}>Email *</span>
        <input name="email" type="email" className={fieldCls} />
        {err("email")}
      </label>
      <label className="sm:col-span-2">
        <span className={labelCls}>Phone</span>
        <input name="phone" type="tel" className={fieldCls} />
      </label>
      <label className="sm:col-span-2">
        <span className={labelCls}>Message *</span>
        <textarea name="message" rows={5} className={fieldCls} />
        {err("message")}
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button
          disabled={state === "sending"}
          className="h-12 gap-2 rounded-sm px-6 text-sm font-semibold"
        >
          {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" />} Send message
        </Button>
        {state === "done" && (
          <p className="text-sm text-primary">Thank you — your message has reached our team.</p>
        )}
        {state === "error" && (
          <p className="text-sm text-destructive">
            Couldn't send right now. Please call or WhatsApp us.
          </p>
        )}
      </div>
    </form>
  );
}
