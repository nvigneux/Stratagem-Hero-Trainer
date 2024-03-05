'use client';

import PropTypes from 'prop-types';

import {
  createContext,
  useContext,
  useMemo,
} from 'react';

const StratagemsContext = createContext({
  checkedStratagems: {},
  setCheckedStratagem: () => {},
});

export function StratagemsProvider({
  checkedStratagems = {},
  setCheckedStratagem = () => {},
  children = null,
}) {
  const contextValue = useMemo(
    () => ({ checkedStratagems, setCheckedStratagem }),
    [checkedStratagems, setCheckedStratagem],
  );

  return (
    <StratagemsContext.Provider value={contextValue}>
      {children}
    </StratagemsContext.Provider>
  );
}

export const useStratagems = () => useContext(StratagemsContext);

StratagemsProvider.propTypes = {
  checkedStratagems: PropTypes.shape({
    [PropTypes.string]: PropTypes.bool,
  }).isRequired,
  setCheckedStratagem: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
