"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { experience, sections } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const meta = sections[1];

export function Experience() {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 65%", "end 85%"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleY = useTransform(smoothed, (value) => Math.max(value, 0.02));

  return (
    <Section
      id={meta.id}
      className="border-t border-line"
      labelledBy="experience-heading"
    >
      <div className="wrap">
        <SectionHeading
          headingId="experience-heading"
          index={meta.index}
          label={meta.label}
        />

        <div ref={container} className="relative">

          <div
            aria-hidden="true"
            className="absolute left-0 top-2 hidden h-full w-px bg-line md:block"
          >
            <motion.div
              className="h-full w-px origin-top bg-accent"
              style={reduced ? { scaleY: 1 } : { scaleY }}
            />
          </div>

          <ul className="md:pl-10 lg:pl-16">
            {experience.map((role, i) => (
              <Reveal
                as="li"
                key={role.id}
                delay={0.04 * i}
                className="group relative border-b border-line py-7 first:border-t md:py-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-10 top-[2.6rem] hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[color:var(--line-strong)] transition-colors duration-500 group-hover:bg-accent md:block lg:-left-16"
                />

                <div className="grid gap-3 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
                      {role.period}
                    </p>
                    <p className="mt-1 font-mono text-xs text-faint">
                      {role.location}
                    </p>
                  </div>

                  <div className="md:col-span-9">
                    <h3 className="h-section text-ink">{role.org}</h3>
                    {role.orgNote ? (
                      <p className="mt-1 text-xs text-faint">{role.orgNote}</p>
                    ) : null}
                    {role.role ? (
                      <p className="mt-2.5 text-sm uppercase tracking-[0.1em] text-accent">
                        {role.role}
                      </p>
                    ) : null}
                    <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-dim md:text-base">
                      {role.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-faint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
