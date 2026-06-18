import { links, person, sections } from "@/data/content";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const meta = sections[4];

const channels = [
  { ...links.email, external: false, hint: "Best for anything substantive" },
  { ...links.linkedin, external: true, hint: "Roles, referrals, hellos" },
  { ...links.github, external: true, hint: "Code, when it's public" },
];

export function Contact() {
  return (
    <Section
      id={meta.id}
      labelledBy="contact-heading"
      className="relative overflow-hidden border-t border-line"
    >
      <div aria-hidden="true" className="grid-field absolute inset-0 opacity-70" />

      <div className="wrap relative">
        <Reveal>
          <div className="flex items-center gap-4 pb-12">
            <span className="mono-xs text-accent tabular-nums">{`// ${meta.index}`}</span>
            <span className="eyebrow">{meta.label}</span>
          </div>
        </Reveal>

        <Reveal>
          <h2
            id="contact-heading"
            className="display text-[clamp(2.6rem,9vw,7rem)] text-ink"
          >
            Tell me
            <br />
            what you&rsquo;re
            <br />
            building.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-10 max-w-md body-lg">
            Open to machine learning &amp; software engineering internships and
            research collaborations. The inbox is the fastest way in.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-wrap gap-3">
            <MagneticLink href={links.email.href} variant="solid">
              Email
              <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
                <path
                  d="M9 1l4 4-4 4M13 5H0"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
              </svg>
            </MagneticLink>
            <MagneticLink href={links.linkedin.href} external>
              LinkedIn
            </MagneticLink>
            <MagneticLink href={links.github.href} external>
              GitHub
            </MagneticLink>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="mt-14 grid gap-px border-t border-line md:grid-cols-3">
            {channels.map((channel) => (
              <li key={channel.label} className="border-b border-line md:border-b-0">
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex flex-col gap-1 py-5 pr-6 transition-colors duration-300 hover:text-accent"
                >
                  <span className="mono-xs uppercase text-faint">
                    {channel.label}
                  </span>
                  <span className="link-underline w-fit text-sm text-ink">
                    {channel.display}
                  </span>
                  <span className="mt-1 text-xs text-faint">{channel.hint}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <footer className="mt-16 flex flex-col gap-3 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="mono-xs uppercase text-faint">
            © {new Date().getFullYear()} {person.name}
          </p>
          <p className="mono-xs uppercase text-faint">
            {person.location} · {person.discipline}
          </p>
          <a
            href="#top"
            className="mono-xs uppercase text-faint transition-colors hover:text-accent"
          >
            Back to top ↑
          </a>
        </footer>
      </div>
    </Section>
  );
}
