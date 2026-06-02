export type GarageCar = {
  id: string;
  name: string;
  modelUrl: string;
  yaw: number;
  credit: string;
  license: string;
  licenseUrl: string;
  source: string;
};

export const cars: GarageCar[] = [
  {
    id: "concept",
    name: "Vermilion GT",
    modelUrl: "/models/car-concept.glb",
    yaw: -0.5,
    credit: "Darmstadt Graphics Group GmbH",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    source: "Khronos glTF Sample Assets",
  },
  {
    id: "toy",
    name: "Emerald Coupé",
    modelUrl: "/models/car-toy.glb",
    yaw: 2.5,
    credit: "Public domain",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: "Khronos glTF Sample Assets",
  },
];

export function carForDate(date: Date) {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const current = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const day = Math.floor((current - start) / 86_400_000);
  return cars[day % cars.length];
}
