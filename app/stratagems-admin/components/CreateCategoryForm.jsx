'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';

// Styles
import styles from './StratagemForm.module.css';

// Lib
import { createCategory } from '../../lib/actions';

// Components
import Button from '../../ui/components/atoms/Button/Button';
import LabelInput from '../../ui/components/atoms/LabelInput/LabelInput';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCategory, initialState);

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
        {state.errors?.name && state.errors.name.map((error) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>

      <div className={styles.actions}>
        <Link
          href="/stratagems-admin"
        >
          <Button>
            Cancel
          </Button>
        </Link>
        <Button type="submit">Create Category</Button>
      </div>
    </form>
  );
}

Form.propTypes = {};
