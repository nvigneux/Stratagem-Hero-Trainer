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
  return (
    <FormWrapper name="save-training-mode" action={handleSubmitTrainingMode}>
      <LabelInput htmlFor="stratagemJammer" label="Stratagem jammer">
        <Checkbox
          id="checkbox-training-stratagem-jammer"
          name="stratagemJammer"
          defaultChecked={trainingMode.stratagemJammer}
        />
      </LabelInput>
    </FormWrapper>
  );
}

export default TrainingModeForm;
