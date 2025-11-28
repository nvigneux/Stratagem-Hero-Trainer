import { useEffect, useReducer } from 'react';

// Actions
import { setCookieBestScore } from '../actions';

const initialSeriesState = {
  index: 0,
  error: false,
  errorCount: 0,
  success: false,
  successCount: 0,
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
function seriesStateReducer(state, action) {
  switch (action.type) {
    case 'index':
      return { ...state, index: action.payload };
    case 'error':
      return {
        ...state,
        error: action.payload,
        errorCount: action.payload ? state.errorCount + 1 : state.errorCount,
        index: 0,
      };
    case 'success':
      return {
        ...state,
        success: action.payload,
        successCount: action.payload ? state.successCount + 1 : state.successCount,
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
        ...initialSeriesState,
        bestScore: state.score > state.bestScore ? state.score : state.bestScore,
      };
    case 'resetEvent':
      return {
        ...state, error: false, success: false, errorCount: 0, successCount: 0,
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
              errorCount: state.errorCount,
            },
          ],
        },
        errorCount: 0,
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
  const [seriesState, dispatchSeriesState] = useReducer(
    seriesStateReducer,
    { ...initialSeriesState, bestScore: bestScoreStored },
  );
  const { error, success } = seriesState;

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

    const length = maxLength + seriesState.round - 1;

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
    initialState.slice(0, maxLength + seriesState.round - 1),
  );

  /**
   * Add a stratagem to the series
   * @param {number} bonusRestingTime - Bonus resting time.
   * @returns {void}
   */
  const handleSuccessStratagem = (bonusRestingTime) => {
    const pointToAdd = series[0].code.length * 5;
    dispatch({ type: 'removeFirst', stratagem: series[0] });
    dispatchSeriesState({ type: 'success', payload: true });
    dispatchSeriesState({
      type: 'score',
      payload: {
        score: seriesState.score + pointToAdd,
        bonusRound: 0,
        bonusPerfectRound: 0,
        bonusRestingTime: 0,
      },
    });

    if (series.length === 1) { // if the series is 1, reset the series and increase the round
      const bonusRound = 25 * seriesState.round + 50;
      const bonusPerfectRound = seriesState.errorCount === 0 ? 100 : 0;

      const score = seriesState.score + bonusRound + bonusPerfectRound + bonusRestingTime;
      const bestScore = score > seriesState.bestScore ? score : seriesState.bestScore;

      dispatchSeriesState({
        type: 'score',
        payload: {
          score,
          bonusRound,
          bonusPerfectRound,
          bonusRestingTime,
          bestScore,
        },
      });

      if (score > seriesState.bestScore) { // store the best score in the cookie
        setCookieBestScore(bestScore);
      }

      dispatch({ type: 'reset' });
      dispatchSeriesState({ type: 'resetEvent' });
      dispatchSeriesState({ type: 'round', payload: seriesState.round + 1 });
    }
  };

  /**
   * Reset the series
   */
  const resetSeries = () => {
    if (seriesState.score > seriesState.bestScore) { // store the best score in the cookie
      setCookieBestScore(seriesState.score);
    }

    dispatch({ type: 'reset' });
    dispatchSeriesState({ type: 'resetScore' });
  };

  // reset error state if is triggered
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatchSeriesState({ type: 'error', payload: false });
      }, 250);
    }
  }, [error]);

  // reset success state if is triggered
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatchSeriesState({ type: 'success', payload: false });
      }, 250);
    }
  }, [success]);

  return {
    series,
    resetSeries,
    handleSuccessStratagem,
    seriesState,
    dispatchSeriesState,
  };
}

export default useStratagemsSeries;
