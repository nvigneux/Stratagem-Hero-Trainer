import { useReducer } from 'react';

const initialState = {
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

const useStratagemsGameSettings = (
  defaultDuration = initialState.timerDuration,
  defaultBonus = initialState.timeBonus,
  defaultKeyBindings = { ...initialState.keyBindings },
  defaultTempKeyBindings = { ...initialState.keyBindings },
) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    ...initialState,
    timerDuration: defaultDuration,
    timeBonus: defaultBonus,
    keyBindings: defaultKeyBindings,
    tempKeyBindings: defaultTempKeyBindings,
  });

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
  };

  const resetKeyBindings = () => {
    dispatch({ type: 'RESET_KEY_BINDINGS' });
  };

  return {
    timerDuration: state.timerDuration,
    timeBonus: state.timeBonus,
    setTimerDuration,
    setTimeBonus,
    keyBindings: state.keyBindings,
    tempKeyBindings: state.tempKeyBindings,
    setTempKeyBinding,
    applyTempKeyBindings,
    resetKeyBindings,
  };
};

export default useStratagemsGameSettings;
