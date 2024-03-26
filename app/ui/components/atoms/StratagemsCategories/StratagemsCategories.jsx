import PropTypes from 'prop-types';

// Styles
import styles from './StratagemsCategories.module.css';

function StratagemsCategories({ children }) {
  return (
    <div className={styles.container}>{children}</div>
  );
}
StratagemsCategories.propTypes = {
  children: PropTypes.node.isRequired,
};

StratagemsCategories.Category = function StratagemsCategoriesCategory({ children }) {
  return (
    <div className={styles.category}>
      {children}
    </div>
  );
};
StratagemsCategories.Category.propTypes = {
  children: PropTypes.node.isRequired,
};

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
StratagemsCategories.Head.propTypes = {
  category: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

StratagemsCategories.Cards = function StratagemsCategoriesCards({ children, stratagems }) {
  return (
    <div className={styles.cards}>
      {stratagems.map((stratagem, index) => (
        children(stratagem, index)
      ))}
    </div>
  );
};
StratagemsCategories.Cards.propTypes = {
  children: PropTypes.func.isRequired,
  stratagems: PropTypes.arrayOf(PropTypes.shape({
    // id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};

export default StratagemsCategories;
