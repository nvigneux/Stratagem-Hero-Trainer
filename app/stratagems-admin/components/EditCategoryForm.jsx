'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';

// Styles
import styles from './StratagemForm.module.css';

// Lib
import { updateCategory } from '../../lib/actions';

// Components
import LabelInput from '../../ui/components/atoms/LabelInput/LabelInput';
import Button from '../../ui/components/atoms/Button/Button';

export default function EditCategoryForm({
  category,
}) {
  const updateCategoryWithId = updateCategory.bind(null, category.id);

  return (
    <form action={updateCategoryWithId} className={styles.form}>
      <div className={styles.fieldset}>
        <LabelInput label="Nom">
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={category.name}
            placeholder="Enter name"
          />
        </LabelInput>
      </div>
      <div className={styles.actions}>
        <Link
          href={`/stratagems-admin/${category.id}`}
        >
          <Button>
            Cancel
          </Button>
        </Link>
        <Button type="submit">Edit Category</Button>
      </div>
    </form>
  );
}

EditCategoryForm.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.number.isRequired,
  }).isRequired,
};
