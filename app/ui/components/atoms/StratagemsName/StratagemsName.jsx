import { useTranslations } from 'next-intl';

// Styles
import styles from './StratagemsName.module.css';

// Lib
import cn from '../../../../lib/cn';
import { tStratagem } from '../../../../lib/translate';

/**
 * StratagemsName component
 * @param {object} props - Component properties
 * @param {string} props.name - The English name of the stratagem
 * @param {string} [props.className=''] - Additional class names
 * @returns {JSX.Element} The StratagemsName component
 */
function StratagemsName({ name, className = '' }) {
  const t = useTranslations('GameData');
  return (
    <div
      className={cn([styles.container, className])}
      data-testid="stratagem-name"
    >
      <span className={styles.name}>{tStratagem(t, name)}</span>
    </div>
  );
}

export default StratagemsName;
