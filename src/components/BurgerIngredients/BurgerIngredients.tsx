import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css';
import React, { useEffect, useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
import { splitIngredients } from '../../utils/IngredientsUtils';
import IngredientGroup from '../IngredientGroup/IngredientGroup';
import { useInView } from 'react-intersection-observer';
import { getAllIngredients, getSelectedIngredients } from '../../utils/Data';

const BurgerIngredients: FC = () => {
  const { selectedItems, bun } = useSelector(getSelectedIngredients);
  const { items } = useSelector(getAllIngredients);

  const Tabs = useMemo(() => {
    return {
      BUN: 'bun',
      SAUCE: 'sauce',
      FILLINGS: 'fillings'
    }
  }, []);
  const [current, setCurrent] = React.useState<string>(Tabs.BUN);
  const { buns, sauces, fillings } = splitIngredients(items);

  const { ref: refBun, inView: inViewBun } = useInView({
    threshold: 0
  });
  const { ref: refSauce, inView: inViewSauce } = useInView({
    threshold: 0
  });
  const { ref: refFilling, inView: inViewFilling } = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrent(Tabs.BUN);
    } else if (inViewSauce) {
      setCurrent(Tabs.SAUCE);
    } else if (inViewFilling) {
      setCurrent(Tabs.FILLINGS);
    }
  }, [inViewBun, inViewSauce, inViewFilling])

  const ingredientQty: {[key: string]: number } = {} //obj with key=id, value=qty of each ingredient
  const bunQty = bun ? { [bun._id]: 2} : {}
  for (let i = 0; i < selectedItems.length; i++) {
    if (!ingredientQty[selectedItems[i]._id]) {
      ingredientQty[selectedItems[i]._id] = 1;
    } else {
      ingredientQty[selectedItems[i]._id] += 1;
    }
  }

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
        <IngredientGroup ref={refBun} ingredientQty={bunQty} title="Булки" ingredients={buns} />
        <IngredientGroup ref={refSauce} ingredientQty={ingredientQty}  title="Соусы" ingredients={sauces} />
        <IngredientGroup ref={refFilling} ingredientQty={ingredientQty}  title="Начинки" ingredients={fillings} />
      </div>
    </section>
  )
}

export default BurgerIngredients;
