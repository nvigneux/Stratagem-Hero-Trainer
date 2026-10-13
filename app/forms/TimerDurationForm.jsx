// next-intl
import { useTranslations } from 'next-intl';

// Components
import LabelInput from '../ui/components/atoms/LabelInput/LabelInput';
import FormWrapper from '../ui/components/molecules/Form/Form';

/**
 * TimerDurationForm component
 * @param {object} props - Component properties
 * @param {number} props.timerDuration - Timer duration in seconds
 * @param {Function} props.handleSubmitTimerDuration - Function to handle form submission
 * @returns {JSX.Element} The TimerDurationForm component
 */
function TimerDurationForm({ timerDuration, handleSubmitTimerDuration }) {
  const t = useTranslations('TimerDurationForm');
  return (
    <FormWrapper name="save-timer-duration" action={handleSubmitTimerDuration}>
      <LabelInput htmlFor="timerDuration" label={t('label')}>
        <input
          data-testid="timer-duration-input"
          name="timerDuration"
          type="number"
          min={1}
          step={1}
          defaultValue={timerDuration}
          required
        />
      </LabelInput>
    </FormWrapper>
  );
}

export default TimerDurationForm;
