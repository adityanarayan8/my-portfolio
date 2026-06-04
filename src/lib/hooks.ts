"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const noopSubscribe = () => () => {};

export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function useMediaQuery(query: string) {
  const list = useMemo(
    () => (typeof window === "undefined" ? null : window.matchMedia(query)),
    [query],
  );

  const subscribe = useCallback(
    (onChange: () => void) => {
      list?.addEventListener("change", onChange);
      return () => list?.removeEventListener("change", onChange);
    },
    [list],
  );

  return useSyncExternalStore(
    subscribe,
    () => list?.matches ?? false,
    () => false,
  );
}

export function seededRandom(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function useInViewport<T extends HTMLElement>(rootMargin = "150px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, visible] as const;
}
