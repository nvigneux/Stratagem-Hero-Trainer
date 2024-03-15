import PropTypes from 'prop-types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';

// Lib
import { fetchCategoryById, fetchStratagemByCategory } from '../../lib/data';

// Components
import DeleteStratagem from '../components/DeleteStratagem';
import Button from '../../ui/components/atoms/Button/Button';
import Table from '../../ui/components/atoms/Table/Table';

export default async function Page({ params }) {
  const { id } = params;
  const [category, stratagems] = await Promise.all([
    fetchCategoryById(id),
    fetchStratagemByCategory(id),
  ]);

  if (!category) {
    notFound();
  }

  const columns = [
    { id: 'image', title: 'Image', width: '1px' },
    { id: 'name', title: 'Name', width: 'auto' },
    { id: 'actions', title: 'Actions', width: '1px' },
  ];

  return (
    <main>
      <Table.Action>
        <Link href="/stratagems-admin"><Button>Back</Button></Link>
        <Link href={`/stratagems-admin/${category.id}/create`}>
          <Button>Add Stratagem</Button>
        </Link>
      </Table.Action>

      <Table>
        <Table.Head columns={columns}>
          {(column) => (
            <Table.HeaderCell key={column.id} width={column.width}>
              {column.title}
            </Table.HeaderCell>
          )}
        </Table.Head>
        <Table.Body columns={columns} data={stratagems}>
          {(row) => (
            <Fragment key={row.id}>
              <Table.Cell>
                <Image
                  src={`/icons/stratagems/${category.name}/${row.name}.svg`}
                  alt={row.name}
                  width={35}
                  height={35}
                />
              </Table.Cell>

              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>
                <Link href={`/stratagems-admin/${category.id}/${row.id}`}><Button>Edit</Button></Link>
                <DeleteStratagem id={row.id} categoryId={category.id} />
              </Table.Cell>
            </Fragment>
          )}
        </Table.Body>
      </Table>
    </main>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
