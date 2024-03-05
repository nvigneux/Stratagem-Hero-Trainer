import PropTypes from 'prop-types';

// Styles
import styles from './HeadingForm.module.css';

function HeadingForm({ title }) {
  return (
    <div className={styles.title}>
      {title}
    </div>
  );
}

HeadingForm.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeadingForm;
