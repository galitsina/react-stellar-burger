import singleOrderStyles from './SingleOrder.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getAllIngredients } from '../../utils/Data';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrderDetails } from '../../utils/BurgerApi';
import { v4 as uuidv4 } from 'uuid';

const SingleOrder = () => {
  const [ingredientsInOrder, setIngredientsInOrder] = useState([]);
  const today = new Date();
  const { items } = useSelector(getAllIngredients);
  const { feedId } = useParams();

  useEffect(() => {
    // note mutable flag
    let isMounted = true;
    getOrderDetails(feedId)
      .then((res) => {
        // add conditional check
        if (isMounted) setIngredientsInOrder(res.orders[0].ingredients);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
    //clean up
    return () => { isMounted = false };
  }, [])

  const uniqIngredientObj = ingredientsInOrder.reduce((acc, item) => {
    if (!acc[item]) {
      acc[item] = 1;
    } else {
      acc[item] += 1;
    }
    return acc;
  }, {});

  let totalPrice = 0;
  const ingredientList = Object.entries(uniqIngredientObj).map((item) => {
    const key = item[0];
    const value = item[1];
    const ingredientObj = items.find(item => {
      return item._id === key;
    });
    totalPrice += (ingredientObj.price * value);
    return (
      <div className={singleOrderStyles.ingredient} key={uuidv4()}>
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
    items.length &&
    <div className={`${singleOrderStyles.container} mb-15`}>
      <p className={`${singleOrderStyles.order_number} text text_type_digits-default mb-10`}>#88768</p>
      <p className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</p>
      <p className={`${singleOrderStyles.ready_color} text text_type_main-default mb-15`}>Выполнен</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${singleOrderStyles.order_list} custom-scroll mb-10 pr-8`}>
        { ingredientList }
      </div>
      <div className={singleOrderStyles.time_price}>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(today.getDate())} />
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
