
import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import useKeyboard from '../../libs/hooks/useKeyboard';
import { Vector3 } from "three";

const SPEED = 4;

const Player = ({ position, ...props }) => // props position don't work
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
        mass: 1,
        ...props
    }));


    const currPosition = useRef(position);

    useEffect(() => 
    {
        const subscribe = api.position.subscribe((pos) => currPosition.current = pos);
        return subscribe;
    }, [api.position])

    useFrame(({ clock }) => {
        //console.log(currPosition.current);
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
            .multiplyScalar(SPEED / 30)
            .applyEuler(camera.rotation);

        //console.log(currPosition.current[1]);
        
        api.position.set(currPosition.current[0] + direction.x, currPosition.current[1], currPosition.current[2] + direction.z);
    });

    return (
        <mesh scale={[1, 1, 1]} castShadow ref={ref}>
            <boxBufferGeometry attach='geometry' />
        </mesh>
    );
};

export default Player;