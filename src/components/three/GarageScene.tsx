"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { ACESFilmicToneMapping } from "three";
import type { GarageCar } from "@/data/garage";
import { useInViewport, useMediaQuery } from "@/lib/hooks";
import { DragRotate } from "./DragRotate";
import { LoadedCar, type ModelStats } from "./LoadedCar";
import { HdriEnvironment, RoomEnvironmentLighting } from "./Studio";
import { supportsWebGL } from "./webgl";

export default function GarageScene({
  car,
  onStats,
}: {
  car: GarageCar;
  onStats?: (stats: ModelStats) => void;
}) {
  const [host, visible] = useInViewport<HTMLDivElement>("200px");
  const [webgl] = useState(supportsWebGL);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const small = useMediaQuery("(max-width: 767px)");

  if (!webgl) return null;

  return (
    <div
      ref={host}
      aria-hidden="true"
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [0, 0.62, 5.0], fov: 32 }}
        dpr={[1, small ? 1.5 : 2]}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <Suspense fallback={<RoomEnvironmentLighting />}>
          {small ? <RoomEnvironmentLighting /> : <HdriEnvironment />}
        </Suspense>

        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 7, 4]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#cfe3ff" />

        <DragRotate spin={reduced ? 0 : 0.28} tiltLimit={0.28} paused={reduced}>
          <Suspense fallback={null}>
            <LoadedCar car={car} onStats={onStats} />
          </Suspense>
        </DragRotate>
      </Canvas>
    </div>
  );
}
