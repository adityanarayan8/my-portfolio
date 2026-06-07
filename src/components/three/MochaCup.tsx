"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import {
  CanvasTexture,
  CatmullRomCurve3,
  DoubleSide,
  ExtrudeGeometry,
  MeshPhysicalMaterial,
  RepeatWrapping,
  Shape,
  SRGBColorSpace,
  Vector3,
} from "three";
import { seededRandom } from "@/lib/hooks";

const CUP_TOP = 0.58;
const CUP_BOTTOM = 0.4;
const CUP_HEIGHT = 2.15;
const LIQUID_TOP = 1.62;

function wallAt(y: number) {
  return CUP_BOTTOM + (CUP_TOP - CUP_BOTTOM) * (y / CUP_HEIGHT);
}

function roundedCube(size: number, radius: number) {
  const half = size / 2 - radius;
  const shape = new Shape();
  shape.moveTo(-half - radius, -half);
  shape.lineTo(half, -half);
  shape.absarc(half, -half, radius, -Math.PI / 2, 0, false);
  shape.lineTo(half + radius, half);
  shape.absarc(half, half, radius, 0, Math.PI / 2, false);
  shape.lineTo(-half, half + radius);
  shape.absarc(-half, half, radius, Math.PI / 2, Math.PI, false);
  shape.lineTo(-half - radius, -half);
  shape.absarc(-half, -half, radius, Math.PI, 1.5 * Math.PI, false);

  const geometry = new ExtrudeGeometry(shape, {
    depth: size - radius * 2,
    bevelEnabled: true,
    bevelThickness: radius,
    bevelSize: radius,
    bevelSegments: 3,
    curveSegments: 6,
  });
  geometry.center();
  return geometry;
}

