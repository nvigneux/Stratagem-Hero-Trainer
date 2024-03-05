import PropTypes from 'prop-types';

// Components
import LabelInput from '../ui/components/atoms/LabelInput/LabelInput';
import Form from '../ui/components/molecules/Form/Form';

function TimerDurationForm({ timerDuration, handleSubmitTimerDuration }) {
  return (
    // <form action={handleSubmitTimerDuration}>
    //   <label htmlFor="timerDuration">
    //     <span>Timer duration (second)</span>
    //     <input
    //       id="timerDuration"
    //       name="timerDuration"
    //       type="number"
    //       min={1}
    //       step={1}
    //       defaultValue={timerDuration}
    //       required
    //     />
    //   </label>
    //   <button type="submit">Apply</button>
    // </form>
    <Form
      action={handleSubmitTimerDuration}
    >
      <LabelInput htmlFor="timerDuration" label="Timer duration (second)">
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
