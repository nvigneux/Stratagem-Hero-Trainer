import PropTypes from 'prop-types';

// Styles
import styles from './InfoMessage.module.css';

function InfoMessage({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

InfoMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InfoMessage;
