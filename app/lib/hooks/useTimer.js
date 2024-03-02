import { useReducer, useEffect } from 'react';

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
    case 'FINISH':
      return { ...initialState, progress: action.payload, isFinished: true };
    case 'RESET':
      return { ...initialState, progress: action.payload };
    case 'TICK':
      return { ...state, progress: Math.max(state.progress - 1 / 60, 0) };
    case 'ADD_TIME':
      return { ...state, progress: Math.min(state.progress + action.payload, action.total) };
    case 'RESTART':
      return { ...state, ...initialState, isRunning: true };
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

    const tick = () => {
      dispatch({ type: 'TICK' });
      animationFrameId = requestAnimationFrame(tick);
    };

    if (state.isRunning && state.progress > 0) {
      animationFrameId = requestAnimationFrame(tick);
    }

    if (state.isRunning && state.progress <= 0) {
      dispatch({ type: 'FINISH', payload: initialProgress });
      handleIsOver();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [handleIsOver, initialProgress, state.isRunning, state.progress]);

  const startTimer = () => {
    dispatch({ type: 'START' });
  };

  const pauseTimer = () => {
    dispatch({ type: 'PAUSE' });
  };

  const resetTimer = () => {
    dispatch({ type: 'RESET', payload: initialProgress });
  };

  const addTime = (amount) => {
    dispatch({ type: 'ADD_TIME', payload: amount, total });
  };

  const restartTimer = () => {
    dispatch({ type: 'RESTART' });
  };

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
