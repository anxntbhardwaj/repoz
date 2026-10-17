import { useEffect, useRef, type RefObject } from "react";

/** A drifting snowfield with a spring wake and a burst beneath each touch. */
export function TrailParticles({ host }: { host: RefObject<HTMLElement | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const surface = canvas.current,
      element = host.current;
    if (!surface || !element) return;
    const ctx = surface.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 1,
      height = 1,
      frame = 0,
      last = 0;
    const pointer = { x: -1000, y: -1000, active: false };
    const flakes = Array.from({ length: innerWidth < 768 ? 100 : 180 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.8 + Math.random() * 2.1,
      vx: 0,
      vy: 0,
      alpha: 0.25 + Math.random() * 0.6,
    }));
    const bursts: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const resize = () => {
      const box = element.getBoundingClientRect(),
        dpr = Math.min(devicePixelRatio, 2);
      width = box.width;
      height = box.height;
      surface.width = width * dpr;
      surface.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
      pointer.active = true;
    };
    const press = (event: PointerEvent) => {
      move(event);
      if (reduced) return;
      for (let i = 0; i < 34; i++) {
        const angle = Math.random() * Math.PI * 2,
          speed = 2 + Math.random() * 5;
        bursts.push({
          x: pointer.x,
          y: pointer.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
        });
      }
    };
    const leave = () => {
      pointer.active = false;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    const paint = (time: number) => {
      const step = Math.min((time - last) / 16.67 || 1, 2);
      last = time;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getComputedStyle(element).getPropertyValue("--particle-ink").trim();
      for (const flake of flakes) {
        let x = flake.x * width,
          y = flake.y * height;
        const dx = x - pointer.x,
          dy = y - pointer.y,
          distance = Math.hypot(dx, dy);
        if (!reduced && pointer.active && distance < 165) {
          const force = (1 - distance / 165) * 3.8;
          flake.vx += (dx / Math.max(distance, 1)) * force;
          flake.vy += (dy / Math.max(distance, 1)) * force;
        }
        flake.vx *= 0.94;
        flake.vy *= 0.94;
        if (!reduced) {
          x += (flake.vx + Math.sin(time / 2800 + flake.size) * 0.6 + 0.25) * step;
          y += (flake.vy + flake.size * 0.4) * step;
        }
        if (y > height + 8) y = -8;
        if (y < -10) y = height + 4;
        if (x > width + 8) x = -8;
        if (x < -10) x = width + 4;
        flake.x = x / width;
        flake.y = y / height;
        ctx.globalAlpha = flake.alpha;
        ctx.beginPath();
        ctx.arc(x, y, flake.size, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = bursts.length - 1; i >= 0; i--) {
        const burst = bursts[i];
        if (!burst) continue;
        burst.x += burst.vx * step;
        burst.y += burst.vy * step;
        burst.vx *= 0.97;
        burst.vy *= 0.97;
        burst.life -= 0.018 * step;
        if (burst.life <= 0) {
          bursts.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = burst.life;
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, 1.7 * burst.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduced) frame = requestAnimationFrame(paint);
    };
    paint(0);
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerdown", press, { passive: true });
    element.addEventListener("pointerleave", leave);
    element.addEventListener("pointerup", leave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerdown", press);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointerup", leave);
    };
  }, [host]);
  return (
    <canvas
      ref={canvas}
      className="trail-particles pointer-events-none absolute inset-0 z-[3] h-full w-full"
      aria-hidden
    />
  );
}
