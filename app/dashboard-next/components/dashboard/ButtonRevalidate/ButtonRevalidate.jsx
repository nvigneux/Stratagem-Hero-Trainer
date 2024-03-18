/* eslint-disable react/prop-types */

'use client';

import { revalidateByTag } from '../../../../lib/actions';

function ButtonRevalidate({ pokemon }) {
  'use client';

  const handleRevalidate = async () => {
    await revalidateByTag(`toto:${pokemon}`);
  };

  return (
    <button type="button" onClick={handleRevalidate}>
      Revalidate Pokemon
    </button>
  );
}

export default ButtonRevalidate;
