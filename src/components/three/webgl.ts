let support: boolean | null = null;

export function supportsWebGL() {
  if (support !== null) return support;
  try {
    const canvas = document.createElement("canvas");
    support = Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
    );
  } catch {
    support = false;
  }
  return support;
}
