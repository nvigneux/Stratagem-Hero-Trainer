// Data
import { fetchStratagems } from '../lib/data';

// Components
import StratagemsLayout from '../ui/components/templates/StratagemsLayout/StratagemsLayout';

export default async function Page() {
  const stratagems = await fetchStratagems();
  const sortedStratagems = [...stratagems].sort(() => Math.random() - 0.5);

  return (
    <StratagemsLayout stratagems={stratagems} sortedStratagems={sortedStratagems} />
  );
}
