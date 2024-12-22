'use client';

import {
  createContext,
  useContext,
  useMemo,
} from 'react';

const StratagemsContext = createContext({
  checkedStratagems: {},
  setCheckedStratagem: () => {},
});

/**
 * StratagemsProvider component
 * @param {object} props - Component properties
 * @param {object} props.checkedStratagems - Checked stratagems
 * @param {Function} props.setCheckedStratagem - Function to set checked stratagem
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StratagemsProvider component
 */
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
