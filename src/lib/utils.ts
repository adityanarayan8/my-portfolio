export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
