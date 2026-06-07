"use client";

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { useInViewport, useMediaQuery } from "@/lib/hooks";
import { Campanile } from "./Campanile";
import { DragRotate } from "./DragRotate";
import { RoomEnvironmentLighting } from "./Studio";
import { supportsWebGL } from "./webgl";

export default function CampanileScene() {
  const [host, visible] = useInViewport<HTMLDivElement>("150px");
  const [webgl] = useState(supportsWebGL);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (!webgl) return null;

  return (
    <div
      ref={host}
      aria-hidden="true"
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [2.2, 0.9, 6.4], fov: 34 }}
        dpr={[1, 1.6]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <RoomEnvironmentLighting />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 4]} intensity={2.4} color="#fff4e2" />
        <directionalLight position={[-4, 3, -5]} intensity={0.9} color="#a8c8ff" />

        <DragRotate spin={reduced ? 0 : 0.2} tiltLimit={0.2} paused={reduced}>
          <Campanile />
        </DragRotate>

      </Canvas>
    </div>
  );
}
