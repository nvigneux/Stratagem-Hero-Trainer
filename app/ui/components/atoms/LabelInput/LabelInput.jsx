// Styles
import styles from './LabelInput.module.css';

// Components
import { Popover } from '../Popover/PopoverContext';
import { PopoverTrigger, PopoverContent } from '../Popover/Popover';
import { Picto } from '../Picto/Picto';

/**
 * LabelInput component
 * @param {object} props - Component props
 * @param {string} props.htmlFor - The id of the input element this label is for
 * @param {string} props.label - The text content of the label
 * @param {string} [props.title] - The title of the label
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the label
 * @returns {JSX.Element} The rendered label input component
 */
function LabelInput({
  htmlFor, label, title, children,
}) {
  return (
    <label htmlFor={htmlFor} className={styles.label} title={title}>
      <span className={styles.labelText}>
        {title ? (
          <Popover placement="left">
            <PopoverTrigger className={styles.settingsTrigger}>
              <Picto icon="information" className={styles.settingsIcon} />
            </PopoverTrigger>
            <PopoverContent>
              <div className={styles.titlePopover}>
                {title}
              </div>
            </PopoverContent>
          </Popover>
        ) : null}
        {label}
      </span>
      {children}
    </label>
  );
}

export default LabelInput;
