
import IngredientDetailsStyles from './Ingredient.module.css';
import { useSelector } from 'react-redux';

export const IngredientPage = () => {
  const { items, itemsRequest } = useSelector(state => state.allIngredients);
  console.log(items)
  const {image_large, name, calories, proteins, fat, carbohydrates} = items[0];

  return (
    <div className={`${IngredientDetailsStyles.container} mb-15`}>
      <img src={image_large} alt={name}/>
      <p className="text text_type_main-medium mt-4">{name}</p>
      <div className={`${IngredientDetailsStyles.calories__grid} mt-8`}>
        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
        <p className="text text_type_digits-default text_color_inactive">{calories}</p>
        <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
        <p className="text text_type_digits-default text_color_inactive">{fat}</p>
        <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
      </div>
    </div>
  )
}



