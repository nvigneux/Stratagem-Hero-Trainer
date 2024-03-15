import PropTypes from 'prop-types';
import Link from 'next/link';
// Lib
import { Fragment } from 'react';
import { fetchFilteredCategories } from '../../lib/data';

// Components
import Table from '../../ui/components/atoms/Table/Table';
import Button from '../../ui/components/atoms/Button/Button';

async function Categories({ query, currentPage, pageSize }) {
  const categories = await fetchFilteredCategories(query, currentPage, pageSize);

  const columns = [
    { id: 'name', title: 'Name', width: 'auto' },
    { id: 'actions', title: 'Actions', width: '1px' },
  ];

  return (
    <Table>
      <Table.Head columns={columns}>
        {(column) => (
          <Table.HeaderCell key={column.id} width={column.width}>
            {column.title}
          </Table.HeaderCell>
        )}
      </Table.Head>
      <Table.Body columns={columns} data={categories}>
        {(row) => (
          <Fragment key={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>
              <Link href={`/stratagems-admin/${row.id}`}><Button>Detail</Button></Link>
              <Link href={`/stratagems-admin/${row.id}/edit`}><Button>Edit</Button></Link>
            </Table.Cell>
          </Fragment>
        )}
      </Table.Body>
    </Table>
  );
}

Categories.propTypes = {
  query: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Categories;
