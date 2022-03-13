
import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import useKeyboard from '../../libs/hooks/useKeyboard';
import { Vector3 } from "three";

const SPEED = 4;

const Player = ({ position, ...props }) =>
{
    const {
        forward,
        back,
        right,
        left,
        jump
    } = useKeyboard();

    const { camera } = useThree();

    const [ref, api] = useBox(() => ({
        position,
        args: [1, 1, 1],
        type: 'Dynamic',
        mass: 70,
        ...props
    }));


    const currPosition = useRef(position);
    const velocity = useRef([0, 0, 0]);

    useEffect(() =>
    {
        api.position.subscribe((pos) => currPosition.current = pos);
    }, [api.position]);

    useEffect(() => 
    {
        api.velocity.subscribe((vel) => velocity.current = vel);
    }, [api.velocity]);

    useFrame(() => {
        
        const anchorPos = new Vector3(currPosition.current[0], currPosition.current[1] + 1.5, currPosition.current[2] + 5);
        camera.position.copy(anchorPos);

        const direction = new Vector3();
        const vectorZ = new Vector3(0, (jump ? 1 : 0), (
            (back ? 1 : 0) - (forward ? 1 : 0)
        ));
        const vectorX = new Vector3((
            (left ? 1 : 0) - (right ? 1 : 0)
        ), 0, 0);

        direction
            .subVectors(vectorZ, vectorX)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);
        
        api.velocity.set(direction.x, velocity.current[1], direction.z);
    });

    return (
        <mesh scale={[1, 1, 1]} castShadow ref={ref}>
            <boxBufferGeometry attach='geometry' />
        </mesh>
    );
};

export default Player;