export function MochaCup({ detailed = true }: { detailed?: boolean }) {
  const viewport = useThree((state) => state.viewport);

  const totalHeight = 3.1;
  const fit = Math.min(
    viewport.width / 2.1,
    viewport.height / (totalHeight * 1.2),
  );

  const iceGeometry = useMemo(() => roundedCube(0.34, 0.055), []);

  const liquidTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 4;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    if (context) {
      const ramp = context.createLinearGradient(0, 0, 0, 256);
      ramp.addColorStop(0, "#6d4126");
      ramp.addColorStop(0.16, "#8a5a37");
      ramp.addColorStop(0.34, "#c49a6c");
      ramp.addColorStop(0.52, "#e2cfb0");
      ramp.addColorStop(0.72, "#f0e6d3");
      ramp.addColorStop(1, "#f6efe2");
      context.fillStyle = ramp;
      context.fillRect(0, 0, 4, 256);
    }
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, []);

  const sleeveTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = "#c08a55";
      context.fillRect(0, 0, 512, 64);

      for (let x = 0; x < 512; x += 4) {
        context.fillStyle = x % 8 === 0 ? "#b47e4b" : "#c9946018";
        context.fillRect(x, 0, 2, 64);
      }

      const random = seededRandom(0x4a1f);
      for (let i = 0; i < 900; i += 1) {
        const x = random() * 512;
        const y = random() * 64;
        const shade = random() < 0.5 ? "#00000012" : "#ffffff10";
        context.fillStyle = shade;
        context.fillRect(x, y, 1.5, 1.5);
      }
    }
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.wrapS = RepeatWrapping;
    texture.repeat.set(1, 1);
    return texture;
  }, []);

  const dropletMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: "#eaf6ff",
        roughness: 0.02,
        metalness: 0,
        transparent: true,
        opacity: 0.32,
        envMapIntensity: 2.0,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      iceGeometry.dispose();
      dropletMaterial.dispose();
      liquidTexture.dispose();
      sleeveTexture.dispose();
    };
  }, [iceGeometry, dropletMaterial, liquidTexture, sleeveTexture]);

  const ice = useMemo(() => {
    const random = seededRandom(0x1ced);
    const cubes: {
      position: [number, number, number];
      rotation: [number, number, number];
      scale: number;
    }[] = [];

    const count = detailed ? 22 : 12;
    for (let i = 0; i < count; i += 1) {
      const y = 0.22 + random() * (LIQUID_TOP - 0.18);
      const scale = 0.8 + random() * 0.4;
      const half = 0.34 * scale * 0.7;
      const limit = Math.max(0.02, wallAt(y) - half - 0.015);
      const angle = random() * Math.PI * 2;

      const radius = random() < 0.72 ? limit : limit * (0.35 + random() * 0.4);
      cubes.push({
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        rotation: [random() * Math.PI, random() * Math.PI, random() * Math.PI],
        scale,
      });
    }
    return cubes;
  }, [detailed]);

  const droplets = useMemo(() => {
    if (!detailed) return [];
    const random = seededRandom(0x0d20);
    return Array.from({ length: 26 }, () => {
      const y =
        random() < 0.45
          ? 0.2 + random() * 0.3
          : 1.16 + random() * (CUP_HEIGHT - 1.5);
      const angle = random() * Math.PI * 2;
      const radius = wallAt(y) + 0.006;
      return {
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        scale: 0.009 + random() * 0.016,
      };
    });
  }, [detailed]);

  const creamCurve = useMemo(() => {
    const points: Vector3[] = [];
    const steps = 80;
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const angle = t * Math.PI * 2 * 2.7;
      const radius = 0.33 * (1 - t) ** 0.85 + 0.02;
      points.push(
        new Vector3(Math.cos(angle) * radius, t * 0.5, Math.sin(angle) * radius),
      );
    }
    return new CatmullRomCurve3(points);
  }, []);

  return (
    <group scale={fit} position={[0, (-totalHeight / 2) * fit, 0]}>

      <mesh position={[0, LIQUID_TOP / 2, 0]}>
        <cylinderGeometry
          args={[
            wallAt(LIQUID_TOP) - 0.075,
            CUP_BOTTOM - 0.07,
            LIQUID_TOP,
            64,
            1,
            true,
          ]}
        />
        <meshStandardMaterial
          map={liquidTexture}
          roughness={0.42}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[0, LIQUID_TOP, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[wallAt(LIQUID_TOP) - 0.075, 56]} />
        <meshStandardMaterial color="#7a4f30" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[CUP_BOTTOM - 0.07, 48]} />
        <meshStandardMaterial color="#f6efe2" roughness={0.5} />
      </mesh>

      {ice.map((cube, i) => (
        <mesh
          key={i}
          geometry={iceGeometry}
          position={cube.position}
          rotation={cube.rotation}
          scale={cube.scale}
        >
          <meshPhysicalMaterial
            color="#e9f4ff"
            roughness={0.07}
            metalness={0}
            ior={1.31}
            clearcoat={1}
            clearcoatRoughness={0.05}
            transparent
            opacity={0.55}
            envMapIntensity={2}
          />
        </mesh>
      ))}

      <group position={[0, LIQUID_TOP - 0.05, 0]}>
        <mesh>
          <cylinderGeometry
            args={[wallAt(LIQUID_TOP) - 0.02, wallAt(LIQUID_TOP) - 0.06, 0.14, 44]}
          />
          <meshStandardMaterial color="#fdfaf4" roughness={0.82} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <tubeGeometry args={[creamCurve, 110, 0.125, 16, false]} />
          <meshStandardMaterial color="#fffdf9" roughness={0.85} />
        </mesh>
      </group>

      <mesh position={[0, CUP_HEIGHT / 2, 0]}>
        <cylinderGeometry args={[CUP_TOP, CUP_BOTTOM, CUP_HEIGHT, 72, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.02}
          metalness={0}
          transmission={detailed ? 1 : 0}
          thickness={0.03}
          ior={1.48}
          transparent
          opacity={detailed ? 1 : 0.2}
          envMapIntensity={1.4}
          side={DoubleSide}
        />
      </mesh>

      <mesh position={[0, CUP_HEIGHT, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[CUP_TOP, 0.018, 12, 64]} />
        <meshPhysicalMaterial
          color="#f6fafd"
          roughness={0.1}
          transmission={detailed ? 0.75 : 0}
          transparent
          opacity={detailed ? 1 : 0.45}
          envMapIntensity={1.4}
        />
      </mesh>

      <mesh position={[0, 0.012, 0]}>
        <cylinderGeometry args={[CUP_BOTTOM, CUP_BOTTOM - 0.03, 0.025, 56]} />
        <meshPhysicalMaterial
          color="#eef4f9"
          roughness={0.14}
          transmission={detailed ? 0.5 : 0}
          transparent
          opacity={detailed ? 1 : 0.4}
        />
      </mesh>

      <group>
        <mesh position={[0, 0.82, 0]}>
          <cylinderGeometry
            args={[wallAt(1.09) + 0.016, wallAt(0.55) + 0.016, 0.54, 64, 1, true]}
          />
          <meshStandardMaterial
            map={sleeveTexture}
            roughness={0.92}
            side={DoubleSide}
          />
        </mesh>

        <mesh position={[0, 1.09, 0]}>
          <cylinderGeometry
            args={[wallAt(1.09) + 0.022, wallAt(1.09) + 0.022, 0.035, 64, 1, true]}
          />
          <meshStandardMaterial
            color="#a97646"
            roughness={0.9}
            side={DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry
            args={[wallAt(0.55) + 0.022, wallAt(0.55) + 0.022, 0.035, 64, 1, true]}
          />
          <meshStandardMaterial
            color="#a97646"
            roughness={0.9}
            side={DoubleSide}
          />
        </mesh>
      </group>

      {droplets.map((drop, i) => (
        <mesh
          key={`drop-${i}`}
          position={drop.position}
          scale={drop.scale}
          material={dropletMaterial}
        >
          <sphereGeometry args={[1, 10, 8]} />
        </mesh>
      ))}

      <group position={[0, CUP_HEIGHT - 0.02, 0]}>
        <mesh>
          <cylinderGeometry
            args={[CUP_TOP + 0.03, CUP_TOP + 0.03, 0.12, 64, 1, true]}
          />
          <meshPhysicalMaterial
            color="#f7fbfe"
            roughness={0.1}
            transmission={detailed ? 0.9 : 0}
            thickness={0.02}
            transparent
            opacity={detailed ? 1 : 0.25}
            side={DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.055, 0]} scale={[1, 0.72, 1]}>
          <sphereGeometry
            args={[CUP_TOP + 0.028, 56, 28, 0, Math.PI * 2, 0, Math.PI / 2.05]}
          />
          <meshPhysicalMaterial
            color="#f9fcfe"
            roughness={0.02}
            transmission={detailed ? 0.98 : 0}
            thickness={0.02}
            ior={1.47}
            transparent
            opacity={detailed ? 1 : 0.18}
            envMapIntensity={1.6}
            side={DoubleSide}
          />
        </mesh>
      </group>

      <group rotation={[0, 0, 0.14]} position={[0.05, 0, 0]}>
        <mesh position={[0, 1.62, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 2.6, 24]} />
          <meshPhysicalMaterial
            color="#126b41"
            roughness={0.28}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}
