'use client';

import { useEffect, useState } from 'react';

// Styles
import styles from './StrategemsLayout.module.css';

// Lib
import cn from '../../../../lib/cn';
import useCheckboxes from '../../../../lib/hooks/useCheckboxes';
import useSearchStratagems from '../../../../lib/hooks/useSearchStratagems';

// Components
import ButtonSideStratagems from '../../atoms/ButtonSideStratagems/ButtonSideStratagems';
import StratagemsCategories from '../../atoms/StratagemsCategories/StratagemsCategories';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import StratagemsCard from '../../molecules/StratagemsCard/StratagemsCard';
import Textfield from '../../atoms/Textfield/Textfield';

// Provider
import { StratagemsProvider } from './StrategemsProvider';

/**
 * StrategemsLayout component
 * @param {object} props - Component properties
 * @param {Array<{id: string, name: string, code: string[], category: { name: string } }>} props.stratagems - List of stratagems
 * @param {object} props.stratagemsByCategories - Stratagems grouped by categories
 * @param {boolean} [props.defaultCheckValue=true] - Default check value for checkboxes
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StrategemsLayout component
 */
function StrategemsLayout({
  stratagems,
  stratagemsByCategories,
  defaultCheckValue = true,
  children,
}) {
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const [openStratagems, setOpenStratagems] = useState(false);

  useEffect(() => {
    if (isDesktop) setOpenStratagems(true);
  }, [isDesktop]);

  const {
    checkboxes, handleChange, checkboxesAreChecked, handleChangeAll,
  } = useCheckboxes(
    { initialState: stratagems, key: 'name', defaultValue: defaultCheckValue },
  );

  const {
    filteredStratagems,
    noSearchResults,
    searchTerm,
    setSearchTerm,
  } = useSearchStratagems({ stratagems: { ...stratagemsByCategories } });

  /**
   * Handle the change of a single checkbox
   * @param {string} name
   */
  const handleChangeCheckbox = (name) => {
    handleChange({ [name]: undefined });
  };

  // Reset the series when the all checkboxes change
  const handleChangeAllCheckbox = () => {
    handleChangeAll();
  };

  /**
   * Handle the change of all checkboxes in a category
   * @param {string} category
   * @param {boolean} value
   */
  const handleChangeCategoriesCheckbox = (category, value) => {
    stratagemsByCategories[category].forEach(
      (stratagem, index) => handleChange({ [stratagem.name]: { value, order: index } }),
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className={cn([styles.container,
      `${openStratagems ? `${styles.opened} container-is-opened`
        : `${styles.closed} container-is-closed`}`])}
    >
      <div className={styles.buttonSide}>
        <ButtonSideStratagems
          onClick={() => setOpenStratagems(!openStratagems)}
          isOpened={openStratagems}
          testId="button-side-stratagems"
        />
      </div>
      <div className={styles.side}>
        <StratagemsCategories>
          <Checkbox
            id="checkbox-all"
            checked={checkboxesAreChecked}
            onChange={handleChangeAllCheckbox}
            label={checkboxesAreChecked ? 'Deselect all' : 'Select all'}
            className={styles.checkboxAll}
          />
          <div className={styles.searchStratagemsContainer}>
            <Textfield
              id="search-stratagems"
              type="search"
              placeholder="Search stratagems..."
              className={styles.searchStratagems}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className={styles.sideContainer}>
            <div className={styles.sideDecoration} />
            {noSearchResults ? (
              <div className={styles.noSearchResults}>No stratagems found</div>
            ) : Object.entries(filteredStratagems).map(([category, stratagemsByCategory]) => {
              const categoryChecked = stratagemsByCategories[category].every(
                (stratagem) => checkboxes[stratagem.name].value,
              );
              if (stratagemsByCategory.length === 0) return null;

              return (
                <StratagemsCategories.Category key={category}>

                  <StratagemsCategories.Head category={category}>
                    <Checkbox
                      id={category}
                      checked={categoryChecked}
                      onChange={() => handleChangeCategoriesCheckbox(category, !categoryChecked)}
                    />
                  </StratagemsCategories.Head>

                  <StratagemsCategories.Cards stratagems={stratagemsByCategory}>
                    {(stratagem) => (
                      <Checkbox
                        key={stratagem.name}
                        id={stratagem.name}
                        checked={checkboxes[stratagem.name].value}
                        onChange={() => handleChangeCheckbox(stratagem.name)}
                      >
                        <StratagemsCard
                          name={stratagem.name}
                          code={stratagem.code}
                          category={stratagem.category.name}
                          active={checkboxes[stratagem.name].value}
                        />
                      </Checkbox>
                    )}
                  </StratagemsCategories.Cards>
                </StratagemsCategories.Category>
              );
            })}
          </div>
        </StratagemsCategories>
      </div>

      <div className={styles.main}>
        <StratagemsProvider
          setCheckedStratagem={handleChange}
          checkedStratagems={checkboxes}
        >
          {children}
        </StratagemsProvider>
      </div>

    </main>
  );
}

export default StrategemsLayout;
