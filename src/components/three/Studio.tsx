"use client";

import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { CanvasTexture, PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";

export const STUDIO_HDRI = "/hdri/studio-512.hdr";

export function HdriEnvironment() {
  const gl = useThree((state) => state.gl);
  const texture = useLoader(HDRLoader, STUDIO_HDRI);

  const envMap = useMemo(() => {
    const pmrem = new PMREMGenerator(gl);
    const target = pmrem.fromEquirectangular(texture);
    pmrem.dispose();
    return target.texture;
  }, [gl, texture]);

  useEffect(() => () => envMap.dispose(), [envMap]);

  return <primitive object={envMap} attach="environment" />;
}

export function RoomEnvironmentLighting() {
  const gl = useThree((state) => state.gl);

  const texture = useMemo(() => {
    const pmrem = new PMREMGenerator(gl);
    const target = pmrem.fromScene(new RoomEnvironment(), 0.04);
    pmrem.dispose();
    return target.texture;
  }, [gl]);

  useEffect(() => () => texture.dispose(), [texture]);

  return <primitive object={texture} attach="environment" />;
}

export function ContactShadow({
  width,
  depth,
  opacity = 0.55,
}: {
  width: number;
  depth: number;
  opacity?: number;
}) {
  const texture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (context) {
      const gradient = context.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      gradient.addColorStop(0, "rgba(0,0,0,0.95)");
      gradient.addColorStop(0.45, "rgba(0,0,0,0.45)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, size, size);
    }
    return new CanvasTexture(canvas);
  }, []);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
      <planeGeometry args={[width, depth]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}
