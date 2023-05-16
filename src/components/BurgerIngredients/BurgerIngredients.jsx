import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import React from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import {splitIngredients} from '../../utils/IngredientsUtils';
import { data } from '../../utils/data';
import {ingredientPropType} from '../../utils/PropTypes';
import PropTypes from 'prop-types';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');
  const ingredients = splitIngredients(data);
  const buns = ingredients.buns;
  const sauces = ingredients.sauces;
  const fillings = ingredients.fillings;

  return (
    <section className={`${ingredientsStyles.section} pt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <nav className={ingredientsStyles.navigaton}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
      <div className={`${ingredientsStyles.ingredients} custom-scroll`}>
        <div className="pt-10">
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={`${ingredientsStyles.ingredient__list} pt-6 pl-4 pr-1`}>
            {buns.map(item => (
              <BurgerIngredient image={item.image} price={item.price} title={item.name} key={item._id} />
            ))}
          </div>
        </div>
        <div className="pt-10">
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${ingredientsStyles.ingredient__list} pt-6 pl-4 pr-1`}>
            {sauces.map(item => (
              <BurgerIngredient image={item.image} price={item.price} title={item.name} key={item._id} />
            ))}
          </div>
        </div>
        <div className="pt-10">
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${ingredientsStyles.ingredient__list} pt-6 pl-4 pr-1`}>
            {fillings.map(item => (
              <BurgerIngredient image={item.image} price={item.price} title={item.name} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerIngredients;
