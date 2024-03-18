'use client';

import PropTypes from 'prop-types';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';

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
import { Picto } from '../../atoms/Picto/Picto';
import KeyBindingsForm from '../../../../forms/KeyBindingsForm';
import TimerDurationForm from '../../../../forms/TimerDurationForm';

// Hooks
import useStratagemsSeries from '../../../../lib/hooks/useStratagemsSeries';
import useEventListener from '../../../../lib/hooks/useEventListener';
import useTimer from '../../../../lib/hooks/useTimer';
import useStratagemsGameSettings from './useStratagemsGameSettings';

// Provider
import { useStratagems } from '../../templates/StrategemsLayout/StrategemsProvider';

// Lib
import cn from '../../../../lib/cn';
import HeadingForm from '../../atoms/HeadingForm/HeadingForm';

function StratagemsGame({ stratagems, bestScoreStored, settingsStored }) {
  const [openSettings, setOpenSettings] = useState(false);
  const { checkedStratagems = {} } = useStratagems();

  const {
    timerDuration,
    timeBonus,
    setTimerDuration,
    keyBindings,
    tempKeyBindings,
    setTempKeyBinding,
    applyTempKeyBindings,
  } = useStratagemsGameSettings({
    defaultDuration: settingsStored.timerDuration,
    defaultKeyBindings: settingsStored.keyBindings,
    defaultTempKeyBindings: settingsStored.keyBindings,
  });

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
  } = useTimer(timerDuration, timerDuration, resetSeries);

  const refCheckStratagems = useRef(null);
  useEffect(() => {
    const checkedStratagemsString = JSON.stringify(checkedStratagems);
    if (!refCheckStratagems.current) {
      refCheckStratagems.current = checkedStratagemsString;
      return;
    }
    if (refCheckStratagems.current !== checkedStratagemsString) {
      refCheckStratagems.current = checkedStratagemsString;
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
  // TODO build an historic of time the player take to make the entire code
  // to build an history for the player
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
        addTime(timeBonus + 0.01 * stateSerie.round);
      }
      setTimeout(() => { // wait for the last code arrow to be seen correctly
        const percentOfProgress = Math.round((progress / timerDuration) * 100);
        handleSuccessStratagem(percentOfProgress);
        dispatchStateSerie({ type: 'index', payload: 0 });
      }, 175);
    }
  };

  /**
   * Handle the keydown event
   * @param {KeyboardEvent} event
   */
  // TODO Add gamepad support
  function keydownDirectionHandler(event) {
    if (event.target.tagName === 'INPUT') return;
    switch (event.code) {
      case 'ArrowUp':
      case keyBindings.up:
        event.preventDefault();
        checkActiveSerieCode('up');
        break;
      case 'ArrowDown':
      case keyBindings.down:
        event.preventDefault();
        checkActiveSerieCode('down');
        break;
      case 'ArrowLeft':
      case keyBindings.left:
        event.preventDefault();
        checkActiveSerieCode('left');
        break;
      case 'ArrowRight':
      case keyBindings.right:
        event.preventDefault();
        checkActiveSerieCode('right');
        break;
      default:
        break;
    }
  }
  useEventListener('keydown', keydownDirectionHandler);

  const handleSubmitTimerDuration = (formData) => {
    const timerDurationValue = formData.get('timerDuration');
    if (+timerDurationValue !== timerDuration) {
      setTimeout(() => { // fake loading ui
        setTimerDuration(+timerDurationValue);
        resetSeries();
      }, 250);
    }
  };

  const handleKeyBindings = () => {
    setTimeout(() => { // fake loading ui
      applyTempKeyBindings();
    }, 250);
  };

  const handleSetTempKeyBindings = (direction, code) => {
    const forbiddenKeys = ['Escape', 'Enter', 'Tab', 'Meta', 'MetaLeft', 'MetaRight', 'ContextMenu', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'PageUp', 'PageDown', 'Home', 'End', 'Backspace', 'Delete'];
    if (forbiddenKeys.includes(code)) return;
    setTempKeyBinding(direction, code);
  };

  return (
    <div className={cn([styles.wrapper, openSettings ? styles.opened : styles.closed])}>
      <div className={styles.main}>
        <button
          type="button"
          onClick={() => setOpenSettings(!openSettings)}
          className={styles.buttonSettings}
          aria-label="Settings"
        >
          <span className={styles.settingsLabelDesktop}>Settings</span>
          <Picto icon="settings" />
        </button>

        <button
          type="button"
          onClick={() => setOpenSettings(false)}
          className={cn([
            styles.settingsOverlay,
            openSettings ? styles.openedSettings : styles.closedSettings,
          ])}
          aria-label="Close settings"
        />

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

        <div className={styles.stratagemsList}>
          <StratagemsGameCard.List>
            {series?.length ? series.map((stratagem, index) => {
              if (index >= 6) return null;
              return (
                <StratagemsGameCard
                // eslint-disable-next-line react/no-array-index-key
                  key={`${stratagem.id}-${index}`}
                  name={stratagem.name}
                  category={stratagem.category.name}
                  active={index === 0}
                  success={stateSerie.success}
                />
              );
            }) : <div />}
          </StratagemsGameCard.List>
        </div>

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
          <StratagemsTimer progress={progress} total={timerDuration} />
        ) : null}

        {series?.length ? (
          <div className={styles.mobileKeyboard}>
            <StratagemsKeyboardMobile />
          </div>
        ) : null}
      </div>
      <div className={cn([styles.settings])}>
        <div className={styles.settingsSection}>
          <HeadingForm title="Timer duration" />
          <TimerDurationForm
            timerDuration={timerDuration}
            handleSubmitTimerDuration={handleSubmitTimerDuration}
          />
        </div>

        <div className={styles.settingsSection}>
          <HeadingForm title="Key bindings" />
          <KeyBindingsForm
            tempKeyBindings={tempKeyBindings}
            handleKeyBindings={handleKeyBindings}
            handleSetTempKeyBindings={handleSetTempKeyBindings}
          />
        </div>
      </div>
    </div>
  );
}

StratagemsGame.propTypes = {
  stratagems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  bestScoreStored: PropTypes.number.isRequired,
  settingsStored: PropTypes.shape({
    timerDuration: PropTypes.number.isRequired,
    keyBindings: PropTypes.shape({
      up: PropTypes.string.isRequired,
      down: PropTypes.string.isRequired,
      left: PropTypes.string.isRequired,
      right: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default StratagemsGame;
