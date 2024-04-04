import { useReducer } from 'react';
import { setCookieSettings } from '../../../../lib/actions';

const initialState = {
  gameSound: false,
  timerDuration: 10,
  timeBonus: 1,
  keyBindings: {
    up: 'KeyW',
    right: 'KeyD',
    down: 'KeyS',
    left: 'KeyA',
  },
  tempKeyBindings: {
    up: 'KeyW',
    right: 'KeyD',
    down: 'KeyS',
    left: 'KeyA',
  },
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GAME_SOUND':
      return { ...state, gameSound: action.payload };
    case 'SET_TIMER_DURATION':
      return { ...state, timerDuration: action.payload };
    case 'SET_TIME_BONUS':
      return { ...state, timeBonus: action.payload };
    case 'SET_TEMP_KEY_BINDING':
      return { ...state, tempKeyBindings: { ...state.tempKeyBindings, ...action.payload } };
    case 'APPLY_TEMP_KEY_BINDINGS':
      return { ...state, keyBindings: { ...state.tempKeyBindings } };
    case 'RESET_KEY_BINDINGS':
      return {
        ...state,
        tempKeyBindings: { ...state.keyBindings },
        keyBindings: { ...state.keyBindings },
      };
    default:
      return state;
  }
};

const useStratagemsGameSettings = ({
  defaultGameSound = initialState.gameSound,
  defaultDuration = initialState.timerDuration,
  defaultBonus = initialState.timeBonus,
  defaultKeyBindings = { ...initialState.keyBindings },
  defaultTempKeyBindings = { ...initialState.keyBindings },
}) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    ...initialState,
    gameSound: defaultGameSound,
    timerDuration: defaultDuration,
    timeBonus: defaultBonus,
    keyBindings: defaultKeyBindings,
    tempKeyBindings: defaultTempKeyBindings,
  });

  /**
   * Set the game sound
   * @param {boolean} gameSound
   */
  const setGameSound = (gameSound) => {
    dispatch({ type: 'SET_GAME_SOUND', payload: gameSound });
    setCookieSettings({
      gameSound,
      timerDuration: state.timerDuration,
      keyBindings: state.keyBindings,
    });
  };

  /**
   * Check if the duration is valid
   * @param {number} duration
   */
  const isValidDuration = (duration) => typeof duration === 'number' && duration > 0;

  /**
   * Set the timer duration
   * @param {number} timerDuration
   */
  const setTimerDuration = (timerDuration) => {
    if (isValidDuration(timerDuration)) {
      dispatch({ type: 'SET_TIMER_DURATION', payload: timerDuration });
      setCookieSettings({
        timerDuration,
        keyBindings: state.keyBindings,
        gameSound: state.gameSound,
      });
    }
  };

  /**
   * Set the time bonus
   * @param {number} timeBonus
   */
  const setTimeBonus = (timeBonus) => {
    if (isValidDuration(timeBonus)) {
      dispatch({ type: 'SET_TIME_BONUS', payload: timeBonus });
    }
  };

  /**
   * Set the key bindings
   * @param {Object} keyBindings
   * @param {string} keyBindings.up
   * @param {string} keyBindings.right
   * @param {string} keyBindings.down
   * @param {string} keyBindings.left
   */
  const setTempKeyBinding = (key, value) => {
    dispatch({ type: 'SET_TEMP_KEY_BINDING', payload: { [key]: value } });
  };

  /**
   * Apply the temporary key bindings
   */
  const applyTempKeyBindings = () => {
    dispatch({ type: 'APPLY_TEMP_KEY_BINDINGS' });
    setCookieSettings({
      timerDuration: state.timerDuration,
      keyBindings: state.tempKeyBindings,
      gameSound: state.gameSound,
    });
  };

  return {
    gameSound: state.gameSound,
    timerDuration: state.timerDuration,
    timeBonus: state.timeBonus,
    setGameSound,
    setTimerDuration,
    setTimeBonus,
    keyBindings: state.keyBindings,
    tempKeyBindings: state.tempKeyBindings,
    setTempKeyBinding,
    applyTempKeyBindings,
  };
};

export default useStratagemsGameSettings;
