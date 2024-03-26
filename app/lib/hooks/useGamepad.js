import { useEffect, useRef } from 'react';

const useGamepad = (checkActiveSerieCode) => {
  const requestRef = useRef();

  // Fonction pour mettre à jour l'état en fonction des boutons appuyés
  const updateGamepadStatus = () => {
    const gamepads = navigator.getGamepads ? [...navigator.getGamepads()] : [];

    gamepads.forEach((gamepad) => {
      if (gamepad) {
        gamepad.buttons.forEach((button, index) => {
          if (button.pressed) {
            switch (index) {
              case 0: checkActiveSerieCode('up'); break;
              case 1: checkActiveSerieCode('down'); break;
              case 2: checkActiveSerieCode('left'); break;
              case 3: checkActiveSerieCode('right'); break;
              default: break;
            }
          }
        });
      }
    });

    requestRef.current = requestAnimationFrame(updateGamepadStatus);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGamepadStatus);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const connectHandler = (e) => {
      console.log(`%cGamepad connected%c at index ${e.gamepad.index}: ${e.gamepad.id}.`, 'color: yellow; font-weight: bold;', 'color: reset;');
    };
    const disconnectHandler = (e) => {
      console.log(`%cGamepad disconnected%c from index ${e.gamepad.index}: ${e.gamepad.id}.`, 'color: yellow; font-weight: bold;', 'color: reset;');
    };

    window.addEventListener('gamepadconnected', connectHandler);
    window.addEventListener('gamepaddisconnected', disconnectHandler);

    return () => {
      window.removeEventListener('gamepadconnected', connectHandler);
      window.removeEventListener('gamepaddisconnected', disconnectHandler);
    };
  }, []);
};

export default useGamepad;
