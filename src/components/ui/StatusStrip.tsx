"use client";

import { useEffect, useState } from "react";
import { github as githubData, links } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

const BERKELEY = { latitude: 37.8716, longitude: -122.2727 };
const WEATHER_ENDPOINT =
  `https://api.open-meteo.com/v1/forecast?latitude=${BERKELEY.latitude}` +
  `&longitude=${BERKELEY.longitude}&current=temperature_2m,weather_code` +
  `&temperature_unit=fahrenheit`;
const GITHUB_ENDPOINT = `https://api.github.com/users/${links.github.display}`;

type Weather = { temperature: number; code: number } | null;
type Github = { repos: number; followers: number } | null;

function describe(code: number) {
  if (code === 0) return { text: "Clear", icon: "☀️" };
  if (code <= 2) return { text: "Mostly clear", icon: "🌤️" };
  if (code === 3) return { text: "Overcast", icon: "☁️" };
  if (code <= 48) return { text: "Foggy", icon: "🌫️" };
  if (code <= 57) return { text: "Drizzle", icon: "🌦️" };
  if (code <= 67) return { text: "Rain", icon: "🌧️" };
  if (code <= 77) return { text: "Snow", icon: "🌨️" };
  if (code <= 82) return { text: "Showers", icon: "🌧️" };
  return { text: "Storms", icon: "⛈️" };
}

export function StatusStrip() {
  const [weather, setWeather] = useState<Weather>(null);
  const [github, setGithub] = useState<Github>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(WEATHER_ENDPOINT, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data?.current) return;
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
        });
      })
      .catch(() => {});

    fetch(GITHUB_ENDPOINT, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data) return;
        setGithub({
          repos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
        });
      })
      .catch(() => {});

    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/Los_Angeles",
        }).format(new Date()),
      );
    tick();
    const timer = window.setInterval(tick, 30_000);

    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, []);

  const sky = weather ? describe(weather.code) : null;

  return (
    <section
      aria-label="Live status"
      className="border-t border-line bg-[color:var(--bg-elev)] py-12 md:py-16"
    >
      <div className="wrap grid gap-4 md:grid-cols-2 md:gap-6">
        <Reveal>
          <div className="panel h-full rounded-xl p-6 md:p-7">
            <h2 className="eyebrow text-faint">Berkeley right now</h2>
            <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3">
              <p className="font-display text-5xl text-ink tabular-nums md:text-5xl">
                {weather ? `${weather.temperature}°F` : "··"}
              </p>
              <p className="pb-1 text-sm text-dim">
                {sky ? (
                  <>
                    <span aria-hidden="true">{sky.icon}</span> {sky.text}
                  </>
                ) : (
                  "Fetching conditions"
                )}
              </p>
              <p className="pb-1 ml-auto mono-xs uppercase text-faint">
                {time ? `${time} PT` : ""}
              </p>
            </div>
            <p className="mt-5 border-t border-line pt-4 mono-xs uppercase text-faint">
              {BERKELEY.latitude}° N, {Math.abs(BERKELEY.longitude)}° W
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <a
            href={links.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group panel block h-full rounded-xl p-6 transition-colors duration-300 hover:border-[color:var(--accent-line)] md:p-7"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl text-ink">GitHub</h2>
              <span className="mono-xs uppercase text-faint transition-colors group-hover:text-accent">
                @{links.github.display} ↗
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-line bg-[color:var(--surface-hi)] px-4 py-3">
                <p className="font-display text-4xl text-ink tabular-nums">
                  {github ? github.repos : "··"}
                </p>
                <p className="mt-1 mono-xs uppercase text-faint">Repositories</p>
              </div>
              <div className="rounded-lg border border-line bg-[color:var(--surface-hi)] px-4 py-3">
                <p className="font-display text-4xl text-ink tabular-nums">
                  {githubData.contributions}
                </p>
                <p className="mt-1 mono-xs uppercase text-faint">
                  Contributions · {githubData.contributionsWindow}
                </p>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
