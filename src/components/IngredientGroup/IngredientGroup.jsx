import React from 'react';
import IngredientGroupStyles from './IngredientGroup.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { ingredientPropType } from '../../utils/PropTypes';
import PropTypes from 'prop-types';

const IngredientGroup = React.forwardRef(({ title, ingredients, ingredientQty }, ref) => {

  return (
    <div ref={ref} className="pt-10">
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={`${IngredientGroupStyles.ingredient__list} pt-6 pl-4 pr-1`}>
        {ingredients.map(item => (
          <BurgerIngredient qty={ingredientQty[item._id]} ingredient={item} key={item._id} />
        ))}
      </div>
    </div>
  )
})

IngredientGroup.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  title: PropTypes.string.isRequired,
  ingredientQty: PropTypes.object.isRequired
};

export default IngredientGroup;
