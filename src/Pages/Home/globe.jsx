import React, { useRef } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Html } from "@react-three/drei";

// Marker component
const Marker = ({ position, onClick }) => (
  <mesh position={position} onClick={onClick}>
    <sphereGeometry args={[0.05, 16, 16]} />
    <meshStandardMaterial color="red" />
  </mesh>
);

// Convert latitude/longitude to 3D sphere coordinates
const toSphereCoords = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
};

const Globe = ({ onClickRegion }) => {
  const globeRef = useRef();
  const { scene, error, isLoading } = useGLTF('/globe.gltf');  // Load the 3D model

  if (isLoading) return <div>Loading...</div>;  // Handle loading state

  if (error) {
    console.error('Error loading GLTF model:', error.message);
    return <div>Error loading model. Check console for details.</div>;
  }

  console.log("Scene loaded:", scene); // Debugging

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      {/* Add the 3D globe model to the scene */}
      <primitive object={scene} scale={[5, 5, 5]} ref={globeRef} position={[0, 0, 0]} /> {/* Adjusted scale */}

      {/* Markers for different regions */}
      <Marker position={toSphereCoords(9.082, 8.6753, 5)} onClick={() => onClickRegion('Africa')} />
      <Marker position={toSphereCoords(34.0479, 100.6197, 5)} onClick={() => onClickRegion('Asia')} />

      <OrbitControls autoRotate autoRotateSpeed={2} target={[0, 0, 0]} />
    </>
  );
};

export default function GlobeCanvas() {
  return (
    <Html>
      <div style={{ width: 600, height: 600 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}> {/* Adjust camera position to be farther back */}
          <Globe onClickRegion={(region) => console.log(region)} />
        </Canvas>
      </div>
    </Html>
  );
}
