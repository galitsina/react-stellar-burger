import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import { splitIngredients } from '../../utils/IngredientsUtils';
import { ingredientPropType } from '../../utils/PropTypes';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

const BurgerConstructor = (props) => {
  const ingredients = splitIngredients(props.data);
  const buns = ingredients.buns;
  const randIndex = Math.floor(Math.random() * buns.length);
  const randBun = buns[randIndex];
  const sauces = ingredients.sauces;
  const fillings = ingredients.fillings;
  const notBuns = sauces.concat(fillings);

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  const modal = (
    <Modal closeModal={handleCloseModal} component={<OrderDetails orderId='034536'/>} />
  )
  return (
    <section className={`${constructorStyles.section} pt-25 pl-4`}>
      <div className={constructorStyles.burger__constructor}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${randBun.name} (верх)`}
          price={randBun.price}
          thumbnail={randBun.image}
          extraClass="ml-8"
        />
        <div className={`${constructorStyles.scroll} custom-scroll pr-1`}>
          {notBuns.map(item => {
            return (
              <div className={constructorStyles.not__buns} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            )
          })}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${randBun.name} (низ)`}
          price={randBun.price}
          thumbnail={randBun.image}
          extraClass="ml-8"
        />
      </div>
      <div className={`${constructorStyles.ordering} pr-6`}>
        <div className={constructorStyles.total}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <div onClick={handleOpenModal}>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
      {open && modal}
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerConstructor;
