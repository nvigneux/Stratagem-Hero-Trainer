import { useTranslations } from 'next-intl';

// Components
import Arrow from '../../atoms/Arrow/Arrow';
import StratagemImage from '../../atoms/StratagemImage/StratagemImage';

// Styles
import styles from './StratagemsLoadoutCard.module.css';

// Lib
import cn from '../../../../lib/cn';
import { tStratagem } from '../../../../lib/translate';

/**
 * StratagemsLoadoutCard component
 * @param {object} props - Component properties
 * @param {{name: string, code: string[], category: {name: string}, color: string}} props.stratagem - The stratagem object (names are English)
 * @param {Function} props.setCheckedStratagem - Function to set checked stratagem
 * @returns {JSX.Element} The StratagemsLoadoutCard component
 */
function StratagemsLoadoutCard({ stratagem, setCheckedStratagem }) {
  const t = useTranslations('GameData');
  const displayName = tStratagem(t, stratagem.name);
  return (
    <button
      type="button"
      onClick={() => setCheckedStratagem({ [stratagem.name]: undefined })}
      className={styles.card}
    >
      <StratagemsLoadoutCard.Icon
        color={stratagem.color}
        title={displayName}
      >
        <StratagemImage
          src={`/icons/stratagems/${stratagem.category.name}/${stratagem.name}.svg`}
          name={stratagem.name}
        />
      </StratagemsLoadoutCard.Icon>
      <div className={styles.info}>
        <div className={styles.name}>{displayName}</div>
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
 * @param {React.ReactNode} props.children - Child nodes
 * @param {string} props.title - Title of the icon
 * @param {string} [props.color] - Theme color for the icon
 * @returns {JSX.Element} The StratagemsLoadoutCardIcon component
 */
StratagemsLoadoutCard.Icon = function StratagemsLoadoutCardIcon({
  children, title, color,
}) {
  return (
    <div
      className={cn([styles.icon, styles[color]])}
      title={title}
    >
      {children}
    </div>
  );
};
