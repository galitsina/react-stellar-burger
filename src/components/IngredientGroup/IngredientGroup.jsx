import React from 'react';
import IngredientGroupStyles from './IngredientGroup.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { ingredientPropType } from '../../utils/PropTypes';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_ITEM, CLEAR_CURRENT_ITEM } from '../../services/actions/currentIngredient';

const IngredientGroup = React.forwardRef(({ title, ingredients, ingredientQty }, ref) => {
  const [open, setOpen] = React.useState(false);
  const { items } = useSelector(state => state.allIngredients);
  const { currentItem } = useSelector(state => state.currentIngredient);
  const dispatch = useDispatch();

  const handleOpenModal = (id) => {
    setOpen(true);
    const card = items.find((item) => {
      return item._id === id;
    })
    dispatch({
      type: CURRENT_ITEM,
      currentItem: card
    })
  }

  const handleCloseModal = () => {
    setOpen(false);
    dispatch({
      type: CLEAR_CURRENT_ITEM,
    })
  }

  const modal = (
    <Modal closeModal={handleCloseModal} title='Детали ингредиента'>
      <IngredientDetails ingredient={currentItem} />
    </Modal>
  )

  return (
    <div ref={ref} className="pt-10">
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={`${IngredientGroupStyles.ingredient__list} pt-6 pl-4 pr-1`}>
        {ingredients.map(item => (
          <BurgerIngredient qty={ingredientQty[item._id]} ingredient={item} key={item._id} openModal={handleOpenModal} />
        ))}
        {open && modal}
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
