import ReactDOM from 'react-dom';
import React from 'react';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { CLEAR_CURRENT_ITEM } from '../../services/actions/currentIngredient';
const modalRoot = document.getElementById('react-modals');

const Modal = ({ closeModal, title, children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isPatnameIngredients = /ingredients.*/.test(pathname);

  const dispatch = useDispatch();

  React.useEffect(() => {
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('keydown', handleClose);
    }
  }, [])

  const handleClose = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }

    if ((e.key === 'Escape')) {
      closeModal();
    }
    // if (location.pathname === isPatnameIngredients) {
    //   dispatch({
    //     type: CLEAR_CURRENT_ITEM,
    //   })
    // }
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
    ), modalRoot)
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default Modal;

