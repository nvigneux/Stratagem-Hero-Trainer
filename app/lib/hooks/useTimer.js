import { useReducer, useEffect, useCallback } from 'react';

const initialState = {
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
      return { ...initialState, progress: action.payload, isFinished: true };
    }
    case 'RESET':
      return { ...initialState, progress: action.payload };
    case 'TICK': {
      const newProgress = Math.max(state.progress - action.payload.elapsedSeconds, 0);
      if (newProgress === 0) {
        action.payload.handleIsOver();
        return { ...initialState, progress: action.payload.initialProgress, isFinished: true };
      }
      if (state.isRunning) {
        return { ...state, progress: newProgress };
      }

      return { ...state, progress: action.payload.initialProgress };
    }
    case 'ADD_TIME':
      return { ...state, progress: Math.min(state.progress + action.payload, action.total) };
    case 'RESTART':
      return { ...initialState, isRunning: true };
    default:
      return state;
  }
};

const useTimer = (initialProgress, total, handleIsOver) => {
  const [state, dispatch] = useReducer(timerReducer, {
    ...initialState,
    progress: initialProgress,
  });

  useEffect(() => {
    let animationFrameId;
    let lastTickTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsedMilliseconds = now - lastTickTime;
      lastTickTime = now;
      const elapsedSeconds = elapsedMilliseconds / 1000;
      dispatch({ type: 'TICK', payload: { elapsedSeconds, initialProgress, handleIsOver } });

      if (state.progress > 0) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    if (state.isRunning) {
      animationFrameId = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [state.isRunning]); // Only depend on state.isRunning

  const startTimer = useCallback(() => dispatch({ type: 'START' }), []);
  const pauseTimer = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const resetTimer = useCallback(() => dispatch({ type: 'RESET', payload: initialProgress }), [initialProgress]);
  const addTime = useCallback((amount) => dispatch({ type: 'ADD_TIME', payload: amount, total }), [total]);
  const restartTimer = useCallback(() => dispatch({ type: 'RESTART' }), []);

  useEffect(() => {
    resetTimer();
  }, [initialProgress, resetTimer]);

  return {
    progress: state.progress,
    isRunning: state.isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    restartTimer,
    addTime,
  };
};

export default useTimer;
