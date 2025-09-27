import { cookies } from 'next/headers';

// Data
import { fetchStratagems } from '../lib/data';

// Lib
import { COOKIE_LOADOUT } from '../lib/constants';
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
      stratagems={randomisedStratagems}
      stratagemsByCategories={stratagemsByCategories}
      defaultCheckValue={false}
    >
      <StratagemsLoadout
        stratagems={stratagems}
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

  return {
    title: name ? `${name} - Stratagem Loadout - Helldivers`
      : 'Stratagem Loadout - Helldivers',
  };
}
