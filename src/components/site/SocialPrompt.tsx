import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";
import { FacebookIcon, InstagramIcon } from "./icons";
import { Button } from "@/components/ui/button";
import { SOCIAL_INTERVAL_MS, SOCIAL_VISIBLE_MS, socialPromptIndex } from "@/lib/social-prompts";

const PROMPTS = [
  { key: "ig", Icon: InstagramIcon, title: "Follow us on Instagram", body: "Trail stories and summit days from the Himalaya.", href: BRAND.instagram, cta: "@altitude_climber_69" },
  { key: "fb", Icon: FacebookIcon, title: "Follow us on Facebook", body: "Departures, updates and traveller photos.", href: BRAND.facebook, cta: "Altitude Climber" },
];

export function SocialPrompt() {
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    let sequence = 0;
    let hide: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      if (document.hidden || document.querySelector('[role="dialog"][data-state="open"]')) return;
      setIdx(socialPromptIndex(sequence++));
      hide = setTimeout(() => setIdx(null), SOCIAL_VISIBLE_MS);
    }, SOCIAL_INTERVAL_MS);
    return () => { clearInterval(interval); if (hide) clearTimeout(hide); };
  }, []);

  if (idx === null) return null;
  const p = PROMPTS[idx];
  if (!p) return null;
  return (
    <div role="status" className="social-prompt animate-rise fixed bottom-5 left-5 z-40 w-[min(340px,calc(100vw-2.5rem))] rounded-lg border hairline bg-card p-5 shadow-2xl">
      <Button variant="ghost" size="icon" onClick={() => setIdx(null)} aria-label="Close follow prompt"
        className="absolute right-1 top-1 text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </Button>
      <div className="flex gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-muted text-primary"><p.Icon className="h-5 w-5" /></span>
        <div>
          <p className="font-display text-lg leading-tight">{p.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
          <a href={p.href} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">
            {p.cta} →
          </a>
        </div>
      </div>
    </div>
  );
}
