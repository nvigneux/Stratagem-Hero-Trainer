// Styles
import styles from './SideNavLayout.module.css';

/**
 * SideNavLayout component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.sidebar - Sidebar content
 * @param {React.ReactNode} props.children - Main content
 * @returns {JSX.Element} The SideNavLayout component
 */
function SideNavLayout({ sidebar, children }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default SideNavLayout;
