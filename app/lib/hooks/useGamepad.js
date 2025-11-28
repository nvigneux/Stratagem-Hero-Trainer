import {
  useEffect, useRef, useState, useCallback,
} from 'react';

/**
 * A custom React hook that enables the use of a gamepad within a React component.
 * It listens for gamepad connections and disconnections, as well as button presses and releases.
 * When a gamepad button is pressed or released, it updates an internal state of pressed buttons
 * and calls the provided `eventPressedButton` function with the direction corresponding to the
 * button pressed.
 *
 * The hook utilizes the `navigator.getGamepads()` method to access the connected gamepad(s)
 * and their states.
 * It uses `requestAnimationFrame` to continuously check the gamepad status at a high refresh
 * rate, ensuring responsiveness to user input. This hook is designed to handle directional input
 * (up, down, left, right) based on the gamepad's button indices which are assumed to be 12, 13, 14,
 * and 15 respectively for those directions.
 * @param {Function} eventPressedButton - Function to handle button press events.
 * @returns {object} The gamepad connection status.
 */
const useGamepad = (eventPressedButton) => {
  const [gamepadConnected, setGamepadConnected] = useState({});
  const animationFrameRef = useRef();
  const pressedButtonsRef = useRef(new Set());

  const updateGamepadStatus = useCallback(() => {
    const gamepads = Array.from(navigator.getGamepads()).filter(Boolean);
    const pressedButtons = new Set(pressedButtonsRef.current);

    gamepads.forEach((gamepad) => {
      gamepad.buttons.forEach((button, index) => {
        const isPressed = button.pressed;

        if (isPressed && !pressedButtons.has(index)) {
          pressedButtons.add(index);
          switch (index) {
            case 12: eventPressedButton('up'); break;
            case 13: eventPressedButton('down'); break;
            case 14: eventPressedButton('left'); break;
            case 15: eventPressedButton('right'); break;
            default: break;
          }
        } else if (!isPressed) {
          pressedButtons.delete(index);
        }
      });
    });

    pressedButtonsRef.current = pressedButtons;

    animationFrameRef.current = requestAnimationFrame(updateGamepadStatus);
  }, [eventPressedButton]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateGamepadStatus);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [updateGamepadStatus]);

  /**
   * Event listener for gamepad connections and disconnections.
   */
  useEffect(() => {
    const handleGamepadConnect = (event) => {
      setGamepadConnected(event.gamepad);
      console.log(`Gamepad connected at index ${event.gamepad.index}: ${event.gamepad.id}.`);
    };
    const handleGamepadDisconnect = (event) => {
      setGamepadConnected({});
      console.log(`Gamepad disconnected from index ${event.gamepad.index}: ${event.gamepad.id}.`);
    };

    window.addEventListener('gamepadconnected', handleGamepadConnect);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnect);

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnect);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnect);
    };
  }, []);

  return {
    gamepadConnected,
  };
};

export default useGamepad;
