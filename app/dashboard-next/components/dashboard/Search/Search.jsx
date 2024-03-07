'use client';

import PropTypes from 'prop-types';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Styles
import styles from './Search.module.css';

export default function Search({ placeholder }) {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor="search" className={styles.container}>
        <span className={styles.label}>Search</span>
        <input
          id="search"
          type="search"
          placeholder={placeholder}
          className={styles.input}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </label>

    </div>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
