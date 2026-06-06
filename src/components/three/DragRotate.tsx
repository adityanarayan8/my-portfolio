"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Group } from "three";

type DragRotateProps = {
  children: ReactNode;
  spin?: number;
  tiltLimit?: number;
  paused?: boolean;
};

export function DragRotate({
  children,
  spin = 0.22,
  tiltLimit = 0.45,
  paused = false,
}: DragRotateProps) {
  const group = useRef<Group>(null);
  const canvas = useThree((state) => state.gl.domElement);
  const motion = useRef({
    yaw: 0,
    pitch: 0,
    velocityYaw: 0,
    velocityPitch: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const state = motion.current;

    function down(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      state.dragging = true;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    }

    function move(event: PointerEvent) {
      if (!state.dragging) return;
      state.velocityYaw = (event.clientX - state.lastX) * 0.01;
      state.velocityPitch = (event.clientY - state.lastY) * 0.006;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
    }

    function up(event: PointerEvent) {
      if (!state.dragging) return;
      state.dragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    }

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, [canvas]);

  useFrame((_, delta) => {
    const state = motion.current;
    const step = Math.min(delta, 0.05);

    state.yaw += state.velocityYaw;
    state.pitch += state.velocityPitch;

    if (!state.dragging) {
      state.velocityYaw *= 0.93;
      state.velocityPitch *= 0.9;
      if (!paused) state.yaw += spin * step;
      state.pitch += (0 - state.pitch) * Math.min(1, step * 1.6);
    }

    state.pitch = Math.max(-tiltLimit, Math.min(tiltLimit, state.pitch));

    if (group.current) {
      group.current.rotation.y = state.yaw;
      group.current.rotation.x = state.pitch;
    }
  });

  return <group ref={group}>{children}</group>;
}
