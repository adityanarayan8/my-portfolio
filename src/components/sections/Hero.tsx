"use client";

import { motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { person } from "@/data/content";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { useMounted } from "@/lib/hooks";
import { Gears } from "@/components/visuals/Gears";
import { MagneticLink } from "@/components/ui/MagneticLink";

const MochaScene = dynamic(() => import("@/components/three/MochaScene"), {
  ssr: false,
});

function MaskedLine({ text, delay }: { text: string; delay: number }) {
  const reduced = useReducedMotion();

  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: reduced ? 0 : "100%", opacity: reduced ? 0 : 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.05, delay, ease: EASE_OUT_EXPO }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const mounted = useMounted();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
  });

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div aria-hidden="true" className="grid-field absolute inset-0 z-0" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        className="absolute inset-y-0 left-0 z-[1] hidden w-[46%] pb-28 lg:block"
      >
        {mounted ? <MochaScene /> : null}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-1.5">
          <p className="font-display text-[1.75rem] leading-none text-ink">
            White Mocha
          </p>
          <p className="mono-xs uppercase tracking-[0.22em] text-faint">
            Fuelled by caffeine
          </p>
        </div>
      </motion.div>

      <div className="wrap pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-center gap-8 pb-24 pt-[calc(var(--nav-h)+2rem)]">
        <div className="pointer-events-auto relative lg:ml-auto lg:w-[54%]">
          <Gears />

          <div className="relative">
            <motion.p {...rise(0.12)} className="eyebrow eyebrow-lg mb-7 text-accent">
              {person.discipline}
            </motion.p>

            <h1 className="display text-[clamp(3rem,9vw,7rem)] text-ink">
              <span className="sr-only">{person.name}</span>
              <span aria-hidden="true">
                <MaskedLine text={person.first} delay={0.2} />
                <MaskedLine text={person.last} delay={0.3} />
              </span>
            </h1>

            <motion.p
              {...rise(0.55)}
              className="mt-7 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight text-ink"
            >
              {person.motto}
            </motion.p>

            <motion.div {...rise(0.68)} className="mt-9 flex flex-wrap gap-3">
              <MagneticLink href="#work" variant="solid">
                My work
                <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
                  <path
                    d="M9 1l4 4-4 4M13 5H0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </MagneticLink>
              <MagneticLink href="#contact">Contact me</MagneticLink>
            </motion.div>
          </div>
        </div>

        <motion.div {...rise(0.5)} className="pointer-events-auto w-full lg:hidden">
          <div className="relative h-[28svh] min-h-[200px] w-full">
            {mounted ? <MochaScene /> : null}
          </div>
          <div className="mt-3 flex flex-col items-center gap-1.5">
            <p className="font-display text-2xl leading-none text-ink">
              White Mocha
            </p>
            <p className="mono-xs uppercase tracking-[0.22em] text-faint">
              Fuelled by caffeine
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        {...rise(0.95)}
        className="absolute inset-x-0 bottom-7 z-10 flex justify-center"
      >
        <span className="flex flex-col items-center gap-2">
          <span className="mono-xs uppercase tracking-[0.28em] text-faint">
            Scroll
          </span>
          <span
            aria-hidden="true"
            className="relative block h-9 w-px overflow-hidden bg-line"
          >
            <motion.span
              className="absolute inset-x-0 top-0 block h-4 bg-accent"
              animate={reduced ? undefined : { y: ["-100%", "260%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </span>
      </motion.div>
    </section>
  );
}
