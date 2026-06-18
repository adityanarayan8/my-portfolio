import { sections, work } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkCard } from "@/components/ui/WorkCard";

const meta = sections[2];

export function Work() {
  return (
    <Section id={meta.id} className="border-t border-line" labelledBy="work-heading">
      <div className="wrap">
        <SectionHeading
          headingId="work-heading"
          index={meta.index}
          label={meta.label}
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-7">
          {work.map((item, i) => (
            <WorkCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
