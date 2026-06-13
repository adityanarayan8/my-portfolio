"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import type { Work } from "@/data/content";
import { WorkVisual } from "@/components/visuals/WorkVisual";

const SPRING = { stiffness: 150, damping: 20, mass: 0.5 };

export function WorkCard({ item, index }: { item: Work; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(74,222,128,0.09), transparent 60%)`;

  function handleMove(event: React.PointerEvent<HTMLElement>) {
    if (!ref.current || reduced || event.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 7);
    rotateX.set((0.5 - py) * 7);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
    setActive(false);
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setActive(true);
      }}
      onPointerLeave={reset}
      onFocusCapture={() => setActive(true)}
      onBlurCapture={reset}
      initial={{ opacity: 0, y: reduced ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line panel transition-colors duration-500 hover:border-[color:var(--accent-line)]"
    >
      <motion.div
        aria-hidden="true"
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative h-44 overflow-hidden border-b border-line bg-[color:var(--bg-elev)] md:h-52">
        <WorkVisual variant={item.visual} active={active} />
        <div className="absolute left-5 top-4 flex items-center gap-3">
          <span className="mono-xs text-accent tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mono-xs uppercase text-faint">{item.period}</span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-6 md:p-7">
        <p className="eyebrow text-faint">{item.affiliation}</p>
        <h3 className="mt-3 h-section text-ink">{item.name}</h3>
        <p className="mt-3 text-base leading-snug text-accent">{item.headline}</p>
        <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-dim">
          {item.description}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
          {item.outcomes.map((outcome) => (
            <div key={outcome.label} className="flex flex-col">
              <dd className="order-1 font-mono text-base text-ink tabular-nums">
                {outcome.value}
              </dd>
              <dt className="order-2 mt-1 mono-xs uppercase text-faint">
                {outcome.label}
              </dt>
            </div>
          ))}
        </dl>

        <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-6">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-faint"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
