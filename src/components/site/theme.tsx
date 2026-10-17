import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const THEME_SCRIPT = `try{var t=localStorage.getItem('ac-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  const toggle = () => {
    const next = !dark;
    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("ac-theme", next ? "dark" : "light");
      setDark(next);
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(apply);
    } else {
      document.documentElement.classList.add("theme-fallback");
      apply();
      setTimeout(() => document.documentElement.classList.remove("theme-fallback"), 700);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to day theme" : "Switch to night theme"}
      className="grid h-9 w-9 place-items-center rounded-md border border-current/25 transition-[transform,background-color] duration-500 hover:rotate-12 hover:bg-current/10 active:scale-90"
    >
      {dark ? <Sun className="h-4 w-4" strokeWidth={1.5} /> : <Moon className="h-4 w-4" strokeWidth={1.5} />}
    </button>
  );
}
