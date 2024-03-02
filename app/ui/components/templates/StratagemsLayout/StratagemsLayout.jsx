'use client';

import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// Styles
import styles from './StratagemsLayout.module.css';

// Components
import StratagemsCard from '../../atoms/StratagemsCard/StratagemsCard';
import StratagemsName from '../../atoms/StratagemsName/StratagemsName';
import StratagemsGameCard from '../../atoms/StratagemsGameCard/StratagemsGameCard';
import StratagemsCategories from '../../atoms/StratagemsCategories/StratagemsCategories';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import Arrow from '../../atoms/Arrow/Arrow';
import StratagemsTimer from '../../atoms/StratagemsTimer/StratagemsTimer';

// Hooks
import useCheckboxes from '../../../../lib/hooks/useCheckboxes';
import useStratagemsSeries from '../../../../lib/hooks/useStratagemsSeries';
import useEventListener from '../../../../lib/hooks/useEventListener';
import useTimer from '../../../../lib/hooks/useTimer';
import RoundInfo from '../../atoms/RoundInfo/RoundInfo';
import ScoreInfo from '../../atoms/ScoreInfo/ScoreInfo';
import ButtonSideStratagems from '../../atoms/ButtonSideStratagems/ButtonSideStratagems';
import cn from '../../../../lib/cn';

const TIMER_DURATION = 10;
const TIME_BONUS = 1;

function StratagemsLayout({ stratagems, stratagemsByCategories }) {
  const [openStratagems, setOpenStratagems] = useState(true);

  const {
    checkboxes, handleChange, checkboxesAreChecked, handleChangeAll,
  } = useCheckboxes(
    { initialState: stratagems, key: 'name', defaultValue: true },
  );

  const filteredStratagemsChecked = useMemo(
    () => [...stratagems].filter((stratagem) => checkboxes[stratagem.name]),
    [stratagems, checkboxes],
  );

  const {
    series, resetSeries, handleSuccessStratagem, stateSerie, dispatchStateSerie,
  } = useStratagemsSeries({
    initialState: filteredStratagemsChecked, maxLength: 6,
  });

  const {
    progress, isRunning, startTimer, resetTimer, addTime,
  } = useTimer(TIMER_DURATION, TIMER_DURATION, resetSeries);

  /**
   * Handle the change of a single checkbox
   * @param {string} name
   */
  const handleChangeCheckbox = (name) => {
    handleChange(name);
    dispatchStateSerie({ type: 'resetScore', payload: 0 });
    resetSeries();
    resetTimer();
  };

  // Reset the series when the all checkboxes change
  const handleChangeAllCheckbox = () => {
    handleChangeAll();
    dispatchStateSerie({ type: 'resetScore', payload: 0 });
    resetSeries();
    resetTimer();
  };

  /**
   * Handle the change of all checkboxes in a category
   * @param {string} category
   * @param {boolean} value
   */
  const handleChangeCategoriesCheckbox = (category, value) => {
    stratagemsByCategories[category].forEach((stratagem) => handleChange(stratagem.name, value));
    dispatchStateSerie({ type: 'resetScore', payload: 0 });
    resetSeries();
    resetTimer();
  };

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
      setTimeout(() => { // wait for the last code arrow to be seen correctly
        if (series.length === 1) {
          resetTimer();
        } else {
          addTime(TIME_BONUS);
        }
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
    <main className={cn([styles.container, openStratagems ? styles.opened : styles.closed])}>
      <ButtonSideStratagems
        onClick={() => setOpenStratagems(!openStratagems)}
        isOpened={openStratagems}
      />
      <div className={styles.side}>
        <StratagemsCategories>
          <Checkbox
            id="all"
            checked={checkboxesAreChecked}
            onChange={handleChangeAllCheckbox}
            label={checkboxesAreChecked ? 'Deselect all' : 'Select all'}
            className={styles.checkboxAll}
          />
          <div className={styles.sideContainer}>
            <div className={styles.sideDecoration} />
            {Object.entries(stratagemsByCategories).map(([category, stratagemsByCategory]) => {
              const categoryChecked = stratagemsByCategory.every(
                (stratagem) => checkboxes[stratagem.name],
              );
              return (
                <StratagemsCategories.Category key={category}>

                  <StratagemsCategories.Head category={category}>
                    <Checkbox
                      id={category}
                      checked={categoryChecked}
                      onChange={() => handleChangeCategoriesCheckbox(category, !categoryChecked)}
                    />
                  </StratagemsCategories.Head>

                  <StratagemsCategories.Cards stratagems={stratagemsByCategory}>
                    {(stratagem) => (
                      <Checkbox
                        key={stratagem.name}
                        id={stratagem.name}
                        checked={checkboxes[stratagem.name]}
                        onChange={() => handleChangeCheckbox(stratagem.name)}
                      >
                        <StratagemsCard
                          name={stratagem.name}
                          code={stratagem.code}
                          active={checkboxes[stratagem.name]}
                        />
                      </Checkbox>
                    )}
                  </StratagemsCategories.Cards>
                </StratagemsCategories.Category>
              );
            })}
          </div>
        </StratagemsCategories>
      </div>

      <div className={styles.main}>
        <div className={styles.roundScoreContainer}>
          <RoundInfo roundNb={stateSerie.round} />
          <ScoreInfo
            score={stateSerie.score}
            bonusRound={stateSerie.bonusRound}
            bonusRestingTime={stateSerie.bonusRestingTime}
            bonusPerfectRound={stateSerie.bonusPerfectRound}
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
      </div>
    </main>
  );
}

StratagemsLayout.propTypes = {
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
};

export default StratagemsLayout;
