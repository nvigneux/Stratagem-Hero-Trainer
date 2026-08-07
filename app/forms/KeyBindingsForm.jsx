// next-intl
import { useTranslations } from 'next-intl';

// Components
import LabelInput from '../ui/components/atoms/LabelInput/LabelInput';
import FormWrapper from '../ui/components/molecules/Form/Form';

/**
 * KeyBindingsForm component
 * @param {object} props - Component properties
 * @param {object} props.tempKeyBindings - Temporary key bindings
 * @param {Function} props.handleKeyBindings - Function to handle form submission
 * @param {Function} props.handleSetTempKeyBindings - Function to set temporary key bindings
 * @returns {JSX.Element} The KeyBindingsForm component
 */
function KeyBindingsForm({
  tempKeyBindings,
  handleKeyBindings,
  handleSetTempKeyBindings,
}) {
  const t = useTranslations('KeyBindingsForm');
  return (
    <FormWrapper name="save-key-bindings" action={handleKeyBindings}>
      <LabelInput htmlFor="up" label={t('keyUp')}>
        <input
          id="up"
          data-testid="key-up"
          name="up"
          type="text"
          value={tempKeyBindings.up}
          onKeyDown={(event) => handleSetTempKeyBindings('up', event.code)}
          onChange={() => {}}
          required
        />
      </LabelInput>
      <LabelInput htmlFor="down" label={t('keyDown')}>
        <input
          id="down"
          data-testid="key-down"
          name="down"
          type="text"
          value={tempKeyBindings.down}
          onKeyDown={(event) => handleSetTempKeyBindings('down', event.code)}
          onChange={() => {}}
          required
        />
      </LabelInput>
      <LabelInput htmlFor="left" label={t('keyLeft')}>
        <input
          id="left"
          data-testid="key-left"
          name="left"
          type="text"
          value={tempKeyBindings.left}
          onKeyDown={(event) => handleSetTempKeyBindings('left', event.code)}
          onChange={() => {}}
          required
        />
      </LabelInput>
      <LabelInput htmlFor="right" label={t('keyRight')}>
        <input
          id="right"
          data-testid="key-right"
          name="right"
          type="text"
          value={tempKeyBindings.right}
          onKeyDown={(event) => handleSetTempKeyBindings('right', event.code)}
          onChange={() => {}}
          required
        />
      </LabelInput>
    </FormWrapper>
  );
}

export default KeyBindingsForm;
