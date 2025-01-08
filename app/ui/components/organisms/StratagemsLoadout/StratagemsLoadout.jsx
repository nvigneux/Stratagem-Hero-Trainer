'use client';

import {
  useEffect, useMemo, useRef,
} from 'react';

// Styles
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './StratagemsLoadout.module.css';

// Components
import StratagemsName from '../../atoms/StratagemsName/StratagemsName';
import StratagemsLoadoutList from '../../molecules/StratagemsLoadoutList/StratagemsLoadoutList';
import StratagemsLoadoutCard from '../../molecules/StratagemsLoadoutCard/StratagemsLoadoutCard';

// Provider
import { useStratagems } from '../../templates/StrategemsLayout/StrategemsProvider';

// Hooks
import { useEncodeStratagems } from '../../../../lib/hooks/useEncodeStratagems';

/**
 * StratagemsLoadout component
 * @param {object} props - Component properties
 * @param {Array<{id: string, name: string, code: string[]}>} props.stratagems - List of stratagems
 * @returns {JSX.Element} The StratagemsLoadout component
 */
function StratagemsLoadout({ stratagems }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { decode, encode } = useEncodeStratagems();

  const { checkedStratagems = {}, setCheckedStratagem = () => {} } = useStratagems();

  /**
   * On component mount, parse `?stratagems=` from the URL if present,
   * then convert them back to stratagem objects and update local state.
   */
  const paramCodes = searchParams.get('stratagems');
  const ref = useRef('');
  useEffect(() => {
    if (paramCodes && paramCodes !== ref.current) {
      ref.current = paramCodes;
      const nameArray = decode(paramCodes);
      const matchedStratagems = stratagems.filter((s) => nameArray.includes(s.name));

      const checked = matchedStratagems.reduce((acc, stratagem) => {
        acc[stratagem.name] = true;
        return acc;
      }, {});
      setCheckedStratagem({ ...checked });
    }
  }, [paramCodes]);

  useEffect(() => {
    const selectedStratagems = stratagems.filter(
      (stratagem) => checkedStratagems[stratagem.name],
    );
    const encodedStratagems = encode(selectedStratagems);

    console.log('encodedStratagems', encodedStratagems, ref.current);

    if (encodedStratagems !== ref.current) {
      ref.current = encodedStratagems;
      router.push(`?stratagems=${encodedStratagems}`);
    }
  }, [checkedStratagems]);

  const array = useMemo(() => {
    const nameArray = decode(paramCodes);
    const matchedStratagems = stratagems.filter((s) => nameArray.includes(s.name));
    return matchedStratagems;
  }, [paramCodes]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        {array?.length ? (
          <StratagemsLoadoutList stratagems={array}>
            {(stratagem) => (
              <StratagemsLoadoutCard
                stratagem={stratagem}
                setCheckedStratagem={setCheckedStratagem}
              />
            )}
          </StratagemsLoadoutList>
        ) : (
          <div className={styles.empty}>
            <StratagemsName name="Select some stratagems !" />
          </div>
        )}
      </div>
    </div>
  );
}

export default StratagemsLoadout;
