'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';

// Styles
import styles from './StratagemForm.module.css';

// Lib
import { updateStratagem } from '../../lib/actions';

// Components
import LabelInput from '../../ui/components/atoms/LabelInput/LabelInput';
import Button from '../../ui/components/atoms/Button/Button';

export default function EditCategoryForm({
  stratagem,
}) {
  const updateStratagemWithId = updateStratagem.bind(null, stratagem.id);

  const code = JSON.parse(stratagem.code).join(' ');

  return (
    <form action={updateStratagemWithId} className={styles.form}>
      <div className={styles.fieldset}>
        <LabelInput label="Nom">
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={stratagem.name}
            placeholder="Enter name"
          />
        </LabelInput>
      </div>
      <div className={styles.fieldset}>
        <LabelInput label="Code">
          <input
            id="code"
            name="code"
            type="text"
            required
            defaultValue={code}
            placeholder="Enter code"
          />
        </LabelInput>
      </div>
      <div className={styles.actions}>
        <Link
          href={`/stratagems-admin/${stratagem.category_id}`}
        >
          <Button>
            Cancel
          </Button>
        </Link>
        <Button type="submit">Edit Stratagem</Button>
      </div>
      <input type="hidden" name="category_id" value={stratagem.category_id} />
    </form>
  );
}

EditCategoryForm.propTypes = {
  stratagem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    category_id: PropTypes.string.isRequired,
  }).isRequired,
};
