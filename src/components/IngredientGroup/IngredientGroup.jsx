import React from 'react';
import IngredientGroupStyles from './IngredientGroup.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { ingredientPropType } from '../../utils/PropTypes';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const IngredientGroup = (props) => {
  const { title, ingredients } = props;
  const [open, setOpen] = React.useState();
  const [ingredient, setIngredient] = React.useState({});

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
    setIngredient({})
  }
  const ingredientDetails = (
    <IngredientDetails
      image={ingredient.image_large}
      title={ingredient.name}
      calories={ingredient.calories}
      proteins={ingredient.proteins}
      fat={ingredient.fat}
      carbohydrates={ingredient.carbohydrates} />
  )

  const modal = (
    <Modal closeModal={handleCloseModal} component={ingredientDetails} modalOpened={open}>Детали ингредиента</Modal>
  )

  return (
    <div className="pt-10">
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={`${IngredientGroupStyles.ingredient__list} pt-6 pl-4 pr-1`}>
        {ingredients.map(item => (
          <BurgerIngredient image={item.image} price={item.price} _id={item._id} title={item.name} key={item._id} openModal={handleOpenModal} />
        ))}
         {modal}
      </div>
    </div>
  )
}

IngredientGroup.propTypes = { ingredientPropType };

export default IngredientGroup;
