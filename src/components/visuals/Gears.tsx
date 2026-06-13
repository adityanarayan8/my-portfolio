"use client";

import { motion, useReducedMotion } from "motion/react";

function gearPath(teeth: number, outer: number, inner: number, hub: number) {
  const step = (Math.PI * 2) / teeth;
  const commands: string[] = [];

  for (let i = 0; i < teeth; i += 1) {
    const a0 = i * step;
    const a1 = a0 + step * 0.32;
    const a2 = a0 + step * 0.5;
    const a3 = a0 + step * 0.82;

    const point = (angle: number, radius: number) =>
      `${(Math.cos(angle) * radius).toFixed(2)} ${(Math.sin(angle) * radius).toFixed(2)}`;

    commands.push(
      `${i === 0 ? "M" : "L"}${point(a0, inner)}`,
      `L${point(a0 + step * 0.08, outer)}`,
      `L${point(a1, outer)}`,
      `L${point(a2, inner)}`,
      `L${point(a3, inner)}`,
    );
  }
  commands.push("Z");
  commands.push(
    `M${hub.toFixed(2)} 0`,
    `A${hub.toFixed(2)} ${hub.toFixed(2)} 0 1 0 ${(-hub).toFixed(2)} 0`,
    `A${hub.toFixed(2)} ${hub.toFixed(2)} 0 1 0 ${hub.toFixed(2)} 0`,
    "Z",
  );

  return commands.join(" ");
}

type GearProps = {
  teeth: number;
  size: number;
  duration: number;
  reverse?: boolean;
  className?: string;
  color: string;
  opacity?: number;
};

function Gear({
  teeth,
  size,
  duration,
  reverse = false,
  className,
  color,
  opacity = 1,
}: GearProps) {
  const reduced = useReducedMotion();
  const path = gearPath(teeth, 100, 78, 26);

  return (
    <motion.svg
      viewBox="-110 -110 220 220"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      style={{ opacity }}
      animate={reduced ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <path d={path} fill="none" stroke={color} strokeWidth="2" fillRule="evenodd" />
      <circle r="52" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </motion.svg>
  );
}

export function Gears() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Gear
        teeth={18}
        size={520}
        duration={44}
        color="var(--accent)"
        opacity={0.16}
        className="absolute -left-24 top-[6%] md:left-[6%] md:top-[4%]"
      />
      <Gear
        teeth={12}
        size={280}
        duration={30}
        reverse
        color="var(--cyan)"
        opacity={0.16}
        className="absolute right-[8%] top-[38%] md:right-[16%] md:top-[30%]"
      />
      <Gear
        teeth={22}
        size={380}
        duration={58}
        color="var(--pink)"
        opacity={0.12}
        className="absolute -right-20 bottom-[6%] md:right-[2%] md:bottom-[10%]"
      />
    </div>
  );
}
