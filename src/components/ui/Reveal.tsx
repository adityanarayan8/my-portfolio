"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/animations";

const ELEMENTS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  span: motion.span,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: keyof typeof ELEMENTS;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  once = true,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = ELEMENTS[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: reduced ? 0.3 : 0.85,
        delay: reduced ? 0 : delay,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </Tag>
  );
}
