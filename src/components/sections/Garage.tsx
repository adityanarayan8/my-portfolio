"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { carForDate, cars } from "@/data/garage";
import { useMounted } from "@/lib/hooks";
import type { ModelStats } from "@/components/three/LoadedCar";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const GarageScene = dynamic(() => import("@/components/three/GarageScene"), {
  ssr: false,
});

const formatter = new Intl.NumberFormat("en-US");

export function Garage() {
  const mounted = useMounted();
  const today = useMemo(() => (mounted ? new Date() : null), [mounted]);
  const [carId, setCarId] = useState<string | null>(null);
  const [reported, setReported] = useState<{
    id: string;
    stats: ModelStats;
  } | null>(null);

  const daily = today ? carForDate(today) : cars[0];
  const car = cars.find((entry) => entry.id === carId) ?? daily;

  const stats = reported?.id === car.id ? reported.stats : null;
  const handleStats = useCallback(
    (next: ModelStats) => setReported({ id: car.id, stats: next }),
    [car.id],
  );

  const stamp = today
    ? today.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const metres = (value: number) => `${value.toFixed(2)} m`;
  const readout = stats
    ? [
        { label: "Length", value: metres(Math.max(stats.size.x, stats.size.z)) },
        { label: "Width", value: metres(Math.min(stats.size.x, stats.size.z)) },
        { label: "Height", value: metres(stats.size.y) },
        { label: "Triangles", value: formatter.format(stats.triangles) },
      ]
    : [
        { label: "Length", value: "··" },
        { label: "Width", value: "··" },
        { label: "Height", value: "··" },
        { label: "Triangles", value: "··" },
      ];

  return (
    <section
      id="garage"
      aria-labelledby="garage-heading"
      className="relative border-t border-line py-20 md:py-24"
    >
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 pb-10">
            <span className="mono-xs text-accent">◇</span>
            <h2 className="eyebrow" id="garage-heading">
              Concept car of the day
            </h2>
            <span className="ml-auto mono-xs uppercase text-faint">
              {stamp || "··"}
            </span>
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-7 md:self-stretch">
            <div className="stage relative h-[20rem] overflow-hidden rounded-xl md:h-full md:min-h-[27rem]">
              {mounted ? (
                <GarageScene car={car} onStats={handleStats} />
              ) : null}
            </div>
          </Reveal>

          <div className="md:col-span-5">
            <Reveal delay={0.06}>
              <h3 className="h-statement text-ink">{car.name}</h3>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-[color:var(--line)]">
                {readout.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 bg-[color:var(--surface)] px-5 py-4"
                  >
                    <dt className="mono-xs uppercase text-faint">{item.label}</dt>
                    <dd className="font-display text-2xl text-ink tabular-nums">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {cars.length > 1 ? (
              <Reveal delay={0.14}>
                <div className="mt-7 flex flex-wrap gap-2">
                  {cars.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setCarId(entry.id)}
                      aria-pressed={entry.id === car.id}
                      className={cn(
                        "rounded-lg border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] transition-colors duration-300",
                        entry.id === car.id
                          ? "border-[color:var(--accent-line)] bg-accent-soft text-ink"
                          : "border-line text-faint hover:border-line-strong hover:text-dim",
                      )}
                    >
                      {entry.name}
                    </button>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.18}>
              <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-faint">
                Model: {car.credit}, {car.source}.{" "}
                <a
                  href={car.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer license"
                  className="link-underline text-dim hover:text-accent"
                >
                  {car.license}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
