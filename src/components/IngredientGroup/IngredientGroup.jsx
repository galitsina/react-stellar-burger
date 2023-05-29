import React from 'react';
import IngredientGroupStyles from './IngredientGroup.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { ingredientPropType } from '../../utils/PropTypes';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const IngredientGroup = ({ title, ingredients }) => {
  const [open, setOpen] = React.useState(false);
  const [ingredient, setIngredient] = React.useState(undefined);

  const handleOpenModal = (id) => {
    //find clicked card by id
    const card = ingredients.find((item) => {
      return item._id === id;
    })
    setIngredient(card)
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
    setIngredient(undefined)
  }

  const ingredientDetails = (
    <IngredientDetails ingredient={ingredient} />
  )

  const modal = (
    <Modal closeModal={handleCloseModal} component={ingredientDetails}>Детали ингредиента</Modal>
  )

  return (
    <div className="pt-10">
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={`${IngredientGroupStyles.ingredient__list} pt-6 pl-4 pr-1`}>
        {ingredients.map(item => (
          <BurgerIngredient ingredient={item} key={item._id} openModal={handleOpenModal} />
        ))}
         {open && modal}
      </div>
    </div>
  )
}

IngredientGroup.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  title: PropTypes.string.isRequired
};

export default IngredientGroup;
