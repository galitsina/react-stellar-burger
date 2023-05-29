import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';
import {ingredientPropType} from '../../utils/PropTypes';
import PropTypes from 'prop-types';

const BurgerIngredient = ({ingredient: {image, price, name, _id}, openModal}) => {

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
      <p className="text text_type_main-default">{name}</p>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  )
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType,
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredient;

