import React from 'react';
import IngredientGroupStyles from './IngredientGroup.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { ingredientPropType } from '../../utils/PropTypes';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ClickedIngredientsContext, CostContext } from '../../services/apiContext';

const IngredientGroup = ({ title, ingredients }) => {
  const [open, setOpen] = React.useState(false);
  const [ingredient, setIngredient] = React.useState(undefined);
  //created context included clicked ingredients:
  const {clickedIngredients, setClickedIngredients}  = React.useContext(ClickedIngredientsContext);
  const {costState, costDispatcher} = React.useContext(CostContext);

  const handleOpenModal = (id) => {
    //find clicked card by id
    const card = ingredients.find((item) => {
      return item._id === id;
    })
    setIngredient(card)
    setOpen(true);
  }

  const handleAddIngredient = (id) => {
    const card = ingredients.find((item) => {
      return item._id === id;
    })

    //check if context clickedIngredients contains 'bun'
    const isBun = clickedIngredients.some((item) => {
      return item.type === 'bun';
    })
    // if we have bun in context - do nothing
    // else push new item to original array and clone original array to force react to rerender App:
    if((card.type === 'bun') && isBun) {
      return
    } else {
      clickedIngredients.push(card);
      setClickedIngredients([...clickedIngredients])
    }
    let cardPrice = card.price;
    //when clicked save count in context:
    if(card.type === 'bun') {
      cardPrice *= 2;
    }
    costDispatcher({type: 'INCREASE_COST', payload: cardPrice});

  }

  const handleCloseModal = () => {
    setOpen(false);
    setIngredient(undefined)
  }

  const modal = (
    <Modal closeModal={handleCloseModal} component={<IngredientDetails ingredient={ingredient} />}>Детали ингредиента</Modal>
  )

  return (
    <div className="pt-10">
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={`${IngredientGroupStyles.ingredient__list} pt-6 pl-4 pr-1`}>
        {ingredients.map(item => (
          <BurgerIngredient ingredient={item} key={item._id} openModal={handleAddIngredient} />
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
