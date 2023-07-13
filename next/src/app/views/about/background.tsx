"use client";
import styles from "@/app/views/about/background.module.css";
import { Mesh, InstancedMesh, Object3D } from "three";
import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";

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

const Particle = (props: ThreeElements["mesh"]) => {
  const ref = useRef<Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={getColor()} />
    </mesh>
  );
};

const countX = 20;
const countZ = 20;
const count = countX * countZ;
const gap = 5;

const sizeX = countX * gap;
const sizeZ = countZ * gap;
const offsetX = sizeX / 2 - sizeX;
const offsetZ = sizeZ / 2 - sizeZ;

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

const animateMesh = (mesh: InstancedMesh, points: Particle[][], t: number) => {
  let index = 0;
  points.forEach((row, ix) => {
    row.forEach(({ x, z }, iz) => {
      const y = Math.sin((ix + t) * 0.3) * 5 + Math.sin((iz + t) * 0.5) * 5;
      const scale = Math.min(0.1, y * 0.02);
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
  const mesh = useRef<InstancedMesh>();
  const [points] = useState(useMemo(() => getParticles(), []));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) animateMesh(mesh.current, points, t);
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12]} />
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
        position: [75, count / 4, 125],
        fov: 25,
        far: 1000,
      }}
    >
      <ambientLight />
      <Swarm />
    </Canvas>
  );
};
