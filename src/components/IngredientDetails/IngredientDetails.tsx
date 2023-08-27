import IngredientDetailsStyles from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {useMemo} from 'react';
import { getAllIngredients } from '../../utils/Data';

const IngredientDetails = () => {
  const { items } = useSelector(getAllIngredients);
  const { ingredientId } = useParams();

  const currentIngredient = useMemo(() => {
   return items.find(({_id}) => _id === ingredientId);
  }, [ingredientId, items]);

  if (!currentIngredient) {
    return null;
  }
  const { image_large, name, calories, proteins, fat, carbohydrates } = currentIngredient;

  return (
    <div className={`${IngredientDetailsStyles.container} mb-15`}>
      <img src={image_large} alt={name} />
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

export default IngredientDetails;
