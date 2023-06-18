import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';
import { ingredientPropType } from '../../utils/PropTypes';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";

const BurgerIngredient = ({ ingredient, qty, openModal }) => {
  const { image, price, name, _id } = ingredient;
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  })

  const getID = () => {
    openModal(_id)
  }


  return (
    <div className={ingredientStyles.ingredient} onClick={getID} ref={dragRef}>
      <img src={image} alt={name} className="ml-4 mr-4" />
      <div className={ingredientStyles.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
      {qty &&
      (<Counter count={qty} size="default" extraClass="m-1" />)
      }
    </div>
  )
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
  openModal: PropTypes.func.isRequired,
  qty: PropTypes.number
};

export default BurgerIngredient;

