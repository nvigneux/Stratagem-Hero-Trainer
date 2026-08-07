import { cookies } from 'next/headers';
// eslint-disable-next-line import/no-unresolved
import { getTranslations } from 'next-intl/server';

// Data
import { fetchStratagems } from '../lib/data';

// Lib
import { COOKIE_BEST_SCORE, COOKIE_SETTINGS } from '../lib/constants';
import { isJsonString } from '../lib/utils';
import { tStratagem, tCategory } from '../lib/translate';

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
  const jsonSettingsStored = isJsonString(settingsStored) ? JSON.parse(settingsStored) : {};

  const stratagems = await fetchStratagems();
  const t = await getTranslations('GameData');

  const stratagemsWithDisplay = stratagems.map((s) => ({
    ...s,
    displayName: tStratagem(t, s.name),
    category: {
      ...s.category,
      displayName: tCategory(t, s.category.name),
    },
  }));

  const randomisedStratagems = jsonSettingsStored?.trainingMode?.sequentialMode
    ? [...stratagemsWithDisplay]
    : [...stratagemsWithDisplay].sort(() => Math.random() - 0.5);

  /**
   * Groups the stratagems by their category.
   * @param {Array} stratagems - List of stratagems
   * @returns {object} Stratagems grouped by categories
   */
  const stratagemsByCategories = stratagemsWithDisplay.reduce((acc, stratagem) => {
    const categoryName = stratagem.category.name;
    if (!acc[categoryName]) { acc[categoryName] = []; }
    acc[categoryName] = acc[categoryName].concat(stratagem);
    return acc;
  }, {});

  return (
    <StratagemsLayout
      stratagems={stratagemsWithDisplay}
      stratagemsByCategories={stratagemsByCategories}
    >
      <StratagemsGame
        stratagems={randomisedStratagems}
        bestScoreStored={+bestScoreStored}
        settingsStored={jsonSettingsStored}
      />
    </StratagemsLayout>
  );
}
