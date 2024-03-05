import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

// Data
import { fetchStratagems } from '../lib/data';

// Lib
import { COOKIE_BEST_SCORE, COOKIE_SETTINGS } from '../lib/constants';
import { isJsonString } from '../lib/utils';

// Components
import StratagemsLayout from '../ui/components/templates/StrategemsLayout/StrategemsLayout';
import StratagemsGame from '../ui/components/organisms/StratagemsGame/StratagemsGame';

export default async function Page() {
  const bestScoreStored = getCookie(COOKIE_BEST_SCORE, { cookies }) || 0;
  const settingsStored = getCookie(COOKIE_SETTINGS, { cookies }) || {};

  const stratagems = await fetchStratagems();
  const randomisedStratagems = [...stratagems].sort(() => Math.random() - 0.5);

  /**
   * Groups the stratagems by their category.
   */
  const stratagemsByCategories = stratagems.reduce((acc, stratagem) => {
    const categoryName = stratagem.category.name;
    if (!acc[categoryName]) { acc[categoryName] = []; }
    acc[categoryName] = acc[categoryName].concat(stratagem);
    return acc;
  }, {});

  return (
    <StratagemsLayout
      stratagems={stratagems}
      stratagemsByCategories={stratagemsByCategories}
    >
      <StratagemsGame
        stratagems={randomisedStratagems}
        bestScoreStored={+bestScoreStored}
        settingsStored={isJsonString(settingsStored) ? JSON.parse(settingsStored) : {}}
      />
    </StratagemsLayout>
  );
}
