import { useEffect, useReducer } from 'react';

function useStratagemsSeries({ initialState, maxLength = 999 }) {
  const initialStateSerie = {
    index: 0,
    error: false,
    success: false,
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'index':
        return { ...state, index: action.payload };
      case 'error':
        return { ...state, error: action.payload };
      case 'success':
        return { ...state, success: action.payload };
      default:
        return state;
    }
  }
  const [stateSerie, dispatchStateSerie] = useReducer(reducer, initialStateSerie);
  const { error, success } = stateSerie;

  const [series, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'add': {
          const randomStratagems = initialState[Math.floor(Math.random() * initialState.length)];
          return [...state.slice(1), randomStratagems];
        }
        case 'remove':
          return state.filter((stratagem) => stratagem.id !== action.stratagem.id);
        case 'reset':
          return initialState.slice(0, maxLength);
        default:
          return state;
      }
    },
    initialState.slice(0, maxLength),
  );

  const handleAddToSeries = () => {
    dispatchStateSerie({ type: 'success', payload: true });
    dispatch({ type: 'add' });
  };

  const resetSeries = () => {
    dispatch({ type: 'reset' });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatchStateSerie({ type: 'error', payload: false });
      }, 250);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatchStateSerie({ type: 'success', payload: false });
      }, 250);
    }
  }, [success]);

  return {
    series,
    resetSeries,
    handleAddToSeries,
    stateSerie,
    dispatchStateSerie,
  };
}

export default useStratagemsSeries;
