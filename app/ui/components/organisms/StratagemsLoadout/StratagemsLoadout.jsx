'use client';

import { useEffect, useReducer } from 'react';

// Styles
import styles from './StratagemsLoadout.module.css';

// Components
import StratagemsName from '../../atoms/StratagemsName/StratagemsName';
import StratagemsLoadoutList from '../../molecules/StratagemsLoadoutList/StratagemsLoadoutList';
import StratagemsLoadoutCard from '../../molecules/StratagemsLoadoutCard/StratagemsLoadoutCard';

// Provider
import { useStratagems } from '../../templates/StrategemsLayout/StrategemsProvider';

/**
 * Reducer function for stratagems
 * @param {Array} state - Current state of stratagems
 * @param {object} action - Action to perform on the state
 * @returns {Array} Updated state of stratagems
 */
function stratagemsReducer(state, action) {
  switch (action.type) {
    case 'ADD_STRATAGEM':
      return [...state, action.payload];
    case 'ADD_MANY_STRATAGEM':
      return [...state, ...action.payload];
    case 'UPDATE_STRATAGEM':
      return state.map(
        (stratagem) => (stratagem.code === action.payload.code ? action.payload : stratagem),
      );
    case 'DELETE_STRATAGEM':
      return state.filter((stratagem) => stratagem.code !== action.payload);
    case 'DELETE_MANY_STRATAGEM':
      return state.filter((stratagem) => !action.payload.includes(stratagem.code));
    default:
      return state;
  }
}

/**
 * StratagemsLoadout component
 * @param {object} props - Component properties
 * @param {Array<{id: string, name: string, code: string[]}>} props.stratagems - List of stratagems
 * @returns {JSX.Element} The StratagemsLoadout component
 */
function StratagemsLoadout({ stratagems }) {
  const { checkedStratagems = {}, setCheckedStratagem = () => {} } = useStratagems();
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
      dispatch({
        type: 'DELETE_MANY_STRATAGEM',
        payload: diffArrayStratagems.map((stratagem) => stratagem.code),
      });
    }
  }, [checkedStratagems]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        {stratagemsArray?.length ? (
          <StratagemsLoadoutList stratagems={stratagemsArray}>
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
