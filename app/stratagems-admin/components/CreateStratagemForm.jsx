'use client';

import PropTypes from 'prop-types';

import Link from 'next/link';
import { useFormState } from 'react-dom';

// Styles
import styles from './StratagemForm.module.css';

// Lib
import { createStratagem } from '../../lib/actions';

// Components
import Button from '../../ui/components/atoms/Button/Button';
import LabelInput from '../../ui/components/atoms/LabelInput/LabelInput';

export default function Form({ categoryId }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createStratagem, initialState);

  return (
    <form action={dispatch} className={styles.form}>
      <div className={styles.fieldset}>
        <LabelInput label="Nom">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            required
          />
        </LabelInput>
        {/* TODO ERROR */}
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name && state.errors.name.map((error) => (
            <p key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className={styles.fieldset}>

        <LabelInput label="Code">
          <input
            id="code"
            name="code"
            type="text"
            placeholder="Enter name"
            required
          />
        </LabelInput>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.code && state.errors.code.map((error) => (
            <p key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Link
          href="/stratagems-admin"
        >
          <Button>
            Cancel
          </Button>
        </Link>
        <Button type="submit">Create Stratagem</Button>
      </div>

      <input type="hidden" name="category_id" value={categoryId} />
    </form>
  );
}

Form.propTypes = {
  categoryId: PropTypes.string.isRequired,
};
