import PropTypes from 'prop-types';
import Image from 'next/image';

// Components
import Arrow from '../../atoms/Arrow/Arrow';

// Styles
import styles from './StratagemsLoadoutCard.module.css';

// Lib
import cn from '../../../../lib/cn';

function StratagemsLoadoutCard({ stratagem, setCheckedStratagem }) {
  return (
    <button
      type="button"
      onClick={() => setCheckedStratagem(stratagem.name)}
      className={styles.card}
    >
      <StratagemsLoadoutCard.Icon type={stratagem.category.name}>
        <Image
          src={`/icons/stratagems/${stratagem.category.name}/${stratagem.name}.svg`}
          alt={stratagem.name}
          width={55}
          height={55}
        />
      </StratagemsLoadoutCard.Icon>
      <div className={styles.info}>
        <div className={styles.name}>{stratagem.name}</div>
        <div className={styles.code}>
          {stratagem.code.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Arrow key={`${item}-${index}`} direction={item} size="small" active={false} error={false} />
          ))}
        </div>
      </div>
    </button>
  );
}

StratagemsLoadoutCard.propTypes = {
  stratagem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setCheckedStratagem: PropTypes.func.isRequired,
};

export default StratagemsLoadoutCard;

StratagemsLoadoutCard.Icon = function StratagemsLoadoutCardIcon({ type, children }) {
  const kebabType = type.replace(/ /g, '-').toLowerCase();
  return (
    <div className={cn([styles.icon, styles[kebabType]])}>{children}</div>
  );
};
StratagemsLoadoutCard.Icon.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
