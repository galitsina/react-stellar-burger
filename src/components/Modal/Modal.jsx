import ReactDOM from 'react-dom';
import React from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ component, closeModal, children }) => {
  React.useEffect( () => {
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('keydown', handleClose);
    }
  },[])

  const handleClose = (e) => {
    if(e.currentTarget === e.target){
      closeModal();
    }

    if ((e.key === 'Escape')) {
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
              {children}
            </p>
            <button className={ModalStyles.close_icon} onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {component}
        </div>
      </section>
    </div>
    ), modalRoot)
}

Modal.propTypes = {
  component: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;

