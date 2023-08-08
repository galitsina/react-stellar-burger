import { useState, useMemo } from 'react';
import { Loader } from '../Loader/Loader';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorIngredient from '../BurgerConstructorIngredient/BurgerConstructorIngredient';
import constructorStyles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { getOrder } from '../../services/actions/order';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, ADD_BUN, CLEAR_ITEMS } from '../../services/actions/selectedIngredients';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { getOrderState, getSelectedIngredients } from '../../utils/Data';

const BurgerConstructor = () => {
  const { orderNumber, orderRequest } = useSelector(getOrderState);
  const { selectedItems, bun } = useSelector(getSelectedIngredients);
  const isUserAuth = Boolean(localStorage.getItem("refreshToken") && localStorage.getItem("accessToken"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const idArr = selectedItems.map(ingredient => ingredient._id);
  if (bun) {
    idArr.push(bun._id);
    idArr.unshift(bun._id);
   }

  const [open, setOpen] = useState(false);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (item.type === 'bun') {
        dispatch({
          type: ADD_BUN,
          bun: item
        })
      } else if (bun) {
        const uniqueItem = { ...item, key: uuidv4() }
        dispatch({
          type: ADD_INGREDIENT,
          ingredient: uniqueItem
        })
      }
    }
  })
  const totalPrice = useMemo(() => {
    const ingredientsPrice = selectedItems.reduce((acc, item) => {
      return acc + item.price
    }, 0)
    const bunPrice = bun ? bun.price * 2 : 0;
    return bunPrice + ingredientsPrice
  }, [selectedItems, bun])

  const handleOpenModal = () => {
    if (isUserAuth) {
      setOpen(true);
      dispatch(getOrder(idArr));
    } else {
      navigate('/login', {state: { from: { pathname: "/" } }});
    }
  }

  const handleCloseModal = () => {
    setOpen(false);
    dispatch({
      type: CLEAR_ITEMS
    })
  }

  const modal = (
    <Modal closeModal={handleCloseModal} >
      {orderRequest ? (<Loader />) : (<OrderDetails orderId={orderNumber} />)}
    </Modal>
  )

  return (
    <section className={`${constructorStyles.section} pt-25 pl-4`} >
      {Boolean(bun) ?
        <div className={constructorStyles.burger__constructor} ref={dropTarget}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass="ml-8"
          />
          <div className={`${constructorStyles.scroll} custom-scroll pr-1`}>
            {selectedItems.map((item, index) => (<BurgerConstructorIngredient ingredient={item} key={item.key} index={index}/>)
            )}
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass="ml-8"
          />
        </div> : <div className={constructorStyles.empty__constructor} ref={dropTarget}></div>}
      <div className={`${constructorStyles.ordering} pr-6`}>
        <div className={constructorStyles.total}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="large" disabled={!Boolean(bun)} onClick={handleOpenModal}>
          Оформить заказ
        </Button>

      </div>
      {open && modal}
    </section>
  )
}

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
// }

export default BurgerConstructor;
