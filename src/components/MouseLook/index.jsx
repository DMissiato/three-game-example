
import { extend, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

extend({ PointerLockControls });

const MouseLook = () =>
{
    const { camera, gl } = useThree();
    const controls = useRef();

    useEffect(() => 
    {
        document.addEventListener('click', () => 
        {
            controls.current.lock();
        });
    }, []);

    return (
        <pointerLockControls ref={controls} args={[camera, gl.domElement]} />
    );
}

export default MouseLook;