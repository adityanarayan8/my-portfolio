"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { links, person, sections } from "@/data/content";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const sync = useCallback(() => {
    setScrolled(window.scrollY > 24);

    const marker = window.innerHeight * 0.34;
    let current = "";
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top <= marker) current = section.id;
    }
    setActive(current);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        sync();
        frame = 0;
      });
    };

    const initial = requestAnimationFrame(sync);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(initial);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sync]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
          scrolled
            ? "border-b border-line bg-[rgba(9,17,30,0.72)] backdrop-blur-xl"
            : "border-b border-transparent",
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <nav
          aria-label="Primary"
          className="wrap flex h-full items-center justify-between gap-6"
        >
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${person.name}, back to top`}
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-[1px] bg-accent transition-transform duration-500 group-hover:rotate-45"
            />
            <span className="font-mono text-xs tracking-[0.22em] text-ink">
              {person.initials}
            </span>
            <span className="hidden whitespace-nowrap text-xs text-faint sm:inline lg:hidden xl:inline">
              / {person.positioning}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors duration-300 xl:px-3",
                      isActive ? "text-ink" : "text-faint hover:text-dim",
                    )}
                  >
                    <span
                      className={cn(
                        "text-[0.6rem] tabular-nums transition-colors duration-300",
                        isActive ? "text-accent" : "text-transparent",
                      )}
                    >
                      {section.index}
                    </span>
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={links.email.href}
              className="hidden whitespace-nowrap rounded-full border border-line-strong px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent sm:inline-block"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
                <path d="M0 1h16M0 9h10" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-50 bg-[rgba(9,17,30,0.97)] backdrop-blur-xl lg:hidden"
          >
            <div className="wrap flex h-full flex-col">
              <div
                className="flex items-center justify-between"
                style={{ height: "var(--nav-h)" }}
              >
                <span className="font-mono text-xs tracking-[0.22em] text-dim">
                  {person.initials}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  autoFocus
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink"
                >
                  <span className="sr-only">Close menu</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </button>
              </div>

              <ul className="mt-6 flex flex-1 flex-col justify-center gap-1">
                {sections.map((section, i) => (
                  <motion.li
                    key={section.id}
                    initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: reduced ? 0 : 0.04 * i,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    <a
                      href={`#${section.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-line py-4"
                    >
                      <span className="font-mono text-[0.65rem] text-accent tabular-nums">
                        {section.index}
                      </span>
                      <span className="display text-[2.1rem] text-ink">
                        {section.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="pb-10 pt-6">
                <a
                  href={links.email.href}
                  className="block font-mono text-xs text-dim underline-offset-4 hover:text-accent"
                >
                  {links.email.display}
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
