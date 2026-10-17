import { BRAND } from "@/lib/brand";

export function Logo({ className = "h-10", over = false }: { className?: string; over?: boolean }) {
  return (
    <span className={`brand-logo relative inline-block shrink-0 overflow-hidden ${className}`}>
      <img src={BRAND.logoDay} alt={BRAND.name} width={1536} height={1024} className={`brand-logo-image brand-logo-day ${over ? "hidden" : "dark:hidden"}`} />
      <img src={BRAND.logoNight} alt={BRAND.name} width={1536} height={1024} className={`brand-logo-image brand-logo-night ${over ? "block" : "hidden dark:block"}`} />
    </span>
  );
}
