'use client';

import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

function Modal({ children }) {
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          router.back();
        }}
      >
        Close modal
      </button>
      <div>{children}</div>
    </>
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
