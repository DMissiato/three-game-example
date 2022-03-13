
import { useState, useEffect } from "react";


const moveKey = (key) =>
{
    const keys = {
        KeyW: 'forward',
        ArrowUp: 'forward',
        KeyS: 'back',
        ArrowDown: 'back',
        KeyD: 'right',
        ArrowRight: 'right',
        KeyA: 'left',
        ArrowLeft: 'left',
        Space: 'jump'
    };

    return keys[key];
};


const useKeyboard = () =>
{
    const [movement, setMovement] = useState({
        forward: false,
        back: false,
        right: false,
        left: false,
        jump: false
    });

    useEffect(() => 
    {
        const handleKeyDown = (e) =>
        {
            if(moveKey(e.code))
            {
                setMovement((state) => ({ ...state, [moveKey(e.code)]: true}));
            }
        };

        const handleKeyUp = (e) =>
        {
            if(moveKey(e.code))
            {
                setMovement((state) => ({ ...state, [moveKey(e.code)]: false}));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    });

    return movement;
};

export default useKeyboard;