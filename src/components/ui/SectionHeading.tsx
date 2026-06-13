import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  headingId?: string;
};

export function SectionHeading({
  index,
  label,
  headingId,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="mono-xs text-accent tabular-nums">{`// ${index}`}</span>
          <span
            aria-hidden="true"
            className="h-px flex-1 max-w-[8rem] bg-line"
          />
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 id={headingId} className="mt-5 h-title text-ink">
          {label}
        </h2>
      </Reveal>
    </div>
  );
}
