import { useTranslations } from 'next-intl';

// Components
import { Picto } from '../Picto/Picto';

// Styles
import styles from './ButtonBuyMeACoffee.module.css';

/**
 * ButtonBuyMeACoffee component
 * @returns {JSX.Element} The ButtonBuyMeACoffee component
 */
function ButtonBuyMeACoffee() {
  const t = useTranslations('ButtonBuyMeACoffee');

  return (
    <a
      href="https://www.buymeacoffee.com/nvigneux?source=stratagem-hero"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
    >
      <Picto icon="coffee" />
      <div>{t('label')}</div>
    </a>
  );
}

export default ButtonBuyMeACoffee;
