'use client';

import {
  useCallback, useEffect, useReducer, useRef,
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
import { areStratagemsEqual, findDiffArray } from '../../../../lib/stratagems';

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
      return state.map((stratagem) => (stratagem.name === action.payload.name ? action.payload : stratagem));
    case 'DELETE_STRATAGEM':
      return state.filter((stratagem) => stratagem.name !== action.payload);
    case 'DELETE_MANY_STRATAGEM':
      return state.filter(
        (stratagem) => !action.payload.includes(stratagem.name),
      );
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramCodes = searchParams.get('stratagems');

  const { decode, encode } = useEncodeStratagems();

  const initStratagemsArray = useCallback(() => {
    const nameArray = decode(paramCodes);
    const matchedStratagems = nameArray
      .map((name) => stratagems.find((s) => s.name === name))
      .filter(Boolean);
    return matchedStratagems;
  }, [paramCodes]);

  const { checkedStratagems = {}, setCheckedStratagem = () => {} } = useStratagems();
  const [stratagemsArray, dispatch] = useReducer(
    stratagemsReducer,
    initStratagemsArray(paramCodes),
  );

  /**
   * On component mount, parse `?stratagems=` from the URL if present,
   * then convert them back to stratagem objects and update local state.
   */
  const ref = useRef('');
  const refChecked = useRef(false);
  // init state with stratagems from URL
  useEffect(() => {
    if (paramCodes && paramCodes !== ref.current) {
      ref.current = paramCodes;
      const nameArray = decode(paramCodes);
      const matchedStratagems = nameArray
        .map((name) => stratagems.find((s) => s.name === name))
        .filter(Boolean);

      const checked = matchedStratagems.reduce((acc, stratagem) => {
        acc[stratagem.name] = true;
        return acc;
      }, {});
      setCheckedStratagem({ ...checked });
    }
  }, []);

  // update stratagemsArray when checkedStratagems changes
  useEffect(() => {
    const checkedStratagemsData = stratagems.filter(
      (stratagem) => !!checkedStratagems[stratagem.name],
    );
    if (
      !checkedStratagemsData.length
      && stratagemsArray.length
      && !refChecked.current
    ) return;

    const diffArray = findDiffArray(
      checkedStratagemsData,
      stratagemsArray,
      areStratagemsEqual,
    );
    const diffArrayStratagems = findDiffArray(
      stratagemsArray,
      checkedStratagemsData,
      areStratagemsEqual,
    );

    if (diffArray.length) {
      dispatch({ type: 'ADD_MANY_STRATAGEM', payload: diffArray });
    }

    if (diffArrayStratagems.length) {
      dispatch({
        type: 'DELETE_MANY_STRATAGEM',
        payload: diffArrayStratagems.map((stratagem) => stratagem.name),
      });
    }
    refChecked.current = true;
  }, [checkedStratagems]);

  // update URL when stratagemsArray changes
  useEffect(() => {
    const encoded = encode(stratagemsArray);
    router.replace(`?stratagems=${encoded}`);
  }, [stratagemsArray]);

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
