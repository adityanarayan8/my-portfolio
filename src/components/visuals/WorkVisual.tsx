"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Work } from "@/data/content";
import { seededRandom as rng } from "@/lib/hooks";

function r2(value: number) {
  return Math.round(value * 100) / 100;
}

const W = 400;
const H = 200;

const LINE = "rgba(233,240,251,0.16)";
const DOT = "rgba(233,240,251,0.45)";
const ACCENT = "var(--accent)";

function GraphMotif({ active }: { active: boolean }) {
  const columns = [
    [0.28, 0.62],
    [0.2, 0.5, 0.8],
    [0.34, 0.66],
    [0.5],
  ];
  const nodes = columns.flatMap((column, ci) =>
    column.map((y, ri) => ({
      id: `${ci}-${ri}`,
      x: 50 + ci * 100,
      y: y * H,
      column: ci,
    })),
  );
  const edges = nodes.flatMap((node) =>
    nodes
      .filter((other) => other.column === node.column + 1)
      .map((other) => ({ from: node, to: other })),
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden="true">
      <g>
        {edges.map((edge, i) => (
          <motion.line
            key={`${edge.from.id}-${edge.to.id}`}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke={active ? ACCENT : LINE}
            strokeWidth="1"
            initial={false}
            animate={{ opacity: active ? 0.55 : 0.35 }}
            transition={{ duration: 0.5, delay: active ? i * 0.02 : 0 }}
          />
        ))}
      </g>
      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.column === 3 ? 5 : 3}
          fill={node.column === 3 && active ? ACCENT : DOT}
          className="transition-[fill] duration-500"
        />
      ))}
    </svg>
  );
}

function MeshMotif({ active }: { active: boolean }) {
  const random = rng(7);
  const points = Array.from({ length: 34 }, () => ({
    x: r2(20 + random() * (W - 40)),
    y: r2(18 + random() * (H - 36)),
    r: r2(1.2 + random() * 2.2),
  }));
  const edges: { a: number; b: number }[] = [];
  points.forEach((p, i) => {
    points.forEach((q, j) => {
      if (j <= i) return;
      if (Math.hypot(p.x - q.x, p.y - q.y) < 58) edges.push({ a: i, b: j });
    });
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden="true">
      {edges.map((edge) => (
        <line
          key={`${edge.a}-${edge.b}`}
          x1={points[edge.a].x}
          y1={points[edge.a].y}
          x2={points[edge.b].x}
          y2={points[edge.b].y}
          stroke={LINE}
          strokeWidth="0.75"
        />
      ))}
      {points.map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r={point.r}
          initial={false}
          animate={{
            fill: active && i % 4 === 0 ? "#4ade80" : "rgba(233,240,251,0.42)",
            scale: active && i % 4 === 0 ? 1.6 : 1,
          }}
          style={{ transformOrigin: `${point.x}px ${point.y}px` }}
          transition={{ duration: 0.6, delay: active ? (i % 9) * 0.03 : 0 }}
        />
      ))}
    </svg>
  );
}

function RotorMotif({ active }: { active: boolean }) {
  const cx = W / 2;
  const cy = H / 2;
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const angle = (i / 48) * Math.PI * 2;
    const outer = i % 4 === 0 ? 76 : 70;
    return {
      x1: r2(cx + Math.cos(angle) * 60),
      y1: r2(cy + Math.sin(angle) * 60),
      x2: r2(cx + Math.cos(angle) * outer),
      y2: r2(cy + Math.sin(angle) * outer),
      major: i % 4 === 0,
    };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden="true">
      <g fill="none" stroke={LINE}>
        {[40, 58, 76].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <motion.g
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 24, repeat: active ? Infinity : 0, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.major ? ACCENT : LINE}
            strokeWidth={tick.major ? 1.1 : 0.75}
            opacity={tick.major ? 0.7 : 1}
          />
        ))}
      </motion.g>
      <circle cx={cx} cy={cy} r="10" fill="none" stroke={LINE} />
      <motion.path
        d={`M20 ${H - 24} C 90 ${H - 24}, 120 40, 190 40 S 300 ${H - 30}, 380 ${H - 30}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.2"
        opacity="0.45"
        initial={false}
        animate={{ pathLength: active ? 1 : 0.4 }}
        transition={{ duration: 1.2 }}
      />
    </svg>
  );
}

function WaveMotif({ active }: { active: boolean }) {
  const random = rng(21);
  const bars = Array.from({ length: 56 }, (_, i) => {
    const envelope = Math.sin((i / 56) * Math.PI);
    return r2(Math.max(0.08, envelope * (0.35 + random() * 0.65)));
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden="true">
      {bars.map((value, i) => {
        const height = r2(value * (H - 60));
        const resting = r2(height * 0.6);
        const x = r2(20 + i * ((W - 40) / bars.length));
        return (
          <motion.rect
            key={i}
            x={x}
            width="2.4"
            rx="1.2"
            initial={false}
            animate={{
              height: active ? height : resting,
              y: r2(H / 2 - (active ? height : resting) / 2),
              fill:
                active && i % 7 === 0 ? "#4ade80" : "rgba(233,240,251,0.32)",
            }}
            transition={{ duration: 0.5, delay: active ? i * 0.008 : 0 }}
          />
        );
      })}
    </svg>
  );
}

export function WorkVisual({
  variant,
  active,
}: {
  variant: Work["visual"];
  active: boolean;
}) {
  const reduced = useReducedMotion();
  const live = active && !reduced;

  switch (variant) {
    case "graph":
      return <GraphMotif active={live} />;
    case "mesh":
      return <MeshMotif active={live} />;
    case "rotor":
      return <RotorMotif active={live} />;
    case "wave":
      return <WaveMotif active={live} />;
  }
}
