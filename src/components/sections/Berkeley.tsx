"use client";

import dynamic from "next/dynamic";
import { berkeley, sections } from "@/data/content";
import { useMounted } from "@/lib/hooks";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const CampanileScene = dynamic(
  () => import("@/components/three/CampanileScene"),
  { ssr: false },
);

const MochaScene = dynamic(() => import("@/components/three/MochaScene"), {
  ssr: false,
});

const meta = sections[0];

export function Berkeley() {
  const mounted = useMounted();

  return (
    <Section
      id={meta.id}
      className="border-t border-line"
      labelledBy="berkeley-heading"
    >
      <div className="wrap">
        <Reveal>
          <div className="flex items-center gap-3 pb-8">
            <span className="mono-xs text-accent tabular-nums">{`// ${meta.index}`}</span>
            <span className="eyebrow">{meta.label}</span>
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Reveal>
              <h2 id="berkeley-heading" className="h-statement text-ink">
                {berkeley.institution}
              </h2>
              <p className="mt-4 font-display text-3xl text-accent md:text-3xl">
                {berkeley.cheer}
              </p>
            </Reveal>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {berkeley.badges.map((badge, i) => (
                <Reveal key={badge.label} delay={0.04 * i}>
                  <div className="chip w-full flex-col items-center gap-1 px-5 py-4 text-center">
                    <span className="font-display text-xl text-ink">
                      {badge.label}
                    </span>
                    <span className="mono-xs whitespace-pre-line uppercase text-faint">
                      {badge.note}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:col-span-5">
            <Reveal delay={0.1} className="flex-1">
              <div className="stage relative h-[24rem] overflow-hidden rounded-xl pb-9 md:h-full md:min-h-[24rem]">
                {mounted ? <CampanileScene /> : null}
                <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center mono-xs uppercase text-faint">
                  Sather Tower
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="stage relative h-[15rem] overflow-hidden rounded-xl pb-9">
                {mounted ? <MochaScene /> : null}
                <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center mono-xs uppercase text-faint">
                  Iced white mocha
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14">
          <Reveal>
            <p className="eyebrow mb-5 text-faint">Relevant coursework</p>
          </Reveal>
          <ul className="grid gap-3 md:grid-cols-2">
            {berkeley.courses.map((course, i) => (
              <Reveal as="li" key={course.code} delay={0.03 * i}>
                <div className="chip w-full items-start gap-4 px-5 py-4">
                  <span className="mt-0.5 font-mono text-xs font-medium text-accent">
                    {course.code}
                  </span>
                  <span className="text-sm leading-snug text-dim">
                    {course.title}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
