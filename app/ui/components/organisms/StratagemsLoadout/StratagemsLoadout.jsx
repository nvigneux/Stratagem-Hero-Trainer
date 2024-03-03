'use client';

import PropTypes from 'prop-types';
import { useMemo } from 'react';

// Styles
import styles from './StratagemsLoadout.module.css';

// Components
import StratagemsName from '../../atoms/StratagemsName/StratagemsName';
import StratagemsLoadoutList from '../../molecules/StratagemsLoadoutList/StratagemsLoadoutList';

// Provider
import { useStratagems } from '../../templates/StrategemsLayout/StrategemsProvider';

function StratagemsLoadout({ stratagems }) {
  const { checkedStratagems = {} } = useStratagems();

  const filteredStratagemsChecked = useMemo(
    () => [...stratagems].filter((stratagem) => checkedStratagems[stratagem.name]),
    [stratagems, checkedStratagems],
  );

  return (
    <div className={styles.container}>
      {filteredStratagemsChecked?.length ? (
        <StratagemsLoadoutList stratagems={filteredStratagemsChecked} />
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
