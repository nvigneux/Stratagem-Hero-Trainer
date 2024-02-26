/* eslint-disable react/require-default-props */

'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// Lib
import { generatePagination } from '../../../../lib/utils';

// Styles
import styles from './Pagination.module.css';

export default function Pagination({ totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className={styles.container}>
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className={styles.numbers}>
        {allPages.map((page, index) => {
          let position;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
};

function PaginationNumber({
  page,
  href,
  isActive,
  position = 'single',
}) {
  return isActive || position === 'middle' ? (
    <div>{page}</div>
  ) : (
    <Link href={href}>
      {page}
    </Link>
  );
}

PaginationNumber.propTypes = {
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['first', 'last', 'middle', 'single']),
};

function PaginationArrow({
  href,
  direction,
  isDisabled = false,
}) {
  const icon = direction === 'left' ? (
    '<'
  ) : (
    '>'
  );

  return isDisabled ? (
    <div>{icon}</div>
  ) : (
    <Link href={href}>
      {icon}
    </Link>
  );
}

PaginationArrow.propTypes = {
  href: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
