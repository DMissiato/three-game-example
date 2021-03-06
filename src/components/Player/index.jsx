
import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import useKeyboard from '../../libs/hooks/useKeyboard';
import { Vector3 } from "three";
import MouseLook from '../MouseLook';

const SPEED = 4;

const Player = ({ position, ...props }) =>
{
    const {
        forward,
        back,
        right,
        left,
        sprint,
        jump
    } = useKeyboard();

    const { camera } = useThree();

    const [ref, api] = useSphere(() => ({
        position,
        args: [0.5, 0.5, 0.5],
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
        
        // Follow Camera
        const anchorPos = new Vector3(currPosition.current[0], currPosition.current[1] + 0.6, currPosition.current[2]);
        camera.position.copy(anchorPos);

        // Movement
        const direction = new Vector3();
        const vectorZ = new Vector3(0, 0, (
            (back ? 1 : 0) - (forward ? 1 : 0)
        ));
        const vectorX = new Vector3((
            (left ? 1 : 0) - (right ? 1 : 0)
        ), 0, 0);

        direction
            .subVectors(vectorZ, vectorX)
            .normalize()
            .multiplyScalar(SPEED * (sprint ? 2.2 : 1))// Sprint
            .applyEuler(camera.rotation);
        
        // Set Velocity
        api.velocity.set(direction.x, velocity.current[1], direction.z);
        // Jump
        if(jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05)
        {
            api.velocity.set(velocity.current[0], 7.5, velocity.current[1]);
        }
    });

    return (
        <>
            <MouseLook>
                <mesh scale={[0.5, 0.5, 0.5]} castShadow ref={ref}>
                    <sphereBufferGeometry attach='geometry' />
                </mesh>
            </MouseLook>
        </>
    );
};

export default Player;