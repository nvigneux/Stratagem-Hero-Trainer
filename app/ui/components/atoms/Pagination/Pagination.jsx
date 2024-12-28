'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// Lib
import { generatePagination } from '../../../../lib/utils';

// Styles
import styles from './Pagination.module.css';

/**
 * Pagination component
 * @param {object} props
 * @param {number} props.totalPages - Total number of pages
 * @returns {JSX.Element}
 */
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

/**
 * PaginationNumber component
 * @param {object} props
 * @param {number|string} props.page - Page number or ellipsis
 * @param {string} props.href - URL for the page
 * @param {boolean} props.isActive - Whether the page is the current page
 * @param {'first'|'last'|'middle'|'single'} [props.position='single'] - Position of the page number
 * @returns {JSX.Element}
 */
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

/**
 * PaginationArrow component
 * @param {object} props
 * @param {string} props.href - URL for the arrow
 * @param {'left'|'right'} props.direction - Direction of the arrow
 * @param {boolean} [props.isDisabled=false] - Whether the arrow is disabled
 * @returns {JSX.Element}
 */
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
