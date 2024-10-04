import {forwardRef} from 'react';
import IngredientGroupStyles from './IngredientGroup.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { IIngredient } from '../../services/types/ingredients';

interface IIngredientGroupProps {
  ingredients: IIngredient[];
  title: string;
  ingredientQty: Record<string, number>;
}
const IngredientGroup = forwardRef<HTMLDivElement, IIngredientGroupProps>(({ title, ingredients, ingredientQty }, ref) => {

  return (
    <div ref={ref} className="pt-10">
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={`${IngredientGroupStyles.ingredient__list} pt-6`}>
        {ingredients.map(item => (
          <BurgerIngredient qty={ingredientQty[item._id]} ingredient={item} key={item._id} />
        ))}
      </div>
    </div>
  )
})

export default IngredientGroup;
