// Components
import LabelInput from '../ui/components/atoms/LabelInput/LabelInput';
import Form from '../ui/components/molecules/Form/Form';

/**
 * TimerDurationForm component
 * @param {object} props - Component properties
 * @param {number} props.timerDuration - Timer duration in seconds
 * @param {Function} props.handleSubmitTimerDuration - Function to handle form submission
 * @returns {JSX.Element} The TimerDurationForm component
 */
function TimerDurationForm({ timerDuration, handleSubmitTimerDuration }) {
  return (
    <Form action={handleSubmitTimerDuration}>
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

export default TimerDurationForm;
