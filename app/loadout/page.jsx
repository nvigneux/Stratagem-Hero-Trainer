import { cookies } from 'next/headers';
// eslint-disable-next-line import/no-unresolved
import { getTranslations } from 'next-intl/server';

// Data
import { fetchStratagems } from '../lib/data';

// Lib
import { COOKIE_LOADOUT } from '../lib/constants';
import { getSVGThemeColor } from '../lib/svg-color-analyzer';
import { tStratagem, tCategory } from '../lib/translate';
// Components
import StratagemsLayout from '../ui/components/templates/StrategemsLayout/StrategemsLayout';
import StratagemsLoadout from '../ui/components/organisms/StratagemsLoadout/StratagemsLoadout';

/**
 * Page component
 * @returns {Promise<JSX.Element>} The Page component
 */
export default async function Page() {
  const cookieStore = await cookies(); // Fetch the cookies store asynchronously
  const loadoutStored = cookieStore.get(COOKIE_LOADOUT)?.value || {};

  const stratagems = await fetchStratagems().then(
    (stratagemsData) => stratagemsData.map((stratagem) => {
      const svgPath = `../public/icons/stratagems/${stratagem.category.name}/${stratagem.name}.svg`;
      return ({
        ...stratagem,
        color: getSVGThemeColor(svgPath),
      });
    }),
  );
  const t = await getTranslations('GameData');

  const stratagemsWithDisplay = stratagems.map((s) => ({
    ...s,
    displayName: tStratagem(t, s.name),
    category: {
      ...s.category,
      displayName: tCategory(t, s.category.name),
    },
  }));

  const randomisedStratagems = [...stratagemsWithDisplay].sort(() => Math.random() - 0.5);

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
      stratagems={randomisedStratagems}
      stratagemsByCategories={stratagemsByCategories}
      defaultCheckValue={false}
    >
      <StratagemsLoadout
        stratagems={stratagemsWithDisplay}
        loadoutStored={loadoutStored}
      />
    </StratagemsLayout>
  );
}

/**
 *
 * @param {object} root0
 * @param {object} root0.searchParams
 * @returns {object} Metadata
 */
export async function generateMetadata({ searchParams }) {
  const { name } = await searchParams;
  const t = await getTranslations('Metadata');

  return {
    title: name ? `${name}${t('loadoutTitleSuffix')}`
      : t('loadoutTitleFallback'),
  };
}
