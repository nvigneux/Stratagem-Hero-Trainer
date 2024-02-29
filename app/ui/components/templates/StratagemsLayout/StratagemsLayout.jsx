'use client';

import PropTypes from 'prop-types';
import { useMemo } from 'react';

// Styles
import styles from './StratagemsLayout.module.css';

// Components
import StratagemsCard from '../../atoms/StratagemsCard/StratagemsCard';
import Checkbox from '../../atoms/Checkbox/Checkbox';

// Hooks
import useCheckboxes from '../../../../lib/hooks/useCheckboxes';
import useStratagemsSeries from '../../../../lib/hooks/useStratagemsSeries';
import useEventListener from '../../../../lib/hooks/useEventListener';

function StratagemsLayout({ stratagems, stratagemsByCategories }) {
  const {
    checkboxes, handleChange, checkboxesAreChecked, handleChangeAll,
  } = useCheckboxes(
    { initialState: stratagems, key: 'name', defaultValue: true },
  );

  const filteredStratagemsChecked = useMemo(
    () => [...stratagems].filter((stratagem) => checkboxes[stratagem.name]),
    [stratagems, checkboxes],
  );

  const {
    series, handleAddToSeries, resetSeries, serieIndex, setSerieIndex,
  } = useStratagemsSeries({
    initialState: filteredStratagemsChecked, maxLength: 5,
  });

  /**
   * Handle the change of a single checkbox
   * @param {string} name
   */
  const handleChangeCheckbox = (name) => {
    handleChange(name);
    setSerieIndex(0);
    resetSeries();
  };

  // Reset the series when the all checkboxes change
  const handleChangeAllCheckbox = () => {
    handleChangeAll();
    setSerieIndex(0);
    resetSeries();
  };

  /**
   * Handle the change of all checkboxes in a category
   * @param {string} category
   * @param {boolean} value
   */
  const handleChangeCategoriesCheckbox = (category, value) => {
    stratagemsByCategories[category].forEach((stratagem) => handleChange(stratagem.name, value));
    setSerieIndex(0);
    resetSeries();
  };

  /**
   * Check if the active serie code is correct
   * @param {string} direction
   */
  const checkActiveSerieCode = (direction) => {
    const serieDirection = series[0].code[serieIndex];
    if (direction === serieDirection) { // direction is correct
      setSerieIndex((prev) => prev + 1);
    } else {
      if (direction === series[0].code[0]) {
        setSerieIndex(1); // if the direction is the first one, reset the active index to 1
        return;
      }
      setSerieIndex(0);
      return;
    }

    if (serieIndex === series[0].code.length - 1) {
      // wait for the last code to be shown
      setTimeout(() => {
        handleAddToSeries();
        setSerieIndex(0);
      }, 200);
    }
  };

  /**
   * Handle the keydown event
   * @param {KeyboardEvent} event
   */
  function keydownDirectionHandler(event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        checkActiveSerieCode('up');
        break;
      case 'ArrowDown':
      case 'KeyS':
        checkActiveSerieCode('down');
        break;
      case 'ArrowLeft':
      case 'KeyA':
        checkActiveSerieCode('left');
        break;
      case 'ArrowRight':
      case 'KeyD':
        checkActiveSerieCode('right');
        break;
      default:
        break;
    }
  }
  useEventListener('keydown', keydownDirectionHandler);

  return (
    <main className={styles.container}>
      <div className={styles.side}>
        <StratagemsCard.Wrapper>
          <>
            <Checkbox id="all" checked={checkboxesAreChecked} onChange={handleChangeAllCheckbox} />
            {Object.entries(stratagemsByCategories).map(([category, stratagemsByCategory]) => {
              const categoryChecked = stratagemsByCategory.every(
                (stratagem) => checkboxes[stratagem.name],
              );

              return (
                <div key={category}>
                  {category}
                  <Checkbox
                    id={category}
                    checked={categoryChecked}
                    onChange={() => handleChangeCategoriesCheckbox(category, !categoryChecked)}
                  />
                  {stratagemsByCategory.map((stratagem) => (
                    <StratagemsCard
                      key={stratagem.id}
                      name={stratagem.name}
                      code={stratagem.code}
                    >
                      <Checkbox
                        id={stratagem.name}
                        checked={checkboxes[stratagem.name]}
                        onChange={() => handleChangeCheckbox(stratagem.name)}
                      />
                    </StratagemsCard>
                  ))}
                </div>
              );
            })}
          </>
        </StratagemsCard.Wrapper>
      </div>

      <div className={styles.main}>
        <div className={styles.cards}>
          {series?.length ? series.map((stratagem, index) => (
            <StratagemsCard
            // eslint-disable-next-line react/no-array-index-key
              key={`${stratagem.id}-${index}`}
              name={stratagem.name}
              code={stratagem.code}
            />
          )) : null}
        </div>

        <div>
          {series?.length ? (
            <>
              <div>
                {series[0].name}
              </div>
              <div>
                {series[0].code.map((item, index) => (
                  <div
                  // eslint-disable-next-line react/no-array-index-key
                    key={`${series[0].name}-${item}-${index}`}
                    className={index + 1 <= serieIndex ? styles.active : ''}
                  >
                    {`${index} ${item}`}
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}

StratagemsLayout.propTypes = {
  stratagems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  stratagemsByCategories: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
  }))).isRequired,
};

export default StratagemsLayout;
