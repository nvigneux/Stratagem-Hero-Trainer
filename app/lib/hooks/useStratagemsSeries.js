import { useEffect, useReducer, useState } from 'react';

function useStratagemsSeries({ initialState, maxLength = 999 }) {
  const [serieIndex, setSerieIndex] = useState(0);
  const [serieError, setSerieError] = useState(false);
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
    dispatch({ type: 'add' });
  };

  const resetSeries = () => {
    dispatch({ type: 'reset' });
  };

  useEffect(() => {
    if (serieError) {
      setTimeout(() => {
        setSerieError(false);
      }, 250);
    }
  }, [serieError]);

  return {
    series,
    resetSeries,
    handleAddToSeries,
    serieIndex,
    setSerieIndex,
    serieError,
    setSerieError,
  };
}

export default useStratagemsSeries;
