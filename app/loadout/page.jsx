import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

// Data
import { fetchStratagems } from '../lib/data';

// Lib
import { COOKIE_LOADOUT } from '../lib/constants';

// Components
import StratagemsLayout from '../ui/components/templates/StrategemsLayout/StrategemsLayout';
import StratagemsGameSheel from '../ui/components/organisms/StratagemsGameSheel/StratagemsGameSheel';

export default async function Page() {
  const loadoutStored = getCookie(COOKIE_LOADOUT, { cookies }) || 0;
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
      stratagems={randomisedStratagems}
      stratagemsByCategories={stratagemsByCategories}
      loadoutStored={loadoutStored}
    >
      <StratagemsGameSheel
        stratagems={stratagems}
      />
    </StratagemsLayout>
  );
}
