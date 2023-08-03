import singleOrderStyles from './SingleOrder.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getAllIngredients, statusName, colorStatus } from '../../utils/Data';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrderDetails } from '../../utils/BurgerApi';

const SingleOrder = () => {
  const [singleOrderData, setSingleOrderData] = useState(null);
  const { items } = useSelector(getAllIngredients);
  const { feedId } = useParams();

  useEffect(() => {
    // note mutable flag
    let isMounted = true;
    getOrderDetails(feedId)
      .then((res) => {
        // add conditional check
        if (isMounted) setSingleOrderData(res.orders[0]);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
    //clean up
    return () => { isMounted = false };
  }, [])
  if (!singleOrderData) {
    return null;
  }
  const { number, createdAt, status, name } = singleOrderData;

  const ingredientsInOrder = singleOrderData.ingredients;
  const uniqIngredientObj = ingredientsInOrder.reduce((acc, item) => {
    if (!acc[item]) {
      acc[item] = 1;
    } else {
      acc[item] += 1;
    }
    return acc;
  }, {});

  let totalPrice = 0;
  const ingredientList = Object.entries(uniqIngredientObj).map((item, i) => {
    const key = item[0];
    const value = item[1];
    const ingredientObj = items.find(item => {
      return item._id === key;
    });
    totalPrice += (ingredientObj.price * value);
    return (
      <div className={singleOrderStyles.ingredient} key={i}>
        <div className={singleOrderStyles.image_border}>
          <img className={singleOrderStyles.image_icon} src={ingredientObj.image} alt={ingredientObj.name} />
        </div>
        <p className={`${singleOrderStyles.ingredient_name} text text_type_main-default`}>{ingredientObj.name}</p>
        <div className={singleOrderStyles.price}>
          <p className="text text_type_digits-default ">{value} x {ingredientObj.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    )
  })

  return (
    items.length && Boolean(singleOrderData) &&
    <div className={`${singleOrderStyles.container} mb-15`}>
      <p className={`${singleOrderStyles.order_number} text text_type_digits-default mb-10`}>#{number}</p>
      <p className="text text_type_main-medium mb-3">{name}</p>
      <p className='text text_type_main-default mb-15' style={{ color: colorStatus(status) }}>{statusName(status)}</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${singleOrderStyles.order_list} custom-scroll mb-10 pr-8`}>
        {ingredientList}
      </div>
      <div className={singleOrderStyles.time_price}>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </span>
        <div className={singleOrderStyles.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default SingleOrder;
