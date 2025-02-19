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
  const handleInputEvent = (key, event) => {
    // Handle keyboard events
    if (event.type === 'keydown') {
      handleSetTempKeyBindings(key, event.code);
    }

    // Handle mouse button events
    if (event.type === 'mousedown') {
      let mouseButton = '';
      switch (event.button) {
        case 3:
          mouseButton = 'Mouse 4'; // Usually back button
          break;
        case 4:
          mouseButton = 'Mouse 5'; // Usually forward button
          break;
        default:
          return;
      }
      handleSetTempKeyBindings(key, mouseButton);
    }

    // Handle mouse wheel events
    if (event.type === 'wheel') {
      const wheelAction = event.deltaY < 0 ? 'Mouse Wheel Up' : 'Mouse Wheel Down';
      handleSetTempKeyBindings(key, wheelAction);
    }

    // Prevent default actions (like scrolling)
    event.preventDefault();
  };

  return (
    <FormWrapper name="save-key-bindings" action={handleKeyBindings}>
      <LabelInput htmlFor="up" label="Key Up">
        <input
          id="up"
          data-testid="key-up"
          name="up"
          type="text"
          value={tempKeyBindings.up}
          onKeyDown={(event) => handleInputEvent('up', event)}
          onMouseDown={(event) => handleInputEvent('up', event)}
          onWheel={(event) => handleInputEvent('up', event)}
          onChange={() => {}}
          required
        />
      </LabelInput>
      <LabelInput htmlFor="down" label="Key Down">
        <input
          id="down"
          data-testid="key-down"
          name="down"
          type="text"
          value={tempKeyBindings.down}
          onKeyDown={(event) => handleInputEvent('down', event)}
          onMouseDown={(event) => handleInputEvent('down', event)}
          onWheel={(event) => handleInputEvent('down', event)}
          onChange={() => {}}
          required
        />
      </LabelInput>
      <LabelInput htmlFor="left" label="Key Left">
        <input
          id="left"
          data-testid="key-left"
          name="left"
          type="text"
          value={tempKeyBindings.left}
          onKeyDown={(event) => handleInputEvent('left', event)}
          onMouseDown={(event) => handleInputEvent('left', event)}
          onWheel={(event) => handleInputEvent('left', event)}
          onChange={() => {}}
          required
        />
      </LabelInput>
      <LabelInput htmlFor="right" label="Key Right">
        <input
          id="right"
          data-testid="key-right"
          name="right"
          type="text"
          value={tempKeyBindings.right}
          onKeyDown={(event) => handleInputEvent('right', event)}
          onMouseDown={(event) => handleInputEvent('right', event)}
          onWheel={(event) => handleInputEvent('right', event)}
          onChange={() => {}}
          required
        />
      </LabelInput>
    </FormWrapper>
  );
}

export default KeyBindingsForm;
