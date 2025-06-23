import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

interface RingModelProps {
  visibleParts: Record<string, boolean>;
  materials: { 
    metal: MeshStandardMaterial; 
    icosphere: MeshStandardMaterial;
  };
}

export const INITIAL_VISIBLE = ['Cylinder007', 'Cylinder003', 'Cylinder002', 'Icosphere'];

export const groups = {
  firstPart: ['Cylinder007', 'Cylinder005', 'Cylinder006'],
  secondPart: ['Cylinder003', 'Cylinder009', 'Cylinder010'],
  thirdPart: ['Cylinder002', 'Cylinder008', 'Cylinder013'],
};

export const icosphereExtras = ['Icosphere002', 'Icosphere003'];

export function RingModel({ visibleParts, materials }: RingModelProps) {
  const { scene } = useGLTF('/ring.glb');

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // Special handling for extra icospheres
        if (icosphereExtras.includes(child.name)) {
          child.visible = visibleParts['Cylinder006'] || false; // Show when Cylinder006 is visible
        } else {
          child.visible = visibleParts[child.name] ?? false;
        }

        if (child.name.startsWith('Cylinder')) {
          child.material = materials.metal;
        } else if (child.name.startsWith('Icosphere')) {
          child.material = materials.icosphere;
        }

        child.material.flatShading = false;
        child.material.needsUpdate = true;
      }
    });
  }, [scene, visibleParts, materials]);

  return <primitive object={scene} scale={7.5} />;
}