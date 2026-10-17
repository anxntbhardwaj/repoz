import { useEffect } from "react";

const BIG = "color:#e0662f;font-size:28px;font-weight:800;font-family:system-ui";
const SMALL = "color:#888;font-size:13px;font-family:system-ui";

function warn() {
  console.log("%cYO BRO GET LOST FROM HERE!", BIG);
  console.log(
    "%cThis is a browser feature for developers. Pasting code here can let someone steal your data. Altitude Climber security guard is active — by @anxntbhardwaj · anantbhardwaj.com",
    SMALL,
  );
}

/** Deters casual console tampering. Note: no website can fully block a visitor's own devtools. */
export function ConsoleGuard() {
  useEffect(() => {
    if (import.meta.env.DEV) return;
    warn();
    let spam: ReturnType<typeof setInterval> | undefined;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k === "F12" || ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I", "J", "C"].includes(k)) || ((e.ctrlKey || e.metaKey) && k === "U")) {
        e.preventDefault();
        if (!spam) spam = setInterval(warn, 1500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (spam) clearInterval(spam);
    };
  }, []);
  return null;
}
