import React, { useRef, useState } from 'react';
import { OrbitControls, useGLTF, Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const Marker = ({ position, label, onClick }) => (
  <>
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={(e) => (document.body.style.cursor = 'pointer')} // Change cursor to pointer
      onPointerOut={(e) => (document.body.style.cursor = 'default')} // Reset cursor to default
    >
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

const toSphereCoords = (lat, lon, radius, offset = 0) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const adjustedRadius = radius + offset;
  const x = -(adjustedRadius * Math.sin(phi) * Math.cos(theta));
  const z = adjustedRadius * Math.sin(phi) * Math.sin(theta);
  const y = adjustedRadius * Math.cos(phi);
  return [x, y, z];
};

const Globe = () => {
  const globeRef = useRef();
  const { scene, error, isLoading } = useGLTF('/globe.gltf');
  const navigate = useNavigate();
  const [rotationEnabled, setRotationEnabled] = useState(true); // Track rotation state

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error loading GLTF model:', error.message);
    return <div>Error loading model. Check console for details.</div>;
  }

  const handleRegionClick = (region) => {
    console.log(`Clicked on ${region}`);
    if (region === 'Asia') {
      navigate('/asia'); // Navigate to the Asia page
    }
    // Add more conditions for other regions
  };

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <primitive object={scene} scale={[5, 5, 5]} ref={globeRef} position={[0, 0, 0]} />

      {/* Markers */}
      <Marker
        position={toSphereCoords(9.082, 8.6753, 5.4)}
        label="Africa"
        onClick={() => handleRegionClick('Africa')}
        onPointerDown={() => setRotationEnabled(false)} // Disable rotation on pointer down
        onPointerUp={() => setRotationEnabled(true)} // Enable rotation on pointer up
      />
      <Marker
        position={toSphereCoords(39.9042, 116.4074, 5.4)}
        label="Asia"
        onClick={() => handleRegionClick('Asia')}
        onPointerDown={() => setRotationEnabled(false)}
        onPointerUp={() => setRotationEnabled(true)}
      />
      <Marker
        position={toSphereCoords(48.8566, 2.3522, 5.4)}
        label="Europe"
        onClick={() => handleRegionClick('Europe')}
        onPointerDown={() => setRotationEnabled(false)}
        onPointerUp={() => setRotationEnabled(true)}
      />
      <Marker
        position={toSphereCoords(40.7128, -74.0060, 5.4)}
        label="North America"
        onClick={() => handleRegionClick('North America')}
        onPointerDown={() => setRotationEnabled(false)}
        onPointerUp={() => setRotationEnabled(true)}
      />
      <Marker
        position={toSphereCoords(-22.9068, -43.1729, 5.4)}
        label="South America"
        onClick={() => handleRegionClick('South America')}
        onPointerDown={() => setRotationEnabled(false)}
        onPointerUp={() => setRotationEnabled(true)}
      />
      <Marker
        position={toSphereCoords(-33.8688, 151.2093, 5.4)}
        label="Australia"
        onClick={() => handleRegionClick('Australia')}
        onPointerDown={() => setRotationEnabled(false)}
        onPointerUp={() => setRotationEnabled(true)}
      />
      <Marker
        position={toSphereCoords(-75.250973, -0.071389, 5.4)}
        label="Antarctica"
        onClick={() => handleRegionClick('Antarctica')}
        onPointerDown={() => setRotationEnabled(false)}
        onPointerUp={() => setRotationEnabled(true)}
      />

      {/* OrbitControls */}
      <OrbitControls autoRotate={rotationEnabled} autoRotateSpeed={2} enableRotate={rotationEnabled} target={[0, 0, 0]} />
    </>
  );
};

export default Globe;
