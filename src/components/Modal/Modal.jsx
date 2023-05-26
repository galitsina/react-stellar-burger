import ReactDOM from 'react-dom';
import React from 'react';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import OrderDetails from '../OrderDetails/OrderDetails';
import ModalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/PropTypes';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = (props) => {
  const { component, closeModal, modalOpened } = props;

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

    (<>
      <ModalOverlay modalOpened={modalOpened}/>
      <section className={modalOpened ? `${ModalStyles.modal} ${ModalStyles.modal_opened}` : ModalStyles.modal} onClick={handleClose}>
        <div className={ModalStyles.container}>
          <div className={`${ModalStyles.title__container} mt-10 mr-10 ml-10`}>
            <p className="text text_type_main-large">
              {props.children}
            </p>
            <button className={ModalStyles.close_icon} onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {component}
        </div>
      </section>
    </>
    ), modalRoot)
}

Modal.propTypes = {
  ingredientPropType,
  component: PropTypes.node,
  closeModal: PropTypes.func
};

export default Modal;

