import { useEffect, useReducer } from 'react';

const initialStateSerie = {
  index: 0,
  error: false,
  nbError: 0,
  success: false,
  nbSuccess: 0,
  round: 1,
  score: 0,
  bonusRound: 0,
  bonusPerfectRound: 0,
  bonusRestingTime: 0,
};

/**
 * @param {Object} initialState
 * @param {number} maxLength
 * @returns {Object}
 */
function reducerStateSerie(state, action) {
  switch (action.type) {
    case 'index':
      return { ...state, index: action.payload };
    case 'error':
      return {
        ...state,
        error: action.payload,
        nbError: action.payload ? state.nbError + 1 : state.nbError,
      };
    case 'success':
      return {
        ...state,
        success: action.payload,
        nbSuccess: action.payload ? state.nbSuccess + 1 : state.nbSuccess,
      };
    case 'round':
      return { ...state, round: action.payload };
    case 'score':
      return { ...state, ...action.payload };
    case 'resetScore':
      return { ...initialStateSerie };
    case 'resetEvent':
      return {
        ...state, error: false, success: false, nbError: 0, nbSuccess: 0,
      };
    default:
      return state;
  }
}

/**
 * @param {Object} initialState
 * @param {number} maxLength
 * @returns {Object}
 * @property {Object[]} series
 * @property {function} resetSeries
 * @property {function} handleSuccessStratagem
 * @property {Object} stateSerie
 * @property {function} dispatchStateSerie
 * @property {Object} stateSerie
 */
function useStratagemsSeries({ initialState, maxLength = 999 }) {
  const [stateSerie, dispatchStateSerie] = useReducer(reducerStateSerie, initialStateSerie);
  const { error, success } = stateSerie;

  const [series, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'remove':
          return state.filter((stratagem) => stratagem.id !== action.stratagem.id);
        case 'reset':
          return initialState.slice(0, maxLength + stateSerie.round - 1);
        default:
          return state;
      }
    },
    initialState.slice(0, maxLength + stateSerie.round - 1),
  );

  /**
   * Add a stratagem to the series
   * @param {Number} restingTime
   * @returns {void}
   */
  const handleSuccessStratagem = (restingTime) => {
    const pointToAdd = series[0].code.length * 5;
    dispatch({ type: 'remove', stratagem: series[0] });
    dispatchStateSerie({ type: 'success', payload: true });
    dispatchStateSerie({
      type: 'score',
      payload: {
        score: stateSerie.score + pointToAdd,
        bonusRound: 0,
        bonusPerfectRound: 0,
        bonusRestingTime: 0,
      },
    });

    if (series.length === 1) { // if the series is empty, reset the series and increase the round
      const bonusRound = 25 * stateSerie.round + 50;
      const bonusPerfectRound = stateSerie.nbError === 0 ? 100 : 0;
      const bonusRestingTime = Math.floor(restingTime * 10);

      const score = stateSerie.score + bonusRound + bonusPerfectRound + bonusRestingTime;

      dispatchStateSerie({
        type: 'score',
        payload: {
          score,
          bonusRound,
          bonusPerfectRound,
          bonusRestingTime,
        },
      });

      dispatch({ type: 'reset' });
      dispatchStateSerie({ type: 'resetEvent' });
      dispatchStateSerie({ type: 'round', payload: stateSerie.round + 1 });
    }
  };

  /**
   * Reset the series
   */
  const resetSeries = () => {
    dispatch({ type: 'reset' });
    dispatchStateSerie({ type: 'resetScore' });
  };

  // reset error state if is triggered
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatchStateSerie({ type: 'error', payload: false });
      }, 250);
    }
  }, [error]);

  // reset success state if is triggered
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
    handleSuccessStratagem,
    stateSerie,
    dispatchStateSerie,
  };
}

export default useStratagemsSeries;
