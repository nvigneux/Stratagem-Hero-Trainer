import Image from 'next/image';

// Components
import Arrow from '../../atoms/Arrow/Arrow';

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
      <StratagemsLoadoutCard.Icon type={stratagem.category.name}>
        <Image
          src={`/icons/stratagems/${stratagem.category.name}/${stratagem.name}.svg`}
          alt={stratagem.name}
          width={55}
          height={55}
          onError={(e) => {
            e.target.src = '/icons/question-mark.svg';
          }}
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
 * @returns {JSX.Element} The StratagemsLoadoutCardIcon component
 */
StratagemsLoadoutCard.Icon = function StratagemsLoadoutCardIcon({ type, children }) {
  const kebabType = type.replace(/ /g, '-').toLowerCase();
  return (
    <div className={cn([styles.icon, styles[kebabType]])}>{children}</div>
  );
};
