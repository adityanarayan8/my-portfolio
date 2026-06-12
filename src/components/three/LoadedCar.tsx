"use client";

import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Box3, Mesh, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import type { GarageCar } from "@/data/garage";
import { ContactShadow } from "./Studio";

export type ModelStats = {
  triangles: number;
  meshes: number;
  materials: number;
  textures: number;
  size: { x: number; y: number; z: number };
};

export function LoadedCar({
  car,
  onStats,
}: {
  car: GarageCar;
  onStats?: (stats: ModelStats) => void;
}) {
  const viewport = useThree((state) => state.viewport);
  const gltf = useLoader(GLTFLoader, car.modelUrl, (loader) => {
    (loader as GLTFLoader).setMeshoptDecoder(MeshoptDecoder);
  });

  const { scene, offset, footprint, stats } = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const box = new Box3().setFromObject(cloned, true);
    const size = box.getSize(new Vector3());
    const centre = box.getCenter(new Vector3());

    let triangles = 0;
    let meshes = 0;
    const materials = new Set<string>();
    const textures = new Set<string>();

    cloned.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      meshes += 1;
      const index = mesh.geometry.getIndex();
      const position = mesh.geometry.getAttribute("position");
      triangles += index
        ? index.count / 3
        : position
          ? position.count / 3
          : 0;
      for (const material of Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material]) {
        if (!material) continue;
        materials.add(material.uuid);
        for (const value of Object.values(material)) {
          const texture = value as { isTexture?: boolean; uuid?: string };
          if (texture?.isTexture && texture.uuid) textures.add(texture.uuid);
        }
      }
    });

    return {
      scene: cloned,
      offset: centre,
      footprint: size,
      stats: {
        triangles: Math.round(triangles),
        meshes,
        materials: materials.size,
        textures: textures.size,
        size: { x: size.x, y: size.y, z: size.z },
      } satisfies ModelStats,
    };
  }, [gltf]);

  useEffect(() => {
    onStats?.(stats);
  }, [onStats, stats]);

  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        const mesh = child as Mesh;
        if (mesh.isMesh) mesh.geometry?.dispose?.();
      });
    };
  }, [scene]);

  const span = Math.max(footprint.x, footprint.z);
  const baseYaw = footprint.z > footprint.x ? Math.PI / 2 : 0;
  const fit = Math.min(
    viewport.width / (span * 1.26),
    viewport.height / (footprint.y * 2.1),
  );

  return (
    <group scale={fit} position={[0, (-footprint.y / 2) * fit, 0]}>
      <ContactShadow width={span} depth={span} opacity={0.4} />

      <group rotation={[0, baseYaw + car.yaw, 0]}>
        <primitive
          object={scene}
          position={[-offset.x, -offset.y + footprint.y / 2, -offset.z]}
        />
      </group>
    </group>
  );
}
