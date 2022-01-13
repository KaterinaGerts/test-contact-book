import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onCloseModal, children }) {
  const onEscapeClick = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscapeClick);
    return () => {
      window.removeEventListener('keydown', onEscapeClick);
    };
  });

  const closeOverlay = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={closeOverlay}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
