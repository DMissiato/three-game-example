
import React from 'react';
import { Canvas } from '@react-three/fiber'; 
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import Ground from './components/Ground';
import Player from './components/Player';
import Cube from './components/Cube';

const App = () => 
{

  return (
    <Canvas shadowMap sRGB>
      <Sky sunPosition={[10, 10, 50]} />
      <ambientLight intensity={0.25} />
      <pointLight castShadow intensity={0.7} position={[50, 50, 50]} />
      <Physics gravity={[0, 2.5 * -9.81, 0]} >
        <Ground position={[0, 0.5, 0]} />
        <Player position={[0, 3, 7]} />
        <Cube position={[-1, 1, 0]} type='brick' />
        <Cube position={[-1, 1, -1]} type='brick' />
        <Cube position={[1, 1, 0]} scale={[1, 2, 1]} type='wood' />
        <Cube position={[1.5, 5, 0.5]} type='wood' />
        <Cube position={[1, 1, 1.5]} type='wood' />
      </Physics>
    </Canvas>
  );
};

export default App;
