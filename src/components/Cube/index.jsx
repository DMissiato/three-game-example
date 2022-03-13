
import React from "react";
import { useBox } from "@react-three/cannon";
import * as textures from '../../libs/textures';

const Cube = ({ position, type, ...props }) =>
{
    const [ref] = useBox(() => ({
        position,
        type: 'Dynamic',
        mass: 200,
        ...props
    }))

    return (
        <mesh castShadow ref={ref} >
            {
                [...Array(6)].map((value, index) => (
                    <meshStandardMaterial 
                        attachArray='material'
                        map={textures[type]}
                        key={index}
                    />
                ))
            }
            <boxBufferGeometry attach='geometry' />
        </mesh>
    );
};

export default Cube;