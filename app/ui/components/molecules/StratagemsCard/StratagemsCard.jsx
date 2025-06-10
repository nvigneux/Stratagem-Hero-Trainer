import Image from 'next/image';

// Styles
import styles from './StratagemsCard.module.css';

// Lib
import cn from '../../../../lib/cn';
import { generateHtmlCodeArrow } from '../../../../lib/stratagems';

/**
 * StratagemsCard component
 * @param {object} props - Component properties
 * @param {string} props.name - The name of the stratagem
 * @param {Array<string>} props.code - The code of the stratagem
 * @param {string} props.category - The category of the stratagem
 * @param {boolean} [props.active=false] - Whether the stratagem is active
 * @param {React.ReactNode} [props.children=null] - Child nodes
 * @returns {JSX.Element} The StratagemsCard component
 */
function StratagemsCard({
  name, code, category, active = false, children = null,
}) {
  return (
    <div
      className={cn([styles.card, active && `${styles.active} card-is-active`])}
      title={`${name} - ${generateHtmlCodeArrow(code)}`}
    >
      <Image
        src={`/icons/stratagems/${category}/${name}.svg`}
        alt={name}
        width={55}
        height={55}
        className={styles.icon}
        data-testid={`stratagem-icon-${name}`}
        onError={(e) => {
          e.target.src = '/icons/question-mark.svg';
        }}
      />
      {children}
    </div>
  );
}

/**
 * StratagemsCardWrapper component
 * @param {object} props - Component properties
 * @param {React.ReactNode} props.children - Child nodes
 * @returns {JSX.Element} The StratagemsCardWrapper component
 */
StratagemsCard.Wrapper = function StratagemsCardWrapper({ children }) {
  return (
    <div className={styles.wrapper}>{children}</div>
  );
};

export default StratagemsCard;
