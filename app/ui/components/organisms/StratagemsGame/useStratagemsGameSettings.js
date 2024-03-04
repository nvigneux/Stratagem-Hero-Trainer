import { useReducer } from 'react';

const TIMER_DURATION = 10;
const TIMER_BONUS = 1;

const initialState = {
  timerDuration: TIMER_DURATION,
  timeBonus: TIMER_BONUS,
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMER_DURATION':
      return { ...state, timerDuration: action.payload };
    case 'SET_TIME_BONUS':
      return { ...state, timeBonus: action.payload };
    default:
      return state;
  }
};

const useStratagemsGameSettings = (
  defaultDuration = TIMER_DURATION,
  defaultBonus = TIMER_BONUS,
) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    ...initialState,
    timerDuration: defaultDuration,
    timeBonus: defaultBonus,
  });

  const isValidDuration = (duration) => typeof duration === 'number' && duration > 0;

  const setTimerDuration = (timerDuration) => {
    if (isValidDuration(timerDuration)) {
      dispatch({ type: 'SET_TIMER_DURATION', payload: timerDuration });
    }
  };

  const setTimeBonus = (timeBonus) => {
    if (isValidDuration(timeBonus)) {
      dispatch({ type: 'SET_TIME_BONUS', payload: timeBonus });
    }
  };

  return {
    timerDuration: state.timerDuration,
    timeBonus: state.timeBonus,
    setTimerDuration,
    setTimeBonus,
  };
};

export default useStratagemsGameSettings;
