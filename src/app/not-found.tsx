import type { Metadata } from "next";
import Link from "next/link";
import { person } from "@/data/content";

export const metadata: Metadata = {
  title: `Page not found · ${person.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="mono-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="display text-[clamp(2.4rem,7vw,4.5rem)] text-ink">
        Nothing here.
      </h1>
      <p className="max-w-sm body-lg">
        That page does not exist, or it moved.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[color:var(--text)] px-6 py-3 text-sm font-medium text-[color:var(--ink-invert)] transition-colors duration-300 hover:bg-[color:var(--accent)]"
      >
        Back to the start
      </Link>
    </main>
  );
}
