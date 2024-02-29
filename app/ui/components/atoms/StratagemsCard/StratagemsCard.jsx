import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsCard.module.css';

function StratagemsCard({ name, code, children = null }) {
  return (
    <div className={styles.card}>
      <div className={styles.name}>{name}</div>
      <ul className={styles.code}>
        {code.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`${name}-${item}-${index}`}>
            {item}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

StratagemsCard.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/require-default-props
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
