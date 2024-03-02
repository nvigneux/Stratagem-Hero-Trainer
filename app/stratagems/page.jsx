// Data
import { fetchStratagems } from '../lib/data';

// Components
import StratagemsLayout from '../ui/components/templates/StratagemsLayout/StratagemsLayout';

export default async function Page() {
  const stratagems = await fetchStratagems();
  const randomisedStratagems = [...stratagems].sort(() => Math.random() - 0.5);

  console.log(stratagems);

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
    />
  );
}
