import { Link } from "@tanstack/react-router";
import { SITE_PAGES } from "./sections";
import { BRAND } from "@/lib/brand";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";
import { whatsappLink } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t hairline bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 lg:grid-cols-5 md:px-8">
        <div className="md:col-span-2">
          <Logo className="h-14" />
          <p className="mt-5 max-w-sm font-display text-2xl italic">{BRAND.tagline}</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Registered Himalayan trek and tour operator, certified by Himachal Tourism. Serving travellers since {BRAND.since}.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              [BRAND.instagram, InstagramIcon, "Instagram"],
              [BRAND.facebook, FacebookIcon, "Facebook"],
              [whatsappLink(), WhatsAppIcon, "WhatsApp"],
            ].map(([href, Icon, label]) => {
              const I = Icon as typeof InstagramIcon;
              return (
                <a key={label as string} href={href as string} target="_blank" rel="noreferrer" aria-label={label as string}
                  className="grid h-10 w-10 place-items-center rounded-md border hairline transition-colors hover:bg-muted">
                  <I className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
        <nav className="text-sm" aria-label="Site pages">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-muted-foreground">
            {SITE_PAGES.map((pg) => <li key={pg.to}><Link to={pg.to} className="hover:text-foreground">{pg.label}</Link></li>)}
          </ul>
        </nav>
        <div className="text-sm">
          <p className="eyebrow mb-4">Visit</p>
          <p className="text-muted-foreground">{BRAND.address}</p>
          <p className="mt-3 text-muted-foreground">{BRAND.hours}</p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-4">Reach us</p>
          <ul className="space-y-2 text-muted-foreground">
            {[BRAND.phonePrimary].map((p) => (
              <li key={p}><a className="hover:text-foreground" href={`tel:${p.replace(/\s/g, "")}`}>{p}</a></li>
            ))}
            <li><a className="break-all hover:text-foreground" href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
            <li className="pt-2"><Link to="/policies" className="hover:text-foreground">Refund &amp; cancellation</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t hairline">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground md:flex-row md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} {BRAND.name} · Owned by {BRAND.owner}</span>
          <span>
            Designed &amp; Developed by{" "}
            <a href="https://www.instagram.com/anxntbhardwaj" target="_blank" rel="noreferrer" className="text-foreground underline-offset-4 hover:underline">@anxntbhardwaj</a>
            {" · "}
            <a href="https://anantbhardwaj.com" target="_blank" rel="noreferrer" className="text-foreground underline-offset-4 hover:underline">anantbhardwaj.com</a>
            {" — developer & cyber security researcher"}
          </span>
        </div>
      </div>
    </footer>
  );
}
