// Ui
import CreateStratagemForm from '../../components/CreateStratagemForm';

export default async function Page({ params }) {
  const { id } = params;
  return (
    <CreateStratagemForm categoryId={id} />
  );
}
