import { useReducer, useEffect, useCallback } from 'react';

const initialTimerState = {
  progress: 0,
  isRunning: false,
  isFinished: false,
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true, isFinished: false };
    case 'PAUSE':
      return { ...state, isRunning: false };
    case 'FINISH': {
      return { ...initialTimerState, progress: action.payload, isFinished: true };
    }
    case 'RESET':
      return { ...initialTimerState, progress: action.payload };
    case 'TICK': {
      const newProgress = Math.max(state.progress - action.payload.elapsedSeconds, 0);
      if (newProgress === 0) {
        action.payload.handleTimerComplete();
        return { ...initialTimerState, progress: action.payload.initialProgress, isFinished: true };
      }
      if (state.isRunning) {
        return { ...state, progress: newProgress };
      }

      return { ...state, progress: action.payload.initialProgress };
    }
    case 'ADD_TIME':
      return { ...state, progress: Math.min(state.progress + action.payload, action.total) };
    case 'RESTART':
      return { ...initialTimerState, isRunning: true };
    default:
      return state;
  }
};

/**
 * Custom hook for managing a timer.
 * @param {number} initialProgress - Initial progress value.
 * @param {number} total - Total time value.
 * @param {Function} handleTimerComplete - Callback function when the timer is over.
 * @returns {object} Timer state and control functions.
 */
const useTimer = (initialProgress, total, handleTimerComplete) => {
  const [timerState, dispatch] = useReducer(timerReducer, {
    ...initialTimerState,
    progress: initialProgress,
  });

  useEffect(() => {
    let animationFrameId;
    let lastTickTime = performance.now();

    const tick = () => {
      const currentTime = performance.now();
      const elapsedMilliseconds = currentTime - lastTickTime;
      lastTickTime = currentTime;
      const elapsedSeconds = elapsedMilliseconds / 1000;
      dispatch({ type: 'TICK', payload: { elapsedSeconds, initialProgress, handleTimerComplete } });

      if (timerState.progress > 0) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    if (timerState.isRunning) {
      animationFrameId = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [timerState.isRunning]); // Only depend on timerState.isRunning

  const startTimer = useCallback(() => dispatch({ type: 'START' }), []);
  const pauseTimer = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const resetTimer = useCallback(
    () => dispatch({ type: 'RESET', payload: initialProgress }),
    [initialProgress],
  );
  const addTime = useCallback(
    (amount) => dispatch({ type: 'ADD_TIME', payload: amount, total }),
    [total],
  );
  const restartTimer = useCallback(() => dispatch({ type: 'RESTART' }), []);

  useEffect(() => {
    resetTimer();
  }, [initialProgress, resetTimer]);

  return {
    progress: timerState.progress,
    isRunning: timerState.isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    restartTimer,
    addTime,
  };
};

export default useTimer;
