import PropTypes from 'prop-types';

// Components
import { Picto } from '../Picto/Picto';
import Arrow from '../../molecules/Arrow/Arrow';

// Styles
import styles from './StratagemsLoadoutCard.module.css';

// Lib
import cn from '../../../../lib/cn';

function StratagemsLoadoutCard({ stratagem }) {
  return (
    <div className={styles.card}>
      <StratagemsLoadoutCard.Icon type={stratagem.category.name}>
        <Picto icon={stratagem.name} />
      </StratagemsLoadoutCard.Icon>
      <div className={styles.info}>
        <div className={styles.name}>{stratagem.name}</div>
        <div className={styles.code}>
          {stratagem.code.map((item) => (
            <Arrow direction={item} size="small" />
          ))}
        </div>
      </div>
    </div>
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
