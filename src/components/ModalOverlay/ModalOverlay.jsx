import ModalOverlayStyles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ modalOpened }) => {
  return (
    <div className={modalOpened ? `${ModalOverlayStyles.overlay} ${ModalOverlayStyles.overlay_opened}` : ModalOverlayStyles.overlay}></div>
  )
}

ModalOverlay.propTypes = {
  modalOpened: PropTypes.bool
};

export default ModalOverlay;
