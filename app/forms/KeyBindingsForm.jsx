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
  return (
    <FormWrapper name="save-key-bindings" action={handleKeyBindings}>
      <LabelInput htmlFor="up" label="Key Up">
        <input
          id="up"
          data-testid="up"
          name="up"
          type="text"
          value={tempKeyBindings.up}
          onKeyDown={(event) => handleSetTempKeyBindings('up', event.code)}
          onChange={() => {}}
          required
        />
      </LabelInput>
      <LabelInput htmlFor="down" label="Key Down">
        <input
          id="down"
          data-testid="down"
          name="down"
          type="text"
          value={tempKeyBindings.down}
          onKeyDown={(event) => handleSetTempKeyBindings('down', event.code)}
          onChange={() => {}}
          required
        />
      </LabelInput>
      <LabelInput htmlFor="left" label="Key Left">
        <input
          id="left"
          data-testid="left"
          name="left"
          type="text"
          value={tempKeyBindings.left}
          onKeyDown={(event) => handleSetTempKeyBindings('left', event.code)}
          onChange={() => {}}
          required
        />
      </LabelInput>
      <LabelInput htmlFor="right" label="Key Right">
        <input
          id="right"
          data-testid="right"
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
