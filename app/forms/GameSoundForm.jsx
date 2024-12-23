// Components
import LabelInput from '../ui/components/atoms/LabelInput/LabelInput';
import FormWrapper from '../ui/components/molecules/Form/Form';
import Checkbox from '../ui/components/atoms/Checkbox/Checkbox';

/**
 * GameSoundForm component
 * @param {object} props - Component properties
 * @param {boolean} props.gameSound - Game sound state
 * @param {Function} props.handleSubmitGameSound - Function to handle form submission
 * @returns {JSX.Element} The GameSoundForm component
 */
function GameSoundForm({ gameSound, handleSubmitGameSound }) {
  return (
    <FormWrapper action={handleSubmitGameSound}>
      <LabelInput htmlFor="gameSound" label="Game sound">
        <Checkbox
          id="gameSound"
          name="gameSound"
          defaultChecked={gameSound}
        />
      </LabelInput>
    </FormWrapper>
  );
}

export default GameSoundForm;
