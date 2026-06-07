"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { ACESFilmicToneMapping } from "three";
import { useInViewport, useMediaQuery } from "@/lib/hooks";
import { DragRotate } from "./DragRotate";
import { MochaCup } from "./MochaCup";
import { HdriEnvironment, RoomEnvironmentLighting } from "./Studio";
import { supportsWebGL } from "./webgl";

export default function MochaScene() {
  const [host, visible] = useInViewport<HTMLDivElement>("150px");
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
        camera={{ position: [0, 0.4, 4.3], fov: 34 }}
        dpr={[1, small ? 1.5 : 2]}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        <Suspense fallback={<RoomEnvironmentLighting />}>
          {small ? <RoomEnvironmentLighting /> : <HdriEnvironment />}
        </Suspense>

        <ambientLight intensity={0.2} />
        <directionalLight position={[3, 6, 4]} intensity={1.8} color="#fff6ea" />
        <directionalLight position={[-4, 2, -3]} intensity={0.7} color="#cfe2ff" />
        <pointLight position={[0, 0.6, 3]} intensity={2.2} color="#ffffff" />

        <DragRotate spin={reduced ? 0 : 0.26} tiltLimit={0.32} paused={reduced}>
          <MochaCup detailed={!small} />
        </DragRotate>
      </Canvas>
    </div>
  );
}
