import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import React from 'react';
import {splitIngredients} from '../../utils/IngredientsUtils';
import {ingredientPropType} from '../../utils/PropTypes';
import PropTypes from 'prop-types';
import IngredientGroup from '../IngredientGroup/IngredientGroup';

const BurgerIngredients = (props) => {
  const Tabs = {
    BUN: 'bun',
    SAUCE: 'sauce',
    FILLINGS: 'fillings'
  }
  const [current, setCurrent] = React.useState(Tabs.BUN);
  const { buns, sauces, fillings } = splitIngredients(props.data);

  return (
    <section className={`${ingredientsStyles.section} pt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <nav className={ingredientsStyles.navigaton}>
        <Tab value={Tabs.BUN} active={current === Tabs.BUN} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value={Tabs.SAUCE} active={current === Tabs.SAUCE} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value={Tabs.FILLINGS} active={current === Tabs.FILLINGS} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
      <div className={`${ingredientsStyles.ingredients} custom-scroll`}>
        <IngredientGroup title="Булки" ingredients={buns} />
        <IngredientGroup title="Соусы" ingredients={sauces} />
        <IngredientGroup title="Начинки" ingredients={fillings} />
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerIngredients;
