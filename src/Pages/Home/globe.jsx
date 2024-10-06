import React, { useRef } from 'react';
import { OrbitControls, useGLTF, Text } from '@react-three/drei';

// Marker component
const Marker = ({ position, label, onClick }) => (
  <>
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.2, 40, 40]} />
      <meshStandardMaterial color="red" />
    </mesh>

    {/* Label component - slightly offset for visibility */}
    <Text
      position={[position[0], position[1] + 0.7, position[2]]} // Offset label above marker
      color="white"
      fontSize={0.2}
      anchorX="center"
      anchorY="middle"
    >
      {label}
    </Text>
  </>
);

// Convert latitude/longitude to 3D sphere coordinates, with optional offset for labels
const toSphereCoords = (lat, lon, radius, offset = 0) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  // Increase radius by offset to lift labels above surface
  const adjustedRadius = radius + offset;

  const x = -(adjustedRadius * Math.sin(phi) * Math.cos(theta));
  const z = adjustedRadius * Math.sin(phi) * Math.sin(theta);
  const y = adjustedRadius * Math.cos(phi);

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

  return (
    <>
      {/* Increase light intensity */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Add the 3D globe model to the scene */}
      <primitive object={scene} scale={[5, 5, 5]} ref={globeRef} position={[0, 0, 0]} />

      {/* Markers with labels for different regions */}
      <Marker
        position={toSphereCoords(9.082, 8.6753, 5.4)}
        label="Africa"
        onClick={() => onClickRegion('Africa')}
      />
      <Marker
        position={toSphereCoords(39.9042, 116.4074, 5.4)}
        label="Asia"
        onClick={() => onClickRegion('Asia')}
      />
      <Marker
        position={toSphereCoords(48.8566, 2.3522, 5.4)}
        label="Europe"
        onClick={() => onClickRegion('Europe')}
      />
      <Marker
        position={toSphereCoords(40.7128, -74.0060, 5.4)}
        label="North America"
        onClick={() => onClickRegion('North America')}
      />
      <Marker
        position={toSphereCoords(-22.9068, -43.1729, 5.4)}
        label="South America"
        onClick={() => onClickRegion('South America')}
      />
      <Marker
        position={toSphereCoords(-33.8688, 151.2093, 5.4)}
        label="Australia"
        onClick={() => onClickRegion('Australia')}
      />
      <Marker
        position={toSphereCoords(-75.250973, -0.071389, 5.4)}
        label="Antarctica"
        onClick={() => onClickRegion('Antarctica')}
      />

      {/* Add controls for rotating the globe */}
      <OrbitControls autoRotate autoRotateSpeed={2} target={[0, 0, 0]} />
    </>
  );
};

export default Globe;
