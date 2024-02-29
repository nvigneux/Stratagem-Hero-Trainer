import { useMemo, useReducer } from 'react';

function useStratagemsSeries({ stratagems, checkboxes, maxLength = 999 }) {
  // use reducer to handle the state of the series
  const initialState = useMemo(
    () => [...stratagems]
      .filter((stratagem) => checkboxes[stratagem.name]),
    [stratagems, checkboxes],
  );

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

  return {
    series,
    resetSeries,
    handleAddToSeries,
  };
}

export default useStratagemsSeries;
