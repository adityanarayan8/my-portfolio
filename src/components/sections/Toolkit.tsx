"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { sections, skills } from "@/data/content";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const meta = sections[3];

export function Toolkit() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const active = skills[index];

  function onKeyDown(event: React.KeyboardEvent) {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !back) return;
    event.preventDefault();
    const next =
      (index + (forward ? 1 : -1) + skills.length) % skills.length;
    setIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <Section id={meta.id} className="border-t border-line" labelledBy="toolkit-heading">
      <div className="wrap">
        <SectionHeading
          headingId="toolkit-heading"
          index={meta.index}
          label="Technical Toolkit"
        />

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div
            role="tablist"
            aria-label="Skill categories"
            onKeyDown={onKeyDown}
            className="flex gap-2 overflow-x-auto pb-2 md:col-span-4 md:flex-col md:gap-0 md:overflow-visible md:pb-0"
          >
            {skills.map((group, i) => {
              const selected = i === index;
              return (
                <button
                  key={group.title}
                  ref={(node) => {
                    tabs.current[i] = node;
                  }}
                  role="tab"
                  type="button"
                  id={`toolkit-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="toolkit-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2.5 text-left transition-colors duration-300 md:w-full md:rounded-none md:border-0 md:border-b md:border-line md:px-0 md:py-5",
                    selected
                      ? "border-[color:var(--accent-line)] bg-accent-soft text-ink md:bg-transparent"
                      : "border-line text-faint hover:text-dim",
                  )}
                >
                  <span
                    className={cn(
                      "mono-xs tabular-nums transition-colors duration-300",
                      selected ? "text-accent" : "text-faint",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base">{group.title}</span>
                  <span className="ml-auto hidden mono-xs uppercase text-faint md:inline">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                  {selected ? (
                    <motion.span
                      layoutId="toolkit-marker"
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-[-1px] hidden h-[2px] bg-accent md:block"
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            id="toolkit-panel"
            role="tabpanel"
            aria-labelledby={`toolkit-tab-${index}`}
            className="md:col-span-8"
          >
            <div className="mb-7 flex items-baseline justify-between gap-6 border-b border-line pb-4">
              <p className="eyebrow text-faint">{active.note}</p>
              <p className="mono-xs uppercase text-faint">
                {active.items.length} tools
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={active.title}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="flex min-h-[9rem] flex-wrap content-start gap-x-3 gap-y-3"
              >
                {active.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: reduced ? 0 : i * 0.035,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="rounded-full border border-line px-4 py-2 text-sm text-dim transition-colors duration-300 hover:border-[color:var(--accent-line)] hover:text-ink md:px-5 md:py-2.5 md:text-base"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
