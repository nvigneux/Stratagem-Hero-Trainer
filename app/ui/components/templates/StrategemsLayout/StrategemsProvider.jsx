'use client';

import PropTypes from 'prop-types';

import {
  createContext,
  useContext,
  useMemo,
} from 'react';

const StratagemsContext = createContext({
  checkedStratagems: [],
});

export function StratagemsProvider({
  checkedStratagems = [],
  children = null,
}) {
  const contextValue = useMemo(() => ({ checkedStratagems }), [checkedStratagems]);

  return (
    <StratagemsContext.Provider value={contextValue}>
      {children}
    </StratagemsContext.Provider>
  );
}

export const useStratagems = () => useContext(StratagemsContext);

StratagemsProvider.propTypes = {
  checkedStratagems: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};
