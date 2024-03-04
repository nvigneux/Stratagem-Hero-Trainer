'use client';

import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';

// Styles
import styles from './StratagemsGame.module.css';

// Components
import StratagemsName from '../../atoms/StratagemsName/StratagemsName';
import StratagemsGameCard from '../../molecules/StratagemsGameCard/StratagemsGameCard';
import StratagemsKeyboardMobile from '../../molecules/StratagemsKeyboardMobile/StratagemsKeyboardMobile';
import StratagemsTimer from '../../atoms/StratagemsTimer/StratagemsTimer';
import RoundInfo from '../../atoms/RoundInfo/RoundInfo';
import ScoreInfo from '../../atoms/ScoreInfo/ScoreInfo';
import Arrow from '../../atoms/Arrow/Arrow';

// Hooks
import useStratagemsSeries from '../../../../lib/hooks/useStratagemsSeries';
import useEventListener from '../../../../lib/hooks/useEventListener';
import useTimer from '../../../../lib/hooks/useTimer';

// Provider
import { useStratagems } from '../../templates/StrategemsLayout/StrategemsProvider';

const TIMER_DURATION = 10;
const TIME_BONUS = 1;

function StratagemsGame({ stratagems, bestScoreStored }) {
  const { checkedStratagems = {} } = useStratagems();

  const filteredStratagemsChecked = useMemo(
    () => [...stratagems].filter((stratagem) => checkedStratagems[stratagem.name]),
    [stratagems, checkedStratagems],
  );

  const {
    series, resetSeries, handleSuccessStratagem, stateSerie, dispatchStateSerie,
  } = useStratagemsSeries({
    initialState: filteredStratagemsChecked, maxLength: 6, bestScoreStored,
  });

  const {
    progress, isRunning, startTimer, resetTimer, addTime,
  } = useTimer(TIMER_DURATION, TIMER_DURATION, resetSeries);

  const refCheckStratagems = useRef(null);
  useEffect(() => {
    const checkedStratagemsString = JSON.stringify(checkedStratagems);
    console.log(
      refCheckStratagems.current === checkedStratagemsString,
      refCheckStratagems.current,
      checkedStratagemsString,
    );
    if (!refCheckStratagems.current) {
      refCheckStratagems.current = checkedStratagemsString;
      return;
    }
    if (refCheckStratagems.current !== checkedStratagemsString) {
      console.log('reset');
      dispatchStateSerie({ type: 'resetScore' });
      resetSeries();
      resetTimer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedStratagems]);

  /**
   * Check if the active serie code is correct
   * @param {string} direction
   */
  const checkActiveSerieCode = (direction) => {
    const serieDirection = series[0].code[stateSerie.index];
    if (direction === serieDirection) { // direction is correct
      if (!isRunning) startTimer();
      dispatchStateSerie({ type: 'index', payload: stateSerie.index + 1 });
    } else {
      dispatchStateSerie({ type: 'error', payload: true });
      return;
    }

    if (stateSerie.index === series[0].code.length - 1) {
      if (series.length === 1) {
        resetTimer();
      } else {
        addTime(TIME_BONUS);
      }
      setTimeout(() => { // wait for the last code arrow to be seen correctly
        handleSuccessStratagem(progress);
        dispatchStateSerie({ type: 'index', payload: 0 });
      }, 175);
    }
  };

  /**
   * Handle the keydown event
   * @param {KeyboardEvent} event
   */
  function keydownDirectionHandler(event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        checkActiveSerieCode('up');
        break;
      case 'ArrowDown':
      case 'KeyS':
        checkActiveSerieCode('down');
        break;
      case 'ArrowLeft':
      case 'KeyA':
        checkActiveSerieCode('left');
        break;
      case 'ArrowRight':
      case 'KeyD':
        checkActiveSerieCode('right');
        break;
      default:
        break;
    }
  }
  useEventListener('keydown', keydownDirectionHandler);

  return (
    <>
      <div className={styles.roundScoreContainer}>
        <RoundInfo roundNb={stateSerie.round} />
        <ScoreInfo
          score={stateSerie.score}
          bonusRound={stateSerie.bonusRound}
          bonusRestingTime={stateSerie.bonusRestingTime}
          bonusPerfectRound={stateSerie.bonusPerfectRound}
          bestScore={stateSerie.bestScore}
          displayBonus={!isRunning && stateSerie.score > 0}
        />
      </div>

      <StratagemsGameCard.List>
        {series?.length ? series.map((stratagem, index) => {
          if (index >= 6) return null;
          return (
            <StratagemsGameCard
                // eslint-disable-next-line react/no-array-index-key
              key={`${stratagem.id}-${index}`}
              name={stratagem.name}
              active={index === 0}
              success={stateSerie.success}
            />
          );
        }) : <div />}
      </StratagemsGameCard.List>

      {series?.length ? (
        <div className={styles.activeStratagemsInfo}>
          <StratagemsName name={series[0].name} />
          <Arrow.List>
            {series[0].code.map((direction, index) => (
              <Arrow
                    // eslint-disable-next-line react/no-array-index-key
                key={`${series[0].name}-${direction}-${index}`}
                direction={direction}
                active={index + 1 <= stateSerie.index}
                error={stateSerie.error}
                size="large"
              />
            ))}
          </Arrow.List>
        </div>
      ) : <StratagemsName name="Traitor detected !" />}

      {series?.length ? (
        <StratagemsTimer progress={progress} total={TIMER_DURATION} />
      ) : null}

      {series?.length ? (
        <div className={styles.mobileKeyboard}>
          <StratagemsKeyboardMobile />
        </div>
      ) : null}
    </>
  );
}

StratagemsGame.propTypes = {
  stratagems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  bestScoreStored: PropTypes.number.isRequired,
};

export default StratagemsGame;
