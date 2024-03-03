'use client';

import PropTypes from 'prop-types';

// Styles
import { useMemo } from 'react';
import styles from './StratagemsGameSheel.module.css';

// Components
import StratagemsName from '../../atoms/StratagemsName/StratagemsName';
import StratagemsGameCard from '../../molecules/StratagemsGameCard/StratagemsGameCard';
import StratagemsKeyboardMobile from '../../molecules/StratagemsKeyboardMobile/StratagemsKeyboardMobile';
import StratagemsTimer from '../../atoms/StratagemsTimer/StratagemsTimer';
import RoundInfo from '../../atoms/RoundInfo/RoundInfo';
import ScoreInfo from '../../atoms/ScoreInfo/ScoreInfo';
import Arrow from '../../molecules/Arrow/Arrow';

// Hooks
// import useCheckboxes from '../../../../lib/hooks/useCheckboxes';
import useStratagemsSeries from '../../../../lib/hooks/useStratagemsSeries';
import useEventListener from '../../../../lib/hooks/useEventListener';
import useTimer from '../../../../lib/hooks/useTimer';
import { useStratagems } from '../../templates/StrategemsLayout/StrategemsProvider';

const TIMER_DURATION = 10;
const TIME_BONUS = 1;

function StratagemsGameSheel({ stratagems, stratagemsByCategories, bestScoreStored }) {
  const { checkedStratagems } = useStratagems();
  console.log(checkedStratagems);
  // const {
  //   checkboxes, handleChange, checkboxesAreChecked, handleChangeAll,
  // } = useCheckboxes(
  //   { initialState: stratagems, key: 'name', defaultValue: true },
  // );

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

  // /**
  //  * Handle the change of a single checkbox
  //  * @param {string} name
  //  */
  // const handleChangeCheckbox = (name) => {
  //   handleChange(name);
  //   dispatchStateSerie({ type: 'resetScore' });
  //   resetSeries();
  //   resetTimer();
  // };

  // // Reset the series when the all checkboxes change
  // const handleChangeAllCheckbox = () => {
  //   handleChangeAll();
  //   dispatchStateSerie({ type: 'resetScore' });
  //   resetSeries();
  //   resetTimer();
  // };

  // /**
  //  * Handle the change of all checkboxes in a category
  //  * @param {string} category
  //  * @param {boolean} value
  //  */
  // const handleChangeCategoriesCheckbox = (category, value) => {
  //   stratagemsByCategories[category].forEach((stratagem) => handleChange(stratagem.name, value));
  //   dispatchStateSerie({ type: 'resetScore' });
  //   resetSeries();
  //   resetTimer();
  // };

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
      // if (direction === series[0].code[0]) {
      // // if the direction is the first one, reset the active index to 1
      //   dispatchStateSerie({ type: 'index', payload: 1 });
      //   return;
      // }
      dispatchStateSerie({ type: 'index', payload: 0 }); // direction error reset the active index
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
    <div className={styles.main}>
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
    </div>
  );
}

StratagemsGameSheel.propTypes = {
  stratagems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  stratagemsByCategories: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
  }))).isRequired,
  bestScoreStored: PropTypes.number.isRequired,
};

export default StratagemsGameSheel;
