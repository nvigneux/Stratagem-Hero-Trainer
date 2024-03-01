/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsCard.module.css';

// Components
import { Picto } from '../Picto/Picto';

// Lib
import cn from '../../../../lib/cn';

function StratagemsCard({
  name, code, active = false, children = null,
}) {
  /**
   * Generate the HTML code for the arrow
   * @param {string[]} codeArray
   * @returns {string[]}
   */
  const generateHtmlCodeArrow = (codeArray) => {
    const left = '←';
    const right = '→';
    const up = '↑';
    const down = '↓';

    return codeArray.map((item) => {
      switch (item) {
        case 'left':
          return left;
        case 'right':
          return right;
        case 'up':
          return up;
        case 'down':
          return down;
        default:
          return item;
      }
    });
  };

  return (
    <div className={cn([styles.card, active && styles.active])} title={`${name} - ${generateHtmlCodeArrow(code)}`}>
      <Picto icon={name} className={styles.icon} />
      {children}
    </div>
  );
}

StratagemsCard.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.bool,
  children: PropTypes.node,
};

StratagemsCard.Wrapper = function Stratagems({ children }) {
  return (
    <div className={styles.wrapper}>{children}</div>
  );
};
StratagemsCard.Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StratagemsCard;
