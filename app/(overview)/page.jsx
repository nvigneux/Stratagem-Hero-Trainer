import { cookies } from 'next/headers';

// Data
import { fetchStratagems } from '../lib/data';

// Lib
import { COOKIE_BEST_SCORE, COOKIE_SETTINGS } from '../lib/constants';
import { isJsonString } from '../lib/utils';

// Components
import StratagemsLayout from '../ui/components/templates/StrategemsLayout/StrategemsLayout';
import StratagemsGame from '../ui/components/organisms/StratagemsGame/StratagemsGame';

/**
 * Page component
 * @returns {Promise<JSX.Element>} The Page component
 */
export default async function Page() {
  const cookieStore = await cookies(); // Fetch the cookies store asynchronously
  const bestScoreStored = cookieStore.get(COOKIE_BEST_SCORE)?.value || 0;
  const settingsStored = cookieStore.get(COOKIE_SETTINGS)?.value || {};

  const stratagems = await fetchStratagems();
  const randomisedStratagems = [...stratagems].sort(() => Math.random() - 0.5);

  /**
   * Groups the stratagems by their category.
   * @param {Array} stratagems - List of stratagems
   * @returns {object} Stratagems grouped by categories
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
