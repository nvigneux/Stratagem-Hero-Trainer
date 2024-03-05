'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// Styles
import styles from './StrategemsLayout.module.css';

// Lib
import cn from '../../../../lib/cn';
import useCheckboxes from '../../../../lib/hooks/useCheckboxes';

// Components
import ButtonSideStratagems from '../../atoms/ButtonSideStratagems/ButtonSideStratagems';
import StratagemsCategories from '../../atoms/StratagemsCategories/StratagemsCategories';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import StratagemsCard from '../../molecules/StratagemsCard/StratagemsCard';

// Provider
import { StratagemsProvider } from './StrategemsProvider';

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

  /**
   * Handle the change of a single checkbox
   * @param {string} name
   */
  const handleChangeCheckbox = (name) => {
    handleChange(name);
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
    stratagemsByCategories[category].forEach((stratagem) => handleChange(stratagem.name, value));
  };

  return (
    <main className={cn([styles.container, openStratagems ? styles.opened : styles.closed])}>
      <div className={styles.buttonSide}>
        <ButtonSideStratagems
          onClick={() => setOpenStratagems(!openStratagems)}
          isOpened={openStratagems}
        />
      </div>
      <div className={styles.side}>
        <StratagemsCategories>
          <Checkbox
            id="all"
            checked={checkboxesAreChecked}
            onChange={handleChangeAllCheckbox}
            label={checkboxesAreChecked ? 'Deselect all' : 'Select all'}
            className={styles.checkboxAll}
          />
          <div className={styles.sideContainer}>
            <div className={styles.sideDecoration} />
            {Object.entries(stratagemsByCategories).map(([category, stratagemsByCategory]) => {
              const categoryChecked = stratagemsByCategory.every(
                (stratagem) => checkboxes[stratagem.name],
              );
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
                        checked={checkboxes[stratagem.name]}
                        onChange={() => handleChangeCheckbox(stratagem.name)}
                      >
                        <StratagemsCard
                          name={stratagem.name}
                          code={stratagem.code}
                          category={stratagem.category.name}
                          active={checkboxes[stratagem.name]}
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

StrategemsLayout.propTypes = {
  children: PropTypes.node.isRequired,
  stratagems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  stratagemsByCategories: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
  }))).isRequired,
  defaultCheckValue: PropTypes.bool.isRequired,
};

export default StrategemsLayout;
