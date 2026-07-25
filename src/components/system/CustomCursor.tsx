import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const pos = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    scaleX: 1,
    scaleY: 1,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }

      const t = e.target as HTMLElement | null;
      const cursorTrigger = t?.closest?.("[data-cursor]") as HTMLElement | null;
      const interactive = t?.closest?.("a, button, [role='button'], input, select, textarea") as HTMLElement | null;

      if (cursorTrigger) {
        setIsHovered(true);
        setLabel(""); // Hide labels like "VIEW"
      } else if (interactive) {
        setIsHovered(true);
        setLabel("");
      } else {
        setIsHovered(false);
        setLabel("");
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    let rafId: number;

    const render = () => {
      const p = pos.current;

      // Ultra-liquid smooth lerp (0.14)
      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;

      p.x += dx * 0.14;
      p.y += dy * 0.14;

      // Velocity calculation for liquid stretch effect
      p.vx = dx * 0.14;
      p.vy = dy * 0.14;
      const speed = Math.hypot(p.vx, p.vy);

      // Stretch along movement direction
      const maxStretch = 0.4;
      const stretch = Math.min(speed * 0.018, maxStretch);
      p.scaleX = 1 + stretch;
      p.scaleY = 1 - stretch * 0.45;
      p.angle = Math.atan2(p.vy, p.vx) * (180 / Math.PI);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${p.angle}deg) scale(${p.scaleX}, ${p.scaleY})`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Precision inner point */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-gold transition-opacity duration-300 hidden md:block"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      {/* Main Liquid Velocity-Stretching Ring */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] hidden md:flex items-center justify-center rounded-full transition-[width,height,background-color,border-color,box-shadow,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isClicking
          ? "h-8 w-8 bg-gold/50 border-gold shadow-[0_0_25px_rgba(201,162,76,0.7)]"
          : isHovered
            ? "h-14 w-14 border border-gold/90 bg-gold/20 shadow-[0_0_25px_rgba(201,162,76,0.3)]"
            : "h-9 w-9 border border-gold/60 bg-gold/5"
        }`}
      >
        {/* No text labels anymore, just the cursor */}
      </div>
    </>
  );
}


