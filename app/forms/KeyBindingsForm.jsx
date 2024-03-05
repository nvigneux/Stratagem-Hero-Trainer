import PropTypes from 'prop-types';

// Components
import LabelInput from '../ui/components/atoms/LabelInput/LabelInput';
import Form from '../ui/components/molecules/Form/Form';

function KeyBindingsForm({ tempKeyBindings, handleKeyBindings, handleSetTempKeyBindings }) {
  return (
    <Form action={handleKeyBindings}>
      <LabelInput htmlFor="up" label="Key Up">
        <input
          id="up"
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
          name="right"
          type="text"
          value={tempKeyBindings.right}
          onKeyDown={(event) => handleSetTempKeyBindings('right', event.code)}
          onChange={() => {}}
          required
        />
      </LabelInput>
    </Form>
  );
}

KeyBindingsForm.propTypes = {
  tempKeyBindings: PropTypes.shape({
    up: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
    down: PropTypes.string.isRequired,
    left: PropTypes.string.isRequired,
  }).isRequired,
  handleKeyBindings: PropTypes.func.isRequired,
  handleSetTempKeyBindings: PropTypes.func.isRequired,
};

export default KeyBindingsForm;
