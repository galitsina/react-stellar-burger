import IngredientGroupStyles from './IngredientGroup.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

function IngredientGroup ({title, ingredients}) {
  return (
    <div className="pt-10">
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={`${IngredientGroupStyles.ingredient__list} pt-6 pl-4 pr-1`}>
        {ingredients.map(item => (
          <BurgerIngredient image={item.image} price={item.price} title={item.name} key={item._id} />
        ))}
      </div>
    </div>
  )
}

export default IngredientGroup;
