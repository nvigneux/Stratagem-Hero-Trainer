/* eslint-disable no-nested-ternary */

'use client';

import {
  useEffect, useMemo, useReducer, useRef, useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSound from 'use-sound';

// Styles
import styles from './StratagemsGame.module.css';

// Components
import StratagemsName from '../../atoms/StratagemsName/StratagemsName';
import StratagemsGameCard from '../../molecules/StratagemsGameCard/StratagemsGameCard';
import StratagemsKeyboardMobile
  from '../../molecules/StratagemsKeyboardMobile/StratagemsKeyboardMobile';
import StratagemsTimer from '../../atoms/StratagemsTimer/StratagemsTimer';
import RoundInfo, { RoundInfoButton } from '../../atoms/RoundInfo/RoundInfo';
import ScoreInfo from '../../atoms/ScoreInfo/ScoreInfo';
import Arrow from '../../atoms/Arrow/Arrow';
import { Picto } from '../../atoms/Picto/Picto';
import KeyBindingsForm from '../../../../forms/KeyBindingsForm';
import GameSoundForm from '../../../../forms/GameSoundForm';
import TimerDurationForm from '../../../../forms/TimerDurationForm';
import HeadingForm from '../../atoms/HeadingForm/HeadingForm';
import InfoMessage from '../../atoms/InfoMessage/InfoMessage';
import TableStatsWrapper from '../../atoms/TableStatsWrapper/TableStatsWrapper';
import TableStats, {
  TableStatsBody,
  TableStatsCell,
  TableStatsCellMobile,
  TableStatsHeader,
  TableStatsRow,
  TableStatsTitle,
} from '../../atoms/TableStats/TableStats';
import StatsButton, {
  StatsButtonClose,
  StatsButtonLabel,
  StatsButtonWrapper,
} from '../../atoms/StatsButton/StatsButton';
import ButtonSideStratagems from '../../atoms/ButtonSideStratagems/ButtonSideStratagems';
import ButtonBuyMeACoffee from '../../atoms/ButtonBuyMeACoffee/ButtonBuyMeACoffee';

// Hooks
import useStratagemsSeries from '../../../../lib/hooks/useStratagemsSeries';
import useEventListener from '../../../../lib/hooks/useEventListener';
import useTimer from '../../../../lib/hooks/useTimer';
import useStratagemsGameSettings from './useStratagemsGameSettings';
import useGamepad from '../../../../lib/hooks/useGamepad';

// Provider
import { useStratagems } from '../../templates/StrategemsLayout/StrategemsProvider';

// Lib
import cn from '../../../../lib/cn';

// Constants
import { CONTACT_LINK } from '../../../../lib/constants';

/**
 * StratagemsGame Component
 * @param {object} props Component properties
 * @param {Array<{id: string, name: string, code: string[]}>} props.stratagems List of stratagems.
 * @param {number} props.bestScoreStored Best score stored.
 * @param {{timerDuration: number, keyBindings: {up: string, down: string, left: string, right: string}, gameSound: boolean}} props.settingsStored Settings stored.
 * @returns {JSX.Element} The StratagemsGame component.
 */
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

  const [playPress1] = useSound('/sounds/stratagem-code-press-1.mp3', {
    soundEnabled: gameSound,
  });
  const [playPress2] = useSound('/sounds/stratagem-code-press-2.mp3', {
    soundEnabled: gameSound,
  });
  const [playFinish] = useSound('/sounds/stratagem-code-finish.mp3', {
    soundEnabled: gameSound,
  });
  const [playNewRound] = useSound('/sounds/stratagem-code-new-round.mp3', {
    soundEnabled: gameSound,
  });
  const [playError] = useSound('/sounds/stratagem-code-error.mp3', {
    soundEnabled: gameSound,
  });
  const [playGameover] = useSound('/sounds/stratagem-code-game-over.mp3', {
    soundEnabled: gameSound,
  });

  const filteredStratagemsChecked = useMemo(
    () => [...stratagems].filter((stratagem) => checkedStratagems[stratagem.name]),
    [stratagems, checkedStratagems],
  );

  const {
    series,
    resetSeries,
    handleSuccessStratagem,
    stateSerie,
    dispatchStateSerie,
  } = useStratagemsSeries({
    initialState: filteredStratagemsChecked,
    maxLength: 6,
    bestScoreStored,
  });

  const handleGameOver = () => {
    playGameover();
    resetSeries();
  };

  const {
    progress, isRunning, startTimer, resetTimer, addTime,
  } = useTimer(
    timerDuration,
    timerDuration,
    handleGameOver,
  );

  const [statsPanel, seOpenPanel] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'open':
          return { type: 'open', panel: action.panel };
        case 'close':
          return { type: 'close', panel: action.panel };
        default:
          return state;
      }
    },
    { open: 'close', panel: '' },
  );

  /**
   * Handle the stats panel
   * @param {string} panel Panel name.
   * @param {string} type Action type.
   * @returns {void}
   */
  const handleStatsPanel = (panel, type) => {
    if (
      type === 'close'
      || (statsPanel.type === 'open' && panel === statsPanel.panel)
    ) {
      seOpenPanel({ type: 'close', panel: statsPanel.panel });
      setTimeout(() => {
        seOpenPanel({ type: 'close', panel: '' });
      }, 500);
      return;
    }
    if (
      type === 'open'
      || statsPanel.type === 'close'
      || panel !== statsPanel.panel
    ) {
      seOpenPanel({ type: 'open', panel });
    }
  };

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
      handleStatsPanel('', 'close');
    }
  }, [checkedStratagems]);

  // TODO build a history of the time the player takes to complete the entire code

  /**
   * Check if the active serie code is correct
   * @param {string} direction The direction to check.
   */
  const checkActiveSerieCode = (direction) => {
    const serieDirection = series[0].code[stateSerie.index];
    if (direction === serieDirection) {
      if (!isRunning) startTimer();
      const playSound = Math.random() < 0.75 ? playPress2 : playPress1;
      playSound();
      dispatchStateSerie({ type: 'index', payload: stateSerie.index + 1 });

      if (stateSerie.index === 0 && stateSerie.nbError === 0) {
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
        dispatchStateSerie({
          type: 'endTime',
          payload: { date: Date.now(), stratagem: series[0] },
        });
      } else {
        addTime(timeBonus + 0.01 * stateSerie.round);
      }

      setTimeout(() => {
        const percentOfProgress = Math.round((progress / timerDuration) * 100);
        handleSuccessStratagem(percentOfProgress);
        if (series.length !== 1) {
          playFinish();
          dispatchStateSerie({
            type: 'endTime',
            payload: { date: Date.now(), stratagem: series[0] },
          });
        }
        dispatchStateSerie({ type: 'index', payload: 0 });
      }, 175);
    }
  };

  /**
   * Handle the keydown event
   * @param {KeyboardEvent} event The keydown event.
   */
  function keydownDirectionHandler(event) {
    if (
      event.target.tagName === 'INPUT'
      || openSettings
      || statsPanel.type === 'open'
    ) return;
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
  const { gamepadConnected } = useGamepad(checkActiveSerieCode);

  // FORM ACTIONS
  /**
   * Handle the submit of the timer duration form
   * @param {FormData} formData
   */
  const handleSubmitTimerDuration = (formData) => {
    const timerDurationValue = formData.get('timerDuration');
    if (+timerDurationValue !== timerDuration) {
      setTimerDuration(+timerDurationValue);
      resetSeries();
    }
  };

  /**
   * Handle the submit of the game sound form
   * @param {FormData} formData
   */
  const handleSubmitGameSound = (formData) => {
    const gameSoundValue = formData.get('gameSound');
    if (!!gameSoundValue !== !!gameSound) {
      setGameSound(!!gameSoundValue);
    }
  };

  /**
   * Handle the key bindings
   */
  const handleKeyBindings = () => {
    applyTempKeyBindings();
  };

  /**
   * Set the temp key bindings
   * @param {string} direction
   * @param {string} code
   * @returns {void}
   */
  const handleSetTempKeyBindings = (direction, code) => {
    const forbiddenKeys = [
      'Escape',
      'Enter',
      'Tab',
      'Meta',
      'MetaLeft',
      'MetaRight',
      'ContextMenu',
      'F1',
      'F2',
      'F3',
      'F4',
      'F5',
      'F6',
      'F7',
      'F8',
      'F9',
      'F10',
      'F11',
      'F12',
      'PageUp',
      'PageDown',
      'Home',
      'End',
      'Backspace',
      'Delete',
    ];
    if (forbiddenKeys.includes(code)) return;
    setTempKeyBinding(direction, code);
  };

  const [filterStatsKey, setFilterStatsKey] = useState({
    key: 'nb',
    order: 'desc',
  });
  // History transformation to get each stratagem stats
  const stats = useMemo(
    () => Object.values(stateSerie.history)
      .flat()
      .reduce((acc, item) => {
        const { name } = item.stratagem;

        if (!acc[name]) {
          acc[name] = {
            nb: 0,
            time: 0,
            error: 0,
            stratagem: item.stratagem,
          };
        }

        // TODO faire des stats sur le meilleur temps, le pire temps, le temps moyen
        acc[name].nb += 1;
        acc[name].bestTime = Math.min(
          acc[name].bestTime || Infinity,
          item.endTime - item.startTime,
        );
        acc[name].worstTime = Math.max(
          acc[name].worstTime || 0,
          item.endTime - item.startTime,
        );
        acc[name].averageTime = (acc[name].average || 0) + (item.endTime - item.startTime);
        acc[name].error += item.nbError;

        return acc;
      }, {}),
    [stateSerie.history],
  );

  const isPanicMode = useMemo(() => {
    const progressTimer = (progress / timerDuration) * 100;
    return progressTimer < 30;
  }, [progress, timerDuration]);

  return (
    <div
      className={cn([
        styles.wrapper,
        openSettings ? styles.opened : styles.closed,
      ])}
    >
      <div
        className={cn([
          styles.main,
          statsPanel.type === 'open' && styles.activePanel,
        ])}
      >
        <button
          type="button"
          onClick={() => setOpenSettings(!openSettings)}
          className={styles.buttonSettings}
          data-testid="button-settings"
          aria-label="Settings"
        >
          <span className={styles.buttonLabelDesktop}>Settings</span>
          <Picto icon="settings" />
        </button>

        <button
          type="button"
          onClick={() => setOpenSettings(false)}
          className={cn([
            styles.settingsOverlay,
            openSettings ? styles.openedSettings : styles.closedSettings,
          ])}
          data-testid="settings-overlay"
          aria-label="Close settings"
        />

        <div className={styles.roundScoreContainer}>
          <RoundInfo
            roundNb={stateSerie.round}
            className={isPanicMode ? styles.panicModeColor : ''}
            historyButton={(
              <button
                type="button"
                onClick={() => handleStatsPanel('history')}
                className={styles.buttonHistory}
                aria-label="Round history"
                disabled={
                  openSettings || isRunning || stateSerie.round - 1 === 0
                }
              >
                <Picto icon="history" />
              </button>
            )}
          >
            <RoundInfoButton
              onClick={() => handleStatsPanel('history')}
              disabled={openSettings || isRunning || stateSerie.round - 1 === 0}
            />
          </RoundInfo>
          <ScoreInfo
            score={stateSerie.score}
            bonusRound={stateSerie.bonusRound}
            bonusRestingTime={stateSerie.bonusRestingTime}
            bonusPerfectRound={stateSerie.bonusPerfectRound}
            bestScore={stateSerie.bestScore}
            displayBonus={!isRunning && stateSerie.score > 0}
            className={isPanicMode ? styles.panicModeColor : ''}
          />
        </div>

        <div className={styles.stratagemsList}>
          <StratagemsGameCard.List>
            {series?.length ? (
              series.map((stratagem, index) => {
                if (index >= 6) return null;
                return (
                  <StratagemsGameCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${stratagem.code}-${index}`}
                    name={stratagem.name}
                    category={stratagem.category.name}
                    active={index === 0}
                    success={stateSerie.success}
                    className={isPanicMode ? styles.panicModeBorder : ''}
                  />
                );
              })
            ) : (
              <div />
            )}
          </StratagemsGameCard.List>
        </div>

        {series?.length ? (
          <div className={styles.activeStratagemsInfo}>
            <StratagemsName
              name={series[0].name}
              className={isPanicMode ? styles.panicMode : ''}
            />
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
        ) : (
          <StratagemsName name="Traitor detected !" className="traitor" />
        )}

        {series?.length ? (
          <StratagemsTimer
            progress={progress}
            total={timerDuration}
            className={isPanicMode ? styles.panicMode : ''}
          />
        ) : null}

        {series?.length ? (
          <div className={styles.mobileKeyboard}>
            <StratagemsKeyboardMobile />
          </div>
        ) : null}
      </div>

      <StatsButtonWrapper
        className={cn([
          styles.buttonWrapper,
          !!statsPanel.panel && styles.activeBg,
          statsPanel.type === 'open' && styles.active,
        ])}
      >
        <StatsButton
          disabled={openSettings || isRunning || stateSerie.round - 1 === 0}
          active={statsPanel.panel === 'history'}
          small={stateSerie.round - 1 || 0}
          onClick={() => handleStatsPanel('history')}
        >
          <StatsButtonLabel mobile="History" desktop="Round history" />
        </StatsButton>
        <StatsButton
          disabled={openSettings || isRunning || stateSerie.round - 1 === 0}
          active={statsPanel.panel === 'stats'}
          small={Object.keys(stats)?.length}
          onClick={() => handleStatsPanel('stats')}
        >
          <StatsButtonLabel mobile="Stats" desktop="Stratagem stats" />
        </StatsButton>
        <StatsButtonClose
          disabled={
            openSettings
            || isRunning
            || stateSerie.round - 1 === 0
            || statsPanel.type === 'close'
          }
        >
          <ButtonSideStratagems
            isOpened
            onClick={() => handleStatsPanel('', 'close')}
          />
        </StatsButtonClose>
      </StatsButtonWrapper>

      {/* TODO faire un affichage special pour le mobile les tableaux c'est pas fou */}
      {/* STATS PANEL */}
      <div
        className={cn([
          styles.modalStats,
          statsPanel.type === 'open' && styles.activeModal,
        ])}
      >
        {statsPanel.panel === 'stats' ? (
          Object.keys(stats)?.length ? (
            <TableStatsWrapper title="Stats">
              <TableStats>
                <div className={styles.overflowTable}>
                  <TableStatsHeader className={styles.statsGrid}>
                    <TableStatsCell>Stratagem</TableStatsCell>
                    <TableStatsCell
                      onClick={(order) => setFilterStatsKey({ key: 'nb', order })}
                      order={filterStatsKey.order === 'asc' ? 'desc' : 'asc'}
                      isActiveFilter={filterStatsKey.key === 'nb'}
                    >
                      Count
                    </TableStatsCell>
                    <TableStatsCell
                      onClick={(order) => setFilterStatsKey({ key: 'averageTime', order })}
                      order={filterStatsKey.order === 'asc' ? 'desc' : 'asc'}
                      isActiveFilter={filterStatsKey.key === 'averageTime'}
                    >
                      Average
                    </TableStatsCell>
                    <TableStatsCell
                      onClick={(order) => setFilterStatsKey({ key: 'bestTime', order })}
                      order={filterStatsKey.order === 'asc' ? 'desc' : 'asc'}
                      isActiveFilter={filterStatsKey.key === 'bestTime'}
                    >
                      Best
                    </TableStatsCell>
                    <TableStatsCell
                      onClick={(order) => setFilterStatsKey({ key: 'worstTime', order })}
                      order={filterStatsKey.order === 'asc' ? 'desc' : 'asc'}
                      isActiveFilter={filterStatsKey.key === 'worstTime'}
                    >
                      Worst
                    </TableStatsCell>
                    <TableStatsCell
                      onClick={(order) => setFilterStatsKey({ key: 'error', order })}
                      order={filterStatsKey.order === 'asc' ? 'desc' : 'asc'}
                      isActiveFilter={filterStatsKey.key === 'error'}
                    >
                      Errors
                    </TableStatsCell>
                  </TableStatsHeader>
                  <TableStatsBody>
                    {Object.values(stats)
                      .sort((a, b) => {
                        if (filterStatsKey.order === 'asc') {
                          return a[filterStatsKey.key] - b[filterStatsKey.key];
                        }
                        return b[filterStatsKey.key] - a[filterStatsKey.key];
                      })
                      .map((stat) => (
                        <div
                          key={stat.stratagem.name}
                          className={styles.gridRow}
                        >
                          <TableStatsRow className={styles.statsGrid}>
                            <TableStatsCell name="name">
                              <>
                                <Image
                                  src={`/icons/stratagems/${stat.stratagem.category?.name}/
${stat.stratagem.name}.svg`}
                                  alt={stat.stratagem.name}
                                  width={55}
                                  height={55}
                                />
                                {` ${stat.stratagem.name}`}
                              </>
                            </TableStatsCell>
                            <TableStatsCell name="nb">
                              {`${stat.nb}`}
                            </TableStatsCell>
                            <TableStatsCell name="averageTime">
                              {`${(stat.averageTime / 1000).toFixed(3)} sec`}
                            </TableStatsCell>
                            <TableStatsCell name="bestTime">
                              {`${(stat.bestTime / 1000).toFixed(2)} sec`}
                            </TableStatsCell>
                            <TableStatsCell name="worstTime">
                              {`${(stat.worstTime / 1000).toFixed(2)} sec`}
                            </TableStatsCell>
                            <TableStatsCell name="error">{`${stat.error}`}</TableStatsCell>

                            {/* Mobile */}
                            <TableStatsCellMobile name="img">
                              <Image
                                src={`/icons/stratagems/${stat.stratagem.category?.name}/
${stat.stratagem.name}.svg`}
                                alt={stat.stratagem.name}
                                width={55}
                                height={55}
                              />
                            </TableStatsCellMobile>
                            <TableStatsCellMobile name="name" label="Name">
                              {`${stat.stratagem.name}`}
                            </TableStatsCellMobile>
                            <TableStatsCellMobile name="nb" label="Nb">
                              {`${stat.nb}`}
                            </TableStatsCellMobile>
                            <TableStatsCellMobile name="averageTime" label="Average">
                              {`${(stat.averageTime / 1000).toFixed(3)} sec`}
                            </TableStatsCellMobile>
                            <TableStatsCellMobile name="bestTime" label="Best">
                              {`${(stat.bestTime / 1000).toFixed(2)} sec`}
                            </TableStatsCellMobile>
                            <TableStatsCellMobile name="worstTime" label="Worst">
                              {`${(stat.worstTime / 1000).toFixed(2)} sec`}
                            </TableStatsCellMobile>
                            <TableStatsCellMobile name="error" label="Error">
                              {`${stat.error}`}
                            </TableStatsCellMobile>
                          </TableStatsRow>
                        </div>
                      ))}
                  </TableStatsBody>
                </div>
              </TableStats>
            </TableStatsWrapper>
          ) : null
        ) : null}
        {statsPanel.panel === 'history' ? (
          Object.keys(stateSerie.history)?.length ? (
            <TableStatsWrapper title="History">
              <TableStats>
                {Object.keys(stateSerie.history)
                  .reverse()
                  .map((round) => {
                    if (!stateSerie.history[round]?.length) return null;
                    return (
                      <div className={styles.overflowTable} key={round}>
                        <TableStatsTitle>
                          {round ? (
                            <>
                              <div>{`Round ${round}`}</div>
                              <span>
                                {`${
                                  stateSerie.history[round]
                                    ? (
                                      stateSerie.history[round].reduce(
                                        (acc, item) => acc + item.endTime - item.startTime,
                                        0,
                                      ) / 1000
                                    ).toFixed(2)
                                    : 0
                                } sec`}
                              </span>
                            </>
                          ) : null}
                        </TableStatsTitle>
                        <TableStatsHeader className={styles.historyGrid}>
                          <TableStatsCell>N°</TableStatsCell>
                          <TableStatsCell>Stratagem</TableStatsCell>
                          <TableStatsCell>Time</TableStatsCell>
                          <TableStatsCell>Nb Errors</TableStatsCell>
                        </TableStatsHeader>
                        <TableStatsBody>
                          {stateSerie.history[round].map((item, index) => (
                            <TableStatsRow
                              key={`${round} - ${item.startTime} - ${item.stratagem.name}`}
                              className={styles.historyGrid}
                            >
                              {/* Desktop */}
                              <TableStatsCell name="index">
                                {`${index + 1}`}
                              </TableStatsCell>
                              <TableStatsCell name="name">
                                <>
                                  <Image
                                    src={`/icons/stratagems/${item.stratagem.category?.name}/
${item.stratagem.name}.svg`}
                                    alt={item.stratagem.name}
                                    width={55}
                                    height={55}
                                  />
                                  {` ${item.stratagem.name}`}
                                </>
                              </TableStatsCell>
                              <TableStatsCell name="time">
                                {`${(
                                  (item.endTime - item.startTime)
                                  / 1000
                                ).toFixed(2)} sec`}
                              </TableStatsCell>
                              <TableStatsCell name="error">{`${item.nbError}`}</TableStatsCell>

                              {/* Mobile */}
                              <TableStatsCellMobile name="img">
                                <Image
                                  src={`/icons/stratagems/${item.stratagem.category?.name}/
${item.stratagem.name}.svg`}
                                  alt={item.stratagem.name}
                                  width={55}
                                  height={55}
                                />
                              </TableStatsCellMobile>
                              <TableStatsCellMobile name="name" label="Name">
                                {`${item.stratagem.name}`}
                              </TableStatsCellMobile>
                              <TableStatsCellMobile name="time" label="Time">
                                {`${(
                                  (item.endTime - item.startTime)
                                  / 1000
                                ).toFixed(2)} sec`}
                              </TableStatsCellMobile>
                              <TableStatsCellMobile name="error" label="Error">
                                {`${item.nbError}`}
                              </TableStatsCellMobile>
                            </TableStatsRow>
                          ))}
                        </TableStatsBody>
                      </div>
                    );
                  })}
              </TableStats>
            </TableStatsWrapper>
          ) : null
        ) : null}
      </div>

      {/* SETTINGS PANEL */}
      <div className={cn([styles.settings])}>
        <div className={styles.settingsTop}>
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

          <div className={styles.settingsSection}>
            <HeadingForm title="Gamepad" />
            <InfoMessage>
              {gamepadConnected?.id || 'You can also play with a gamepad !'}
            </InfoMessage>
          </div>
        </div>

        <div className={styles.settingsBottom}>
          <div className={styles.settingsSection}>
            <HeadingForm title="Contact me" />
            <InfoMessage>
              <Link href={CONTACT_LINK} target="_blank">
                If you have any feedback or suggestion, feel free to contact me !
              </Link>
            </InfoMessage>
          </div>

          <div className={styles.settingsSection}>
            <HeadingForm title="Support me" />
            <ButtonBuyMeACoffee />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StratagemsGame;
