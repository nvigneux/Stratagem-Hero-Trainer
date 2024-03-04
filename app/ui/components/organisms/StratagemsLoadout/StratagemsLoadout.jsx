'use client';

import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

// Styles
import styles from './StratagemsLoadout.module.css';

// Components
import StratagemsName from '../../atoms/StratagemsName/StratagemsName';
import StratagemsLoadoutList from '../../molecules/StratagemsLoadoutList/StratagemsLoadoutList';

// Provider
import { useStratagems } from '../../templates/StrategemsLayout/StrategemsProvider';

function StratagemsLoadout({ stratagems }) {
  const { checkedStratagems = {} } = useStratagems();
  const [stratagemsArray, setStratagemsArray] = useState([]);

  const filteredStratagemsChecked = useMemo(
    () => [...stratagems].filter((stratagem) => checkedStratagems[stratagem.name]),
    [stratagems, checkedStratagems],
  );

  useEffect(() => {
    const checkedStratagemsData = stratagems.filter(
      (stratagem) => checkedStratagems[stratagem.name],
    );
    setStratagemsArray((prev) => [...checkedStratagemsData, ...prev]);
  }, [checkedStratagems]);

  return (
    <div className={styles.container}>
      {stratagemsArray?.length ? (
        <StratagemsLoadoutList stratagems={stratagemsArray} />
      ) : (
        <StratagemsName name="Select some stratagems !" />
      )}
    </div>
  );
}

StratagemsLoadout.propTypes = {
  stratagems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};

export default StratagemsLoadout;
