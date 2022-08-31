import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

function Modal({ src, onCloseModal }) {
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      window.addEventListener('keydown', handleKeyDown);
      isFirst.current = false;
      return;
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  return (
    <div
      className={s.Overlay}
      onClick={e => {
        if (e.target === e.currentTarget) {
          onCloseModal();
        }
      }}
    >
      <img className={s.Modal} src={src} alt={'Что-то пошло не так'} />
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
