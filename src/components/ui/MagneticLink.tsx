"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  external?: boolean;
  strength?: number;
};

export function MagneticLink({
  href,
  children,
  variant = "outline",
  className,
  external = false,
  strength = 0.32,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function handleMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300",
        variant === "solid"
          ? "bg-[color:var(--text)] text-[color:var(--ink-invert)] hover:bg-[color:var(--accent)]"
          : "border border-line-strong bg-[color:var(--surface)] text-ink hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
