import PropTypes from 'prop-types';

// Components
import LabelInput from '../ui/components/atoms/LabelInput/LabelInput';
import Form from '../ui/components/molecules/Form/Form';

function TimerDurationForm({ timerDuration, handleSubmitTimerDuration }) {
  return (
    <Form
      action={handleSubmitTimerDuration}
    >
      <LabelInput htmlFor="timerDuration" label="Timer duration (sec)">
        <input
          id="timerDuration"
          name="timerDuration"
          type="number"
          min={1}
          step={1}
          defaultValue={timerDuration}
          required
        />
      </LabelInput>
    </Form>
  );
}

TimerDurationForm.propTypes = {
  timerDuration: PropTypes.number.isRequired,
  handleSubmitTimerDuration: PropTypes.func.isRequired,
};

export default TimerDurationForm;
