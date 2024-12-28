// Styles
import styles from './StratagemsLoadoutList.module.css';

/**
 * StratagemsLoadoutList component
 * @param {object} props - Component properties
 * @param {Array<{ id: string, name: string, code: string[] }>} props.stratagems - Array of stratagem objects
 * @param {Function} props.children - Function to render each stratagem
 * @returns {JSX.Element} The StratagemsLoadoutList component
 */
function StratagemsLoadoutList({ stratagems, children }) {
  return (
    <div className={styles.list}>
      {stratagems.map((stratagem, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`${stratagem.code}-${index}`} className={styles.item}>
          {children(stratagem, index)}
        </div>
      ))}
    </div>
  );
}

export default StratagemsLoadoutList;
