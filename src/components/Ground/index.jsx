
import React from 'react';
import { usePlane } from '@react-three/cannon';
import { RepeatWrapping } from 'three'; 
import { grass } from '../../libs/textures';


const Ground = (props) =>
{
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0], 
        ...props
    }));

    grass.wrapS = RepeatWrapping;
    grass.wrapT = RepeatWrapping;
    grass.repeat.set(30, 30);

    return (
        <mesh ref={ref} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial map={grass} attach="material" />
        </mesh>
    );
};

export default Ground;
