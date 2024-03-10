// Ui
import CreateStratagemForm from '../../components/CreateStratagemForm';

export default async function Page({ params }) {
  const { id } = params;
  return (
    <main>
      <h1>Create Category</h1>
      <CreateStratagemForm categoryId={id} />
    </main>
  );
}
