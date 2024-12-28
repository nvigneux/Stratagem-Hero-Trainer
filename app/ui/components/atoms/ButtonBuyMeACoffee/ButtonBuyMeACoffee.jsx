// Components
import { Picto } from '../Picto/Picto';

// Styles
import styles from './ButtonBuyMeACoffee.module.css';

/**
 * ButtonBuyMeACoffee component
 * @returns {JSX.Element} The ButtonBuyMeACoffee component
 */
function ButtonBuyMeACoffee() {
  return (
    <a
      href="https://www.buymeacoffee.com/nvigneux?source=stratagem-hero"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
    >
      <Picto icon="coffee" />
      <div>Buy me a Coffee</div>
    </a>
  );
}

export default ButtonBuyMeACoffee;
