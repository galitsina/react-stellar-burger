import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import OrderDetails from '../OrderDetails/OrderDetails';
import ModalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../utils/PropTypes';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

const Modal = ({ data, component, title }) => {
  const randIndex = Math.floor(Math.random() * data.length);
  const randIngredient = data[randIndex];

  return (
    <section>
      <ModalOverlay />
      <div className={`${ModalStyles.modal} ${ModalStyles.modal_opened}`}>
        <div className={ModalStyles.container}>
          <div className={`${ModalStyles.title__container} mt-10 mr-10 ml-10`}>
            <p className="text text_type_main-large">
              {title}
            </p>
            <button className={ModalStyles.close_icon}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {component}
        </div>
      </div>
    </section>

  )
}

Modal.propTypes = {ingredientPropType};

export default Modal;

//<Modal data={state} component={ <OrderDetails orderId='034536'/>} />
//<IngredientDetails
// image={randIngredient.image_large}
// title={randIngredient.name}
// calories={randIngredient.calories}
// proteins={randIngredient.proteins}
// fat={randIngredient.fat}
// carbohydrates={randIngredient.carbohydrates} />
