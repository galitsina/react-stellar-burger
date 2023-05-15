import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import React from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { data } from '../../utils/data';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');

  const buns = [];
  const sauces = [];
  const fillings = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'bun') {
      buns.push(data[i]);
    } else if (data[i].type === 'sauce') {
      sauces.push(data[i]);
    } else if (data[i].type === 'main') {
      fillings.push(data[i]);
    }
  }
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
          <div className={`${ingredientsStyles.ingredient__list} mt-6 ml-4 mr-1`}>
            {buns.map(item => (
              <BurgerIngredient image={item.image} price={item.price} title={item.name} key={item._id} />
            ))}
          </div>
        </div>
        <div className="pt-10">
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${ingredientsStyles.ingredient__list} mt-6 ml-4 mr-1`}>
            {sauces.map(item => (
              <BurgerIngredient image={item.image} price={item.price} title={item.name} key={item._id} />
            ))}
          </div>
        </div>
        <div className="pt-10">
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${ingredientsStyles.ingredient__list} mt-6 ml-4 mr-1`}>
            {fillings.map(item => (
              <BurgerIngredient image={item.image} price={item.price} title={item.name} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </section>

  )
}

export default BurgerIngredients;
