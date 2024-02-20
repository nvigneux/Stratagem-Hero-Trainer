import PropTypes from 'prop-types';

// Styles
import styles from './SideNavLayout.module.css';

function SideNavLayout({ sidebar, children }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

SideNavLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
};

export default SideNavLayout;
