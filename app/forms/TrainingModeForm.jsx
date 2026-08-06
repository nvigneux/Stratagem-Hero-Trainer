// next-intl
import { useTranslations } from 'next-intl';

// Components
import LabelInput from '../ui/components/atoms/LabelInput/LabelInput';
import FormWrapper from '../ui/components/molecules/Form/Form';
import Checkbox from '../ui/components/atoms/Checkbox/Checkbox';

/**
 * TrainingModeForm component
 * @param {object} props - Component properties
 * @param {boolean} props.trainingMode - Training mode state
 * @param {Function} props.handleSubmitTrainingMode - Function to handle form submission
 * @returns {JSX.Element} The TrainingModeForm component
 */
function TrainingModeForm({ trainingMode, handleSubmitTrainingMode }) {
  const t = useTranslations('TrainingModeForm');
  return (
    <FormWrapper name="save-training-mode" action={handleSubmitTrainingMode}>
      <LabelInput
        htmlFor="stratagemJammer"
        label={t('stratagemJammer')}
        title={t('stratagemJammerTitle')}
      >
        <Checkbox
          id="checkbox-training-stratagem-jammer"
          name="stratagemJammer"
          defaultChecked={trainingMode.stratagemJammer}
        />
      </LabelInput>
      <LabelInput
        htmlFor="sequentialMode"
        label={t('sequentialMode')}
        title={t('sequentialModeTitle')}
      >
        <Checkbox
          id="checkbox-training-sequential-mode"
          name="sequentialMode"
          defaultChecked={trainingMode.sequentialMode}
        />
      </LabelInput>
    </FormWrapper>
  );
}

export default TrainingModeForm;
