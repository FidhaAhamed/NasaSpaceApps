import React from 'react';
import './home.css';  // Ensure this file styles the home component correctly
import Globe from './globe'; // Ensure the path to the Globe component is correct
import Asia from './Home/asia';
import { Canvas } from '@react-three/fiber';

// Home Component
function Home() {
  return (
    <>
    <div className="home">
      {/* Canvas for the 3D globe */}
      <Canvas style={{ height: '100vh', width: '100%' }} camera={{ position: [0, 0, 6] }}> {/* Adjusted Z position */}
        <Globe onClickRegion={(region) => console.log(`Clicked on ${region}`)} />
      </Canvas>
    </div>
    <Asia />
    </>
    
  );
}

export default Home;
