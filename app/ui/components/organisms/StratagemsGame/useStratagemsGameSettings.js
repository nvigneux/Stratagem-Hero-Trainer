import { useReducer } from 'react';
import { setCookieSettings } from '../../../../lib/actions';

const initialState = {
  gameSound: false,
  trainingMode: {
    stratagemJammer: false,
  },
  layout: 'keyboard',
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
    case 'SET_TRAINING_MODE':
      return {
        ...state,
        trainingMode: { ...state.trainingMode, ...action.payload },
      };
    case 'SET_TIMER_DURATION':
      return { ...state, timerDuration: action.payload };
    case 'SET_TIME_BONUS':
      return { ...state, timeBonus: action.payload };
    case 'SET_TEMP_KEY_BINDING':
      return {
        ...state,
        tempKeyBindings: { ...state.tempKeyBindings, ...action.payload },
      };
    case 'APPLY_TEMP_KEY_BINDINGS':
      return { ...state, keyBindings: { ...state.tempKeyBindings } };
    case 'SET_LAYOUT':
      return { ...state, layout: action.payload };
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

/**
 * Custom hook for managing stratagems game settings.
 * @param {object} params - Parameters.
 * @param {boolean} params.defaultGameSound - Default game sound state.
 * @param {{stratagemJammer: boolean}} params.defaultTrainingMode - Default training mode state.
 * @param {number} params.defaultDuration - Default timer duration.
 * @param {number} params.defaultBonus - Default time bonus.
 * @param {object} params.defaultKeyBindings - Default key bindings.
 * @param {object} params.defaultTempKeyBindings - Default temporary key bindings.
 * @param {string} params.defaultLayout - Default layout.
 * @returns {object} Game settings state and control functions.
 */
const useStratagemsGameSettings = ({
  defaultGameSound = initialState.gameSound,
  defaultTrainingMode = initialState.trainingMode,
  defaultDuration = initialState.timerDuration,
  defaultBonus = initialState.timeBonus,
  defaultKeyBindings = { ...initialState.keyBindings },
  defaultTempKeyBindings = { ...initialState.keyBindings },
  defaultLayout = initialState.layout,
}) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    ...initialState,
    gameSound: defaultGameSound,
    trainingMode: defaultTrainingMode,
    timerDuration: defaultDuration,
    timeBonus: defaultBonus,
    keyBindings: defaultKeyBindings,
    tempKeyBindings: defaultTempKeyBindings,
    layout: defaultLayout,
  });

  /**
   * Check if the duration is valid
   * @param {number} duration
   * @returns {boolean}
   */
  const isValidDuration = (duration) => typeof duration === 'number' && duration > 0;

  /**
   * Set the game sound
   * @param {boolean} gameSound
   */
  const setGameSound = (gameSound) => {
    dispatch({ type: 'SET_GAME_SOUND', payload: gameSound });
    const { tempKeyBindings, ...settingsToSave } = state;
    setCookieSettings({
      ...settingsToSave,
      gameSound,
    });
  };

  /**
   * Set the training mode
   * @param {{stratagemJammer: boolean}} trainingMode
   */
  const setTrainingMode = (trainingMode) => {
    dispatch({ type: 'SET_TRAINING_MODE', payload: trainingMode });
    const { tempKeyBindings, ...settingsToSave } = state;
    setCookieSettings({
      ...settingsToSave,
      trainingMode: { ...state.trainingMode, ...trainingMode },
    });
  };

  /**
   * Set the timer duration
   * @param {number} timerDuration
   * @returns {void}
   */
  const setTimerDuration = (timerDuration) => {
    if (isValidDuration(timerDuration)) {
      dispatch({ type: 'SET_TIMER_DURATION', payload: timerDuration });
      const { tempKeyBindings, ...settingsToSave } = state;
      setCookieSettings({
        ...settingsToSave,
        timerDuration,
      });
    }
  };

  /**
   * Set the time bonus
   * @param {number} timeBonus
   * @returns {void}
   */
  const setTimeBonus = (timeBonus) => {
    if (isValidDuration(timeBonus)) {
      dispatch({ type: 'SET_TIME_BONUS', payload: timeBonus });
      const { tempKeyBindings, ...settingsToSave } = state;
      setCookieSettings({
        ...settingsToSave,
        timeBonus,
      });
    }
  };

  /**
   * Set the key bindings
   * @param {string} key - Key to set.
   * @param {string} value - Value to set for the key.
   * @returns {void}
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

  const setLayout = (layout) => {
    dispatch({ type: 'SET_LAYOUT', payload: layout });
    const { tempKeyBindings, ...settingsToSave } = state;
    setCookieSettings({
      ...settingsToSave,
      layout,
    });
  };

  return {
    gameSound: state.gameSound,
    timerDuration: state.timerDuration,
    timeBonus: state.timeBonus,
    layout: state.layout,
    trainingMode: state.trainingMode,
    setGameSound,
    setTimerDuration,
    setTimeBonus,
    setTrainingMode,
    keyBindings: state.keyBindings,
    tempKeyBindings: state.tempKeyBindings,
    setTempKeyBinding,
    applyTempKeyBindings,
    setLayout,
  };
};

export default useStratagemsGameSettings;
