// Components
import Arrow from '../../atoms/Arrow/Arrow';
import StratagemImage from '../../atoms/StratagemImage/StratagemImage';

// Styles
import styles from './StratagemsLoadoutCard.module.css';

// Lib
import cn from '../../../../lib/cn';

/**
 * StratagemsLoadoutCard component
 * @param {object} props - Component properties
 * @param {{name: string, code: string[], category: {name: string}}} props.stratagem - The stratagem object
 * @param {Function} props.setCheckedStratagem - Function to set checked stratagem
 * @returns {JSX.Element} The StratagemsLoadoutCard component
 */
function StratagemsLoadoutCard({ stratagem, setCheckedStratagem }) {
  return (
    <button
      type="button"
      onClick={() => setCheckedStratagem({ [stratagem.name]: undefined })}
      className={styles.card}
    >
      <StratagemsLoadoutCard.Icon type={stratagem.category.name} title={stratagem.name}>
        <StratagemImage
          src={`/icons/stratagems/${stratagem.category.name}/${stratagem.name}.svg`}
          name={stratagem.name}
        />
      </StratagemsLoadoutCard.Icon>
      <div className={styles.info}>
        <div className={styles.name}>{stratagem.name}</div>
        <div className={styles.code}>
          {stratagem.code.map((item, index) => (
            <Arrow
              // eslint-disable-next-line react/no-array-index-key
              key={`${item}-${index}`}
              direction={item}
              size="small"
              active={false}
              error={false}
            />
          ))}
        </div>
      </div>
    </button>
  );
}

export default StratagemsLoadoutCard;

/**
 * StratagemsLoadoutCardIcon component
 * @param {object} props - Component properties
 * @param {string} props.type - Icon type
 * @param {React.ReactNode} props.children - Child nodes
 * @param {string} props.title - Title of the icon
 * @returns {JSX.Element} The StratagemsLoadoutCardIcon component
 */
StratagemsLoadoutCard.Icon = function StratagemsLoadoutCardIcon({ type, children, title }) {
  const kebabType = type.replace(/ /g, '-').toLowerCase();
  return (
    <div className={cn([styles.icon, styles[kebabType]])} title={title}>{children}</div>
  );
};
