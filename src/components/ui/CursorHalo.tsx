"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/hooks";
import { lerp } from "@/lib/utils";

const INTERACTIVE = "a, button, [role='button'], input, summary";

export function CursorHalo() {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let frame = 0;

    function onMove(event: PointerEvent) {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        visible = true;
        current.x = target.x;
        current.y = target.y;
        if (ref.current) ref.current.style.opacity = "1";
      }
      const el = event.target as HTMLElement | null;
      targetScale = el?.closest(INTERACTIVE) ? 1.85 : 1;
    }

    function onLeave() {
      visible = false;
      if (ref.current) ref.current.style.opacity = "0";
    }

    function tick() {
      current.x = lerp(current.x, target.x, 0.16);
      current.y = lerp(current.y, target.y, 0.16);
      scale = lerp(scale, targetScale, 0.14);
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      frame = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="above-grain pointer-events-none fixed left-0 top-0 h-8 w-8 rounded-full border border-[rgba(74,222,128,0.55)] opacity-0 transition-opacity duration-300"
      style={{ willChange: "transform" }}
    />
  );
}
