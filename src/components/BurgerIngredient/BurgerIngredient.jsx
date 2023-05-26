import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';
import {ingredientPropType} from '../../utils/PropTypes';
import PropTypes from "prop-types";

const BurgerIngredient = (props) => {
  const {image, price, title, openModal, _id} = props;
  const getID = () => {
    openModal(_id)
  }
  return (
    <div className={ingredientStyles.ingredient} onClick={getID}>
      <img src={image} className="ml-4 mr-4"/>
      <div className={ingredientStyles.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{title}</p>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  )
}

BurgerIngredient.propTypes = {
  ingredientPropType,
  openModal: PropTypes.func
};

export default BurgerIngredient;

