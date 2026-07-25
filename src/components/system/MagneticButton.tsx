import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function MagneticButton({
  children,
  className,
  onClick,
  disabled,
  as = "button",
  href,
  radius = 80,
  strength = 0.35,
  cursorLabel = "book",
  type,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  as?: "button" | "a" | "div";
  href?: string;
  radius?: number;
  strength?: number;
  cursorLabel?: string;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist < radius + Math.max(rect.width, rect.height) / 2) {
      x.set(dx * strength);
      y.set(dy * strength);
    }
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Cmp: any = motion[as];
  return (
    <Cmp
      ref={ref as any}
      href={href}
      type={type}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={disabled ? undefined : onClick}
      data-cursor={disabled ? "disabled" : cursorLabel}
      className={className}
      aria-disabled={disabled}
    >
      {children}
    </Cmp>
  );
}
