
import React from "react";
import { useBox } from "@react-three/cannon";
import * as textures from '../../libs/textures';

const Cube = ({ position, type, ...props }) =>
{
    const scale = props.scale ? props.scale : [1, 1, 1];

    const [ref] = useBox(() => ({
        position,
        args: scale,
        type: 'Dynamic',
        mass: 100,
        ...props
    }))

    return (
        <mesh scale={scale} castShadow ref={ref} >
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