import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { Logo } from "./Logo";
import { ThemeToggle } from "./theme";

const NAV = [
  { href: "/tours", label: "Treks & Tours" },
  { href: "/#planner", label: "Find my trip" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const home = useLocation({ select: (l) => l.pathname }) === "/";
  const [menuMounted, setMenuMounted] = useState(false);
  useEffect(() => {
    if (open) { setMenuMounted(true); return; }
    const timer = setTimeout(() => setMenuMounted(false), 400);
    return () => clearTimeout(timer);
  }, [open]);
  const over = home && !scrolled && !menuMounted;
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 48);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      data-over={over || undefined}
      className={`group/h sticky top-0 z-40 h-24 border-b transition-[background-color,border-color,color,backdrop-filter] duration-700 ${
        over ? "border-transparent bg-transparent text-on-image" : "hairline bg-background/80 text-foreground backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[auto_1fr_auto] lg:gap-5 px-5 md:px-8">
        <Link to="/" aria-label="Altitude Climber home">
          <Logo className="h-14 md:h-16" over={over} />
        </Link>
        <nav className="hidden justify-center gap-5 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="relative text-sm opacity-75 transition-opacity hover:opacity-100 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-3">
          <a
            href={`tel:${BRAND.phonePrimary.replace(/\s/g, "")}`}
            className="hidden shrink-0 items-center gap-2 text-xs xl:flex"
          >
            <Phone className="h-4 w-4 text-primary" strokeWidth={1.5} />
            {BRAND.phonePrimary}
          </a>
          <ThemeToggle />
          <Button variant="ghost" size="icon"
            className="grid h-9 w-9 place-items-center rounded-md border border-current/25 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      {menuMounted && (
        <nav data-state={open ? "open" : "closed"} className="border-b hairline bg-background mobile-navigation px-5 py-5 lg:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="mobile-nav-link block border-b border-border py-3 font-display text-3xl">
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
