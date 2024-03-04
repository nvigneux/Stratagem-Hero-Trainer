'use client';

import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';

// Styles
import styles from './StratagemsLoadout.module.css';

// Components
import StratagemsName from '../../atoms/StratagemsName/StratagemsName';
import StratagemsLoadoutList from '../../molecules/StratagemsLoadoutList/StratagemsLoadoutList';
import StratagemsLoadoutCard from '../../molecules/StratagemsLoadoutCard/StratagemsLoadoutCard';

// Provider
import { useStratagems } from '../../templates/StrategemsLayout/StrategemsProvider';

// Define reducer function
function stratagemsReducer(state, action) {
  switch (action.type) {
    case 'ADD_STRATAGEM':
      return [...state, action.payload];
    case 'ADD_MANY_STRATAGEM':
      return [...state, ...action.payload];
    case 'UPDATE_STRATAGEM':
      return state.map(
        (stratagem) => (stratagem.id === action.payload.id ? action.payload : stratagem),
      );
    case 'DELETE_STRATAGEM':
      return state.filter((stratagem) => stratagem.id !== action.payload);
    case 'DELETE_MANY_STRATAGEM':
      return state.filter((stratagem) => !action.payload.includes(stratagem.id));
    default:
      return state;
  }
}

function StratagemsLoadout({ stratagems }) {
  const { checkedStratagems = {} } = useStratagems();
  const [stratagemsArray, dispatch] = useReducer(stratagemsReducer, []);

  useEffect(() => {
    const findDiffArray = (arr1, arr2) => arr1.filter((x) => !arr2.includes(x));
    const checkedStratagemsData = stratagems.filter(
      (stratagem) => !!checkedStratagems[stratagem.name],
    );

    const diffArray = findDiffArray(checkedStratagemsData, stratagemsArray);

    if (diffArray.length) {
      dispatch({ type: 'ADD_MANY_STRATAGEM', payload: diffArray });
    }

    if (stratagemsArray.length && !diffArray.length) {
      const diffArrayStratagems = findDiffArray(stratagemsArray, checkedStratagemsData);
      dispatch({ type: 'DELETE_MANY_STRATAGEM', payload: diffArrayStratagems.map((stratagem) => stratagem.id) });
    }
  }, [checkedStratagems]);

  return (
    <div className={styles.container}>
      {stratagemsArray?.length ? (
        <StratagemsLoadoutList stratagems={stratagemsArray}>
          {(stratagem) => (
            <StratagemsLoadoutCard stratagem={stratagem} />
          )}
        </StratagemsLoadoutList>
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
