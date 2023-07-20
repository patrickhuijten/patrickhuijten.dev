"use client";
import styles from "@/app/views/about/background.module.css";
import { InstancedMesh, Object3D } from "three";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const tempObject = new Object3D();

interface Particle {
  x: number;
  y: number;
  z: number;
}

const getColor = () =>
  useMemo(() => {
    const accentColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--color-primary");

    return parseInt(accentColor.replace("#", "0x"), 16);
  }, []);

const countX = 30;
const countZ = 30;
const count = countX * countZ;
const gap = 5;

const sizeX = countX * gap;
const sizeZ = countZ * gap;

const offsetX = sizeX / 2 - sizeX;
const offsetZ = sizeZ / 2 - sizeZ;

const scaleMultiplier = 0.02;
const speedMultiplier = 1.5;

const getParticles = () => {
  const rows: Particle[][] = [];

  for (let ix = 0; ix < countX; ix++) {
    const row: Particle[] = [];
    for (let iz = 0; iz < countZ; iz++) {
      const x = offsetX + gap * ix;
      const y = 0;
      const z = offsetZ + gap * iz;
      row.push({ x, y, z });
    }
    rows.push(row);
  }
  return rows;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const animateSwarm = (mesh: InstancedMesh, points: Particle[][], t: number) => {
  let index = 0;
  const time = t * speedMultiplier;
  points.forEach((row, ix) => {
    row.forEach(({ x, z }, iz) => {
      const y =
        Math.sin((ix + time) * 0.3) * 5 + Math.sin((iz + time) * 0.5) * 5;
      const scale = clamp(Math.abs(y * scaleMultiplier), 0.075, 0.15);

      tempObject.position.set(x, y, z);
      tempObject.scale.set(scale, scale, scale);
      tempObject.updateMatrix();
      mesh.setMatrixAt(index, tempObject.matrix);
      mesh.instanceMatrix.needsUpdate = true;
      index++;
    });
  });
};

const Swarm = () => {
  const mesh = useRef(null);
  const points = useMemo(() => getParticles(), [countX, countZ, gap]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) animateSwarm(mesh.current, points, t);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6]} />
      <meshStandardMaterial color={getColor()} />
    </instancedMesh>
  );
};

export const Background = () => {
  return (
    <Canvas
      className={styles.background}
      gl={{ antialias: true }}
      camera={{
        position: [150, 75, 150],
        fov: 25,
        far: 1000,
      }}
    >
      <ambientLight />
      <Swarm />
    </Canvas>
  );
};
