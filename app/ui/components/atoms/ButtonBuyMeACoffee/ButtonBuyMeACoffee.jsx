// Styles
import { Picto } from '../Picto/Picto';
import styles from './ButtonBuyMeACoffee.module.css';

function ButtonBuyMeACoffee() {
  return (
    <a href="https://www.buymeacoffee.com/nvigneux?source=stratagem-hero" target="_blank" rel="noopener noreferrer" className={styles.button}>
      <Picto icon="coffee" />
      <div>Buy me a Coffee</div>
    </a>
  );
}

ButtonBuyMeACoffee.propTypes = {};

export default ButtonBuyMeACoffee;
