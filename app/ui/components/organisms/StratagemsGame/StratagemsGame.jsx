'use client';

import PropTypes from 'prop-types';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';

import useSound from 'use-sound';

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
import GameSoundForm from '../../../../forms/GameSoundForm';
import TimerDurationForm from '../../../../forms/TimerDurationForm';
import HeadingForm from '../../atoms/HeadingForm/HeadingForm';

// Hooks
import useStratagemsSeries from '../../../../lib/hooks/useStratagemsSeries';
import useEventListener from '../../../../lib/hooks/useEventListener';
import useTimer from '../../../../lib/hooks/useTimer';
import useStratagemsGameSettings from './useStratagemsGameSettings';

// Provider
import { useStratagems } from '../../templates/StrategemsLayout/StrategemsProvider';

// Lib
import cn from '../../../../lib/cn';

function StratagemsGame({ stratagems, bestScoreStored, settingsStored }) {
  const [openSettings, setOpenSettings] = useState(false);
  const { checkedStratagems = {} } = useStratagems();

  const {
    gameSound,
    setGameSound,
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
    defaultGameSound: settingsStored.gameSound,
  });

  const [playPress1] = useSound('/sounds/stratagem-code-press-1.mp3', { soundEnabled: gameSound });
  const [playPress2] = useSound('/sounds/stratagem-code-press-2.mp3', { soundEnabled: gameSound });
  const [playFinish] = useSound('/sounds/stratagem-code-finish.mp3', { soundEnabled: gameSound });
  const [playNewRound] = useSound('/sounds/stratagem-code-new-round.mp3', { soundEnabled: gameSound });
  const [playError] = useSound('/sounds/stratagem-code-error.mp3', { soundEnabled: gameSound });

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

  // TODO build an historic of time the player take to make the entire code
  // to build an history for the player
  /**
   * Check if the active serie code is correct
   * @param {string} direction
   */
  const checkActiveSerieCode = (direction) => {
    const serieDirection = series[0].code[stateSerie.index];
    if (direction === serieDirection) { // direction is correct
      if (!isRunning) startTimer();
      const playSound = Math.random() < 0.75 ? playPress2 : playPress1;
      playSound();
      dispatchStateSerie({ type: 'index', payload: stateSerie.index + 1 });

      if (stateSerie.index === 0) {
        dispatchStateSerie({ type: 'startTime', payload: Date.now() });
      }
    } else {
      dispatchStateSerie({ type: 'error', payload: true });
      playError();
      return;
    }

    if (stateSerie.index === series[0].code.length - 1) {
      if (series.length === 1) {
        resetTimer();
        playNewRound();
        dispatchStateSerie({ type: 'endTime', payload: { date: Date.now(), stratagem: series[0] } });
      } else {
        addTime(timeBonus + 0.01 * stateSerie.round);
      }

      setTimeout(() => { // wait for the last code arrow to be seen correctly
        const percentOfProgress = Math.round((progress / timerDuration) * 100);
        handleSuccessStratagem(percentOfProgress);
        if (series.length !== 1) { // play sound of finished stratagem if there is more than one
          playFinish();

          dispatchStateSerie({ type: 'endTime', payload: { date: Date.now(), stratagem: series[0] } });
        }
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

  /** * Form handlers */
  /**
   * Handle the submit of the timer duration form
   * @param {FormData} formData
   */
  const handleSubmitTimerDuration = (formData) => {
    const timerDurationValue = formData.get('timerDuration');
    if (+timerDurationValue !== timerDuration) {
      setTimeout(() => { // fake loading ui
        setTimerDuration(+timerDurationValue);
        resetSeries();
      }, 250);
    }
  };

  /**
   * Handle the submit of the game sound form
   * @param {FormData} formData
   */
  const handleSubmitGameSound = (formData) => {
    const gameSoundValue = formData.get('gameSound');
    if (!!gameSoundValue !== !!gameSound) {
      setTimeout(() => { // fake loading ui
        setGameSound(!!gameSoundValue);
      }, 250);
    }
  };

  /**
   * Handle the key bindings
   */
  const handleKeyBindings = () => {
    setTimeout(() => { // fake loading ui
      applyTempKeyBindings();
    }, 250);
  };

  /**
   * Set the temp key bindings
   * @param {string} direction
   * @param {string} code
   * @returns {void}
   */
  const handleSetTempKeyBindings = (direction, code) => {
    const forbiddenKeys = ['Escape', 'Enter', 'Tab', 'Meta', 'MetaLeft', 'MetaRight', 'ContextMenu', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'PageUp', 'PageDown', 'Home', 'End', 'Backspace', 'Delete'];
    if (forbiddenKeys.includes(code)) return;
    setTempKeyBinding(direction, code);
  };

  // History transformation to get each stratagem stats
  // const stats = useMemo(() => Object.values(stateSerie.history)
  //   .flat()
  //   .reduce((acc, item) => {
  //     const { name } = item.stratagem;

  //     if (!acc[name]) {
  //       acc[name] = {
  //         nb: 0,
  //         time: 0,
  //         error: 0,
  //       };
  //     }

  //     acc[name].nb += 1;
  //     acc[name].time += item.endTime - item.startTime;
  //     acc[name].error += item.nbError;

  //     return acc;
  //   }, {}), [stateSerie.history]);

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
                  key={`${stratagem.code}-${index}`}
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

      {Object.keys(stateSerie.history)?.length ? (
        <div className={styles.history}>
          <h2 className={styles.historyTitle}>History</h2>
          <div className={styles.historyList}>
            {Object.keys(stateSerie.history).reverse().map((round) => {
              if (!stateSerie.history[round]?.length) return null;
              return (
                <div key={round} style={{ padding: '1rem' }}>
                  <span>{`Round ${round}`}</span>
                  <div>
                    {stateSerie.history[round].map((item, index) => (
                      <div key={item.startTime} className={styles.historyItemDetail}>
                        <span style={{ display: 'inline-block', width: '250px' }}>
                          {`${index + 1} ${item.stratagem.name}`}
                        </span>
                        <span style={{ display: 'inline-block', width: '150px' }}>
                          {`${((item.endTime - item.startTime) / 1000).toFixed(2)} sec`}
                        </span>
                        <span>{`error: ${item.nbError}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className={cn([styles.settings])}>
        <div className={styles.settingsSection}>
          <HeadingForm title="Audio" />
          <GameSoundForm
            gameSound={gameSound}
            handleSubmitGameSound={handleSubmitGameSound}
          />
        </div>

        <div className={styles.settingsSection}>
          <HeadingForm title="Timer" />
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
    gameSound: PropTypes.bool.isRequired,
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
