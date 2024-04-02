import PropTypes from 'prop-types';

// Components
import LabelInput from '../ui/components/atoms/LabelInput/LabelInput';
import Form from '../ui/components/molecules/Form/Form';
import Checkbox from '../ui/components/atoms/Checkbox/Checkbox';

function GameSoundForm({ gameSound, handleSubmitGameSound }) {
  return (
    <Form
      action={handleSubmitGameSound}
    >
      <LabelInput htmlFor="gameSound" label="Game sound">
        <Checkbox
          id="gameSound"
          name="gameSound"
          defaultChecked={!!gameSound || false}
          value="true"
        />
      </LabelInput>
    </Form>
  );
}

GameSoundForm.propTypes = {
  gameSound: PropTypes.bool.isRequired,
  handleSubmitGameSound: PropTypes.func.isRequired,
};

export default GameSoundForm;
