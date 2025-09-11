import { useEffect, useReducer } from 'react';

// Actions
import { setCookieBestScore } from '../actions';

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
  bestScore: 0,
  startTime: null,
  history: {},
};

/**
 * Reducer function for managing the state of the series.
 * @param {object} state - Current state.
 * @param {object} action - Action to perform.
 * @returns {object} Updated state.
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
        index: 0,
      };
    case 'success':
      return {
        ...state,
        success: action.payload,
        nbSuccess: action.payload ? state.nbSuccess + 1 : state.nbSuccess,
      };
    case 'round':
      return {
        ...state,
        round: action.payload,
        history: { ...state.history, [action.payload]: [] },
      };
    case 'score':
      return { ...state, ...action.payload };
    case 'resetScore':
      return {
        ...initialStateSerie,
        bestScore: state.score > state.bestScore ? state.score : state.bestScore,
      };
    case 'resetEvent':
      return {
        ...state, error: false, success: false, nbError: 0, nbSuccess: 0,
      };
    case 'startTime':
      return { ...state, startTime: action.payload };
    case 'endTime': {
      return {
        ...state,
        history: {
          ...state.history,
          [state.round]: [
            ...(state.history[state.round] || []),
            {
              startTime: state.startTime,
              endTime: action.payload.date,
              stratagem: action.payload.stratagem,
              nbError: state.nbError,
            },
          ],
        },
        nbError: 0,
      };
    }
    default:
      return state;
  }
}

/**
 * Custom hook for managing the series of stratagems.
 * @param {object} props - Properties.
 * @param {Array} props.initialState - Initial state of the stratagems.
 * @param {number} props.maxLength - Maximum length of the series.
 * @param {number} props.bestScoreStored - Best score stored.
 * @param {{stratagemJammer: boolean, sequentialMode: boolean}} props.trainingMode - Training mode.
 * @returns {object} Series state and control functions.
 */
function useStratagemsSeries({
  initialState, maxLength = 999, bestScoreStored = 0, trainingMode,
}) {
  const [stateSerie, dispatchStateSerie] = useReducer(
    reducerStateSerie,
    { ...initialStateSerie, bestScore: bestScoreStored },
  );
  const { error, success } = stateSerie;

  /**
   * Reset the stratagems array with random stratagems from the initial state
   * @returns {Array} Reset stratagems array.
   */
  const resetStratagemsArray = () => {
    if (!initialState.length) return [];

    // if the sequential mode is enabled, return the initial state
    if (trainingMode.sequentialMode) {
      return initialState.sort((a, b) => (a?.order || 0) - (b?.order || 0));
    }

    const length = maxLength + stateSerie.round - 1;

    return Array.from({ length }, () => [...initialState][Math.floor(
      Math.random() * initialState.length,
    )]);
  };

  const [series, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'remove':
          return state.filter((stratagem) => stratagem.name !== action.stratagem.name);
        case 'removeFirst':
          return state.slice(1);
        case 'reset':
          return resetStratagemsArray();
        default:
          return state;
      }
    },
    initialState.slice(0, maxLength + stateSerie.round - 1),
  );

  /**
   * Add a stratagem to the series
   * @param {number} bonusRestingTime - Bonus resting time.
   * @returns {void}
   */
  const handleSuccessStratagem = (bonusRestingTime) => {
    const pointToAdd = series[0].code.length * 5;
    dispatch({ type: 'removeFirst', stratagem: series[0] });
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

    if (series.length === 1) { // if the series is 1, reset the series and increase the round
      const bonusRound = 25 * stateSerie.round + 50;
      const bonusPerfectRound = stateSerie.nbError === 0 ? 100 : 0;

      const score = stateSerie.score + bonusRound + bonusPerfectRound + bonusRestingTime;
      const bestScore = score > stateSerie.bestScore ? score : stateSerie.bestScore;

      dispatchStateSerie({
        type: 'score',
        payload: {
          score,
          bonusRound,
          bonusPerfectRound,
          bonusRestingTime,
          bestScore,
        },
      });

      if (score > stateSerie.bestScore) { // store the best score in the cookie
        setCookieBestScore(bestScore);
      }

      dispatch({ type: 'reset' });
      dispatchStateSerie({ type: 'resetEvent' });
      dispatchStateSerie({ type: 'round', payload: stateSerie.round + 1 });
    }
  };

  /**
   * Reset the series
   */
  const resetSeries = () => {
    if (stateSerie.score > stateSerie.bestScore) { // store the best score in the cookie
      setCookieBestScore(stateSerie.score);
    }

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
