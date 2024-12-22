// Styles
import styles from './StratagemsCategories.module.css';

/**
 * StratagemsCategories component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StratagemsCategories component
 */
function StratagemsCategories({ children }) {
  return (
    <div className={styles.container}>{children}</div>
  );
}

/**
 * StratagemsCategoriesCategory component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StratagemsCategoriesCategory component
 */
StratagemsCategories.Category = function StratagemsCategoriesCategory({ children }) {
  return (
    <div className={styles.category}>
      {children}
    </div>
  );
};

/**
 * StratagemsCategoriesHead component
 * @param {object} props - Component properties
 * @param {string} props.category - The category name
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StratagemsCategoriesHead component
 */
StratagemsCategories.Head = function StratagemsCategoriesHead({ category, children }) {
  return (
    <div className={styles.head}>
      <h3 className={styles.title}>{category}</h3>
      <div className={styles.action}>
        {children}
      </div>
    </div>
  );
};

/**
 * StratagemsCategoriesCards component
 * @param {object} props - Component properties
 * @param {Function} props.children - Function to render each stratagem
 * @param {Array<{ id: string, name: string, description: string }>} props.stratagems - The stratagems to render
 * @returns {JSX.Element} The StratagemsCategoriesCards component
 */
StratagemsCategories.Cards = function StratagemsCategoriesCards({ children, stratagems }) {
  return (
    <div className={styles.cards}>
      {stratagems.map((stratagem, index) => (
        children(stratagem, index)
      ))}
    </div>
  );
};

export default StratagemsCategories;
