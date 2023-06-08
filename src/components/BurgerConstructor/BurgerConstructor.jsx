import React, {useState, useContext, useEffect} from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './BurgerConstructor.module.css';
import { splitIngredients } from '../../utils/IngredientsUtils';
//import { ingredientPropType } from '../../utils/PropTypes';
//import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { ClickedIngredientsContext, CostContext } from '../../services/apiContext';
import {sendOrder} from '../../utils/BurgerApi';

const BurgerConstructor = () => {
  const { clickedIngredients, setClickedIngredients } = useContext(ClickedIngredientsContext);
  const {costState, costDispatcher} = React.useContext(CostContext);

  //array of ids of each ingredient in context:
  const idArr = clickedIngredients.map(ingredient => ingredient._id);
  const ingredients = splitIngredients(clickedIngredients);
  const buns = ingredients.buns;
  const sauces = ingredients.sauces;
  const fillings = ingredients.fillings;
  const notBuns = sauces.concat(fillings);

  const [open, setOpen] = useState(false);
  const [state, setState] =  useState({
    isLoading: false,
    hasError: false,
    orderNumber: 0,
  })

  const handleOpenModal = () => {
    setOpen(true);

    const getData = () => {
      setState({ ...state, hasError: false, isLoading: true })
      sendOrder(idArr)
      .then(res => {
        console.log(res)
        setState({ ...state, isLoading: false, orderNumber: res.order.number })
      })
      .catch(err => {
        console.log(`Произошла ошибка: ${err}`)
        setState({ ...state, hasError: true, isLoading: false })
      })
    }
    getData();
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  const deleteIngredeint = (price) => {
    costDispatcher({type: 'DECREASE_COST', payload: price});
  }

  const modal = (
    <Modal closeModal={handleCloseModal} component={<OrderDetails orderId={state.orderNumber} />} />
  )
  return (
    <section className={`${constructorStyles.section} pt-25 pl-4`}>
      {Boolean(clickedIngredients.length) ?
        <div className={constructorStyles.burger__constructor}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns[0].name} (верх)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
            extraClass="ml-8"
          />
          <div className={`${constructorStyles.scroll} custom-scroll pr-1`}>
            {notBuns.map(item => {
              const deleteIngredeintWrapper = () => {
                deleteIngredeint(item.price);
                const arrWithoutClickedIngredient = clickedIngredients.filter(clickedItem => {
                  return clickedItem._id !== item._id;
                })
                setClickedIngredients(arrWithoutClickedIngredient)
              }
              return (
                <div className={constructorStyles.not__buns} key={item._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose = {deleteIngredeintWrapper}
                  />
                </div>
              )
            })}
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
            extraClass="ml-8"
          />
        </div> : <div className={constructorStyles.empty__constructor}></div>}
      <div className={`${constructorStyles.ordering} pr-6`}>
        <div className={constructorStyles.total}>
          <p className="text text_type_digits-medium">{costState.count}</p>
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

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
// }

export default BurgerConstructor;
