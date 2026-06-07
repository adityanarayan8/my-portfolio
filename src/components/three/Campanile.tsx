"use client";

import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { MathUtils } from "three";

const GRANITE = "#cfc7b6";
const GRANITE_DARK = "#a89f8d";
const SHADOW = "#6f6857";

function Prism({
  top,
  bottom,
  height,
  y,
  color = GRANITE,
  metalness = 0,
  roughness = 0.85,
}: {
  top: number;
  bottom: number;
  height: number;
  y: number;
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  return (
    <mesh position={[0, y, 0]} rotation={[0, Math.PI / 4, 0]}>
      <cylinderGeometry args={[top * 1.414, bottom * 1.414, height, 4]} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        flatShading
      />
    </mesh>
  );
}

export function Campanile() {
  const faces = useMemo(() => [0, 1, 2, 3], []);
  const viewport = useThree((state) => state.viewport);

  const shaftTop = 3.5;
  const clockY = 3.62;
  const belfryY = 4.22;
  const belfryHeight = 1.05;
  const totalHeight = belfryY + belfryHeight + 1.3;

  const fit = Math.min(
    viewport.height / (totalHeight * 1.04),
    viewport.width / 2.1,
  );

  return (
    <group scale={[fit * 0.76, fit, fit * 0.76]} position={[0, (-totalHeight / 2) * fit, 0]}>

      <Prism top={0.98} bottom={1.06} height={0.07} y={0.035} color={GRANITE_DARK} />
      <Prism top={0.9} bottom={0.98} height={0.07} y={0.105} color={GRANITE_DARK} />
      <Prism top={0.84} bottom={0.9} height={0.16} y={0.22} />
      <Prism top={0.78} bottom={0.84} height={0.16} y={0.38} />

      <Prism top={0.6} bottom={0.78} height={3.02} y={1.97} />

      {[1.15, 1.95, 2.75].map((y, i) => (
        <Prism
          key={y}
          top={0.735 - i * 0.045}
          bottom={0.745 - i * 0.045}
          height={0.045}
          y={y}
          color={GRANITE_DARK}
        />
      ))}

      {faces.map((face) =>
        [-0.22, 0, 0.22].map((offset) => {
          const angle = (face * Math.PI) / 2;
          return (
            <mesh
              key={`groove-${face}-${offset}`}
              position={[
                Math.cos(angle) * 0.655 - Math.sin(angle) * offset,
                2.1,
                -Math.sin(angle) * 0.655 - Math.cos(angle) * offset,
              ]}
              rotation={[0, -angle, 0]}
              scale={[0.13, 2.4, 0.03]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={SHADOW} roughness={0.95} flatShading />
            </mesh>
          );
        }),
      )}

      {faces.map((face) =>
        [-1, 1].map((side) => (
          <mesh
            key={`${face}-${side}`}
            position={[
              Math.cos((face * Math.PI) / 2) * 0.63 -
                Math.sin((face * Math.PI) / 2) * side * 0.4,
              1.93,
              -Math.sin((face * Math.PI) / 2) * 0.63 -
                Math.cos((face * Math.PI) / 2) * side * 0.4,
            ]}
            rotation={[0, (-face * Math.PI) / 2, 0]}
            scale={[0.06, 3.1, 0.1]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={GRANITE_DARK} roughness={0.9} flatShading />
          </mesh>
        )),
      )}

      {faces.map((face) => {
        const angle = (face * Math.PI) / 2;
        return (
          <mesh
            key={`light-${face}`}
            position={[
              Math.cos(angle) * 0.63,
              3.2,
              -Math.sin(angle) * 0.63,
            ]}
            rotation={[0, -angle, 0]}
          >
            <planeGeometry args={[0.16, 0.34]} />
            <meshStandardMaterial color={SHADOW} roughness={1} />
          </mesh>
        );
      })}

      <Prism top={0.68} bottom={0.62} height={0.1} y={shaftTop + 0.05} color={GRANITE_DARK} />

      <Prism top={0.62} bottom={0.64} height={0.56} y={clockY} />
      {faces.map((face) => (
        <group
          key={`clock-${face}`}
          rotation={[0, (face * Math.PI) / 2, 0]}
          position={[0, clockY, 0]}
        >
          <mesh position={[0, 0, 0.625]}>
            <circleGeometry args={[0.2, 32]} />
            <meshStandardMaterial color="#f2eee2" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.628]}>
            <ringGeometry args={[0.2, 0.225, 32]} />
            <meshStandardMaterial
              color="#8d7b4e"
              metalness={0.7}
              roughness={0.35}
            />
          </mesh>

          <mesh position={[0, 0.05, 0.63]} rotation={[0, 0, MathUtils.degToRad(20)]}>
            <planeGeometry args={[0.016, 0.12]} />
            <meshStandardMaterial color="#2b2a24" />
          </mesh>
          <mesh
            position={[0.05, 0.01, 0.63]}
            rotation={[0, 0, MathUtils.degToRad(-72)]}
          >
            <planeGeometry args={[0.014, 0.17]} />
            <meshStandardMaterial color="#2b2a24" />
          </mesh>
        </group>
      ))}

      <Prism top={0.66} bottom={0.68} height={0.1} y={belfryY - 0.34} color={GRANITE_DARK} />
      <group position={[0, belfryY + belfryHeight / 2 - 0.3, 0]}>

        <Prism top={0.42} bottom={0.42} height={belfryHeight} y={0} color={SHADOW} roughness={1} />

        {[
          [0.58, 0.58],
          [0.58, -0.58],
          [-0.58, 0.58],
          [-0.58, -0.58],
        ].map(([x, z]) => (
          <mesh key={`corner-${x}-${z}`} position={[x, 0, z]}>
            <boxGeometry args={[0.17, belfryHeight, 0.17]} />
            <meshStandardMaterial color={GRANITE} roughness={0.85} flatShading />
          </mesh>
        ))}

        {faces.map((face) =>
          [-0.2, 0.2].map((offset) => {
            const angle = (face * Math.PI) / 2;
            return (
              <mesh
                key={`mullion-${face}-${offset}`}
                position={[
                  Math.cos(angle) * 0.58 - Math.sin(angle) * offset,
                  0,
                  -Math.sin(angle) * 0.58 - Math.cos(angle) * offset,
                ]}
                rotation={[0, -angle, 0]}
              >
                <boxGeometry args={[0.08, belfryHeight * 0.94, 0.08]} />
                <meshStandardMaterial color={GRANITE} roughness={0.85} flatShading />
              </mesh>
            );
          }),
        )}
      </group>

      <Prism top={0.72} bottom={0.66} height={0.12} y={belfryY + belfryHeight - 0.24} color={GRANITE_DARK} />

      {faces.map((face) =>
        [-0.5, -0.25, 0, 0.25, 0.5].map((offset) => {
          const angle = (face * Math.PI) / 2;
          return (
            <mesh
              key={`baluster-${face}-${offset}`}
              position={[
                Math.cos(angle) * 0.7 - Math.sin(angle) * offset,
                belfryY + belfryHeight - 0.08,
                -Math.sin(angle) * 0.7 - Math.cos(angle) * offset,
              ]}
              rotation={[0, -angle, 0]}
            >
              <cylinderGeometry args={[0.028, 0.034, 0.16, 8]} />
              <meshStandardMaterial color={GRANITE} roughness={0.85} flatShading />
            </mesh>
          );
        }),
      )}

      <mesh position={[0, belfryY + belfryHeight + 0.42, 0]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0, 0.72 * 1.414, 1.05, 4]} />
        <meshStandardMaterial color={GRANITE} roughness={0.8} flatShading />
      </mesh>

      <mesh position={[0, belfryY + belfryHeight + 0.99, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.1, 10]} />
        <meshStandardMaterial color="#b9a56a" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[0, belfryY + belfryHeight + 1.09, 0]}>
        <sphereGeometry args={[0.05, 16, 12]} />
        <meshStandardMaterial color="#c8b072" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, belfryY + belfryHeight + 1.19, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.14, 8]} />
        <meshStandardMaterial color="#c8b072" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}
