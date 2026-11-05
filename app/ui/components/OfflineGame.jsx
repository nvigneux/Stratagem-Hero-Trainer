'use client';

import { useEffect, useState } from 'react';
import StratagemsGame from './organisms/StratagemsGame/StratagemsGame';
import { readLocal } from '../../lib/local-game-storage';
import { COOKIE_BEST_SCORE, COOKIE_SETTINGS } from '../../lib/constants';

/**
 * Restore browser-owned preferences before mounting the game.
 * @param {object} props - Game properties.
 * @param {Array} props.stratagems - Catalog.
 * @param {object} props.settingsStored - Legacy settings.
 * @param {number} props.bestScoreStored - Legacy record.
 * @returns {JSX.Element} Trainer.
 */
export default function OfflineGame({ stratagems, settingsStored, bestScoreStored }) {
  const [saved, setSaved] = useState(null);
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(console.error);
    }
    const settings = readLocal(COOKIE_SETTINGS, settingsStored);
    const bestScore = Number(readLocal(COOKIE_BEST_SCORE, bestScoreStored));
    setSaved({
      settings: settings && typeof settings === 'object' ? settings : {},
      bestScore: Number.isFinite(bestScore) && bestScore >= 0 ? bestScore : 0,
    });
  }, []);

  if (!saved) return <p role="status">Loading trainer…</p>;
  return (
    <StratagemsGame
      stratagems={saved.settings.trainingMode?.sequentialMode
        ? [...stratagems].sort((a, b) => (a.order || 0) - (b.order || 0)) : stratagems}
      settingsStored={saved.settings}
      bestScoreStored={saved.bestScore}
    />
  );
}
