import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './BurgerIngredient.module.css';

function BurgerIngredient({image, price, title}) {
  return (
    <div className={ingredientStyles.ingredient}>
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

export default BurgerIngredient;

