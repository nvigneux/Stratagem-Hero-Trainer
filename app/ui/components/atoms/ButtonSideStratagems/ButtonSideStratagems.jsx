import PropTypes from 'prop-types';

// Styles
import styles from './ButtonSideStratagems.module.css';
// Lib
import cn from '../../../../lib/cn';

const svgPaths = {
  line1: 'M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058',
  line2: 'M 20,50 H 80',
  line3: 'M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942',
};

function ButtonSideStratagems({ isOpened, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn([styles.button, styles.burger, isOpened ? styles.cross : ''])}
      aria-label="Open side stratagems"
    >
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path className={cn([styles.line, styles.line1])} d={svgPaths.line1} />
        <path className={cn([styles.line, styles.line2])} d={svgPaths.line2} />
        <path className={cn([styles.line, styles.line3])} d={svgPaths.line3} />
      </svg>
    </button>
  );
}

ButtonSideStratagems.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonSideStratagems;
