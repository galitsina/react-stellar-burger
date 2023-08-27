import ReactDOM from 'react-dom';
import React, { ReactNode, FC } from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

interface IModalProps {
  closeModal: () => void;
  title: string;
  children: ReactNode;
}
type MouseEvent = React.MouseEvent<HTMLElement>

const Modal: FC<IModalProps> = ({ closeModal, title, children }) => {
  React.useEffect(() => {
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('keydown', handleClose);
    }
  }, [])

  const handleClose = (e: MouseEvent | KeyboardEvent) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }

    if (e instanceof KeyboardEvent && e.key === 'Escape') {
      closeModal();
    }
  }

  return ReactDOM.createPortal(
    (<div className={ModalStyles.fadeIn}>
      <ModalOverlay />
      <section className={ModalStyles.modal} onClick={handleClose}>
        <div className={ModalStyles.container}>
          <div className={`${ModalStyles.title__container} mt-10 mr-10 ml-10`}>
            <p className="text text_type_main-large">
              {title}
            </p>
            <button className={ModalStyles.close_icon} onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </section>
    </div>
    ), modalRoot!)
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default Modal;

