import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';
import { ingredientPropType } from '../../utils/PropTypes';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useLocation, Link } from 'react-router-dom';

const BurgerIngredient = ({ ingredient, qty }) => {
  const { image, price, name, _id } = ingredient;
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  })

  const location = useLocation();
  const ingredientId = _id;

  return (
    <Link
      key={ingredientId}
      // формируем динамический путь для нашего ингредиента
      to={`/ingredients/${ingredientId}`}
      // а также сохраняем в свойство background роут, на котором была открыта наша модалка
      state={{ background: location }}
      className={ingredientStyles.link}
    >
      <div className={ingredientStyles.ingredient} ref={dragRef}>
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
    </Link>
  )
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
  qty: PropTypes.number
};

export default BurgerIngredient;

